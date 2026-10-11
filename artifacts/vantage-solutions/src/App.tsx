import { useEffect } from 'react';
import { Router, Route, Switch, Redirect, useLocation } from 'wouter';
import { Home } from '@/pages/Home';
import { CaseStudy } from '@/pages/CaseStudy';
import { PrivacyPolicy } from '@/pages/Privacy';
import { NotFound } from '@/pages/NotFound';
import { Glyphs } from '@/pages/Glyphs';

const routerBase = import.meta.env.BASE_URL.replace(/\/+$/, '');

// wouter does not restore scroll on navigation. Start each route at the top,
// or at the section named in the hash (e.g. /#work from a case study).
function ScrollOnNavigate() {
  const [location] = useLocation();
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const target = id && document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
    else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location]);
  return null;
}

export default function App() {
  return (
    <Router base={routerBase}>
      <ScrollOnNavigate />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/work/:slug" component={CaseStudy} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/glyphs" component={Glyphs} />
        {/* Old pages: work moved to case studies; the rest was retired. */}
        <Route path="/our-work"><Redirect to="/#work" replace /></Route>
        <Route path="/peace-of-mind"><Redirect to="/#how" replace /></Route>
        <Route path="/local-growth"><Redirect to="/" replace /></Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
