import { useEffect } from 'react';

interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
}

const CoreWebVitals = () => {
  useEffect(() => {
    // Dynamically import web-vitals to avoid bundling in production
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      const sendToAnalytics = (metric: WebVitalMetric) => {
        // Send to Google Analytics if available
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', metric.name, {
            event_category: 'Web Vitals',
            event_label: metric.id,
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            non_interaction: true,
          });
        }

        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`${metric.name}: ${metric.value}`, metric);
        }
      };

      // Track Core Web Vitals
      onCLS(sendToAnalytics);
      onINP(sendToAnalytics);
      onFCP(sendToAnalytics);
      onLCP(sendToAnalytics);
      onTTFB(sendToAnalytics);
    });
  }, []);

  return null;
};

export default CoreWebVitals;