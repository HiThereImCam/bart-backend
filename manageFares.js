/**
 * 
 * @param { object } fare 
 * Parses the fare response and then returns an object
 * with Clipper and Bart Ticket data
 */

let manageFares = ( fare ) => {
    const fareData = fare.data.root.fares.fare;
    let allFareData = {
        clipper:{
            name: fareData[0]['@name'],
            amount: fareData[0]['@amount']
        },
        ticket:{
            name: fareData[1]['@name'],
            amount: fareData[1]['@amount']
        },
        senior:{
            name: fareData[2]['@name'],
            amount: fareData[2]['@amount']
        },
        youth:{
            name: fareData[3]['@name'],
            amount: fareData[3]['@amount']
        },
    };
    
    return allFareData;
}

module.exports.manageFares = manageFares;