declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

export const GA_TRACKING_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const trackEvent = (
    action: string,
    category?: string,
    label?: string,
    value?: number
) => {
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};
