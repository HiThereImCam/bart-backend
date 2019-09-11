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
const eventbriteKey = process.env.EVENTBRITE_API_KEY;
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

let manageRoutes = ( routes, destination ) => {
    const destinationData = routes.data.root.station[0];
    const dataUnavailable = "Data is unavailable at this time";
    let stationDepartures = {};

    for( let i = 0; i < destinationData.etd.length; i++){
        if(destinationData.etd[i].abbreviation === destination){
            let stationEstimates = destinationData.etd[i].estimate;
            stationDepartures = {
                firstArrival: stationEstimates[0].minutes,
                secondArrival: stationEstimates[1] !== undefined ? stationEstimates[1].minutes : dataUnavailable 
            }
        }
    }

    return stationDepartures;
}

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


app.get('/route-submission', (req,res) => {
    // console.log(req.body.station);
    const station = req.query.station;
    const destination = req.query.destination;
    console.log(station);

    getStationInfo(station, destination).then( apiResponse => {

        const { routes, fare, longLat } = apiResponse;
        let departures = manageRoutes( routes, destination );
        let fares = manageFares( fare )

        let departuresAndFares = {
            departures: departures,
            fares: fares
        }
        res.send(JSON.stringify(departuresAndFares))
    })


})


