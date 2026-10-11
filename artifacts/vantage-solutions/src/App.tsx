import { useEffect } from 'react';
import { Router, Route, Switch, useLocation } from 'wouter';
import { VantageSolutionsHome } from '@/pages/Home';
import { PrivacyPolicy } from '@/pages/Privacy';
import { PeaceOfMind } from '@/pages/PeaceOfMind';
import { OurWork } from '@/pages/OurWork';
import { LocalGrowth } from '@/pages/LocalGrowth';

const routerBase = import.meta.env.BASE_URL.replace(/\/+$/, '');

// wouter does not restore scroll on navigation — start every route at the top.
// Anchor links (#section) change only the hash, not the wouter location, so
// in-page smooth scrolling is unaffected.
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

export default function App() {
  return (
    <Router base={routerBase}>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={VantageSolutionsHome} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/peace-of-mind" component={PeaceOfMind} />
        <Route path="/our-work" component={OurWork} />
        <Route path="/local-growth" component={LocalGrowth} />
        <Route component={VantageSolutionsHome} />
      </Switch>
    </Router>
  );
}

