import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * SPIKE TEST
 * Objective: Evaluate system recovery after sudden extreme bursts of traffic.
 *
 * Configuration notes:
 * - TARGET_BASE_URL controls which system under test receives the spike traffic.
 * - API_TOKEN can be used for hitting protected endpoints.
 */

const BASE_URL = __ENV.TARGET_BASE_URL || 'https://test.k6.io';
const AUTH_TOKEN = __ENV.API_TOKEN; // Optional auth token

export const options = {
    stages: [
        { duration: '10s', target: 10 },   // Baseline
        { duration: '10s', target: 500 },  // Sudden spike to 500 users
        { duration: '1m', target: 500 },   // Sustain spike
        { duration: '10s', target: 10 },   // Quick ramp-down
    ],
};

export default function () {
    const headers = AUTH_TOKEN
        ? { Authorization: `Bearer ${AUTH_TOKEN}` }
        : {};

    const response = http.get(`${BASE_URL}/news.php`, { headers });
    
    check(response, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(1);
}