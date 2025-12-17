import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * STRESS TEST
 * Objective: Determine the system's maximum capacity and stability limits.
 *
 * Configuration notes:
 * - TARGET_BASE_URL can be provided via environment variable when running k6.
 * - API_TOKEN can be used for authenticated endpoints.
 */

const BASE_URL = __ENV.TARGET_BASE_URL || 'https://test.k6.io';
const AUTH_TOKEN = __ENV.API_TOKEN; // Optional auth token

export const options = {
    stages: [
        { duration: '2m', target: 100 }, // Below normal load
        { duration: '2m', target: 200 }, // Normal load
        { duration: '2m', target: 300 }, // Breaking point approach
        { duration: '2m', target: 400 }, // Beyond expected capacity
        { duration: '2m', target: 0 },   // Recovery phase
    ],
};

export default function () {
    const headers = AUTH_TOKEN
        ? { Authorization: `Bearer ${AUTH_TOKEN}` }
        : {};

    // Example heavy endpoint using the base URL
    const response = http.get(`${BASE_URL}/pi.php?decimals=3`, { headers });
    
    check(response, {
        'is status 200': (r) => r.status === 200,
    });

    sleep(1);
}