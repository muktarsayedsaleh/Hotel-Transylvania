const assert = require('assert');

const { load_config } = require('./helpers.js');
const { book_minimum_rooms } = require('./app.js');

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


describe('Booking function', function() {
    describe('book_minimum_rooms()', function() {
        it('should throw an Error if one or more param is not a number', function() {
            assert.throws(()=>book_minimum_rooms(1, 2, 'string'), Error);
            assert.throws(()=>book_minimum_rooms(1, 'string', 2), Error);
            assert.throws(()=>book_minimum_rooms('string', 1, 2), Error);
            assert.throws(()=>book_minimum_rooms(1.2, 1, 2), Error);
            assert.throws(()=>book_minimum_rooms(1, 1.2, 2), Error);
            assert.throws(()=>book_minimum_rooms(1, 2, 1.2), Error);
        });
        it('should throw an Error if total of adults and children is grater than allowed', function() {
            assert.throws(()=>book_minimum_rooms(12, 12, 1), Error);
        });
        it('should return a list of rooms if called correctly (I am thinking of list here so we can tell not only how many rooms we need(rooms.length), but also we can tell in details how many adults, children and infants are on each room)', function() {
        });
        it('should return 2 (a list two rooms) as a result for the given example in the question: For 3 Adults, 4 Children and 2 infants can be fit in 2 rooms and not 3.', function() {
        });
    });
});