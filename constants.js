const { load_config } = require('./helpers.js');

const CONFIG = load_config('config.json');

const ERROR_MESSAGE_MAXIMUM_ROOMS_REACHED = 'Booking rejected, Our hotel regulations don\'t allow more than ' + CONFIG.maximumRoomsPerBooking + ' rooms in a single booking';
const ERROR_MESSAGE_MAXIMUM_GUESTS_REACHED = 'Booking rejected, Our hotel regulations don\'t allow more than ' + CONFIG.maximumGuestsPerRoom + ' guests in a single booking';
const ERROR_MESSAGE_MORE_ADULTS_REQUIRED = 'Booking rejected, Our hotel regulations requires at least one adult to be in each room that has children or infant';
const ERROR_MESSAGE_INVALID_INPUT = 'Invalid input, All input parameters should be integers';


exports.CONFIG = CONFIG
exports.ERROR_MESSAGE_MAXIMUM_ROOMS_REACHED = ERROR_MESSAGE_MAXIMUM_ROOMS_REACHED
exports.ERROR_MESSAGE_MAXIMUM_GUESTS_REACHED = ERROR_MESSAGE_MAXIMUM_GUESTS_REACHED
exports.ERROR_MESSAGE_MORE_ADULTS_REQUIRED = ERROR_MESSAGE_MORE_ADULTS_REQUIRED
exports.ERROR_MESSAGE_INVALID_INPUT = ERROR_MESSAGE_INVALID_INPUT