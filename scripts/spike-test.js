import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL,COMMON_THRESHOLDS, HEADERS,TEST_PROFILES} from '../config/settings.js';
import {describe} from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js'
import {validateResponse} from '../utils/validation.js'



/**
 * SPIKE TEST
 * Objective: Evaluate system recovery after sudden extreme bursts of traffic.
 *
 */


export const options = {
    ...TEST_PROFILES.spike,
    thresholds: {
        ...COMMON_THRESHOLDS
    },
};

export default function () {
// Grouping the spike test execution for clear reporting
    describe('Spike Testing News Endpoint', () => {
        
        // Simulating a request to a content-heavy news page
        const response = http.get(`${BASE_URL}/news.php`, { headers: HEADERS() });

        /**
         * Centralized Validation:
         * We use the global utility to verify the technical integrity of the response.
         * For spike tests, we usually keep checkBody false to reduce CPU overhead 
         * during the extreme traffic peaks.
         */
        const validationResult = validateResponse(response);

        // If validation fails during the spike, log the exact error and time
        if (validationResult !== true) {
            /**
             * Logging during a Spike Test is vital to identify 
             * if the system recovers after the traffic burst subsides.
             */
            console.warn(`[SPIKE TEST ALERT] Failure: ${validationResult} at ${new Date().toISOString()}`);
            
            // Mark the check as failed for k6 metrics
            check(response, { "spike validation passed": () => false });
        }
    });

    // Short sleep to maintain the defined throughput
    sleep(1);
}