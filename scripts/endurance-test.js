import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL,COMMON_THRESHOLDS, HEADERS,TEST_PROFILES} from '../config/settings.js';

/**
 * ENDURANCE (SOAK) TEST
 * Objective: Check for resource leaks and performance degradation over long periods.
 *
 * Configuration notes:
 * - TARGET_BASE_URL should point to a stable environment (staging / pre-prod).
 * - API_TOKEN can be used to exercise authenticated endpoints over long durations.
 */

// const BASE_URL = __ENV.TARGET_BASE_URL || 'https://test.k6.io';
// const AUTH_TOKEN = __ENV.API_TOKEN; // Optional auth token

export const options = {
    // stages: [
    //     { duration: '2m', target: 100 },  // Ramp-up
    //     { duration: '2h', target: 100 },  // Maintain load for 2 hours
    //     { duration: '2m', target: 0 },    // Ramp-down
    // ]
    ...TEST_PROFILES.soak,
    thresholds: {
        // http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
        // http_req_failed: ['rate<0.01'],   // Error rate should be less than 1%
        ...COMMON_THRESHOLDS
    },
};

export default function () {
    // const headers = AUTH_TOKEN
    //     ? { Authorization: `Bearer ${AUTH_TOKEN}` }
    //     : {};

    const response = http.get(`${BASE_URL}/contacts.php`, { headers:HEADERS()});
    
    check(response, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(1);
    const isOk = check(response, {
        'status is 200': (r) => r.status === 200,
    });

    // If the check fails, log it to the console so you can see when the degradation started
    if (!isOk) {
        console.warn(`Request failed! Status: ${response.status} at ${new Date().toISOString()}`);
    }
}