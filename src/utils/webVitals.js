/**
 * Core Web Vitals and Performance Monitoring Utilities
 * Tracks LCP (Largest Contentful Paint), FID (First Input Delay), and CLS (Cumulative Layout Shift)
 */

export function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    if ('PerformanceObserver' in window) {
      try {
        // Track Paint metrics (FP, FCP)
        const paintObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            onPerfEntry(entry);
          }
        });
        paintObserver.observe({ type: 'paint', buffered: true });

        // Track Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          onPerfEntry(lastEntry);
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        // Fallback for browsers that don't support specific observer types
        console.debug('Web Vitals observation not supported', e);
      }
    }
  }
}

export default reportWebVitals;
