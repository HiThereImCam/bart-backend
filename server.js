/*
    not gonna have bcrypt just yet
*/

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');


require('dotenv').config();

const port = process.env.PORT || 5000;
// const bartKey = process.env.BART_API_KEY;
// const eventbriteKey = process.env.EVENTBRITE_PRIVATE_KEY;

app.use(cors());
// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
})

app.get('/', (req,res) => {
    res.send(`Port ${port}`);
})

var { getAllInfo } = require('./getAllInfo.js');
var { manageEvents } = require('./manageEvents.js');
var { manageFares } = require('./manageFares.js' )
var { manageRoutes } = require('./manageRoutes.js')

app.get('/route-submission', (req,res) => {

    /**
     *  departure = station you are departing from 
     *  arrival = station you are arriving at
     */
    const departure = req.query.departure; 
    const arrival = req.query.arrival;

    /**
     * Goal is to pass departures, fares, and events in one JSON object 
     */
    
    getAllInfo(departure, arrival).then( apiResponse => {

        // const { routeData, fareData, eventData } = apiResponse;

       const { routeData, fareData, eventData } = apiResponse;
    
    //    console.log("routeData", routeData )
    //    console.log("fareData", fareData)
        
        let departures = manageRoutes( routeData, arrival );
        let fares = manageFares( fareData );
        let events = manageEvents( eventData );

        let routesAndEvents = {
            departure: departures,
            fares: fares,
            events: events
        }

        res.send( JSON.stringify(routesAndEvents) )
    })
})
