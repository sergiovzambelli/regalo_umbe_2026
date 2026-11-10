import { readFile, writeFile, mkdir } from 'node:fs/promises';

// Upstash Redis REST (Vercel Marketplace sets either name pair). Without it: local file, dev only.
const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = 'umbejam:choices';
const FILE = '.data/choices.json';

async function redis(cmd) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(cmd),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  return (await res.json()).result;
}

async function readFileList() {
  try { return JSON.parse(await readFile(FILE, 'utf8')); } catch { return []; }
}

// Newest first: [{ date, at }]
export async function listChoices() {
  if (url) return (await redis(['LRANGE', KEY, 0, -1])).map((s) => JSON.parse(s));
  return readFileList();
}

export async function addChoice(date) {
  const entry = { date, at: new Date().toISOString() };
  if (url) return redis(['LPUSH', KEY, JSON.stringify(entry)]);
  const list = await readFileList();
  await mkdir('.data', { recursive: true });
  await writeFile(FILE, JSON.stringify([entry, ...list], null, 2));
}
