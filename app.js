'use strict';

const { load_config } = require('./helpers.js');

const CONFIG = load_config('config.json');

function _validate_input(adults, children, infants)
{
    if(
        isNaN(adults) ||  // validating it is number
        isNaN(children) || 
        isNaN(infants) ||
        adults !== parseInt(adults, 10) ||  // validating it is an interger
        children !== parseInt(children, 10) ||
        infants !== parseInt(infants, 10)
    )
    {
        throw new Error('Invalid input, All input parameters should be integers');
    }

    
    let total_guests = adults + children + infants;
    if(CONFIG.maximumGuestsPerBookingExcludingInfants)
        total_guests = adults + children;

    if(total_guests > CONFIG.maximumGuestsPerBooking)
        throw new Error('Booking rejected, Our hotel regulations don\'t allow more than ' + CONFIG.maximumGuestsPerRoom + ' guests in a single booking');
}


function book_minimum_rooms(adults, children, infants)
{   
    // 1st of all, let's validate input
    _validate_input(adults, children, infants);

    // if valid let's start our algorithm
    let rooms = [];
    return rooms;
}

exports.book_minimum_rooms = book_minimum_rooms;