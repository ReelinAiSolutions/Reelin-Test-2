export interface PageHealth {
    score: number;
    issues: string[];
}

export const analyzePage = (): PageHealth => {
    const issues: string[] = [];
    let score = 100;

    // Check H1
    const h1 = document.querySelector('h1');
    if (!h1) {
        score -= 20;
        issues.push('Missing H1 heading');
    } else if (h1.innerText.length < 10) {
        score -= 10;
        issues.push('H1 heading is too short');
    }

    // Check Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        score -= 20;
        issues.push('Missing meta description');
    }

    // Check Images Alt
    const images = document.querySelectorAll('img');
    let missingAlt = 0;
    images.forEach(img => {
        if (!img.alt) missingAlt++;
    });
    if (missingAlt > 0) {
        score -= 5 * missingAlt;
        issues.push(`${missingAlt} images missing alt text`);
    }

    // Check CTAs (Button visibility)
    const buttons = document.querySelectorAll('button, a[class*="btn"], a[class*="button"]');
    if (buttons.length === 0) {
        score -= 15;
        issues.push('No call-to-action (CTA) buttons found');
    }

    return {
        score: Math.max(0, score),
        issues
    };
};

export const trackScrollDepth = (callback: (depth: number) => void) => {
    let maxDepth = 0;

    const handleScroll = () => {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;

        if (scrollTotal <= 0) return;

        const percentage = Math.round((currentScroll / scrollTotal) * 100);

        if (percentage > maxDepth) {
            maxDepth = percentage;
            callback(maxDepth);
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
};
