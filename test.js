const assert = require('assert');

const { load_config } = require('./helpers.js');

describe('Helper Functions', function() {
    describe('load_config()', function() {
        it('should return json object if called with correct file name located on the same folder', function() {
            assert.equal(typeof(load_config('config.json')), 'object');
        });
        it('should return fallback json object if called with wrong file name,', function() {
            assert.equal(typeof(load_config('wrong_config.json')), 'object');
        });
        it('should return an object contains maximumGuestsPerBooking attribute', function() {
            assert.equal(('maximumGuestsPerBooking' in load_config('config.json')), true);
        });
        it('should return an object contains maximumGuestsPerBookingExcludingInfants attribute', function() {
            assert.equal(('maximumGuestsPerBookingExcludingInfants' in load_config('config.json')), true);
        });
        it('should return an object contains maximumRoomsPerBooking attribute', function() {
            assert.equal(('maximumRoomsPerBooking' in load_config('config.json')), true);
        });
        it('should return an object contains maximumGuestsPerRoom attribute', function() {
            assert.equal(('maximumGuestsPerRoom' in load_config('config.json')), true);
        });
    });
});