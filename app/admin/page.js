import { listChoices } from '../store';

export const dynamic = 'force-dynamic';
export const metadata = { robots: 'noindex' };

const fmt = (iso) => new Date(iso).toLocaleString('it-IT', { timeZone: 'Europe/Rome' });

export default async function Admin({ searchParams }) {
  const { key } = await searchParams;
  const expected = process.env.ADMIN_KEY || (process.env.NODE_ENV !== 'production' && 'dev');
  if (!expected || key !== expected) return <main className="admin"><h1>403</h1></main>;
  const list = await listChoices();
  return (
    <main className="admin">
      <h1>Scelte di Umberto</h1>
      {list.length === 0 ? <p>Ancora niente.</p> : (
        <ol>{list.map((c, i) => <li key={i}><strong>{c.date}</strong> — scelta il {fmt(c.at)}{i === 0 && ' ← attuale'}</li>)}</ol>
      )}
    </main>
  );
}
