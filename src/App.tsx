/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Step1 from './pages/Step1';
import Step3 from './pages/Step3';
import Step5 from './pages/Step5';
import Preview from './pages/Preview';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ScrollToTop from './ScrollToTop';
import { trackEvent } from './utils/analytics';

export default function App() {
  useEffect(() => {
    trackEvent('visit_site');
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create/step/1" element={<Step1 />} />
        <Route path="/create/step/2" element={<Step3 />} />
        <Route path="/create/step/3" element={<Step5 />} />
        <Route path="/create/step/4" element={<Preview />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}
