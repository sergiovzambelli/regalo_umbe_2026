import content from '../content.json';
import Picker from './Picker';
import Reveal from './Reveal';

const { hero, ticker, lore, crew, picker, dates, victory, footer } = content;

const Slam = ({ text, delay = 0, step = 90 }) => (
  <span className="slam" aria-label={text}>
    {[...text].map((ch, i) => (
      <span key={i} aria-hidden="true" style={{ '--d': `${delay + i * step}ms` }}>{ch}</span>
    ))}
  </span>
);

export default function Home() {
  const tick = [...ticker, ...ticker];
  return (
    <>
      <a className="skip" href="#data">Vai alla scelta della data</a>
      <main>
        <section className="hero">
          <div className="world" aria-hidden="true"><div className="grid" /><div className="sun" /></div>
          <div className="wrap hero-in">
            <p className="kicker">{hero.kicker}</p>
            <h1 className="mega">
              {/* F … W … JAM: one beat per letter of the first word, then the whole second word at once */}
              <Slam text={hero.titleTop} step={650} />
              <Slam text={hero.titleBottom} delay={1300} step={0} />
            </h1>
            <p className="lead">{hero.lead}</p>
            <a className="btn" href="#data">{hero.cta} <span aria-hidden="true">→</span></a>
            <p className="press" aria-hidden="true">{hero.pressStart}</p>
          </div>
        </section>

        <div className="ticker" aria-label={ticker.join(', ')}>
          <div className="ticker-track" aria-hidden="true">
            {tick.map((t, i) => <span key={i}>{t}<b>✦</b></span>)}
          </div>
        </div>

        <section className="lore">
          <div className="wrap">
            <h2 className="label">{lore.heading}</h2>
            <Reveal className="lore-lines">
              {lore.lines.map((l, i) => <p key={i} style={{ '--d': `${i * 450}ms` }}>{l}</p>)}
            </Reveal>
            <p className="body">{lore.body}</p>
          </div>
        </section>

        <section className="crew">
          <div className="wrap">
            <h2 className="label">{crew.heading}</h2>
            <ul className="cards">
              {crew.members.map((m, i) => (
                <li key={m.name} className={`card${i === 0 ? ' boss' : ''}`}>
                  <span className="p">P{i + 1}</span>
                  <div className="avatar" aria-hidden="true">{m.name.charAt(0)}</div>
                  <p className="role">{m.role}</p>
                  <h3>{m.name}</h3>
                  <p className="power">{m.power}</p>
                  <p className="stat">{m.stat}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pick" id="data">
          <div className="wrap">
            <h2 className="h2">{picker.heading}</h2>
            <p className="body">{picker.body}</p>
            <Picker dates={dates} text={picker} victory={victory} />
          </div>
        </section>
      </main>
      <footer className="foot"><div className="wrap">{footer}</div></footer>
    </>
  );
}
