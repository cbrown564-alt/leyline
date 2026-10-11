import { Link } from 'wouter';
import { SiteHeader, SiteFooter, Ley, useReveal, usePageTitle, asset } from '@/components/Site';
import ContactForm from '@/components/ContactForm';
import { WORK } from '@/content/work';
import { CONTACT_EMAIL } from '@/lib/mailto';

const STEPS = [
  { name: 'Talk', note: 'We learn how your business works now.' },
  { name: 'Design', note: 'Scope and price agreed in writing.' },
  { name: 'Prototype', note: 'You try it before we build it.', focus: true },
  { name: 'Build', note: 'Live, with your team shown how to use it.' },
  { name: 'Look after', note: 'Hosting, fixes and changes.' },
];

const SIZES = [
  { name: 'Small', price: '£2k', time: '2–4 weeks', body: 'A website refresh, or one tool your team uses every day.', example: 'eni' },
  { name: 'Medium', price: '£5k', time: '1–2 months', body: 'A system that replaces a spreadsheet or a paper process: bookings, stock, quotes.' },
  { name: 'Large', price: '£20k', time: '3 months or more', body: 'Software that runs a core part of the business, with several kinds of user.' },
];

type Person = { name: string; city: string; initial: string; bio?: React.ReactNode; photo?: string; linkedin?: string };

const PEOPLE: Person[] = [
  { name: 'Killian', city: 'London', initial: 'K' },
  {
    name: 'Conor', city: 'Belfast', initial: 'C',
    bio: <>Data scientist with an MSc in AI from Queen’s Belfast. Turns spreadsheets and slow processes into tools a team uses every day, like <a href="https://researchvelocity.co.uk">Velocity</a>, for survey analysis.</>,
    photo: 'people/conor.jpg', linkedin: 'https://www.linkedin.com/in/conor-brown-65174597/' },
];

function SectionHead({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div className="section-head">
      <h2 id={`${id}-h`} className="h2">{title}</h2>
      <p>{children}</p>
    </div>
  );
}

export function Home() {
  usePageTitle('Leyline — software studio, London and Belfast');
  useReveal('home');

  return (
    <div className="site">
      <div className="wrap">
        <SiteHeader />

        <section className="hero">
          <div className="eyebrow in"><Ley /><span className="label">Software studio · London and Belfast</span></div>
          <h1 className="display in" style={{ ['--d' as string]: '80ms' }}>
            <span>Software that fits</span> <em>how you already work.</em>
          </h1>
          <p className="lede in" style={{ ['--d' as string]: '160ms' }}>
            We are two developers who build the websites, tools and systems a business runs on.
          </p>
          <div className="actions in" style={{ ['--d' as string]: '240ms' }}>
            <a className="btn" href="#contact">Start a conversation</a>
            <a className="btn quiet" href="#work">See our work</a>
          </div>
        </section>

        <section id="work" className="section" aria-labelledby="work-h">
          <SectionHead id="work" title="Work">Real projects, shown before and after.</SectionHead>
          {WORK.map(w => (
            <Link key={w.slug} href={`/work/${w.slug}`} className="card in">
              <div className="shot"><img src={asset(w.compare.after.src)} alt="" width={1440} height={660} /></div>
              <div>
                <span className="label">{w.client}</span>
                <h3>{w.title[0]} <em>{w.title[1]}</em></h3>
                <div className="facts">
                  {w.card.map(f => <div key={f.value}><strong>{f.value}</strong>{f.label}</div>)}
                </div>
                <span className="go">Read the case study <Ley /></span>
              </div>
            </Link>
          ))}
        </section>

        <section id="how" className="section" aria-labelledby="how-h">
          <SectionHead id="how" title="How we work">The same five steps, whatever the size.</SectionHead>
          <ol className="strip">
            {STEPS.map((s, n) => (
              <li key={s.name} className={`in${s.focus ? ' focus' : ''}`} style={{ ['--d' as string]: `${n * 90}ms` }}>
                <span className="node" aria-hidden="true" />
                <h3>{s.name}</h3>
                <p>{s.note}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="sizes" className="section" aria-labelledby="sizes-h">
          <SectionHead id="sizes" title="Project sizes">Typical starting prices. You get a written quote before any work begins.</SectionHead>
          <div className="sizes">
            {SIZES.map((s, n) => (
              <div key={s.name} className="size in" style={{ ['--d' as string]: `${n * 90}ms` }}>
                <span className="label">{s.name}</span>
                <div className="price"><small>From</small>{s.price}</div>
                <div className="time">{s.time}</div>
                <p>{s.body}</p>
                {s.example && <div className="eg">For example: <Link href={`/work/${s.example}`}>ENI’s website</Link></div>}
              </div>
            ))}
          </div>
        </section>

        <section id="people" className="section" aria-labelledby="people-h">
          <SectionHead id="people" title="People">Leyline is two people. You work with both of us.</SectionHead>
          <div className="people">
            {PEOPLE.map(p => (
              <div key={p.name} className="person in">
                {p.photo
                  ? <img className="portrait" src={asset(p.photo)} alt={p.name} width={720} height={900} />
                  : <div className="portrait" aria-label={`Photo of ${p.name} to come`}>{p.initial}</div>}
                <div>
                  <span className="label">{p.city}</span>
                  <h3>{p.name}</h3>
                  <p>{p.bio ?? <span className="todo">[One line: background, and what {p.name} builds.]</span>}</p>
                  <div className="links">
                    <a href={`mailto:${CONTACT_EMAIL}`}>Email</a>
                    {p.linkedin ? <a href={p.linkedin}>LinkedIn</a> : <span className="todo">[LinkedIn]</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section id="contact" className="contact" aria-labelledby="contact-h">
        <div className="wrap grid">
          <div>
            <h2 id="contact-h" className="h2">Tell us what’s <em>slowing you down.</em></h2>
            <p className="lede">A few lines is enough. One of us will reply.</p>
            <a className="mail" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
          <ContactForm />
        </div>
      </section>

      <div className="wrap"><SiteFooter /></div>
    </div>
  );
}
