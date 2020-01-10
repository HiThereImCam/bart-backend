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

app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
})

app.get('/', (req,res) => {
    res.send(`Port ${port}`);
})

var { getAllInfo } = require('./Bart_Eventbrite_Logic/getAllInfo.js');
var { manageEvents } = require('./Bart_Eventbrite_Logic/manageEvents.js');
var { manageFares } = require('./Bart_Eventbrite_Logic/manageFares.js' )
var { manageRoutes } = require('./Bart_Eventbrite_Logic/manageRoutes.js')

app.get('/route-submission', (req,res) => {

    /**
     *  departure = station you are departing from 
     *  arrival = station you are arriving at
     */
    const departure = req.query.departure; 
    const arrival = req.query.arrival;

    /** 
     * This grabs all of the necessary info - routes, ticket price, and events
     * and wraps them all in a single object to pass to the front end.
     */
    getAllInfo(departure, arrival).then( apiResponse => {

        const { routeData, fareData, eventData } = apiResponse;
    
        
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
