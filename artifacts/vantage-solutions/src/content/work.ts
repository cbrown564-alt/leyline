// Case studies. Each one renders at /work/:slug and as a card on the homepage.
// Facts for ENI come from the project repo; see content/case-studies/eni.md.

export type Shot = { src: string; alt: string; date: string };

export type CaseStudy = {
  slug: string;
  client: string;
  title: [string, string];
  lede: string;
  site: { url: string; label: string };
  compare: { heading: [string, string]; before: Shot; after: Shot; text: string };
  lead: { value: string; unit?: string; label: string; note: string };
  support: { value: string; label: string; note: string }[];
  changes: { was: string; now: string }[];
  meta: { size: string; time: string; live: string };
  // The two facts shown on the homepage card.
  card: { value: string; label: string }[];
};

export const WORK: CaseStudy[] = [
  {
    slug: 'eni',
    client: 'Elizabeth Norman International',
    title: ['Easier to find a job.', 'Easier to run.'],
    lede: 'A website refresh for a specialist insight recruiter, founded 1989.',
    site: { url: 'https://elizabethnorman.com', label: 'elizabethnorman.com' },
    compare: {
      heading: ['Same company.', 'Clearer first look.'],
      before: {
        src: 'work/eni/before-home.jpg',
        alt: "ENI homepage in August: a teal hero reading 'Dedicated talent partners enabling all to succeed in Insight and Analytics' above a job search form",
        date: 'August 2026',
      },
      after: {
        src: 'work/eni/after-home.jpg',
        alt: "ENI homepage in October: 'Worth a closer look', specialist insight recruiters since 1989, with buttons to find a role or find a hire",
        date: 'October 2026',
      },
      text: 'The old homepage opened with a slogan and a search box. The new one says who ENI is in its first line, then offers two routes: find a role, or find a hire. The leaf from ENI’s logo becomes a lens, framing a portrait drawn in teal dots.',
    },
    lead: { value: '2', unit: 'min', label: 'to change a client logo.', note: 'It used to need a developer.' },
    support: [
      { value: '1', label: 'form to apply.', note: 'No account, no password, CV optional.' },
      { value: '5', label: 'menu items, down from 9.', note: 'One route for candidates, one for employers.' },
      { value: '41', label: 'pages and articles, down from 145.', note: 'Old, duplicate and test pages retired.' },
    ],
    changes: [
      { was: 'Closed jobs and test pages in Google', now: 'Only current roles listed' },
      { was: 'WordPress menus to publish an article', now: 'One writing screen' },
      { was: 'Layout code to edit a page', now: 'Labelled fields' },
    ],
    meta: { size: 'Small', time: 'About 4 weeks', live: 'October 2026' },
    card: [
      { value: '2 min', label: 'to change a client logo' },
      { value: '145→41', label: 'pages and articles' },
    ],
  },
];

export const findWork = (slug: string) => WORK.find(w => w.slug === slug);
