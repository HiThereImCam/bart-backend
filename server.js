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

const getStationInfo = async (origin, destination) => {
    try{
        // return response = await axios.get(
        //     `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${routes}&key=${bartKey}&json=y`);
        let routeRes = await axios.get(`http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${origin}&key=${bartKey}&json=y`)
        let fareRes = await axios.get( `http://api.bart.gov/api/sched.aspx?cmd=fare&orig=${origin}&dest=${destination}&date=today&key=${bartKey}&json=y` )
        let longlatRes = await axios.get( `http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=${destination}&key=${bartKey}&json=y` )
        
        return {
            routes: routeRes,
            fare: fareRes,
            longLat: longlatRes
            
        }
    }catch(e){
        console.log(`Error: ${e}`);
    }
};

let config = {
    headers: {
        'Authorization': `Bearer ${eventbriteKey}`
    }
}

//&start_date.keyword=tomorrow&date_modified.keyword=tomorrow&include_adult_events=true
//&location.within=5mi&location.latitude=37.7929&location.longitude=122.3969

const getEventInfo = async( longLat ) => {
    try{
        const { longitude, latitude  } = longLat;
        
        let eventRes = await 
                   axios.get(`https://www.eventbriteapi.com/v3/events/search/?sort_by=best&location.latitude=${latitude}&location.longitude=${longitude}&include_adult_events=true`, 
                              config
                   )
        
        return eventRes
    } catch(e){
        console.log(`Error: ${e}`);
    }
}

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

    let obj = [];
    
    /**
     * Parse events and give top 5 events
     * If the user wants to search for more,
     * then allow them to go to eventbrite.com
     * 
     */
    for( let i = 0; i < 5; i++){
        // let obj = [];
       obj.push({
           eventName: events[i].name,
           eventURL: events[i].url,
           eventLogo: events[i].logo.url
       })
    }
    
    // only one came back which shouldnt be a surprise
    return obj
}


app.get('/route-submission', (req,res) => {
    // console.log(req.body.station);
    const station = req.query.station;
    const destination = req.query.destination;

    let routesAndEvents = {};
    // let longLatData = [];


    getStationInfo(station, destination).then( apiResponse => {

        const { routes, fare, longLat } = apiResponse;
        let departures = manageRoutes( routes, destination );
        let fares = manageFares( fare );
        var longLatData = manageLongLat ( longLat );


        getEventInfo( longLatData ).then( apiResponse => {
            let eventData = apiResponse.data.events ;
            // res.send( apiResponse.data.events )
            let managedEvents = manageEvents( eventData );


            res.send( managedEvents )
            
        })

        // getEventInfo( longLatData ).then( apiResponse => {
        //     res.send( apiResponse.data )
        // })

        // this.getEventInfo(longLatData).bind(this);


        // longLatData.assign({
        //     longLat: longLat
        // })

        // this.getEventInfo(longitudeAndLatitute);
       
        // let test = {
        //     departures: departures,
        //     fares: fares
        // }

        // Object.assign(routesAndEvents, {
        //     departures: departures,
        //     fares: fares,
        //     // longLat: longitudeAndLatitute
        // })

        // Object.assign( routesAndEvents, test )

        // let departuresAndFares = {
        //     departures: departures,
        //     fares: fares
        // }
        // res.send(JSON.stringify(departuresAndFares))
    })

   
    // getEventInfo( destination ).then( apiResponse => {
    //     console.log("Here")
        // let events = apiResponse.data;

        // res.send( apiResponse.data );
        // routesAndEvents.push({
        //     events: apiResponse.data 
        // })

        // Object.assign( routesAndEvents, {
        //     longLat: events
        // })
    // })

    // console.log( routesAndEvents );
    // res.send( routesAndEvents  );
})



