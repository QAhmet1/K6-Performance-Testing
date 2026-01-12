// utils/validation.js
import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

/**
 * Common validations for API responses
 * @param {object} response - The k6 http response object
 */
    // Check for status 200
 export function validateResponse(response, options = { checkBody: false }) {
    // 1. Mandatory Technical Check (Status Code)
    expect(response.status, `Expected 200 but got ${response.status}`).to.equal(200);
    
    // 2. Conditional Business Logic Check (Body)
    // Only check body if requested, to save CPU during high-load stress tests
    if (options.checkBody) {
        expect(response.body, 'Response body should not be empty').to.not.be.null;
    }
}
