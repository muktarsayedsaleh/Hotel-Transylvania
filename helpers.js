'use strict';

/**
 * This function loads a content of .json configuration file and returns it as an object
 * @param {string} json_file_name - file name and extension of the json file, ex: config.json
 */
function load_config(config_file_path)
{
    const fs = require('fs');
    let config = null;
    try{
        // read configuration from file path
        let config_file = fs.readFileSync(config_file_path);
        config = JSON.parse(config_file);
    }
    catch(error) {
        // if configuration file is missing
        // or not accessable for some reason
        // we fallback to hardcoded json object
        config = {
            "maximumGuestsPerBooking": 7,
            "maximumGuestsPerBookingExcludingInfants": true,
            "maximumRoomsPerBooking": 3,
            "maximumGuestsPerRoom": {
                "adults": 3,
                "children": 3,
                "infants": 3
            }
        };
    }

    return config;
}

exports.load_config = load_config;