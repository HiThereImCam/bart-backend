/**
 * 
 * @param {*} events 
 * 
 * Manage events grabs all of the events that are in the radius of the destination
 * Then it parses it out to the top 5 events and wraps it into an array of objects
 * 
 */

let manageEvents = ( events ) => {
    let eventData = events.data.events;
    let obj = [];
    
    /**
     * Parse events and give top 5 events
     * If the user wants to search for more,
     * then allow them to go to eventbrite.com
     * 
     */
    for( let i = 0; i < 5; i++){
       obj.push({
           eventName: eventData[i].name,
           eventURL: eventData[i].url,
           eventLogo: eventData[i].logo.url
       })
    }
    
    return obj
}

module.exports.manageEvents = manageEvents;