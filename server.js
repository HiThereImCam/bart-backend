/*
    not gonna have bcrypt just yet
*/

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();


require('dotenv').config();
require('./routes')(app);
// require('./routes/api/all_routes');

// require('./routes');

const bartKey = process.env.BART_API_KEY;
const eventbriteKey = process.env.EVENTBRITE_PRIVATE_KEY;
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
})

app.get('/', (req,res) => {
    res.send(`Port ${port}`);
})

let config = {
    headers: {
        'Authorization': `Bearer ${eventbriteKey}`
    }
}

const getAllInfo = async (origin, destination) => {
    try{
        
        let routeRes = await axios.get(`http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${origin}&key=${bartKey}&json=y`)
        let fareRes = await axios.get( `http://api.bart.gov/api/sched.aspx?cmd=fare&orig=${origin}&dest=${destination}&date=today&key=${bartKey}&json=y` )
        let eventRes = await axios.get( `http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=${destination}&key=${bartKey}&json=y` )
                                   .then( async apiResponse => {
                                        let longLatData = manageLongLat( apiResponse );
                                        const { longitude, latitude } = longLatData;

                                        return await axios.get(`https://www.eventbriteapi.com/v3/events/search/?sort_by=best&location.latitude=${latitude}&location.longitude=${longitude}&include_adult_events=true`,
                                                config)
                                    })
        
        return {
            routeData: routeRes,
            fareData: fareRes,
            eventData: eventRes
        }
    }catch(e){
        console.log(`Error: ${e}`);
    }
};



/**
 * 
 * @param { object } routes 
 * @param { string } destination 
 * 
 * Checks if destination abbreviation is the same what is passed to it
 * Then parses station data to grab the first/second departures
 */
let manageRoutes = ( routes, destination ) => {
    const destinationData = routes.data.root.station[0];
    const dataUnavailable = "Data is unavailable at this time";
    let stationDepartures = {};

    for( let i = 0; i < destinationData.etd.length; i++){
        console.log("Abbr", destinationData.etd[i].abbreviation )
        if(destinationData.etd[i].abbreviation === destination){
            let stationEstimates = destinationData.etd[i].estimate;
            stationDepartures = {
                firstDeparture: stationEstimates[0].minutes,
                secondDeparture: stationEstimates[1] !== undefined ? stationEstimates[1].minutes : dataUnavailable 
            }
        } else return "Abbreviation does not match destination"
    }

    return stationDepartures;
}

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

/**
 * 
 * @param { object } longLat 
 * Parses out the longitude and latitude of the station destination
 * to be able to use with eventbrite and returns an object with
 * the longitude and latitude
 * 
 */
let manageLongLat = ( longLat ) => {
    let longData = longLat.data.root.stations.station.gtfs_longitude
    let latData = longLat.data.root.stations.station.gtfs_latitude

    return {
        longitude: longData,
        latitude: latData
    }
}

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


app.get('/route-submission', (req,res) => {

    const station = req.query.station;
    const destination = req.query.destination;

    /**
     * Goal is to pass departures, fares, and events in one JSON object 
     */
    
    getAllInfo(station, destination).then( apiResponse => {

        
        const { routeData, fareData, eventData } = apiResponse;
        
        let departures = manageRoutes( routeData, destination );
        let fares = manageFares( fareData );
        let events = manageEvents( eventData );

        let routesAndEvents = {
            departure: departures,
            fares: fares,
            events: events
        }

        res.send( routesAndEvents )
    })
})



