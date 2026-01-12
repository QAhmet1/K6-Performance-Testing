// utils/validation.js
import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

/**
 * Common validations for API responses
 * @param {object} response - The k6 http response object
 */
    // Check for status 200
 export function validateResponse(response, options = { checkBody: false }) {
   try {
        expect(response.status, `Status ${response.status}`).to.equal(200);
        
        if (options.checkBody) {
            expect(response.body, 'Body not null').to.not.be.null;
        }
        return true; // Everything is fine
    } catch (err) {
        // We catch it here to return false, allowing the script to decide what to do
        return err.message; 
    }
}

