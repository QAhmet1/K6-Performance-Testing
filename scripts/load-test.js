import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL,COMMON_THRESHOLDS, HEADERS,TEST_PROFILES} from '../config/settings.js';
import {describe} from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js'
import {validateResponse} from '../utils/validation.js'


/**
 * LOAD TEST
 * Objective: Verify system performance under expected concurrent user load.
 *
 */

export const options = {
    ...TEST_PROFILES.load,
    thresholds: {
        ...COMMON_THRESHOLDS
    },
};

export default function () {
// Grouping the execution for better reporting and organization
    describe('Load Testing Homepage', () => {
        
        // Performing the GET request with centralized headers
        const response = http.get(`${BASE_URL}/`, { 
            headers: HEADERS() 
        });

        /**
         * Centralized Validation:
         * We pass 'checkBody: true' here because the homepage test 
         * specifically requires verifying the content string.
         */
        const validationResult = validateResponse(response);

        // Handling validation results and logging errors with timestamps
        if (validationResult !== true) {
            console.warn(`[LOAD TEST FAILURE] Detail: ${validationResult} at ${new Date().toISOString()}`);
            
            // Explicitly fail the k6 check to ensure metrics reflect the error
            check(response, { "homepage validation passed": () => false });
        }

    });

    // Pacing the requests to simulate real user behavior
    sleep(1);
}