'use client';
import { useEffect, useState } from 'react';

const fmt = (iso, opts) => new Date(`${iso}T12:00:00`).toLocaleDateString('it-IT', opts);

export default function Picker({ dates, text, victory }) {
  const [sel, setSel] = useState(null);
  const [saved, setSaved] = useState(null);
  const [state, setState] = useState('idle'); // idle | sending | won | error

  useEffect(() => {
    fetch('/api/choice').then((r) => r.json()).then((d) => d.date && (setSaved(d.date), setSel(d.date))).catch(() => {});
  }, []);

  async function confirm() {
    setState('sending');
    try {
      const r = await fetch('/api/choice', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ date: sel }) });
      if (!r.ok) throw new Error();
      setSaved(sel);
      setState('won');
    } catch {
      setState('error');
    }
  }

  return (
    <>
      {saved && <p className="saved">{text.already} <strong>{fmt(saved, { weekday: 'long', day: 'numeric', month: 'long' })}</strong></p>}
      <div className="dates" role="radiogroup" aria-label={text.heading}>
        {dates.map((d) => (
          <button key={d} type="button" role="radio" aria-checked={sel === d} className="date" onClick={() => setSel(d)}>
            <span className="dow">{fmt(d, { weekday: 'short' })}</span>
            <span className="day">{fmt(d, { day: '2-digit' })}</span>
            <span className="mon">{fmt(d, { month: 'short', year: 'numeric' })}</span>
          </button>
        ))}
      </div>
      <button type="button" className="btn big" disabled={!sel || state === 'sending'} onClick={confirm}>
        {state === 'sending' ? text.sending : text.confirm}
      </button>
      {state === 'error' && <p className="err" role="alert">{text.error}</p>}

      {state === 'won' && (
        <div className="victory" role="dialog" aria-modal="true" aria-labelledby="vh">
          <div className="confetti" aria-hidden="true">
            {Array.from({ length: 40 }, (_, i) => <i key={i} style={{ '--x': `${(i * 37) % 100}%`, '--d': `${(i % 10) * 120}ms`, '--r': `${(i * 53) % 360}deg` }} />)}
          </div>
          <h2 id="vh" className="mega"><span className="slam">{[...victory.heading].map((c, i) => <span key={i} style={{ '--d': `${i * 90}ms` }}>{c === ' ' ? ' ' : c}</span>)}</span></h2>
          <p className="vdate">{fmt(saved, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p className="body">{victory.body}</p>
          <button type="button" className="btn" autoFocus onClick={() => setState('idle')}>{victory.close}</button>
        </div>
      )}
    </>
  );
}
