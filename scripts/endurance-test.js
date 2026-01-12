import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL,COMMON_THRESHOLDS, HEADERS,TEST_PROFILES} from '../config/settings.js';
import {describe} from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js'
import {validateResponse} from '../utils/validation.js'


/**
 * ENDURANCE (SOAK) TEST
 * Objective: Check for resource leaks and performance degradation over long periods.
 *
 */

export const options = {

    ...TEST_PROFILES.soak,
    thresholds: {
        ...COMMON_THRESHOLDS
    },
};

export default function () {

describe('Endurance Testing contacts endpoint',() => {
    const response = http.get(`${BASE_URL}/contacts.php`, { headers:HEADERS()});
    
    const validationResult = validateResponse(response);
        // If validationResult is not 'true', it contains the error message string
        if (validationResult !== true) {
            console.warn(`[ALERT] Failure: ${validationResult} at ${new Date().toISOString()}`);
            /** * Manual Check Trigger:
             * Since we caught the error in our utility, we manually trigger a 
             * failed check to ensure k6 metrics and thresholds reflect the failure.
             */
            check(response, { "global validation passed": () => false });
        }

})
    
}