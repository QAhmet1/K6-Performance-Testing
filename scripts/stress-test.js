import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL,COMMON_THRESHOLDS, HEADERS,TEST_PROFILES} from '../config/settings.js';
import {describe} from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js'
import {validationResponse} from '../utils/validation.js'

/**
 * STRESS TEST
 * Objective: Determine the system's maximum capacity and stability limits.
 *
 * Configuration notes:
 * - TARGET_BASE_URL can be provided via environment variable when running k6.
 * - API_TOKEN can be used for authenticated endpoints.
 */

export const options = {
  
    ...TEST_PROFILES.stress,
    thresholds: {
        ...COMMON_THRESHOLDS
    },
};

export default function () {
    describe('Stress Testing PI Endpoint',()=>{
        const response = http.get(`${BASE_URL}/pi.php?decimals=3`, { 
            headers:HEADERS() 
        });
    
    validationResponse(response)

    sleep(1);

    })
    
}