import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL,COMMON_THRESHOLDS, HEADERS,TEST_PROFILES} from '../config/settings.js';

/**
 * LOAD TEST
 * Objective: Verify system performance under expected concurrent user load.
 *
 * Configuration notes:
 * - TARGET_BASE_URL can be provided via environment variable when running k6.
 * - Example: TARGET_BASE_URL=https://your-api.com k6 run scripts/load-test.js
 */

// const BASE_URL = __ENV.TARGET_BASE_URL || 'https://test.k6.io';
// const AUTH_TOKEN = __ENV.API_TOKEN; // Optional: use for authenticated endpoints

export const options = {
    // stages: [
    //     { duration: '1m', target: 50 }, // Ramp-up to 50 users
    //     { duration: '3m', target: 50 }, // Stay at 50 users
    //     { duration: '1m', target: 0 },  // Ramp-down to 0 users
    // ]
    ...TEST_PROFILES.load,
    thresholds: {
        // http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
        // http_req_failed: ['rate<0.01'],   // Error rate should be less than 1%
        ...COMMON_THRESHOLDS
    },
};

export default function () {
    // const headers = AUTH_TOKEN
        // ? { Authorization: `Bearer ${AUTH_TOKEN}` }
        // : {};

    const response = http.get(`${BASE_URL}/`, { headers:HEADERS()});

    check(response, {
        'status is 200': (r) => r.status === 200,
        'page contains welcome': (r) => r.body && r.body.includes('Collection of simple web-pages'),
    });

    sleep(1);
}