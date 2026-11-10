import content from '../../../content.json';
import { addChoice, listChoices } from '../../store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const [last] = await listChoices();
  return Response.json({ date: last?.date ?? null });
}

export async function POST(req) {
  const { date } = await req.json().catch(() => ({}));
  if (!content.dates.includes(date)) return Response.json({ error: 'data non valida' }, { status: 400 });
  await addChoice(date);
  return Response.json({ ok: true, date });
}
