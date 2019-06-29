'use strict';

const { load_config } = require('./helpers.js');

const { CONFIG, ERROR_MESSAGE_INVALID_INPUT, ERROR_MESSAGE_MAXIMUM_GUESTS_REACHED, ERROR_MESSAGE_MAXIMUM_ROOMS_REACHED, ERROR_MESSAGE_MORE_ADULTS_REQUIRED } = require('./constants.js');

/**
 * This function is used internally to validate book_minimum_rooms's inputs
 * it makes sure that all input params are integer and not greater than maximum allowed guests per booking
 * @param {integer} adults - number of adults for this booking
 * @param {integer} children - number of children for this booking
 * @param {integer} infants - number of infants for this booking
 */
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
        throw new Error(ERROR_MESSAGE_INVALID_INPUT);
    }

    
    let total_guests = adults + children + infants;
    if(CONFIG.maximumGuestsPerBookingExcludingInfants)
        total_guests = adults + children;

    if(total_guests > CONFIG.maximumGuestsPerBooking)
        throw new Error(ERROR_MESSAGE_MAXIMUM_GUESTS_REACHED);
}

/**
 * This function is the core function of this app, it implements my algorithm to solve the problem
 * as the following:
    
    While we have more guests let's do the following:
    
    1. if we have children or infats let's open a room and put as much as we can inside,
       we need to make sure that we have one adult also.
       if there is no more adults then we can't hanlde this booking (it is our hotels regulations)
    
    2.  after finishing all infants and children we check if we still have any adults
        if yes we try to fit them on the rooms that we booked already (CRITICAL TO GET MIN NO OF ROOMS)
        if we could, then we are good enough to return the result
        if not, we may keep booking new rooms until every adult has his room
        UNLESS we reach our maximum no of rooms per booking
 
 * @param {integer} adults - number of adults for this booking
 * @param {integer} children - number of children for this booking
 * @param {integer} infants - number of infants for this booking
 */
function book_minimum_rooms(adults, children, infants)
{   
    // 1st of all, let's validate input
    _validate_input(adults, children, infants);

    // if valid let's start our algorithm
    let rooms = [];
    while(adults > 0 || children > 0 || infants > 0)
    {
        // if we have children or infats let's open a room and put as much as we can inside
        if(children > 0 || infants > 0)
        {
            // we need to make sure that we have one adult also
            // if there is no more adults then we can hanlde this booking (it is our hotels regulations)
            if(adults <= 0)
            {
                throw new Error(ERROR_MESSAGE_MORE_ADULTS_REQUIRED);
            }

            // Opening new room to host rest of children & infants
            // if we still can do
            if(rooms.length >= CONFIG.maximumRoomsPerBooking)
            {
                throw new Error(ERROR_MESSAGE_MAXIMUM_ROOMS_REACHED);
            }

            let room = {
                adults: 0,
                children: 0,
                infants: 0
            };
            
            // at least one adult should be in this room for the time being
            room.adults++;
            adults--;

            // let's use this room's full capacity of children
            for(var i =0; i<CONFIG.maximumGuestsPerRoom.children; i++)
            {
                if(children <= 0)
                    break;

                room.children++;
                children--;
            }

            // let's use this room's full capacity of infants
            for(var i =0; i<CONFIG.maximumGuestsPerRoom.infants; i++)
            {
                if(infants <= 0)
                    break;

                room.infants++;
                infants--;
            }
            
            rooms.push(room);
        }

        // after finishing all infants and children we check if we still have any adults
        if(children <= 0 && infants <= 0 && adults > 0)
        {
            // if yes we try first to fit them on the rooms that we booked already (CRITICAL TO GET MIN NO OF ROOMS)
            for(var i in rooms)
            {
                if(rooms[i].adults < CONFIG.maximumGuestsPerRoom.adults)
                {
                    for(var j=0; j < (CONFIG.maximumGuestsPerRoom.adults - rooms[i].adults); j++)
                    {
                        if(adults <= 0)
                            break;
                        
                        rooms[i].adults++;
                        adults--;
                    }
                }

                // for better performance: no need to loop next room if we have no more adults
                if(adults <= 0)
                    break;
            }

            // if we could, then we are good enough to return the result
            // if not, we may keep booking new rooms until every adult has his room
            // UNLESS we reach our maximum no of rooms per booking
            if(adults > 0)
            {
                // Can we open new room?
                if(rooms.length >= CONFIG.maximumRoomsPerBooking)
                {
                    throw new Error(ERROR_MESSAGE_MAXIMUM_ROOMS_REACHED);
                }
                let room = {
                    adults: 0,
                    children: 0,
                    infants: 0
                };
                for(var i=0; i < CONFIG.maximumGuestsPerRoom.adults; i++)
                {
                    // for better performance: no need to loop next iteration if we have no more adults even if we still room in this room :)
                    if(adults <= 0)
                        break;
                    
                    room.adults++;
                    adults--;
                }

                rooms.push(room);
            }
        }

    }
    return rooms;
}

exports.book_minimum_rooms = book_minimum_rooms;