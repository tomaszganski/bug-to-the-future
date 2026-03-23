const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/**
 * Loads gtag.js and configures GA4 when VITE_GA_MEASUREMENT_ID is set.
 * Uses send_page_view: false; call trackSectionView from the app for each step.
 */
export function initAnalytics() {
  if (!MEASUREMENT_ID) return;

  window.dataLayer = window.dataLayer || [];
  function gtag(...args) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/**
 * @param {string} section - survey step id (e.g. hero, preSurvey)
 */
export function trackSectionView(section) {
  if (!MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  const page_path = `/${section}`;

  window.gtag('event', 'page_view', {
    page_path,
    page_location: `${window.location.origin}${window.location.pathname}${window.location.search}#${page_path}`,
    page_title: section,
  });
}
