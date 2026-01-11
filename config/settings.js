/**
 * Global configurations for k6 performance tests.
 * Comments are in English as per your preference.
 */

// 1. Base URL management
export const BASE_URL = __ENV.TARGET_BASE_URL || 'https://test.k6.io';

// 1. Centralized Test Profiles (Options)
export const TEST_PROFILES = {
    load: {
        stages: [
            { duration: '1m', target: 50 },
            { duration: '3m', target: 50 },
            { duration: '1m', target: 0 },
        ],
    },
    stress: {
        stages: [
            { duration: '2m', target: 100 },
            { duration: '5m', target: 100 },
            { duration: '2m', target: 200 },
            { duration: '5m', target: 200 },
            { duration: '2m', target: 0 },
        ],
    },
    soak: {
        stages: [
            { duration: '2m', target: 100 },
            { duration: '2h', target: 100 },
            { duration: '2m', target: 0 },
        ],
    },
     spike: {
        stages: [
            { duration: '10s', target: 10 },   // Baseline
            { duration: '10s', target: 500 },  // Sudden spike to 500 users
            { duration: '1m', target: 500 },   // Sustain spike
            { duration: '10s', target: 10 },   // Quick ramp-down
        ],
    },
};

// 2. Shared Thresholds (Best practice for consistent reporting)
export const COMMON_THRESHOLDS = {
    'http_req_failed': ['rate<0.01'], // Fail if errors > 1%
    'http_req_duration': ['p(95)<500'], // 95% of requests must be under 500ms
};

// 3. Dynamic Headers
export const HEADERS = (token = __ENV.API_TOKEN) => ({
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
});