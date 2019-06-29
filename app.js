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
    while(adults > 0 || children > 0 || infants > 0)
    {
        // if we have children or infats let's open a room and put as much as we can inside
        if(children > 0 || infants > 0)
        {
            // we need to make sure that we have one adult also
            // if there is no more adults then we can hanlde this booking (it is our hotels regulations)
            if(adults <= 0)
            {
                throw new Error('Booking rejected, Our hotel regulations requires at least one adult to be in each room that has children or infant');
            }

            // Opening new room to host rest of children & infants
            // if we still can do
            if(rooms.length >= CONFIG.maximumRoomsPerBooking)
            {
                throw new Error('Booking rejected, Our hotel regulations don\'t allow more than ' + CONFIG.maximumRoomsPerBooking + ' rooms in a single booking');
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
                    throw new Error('Booking rejected, Our hotel regulations don\'t allow more than ' + CONFIG.maximumRoomsPerBooking + ' rooms in a single booking');
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