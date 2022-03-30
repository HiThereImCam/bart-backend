/*
    not gonna have bcrypt just yet
*/

// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// const app = express();
// const bodyParser = require("body-parser");
import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";
import bodyParser from "body-parser";

import getAllInfo from "./Bart_Eventbrite_Logic/getAllInfo.js";
import manageEvents from "./Bart_Eventbrite_Logic/manageEvents.js";
import manageFares from "./Bart_Eventbrite_Logic/manageFares.js";
import manageRoutes from "./Bart_Eventbrite_Logic/manageRoutes.js";

const app = express();

// require("dotenv").config();
const bartKey = process.env.BART_API_KEY;

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send(`Port ${port}`);
});

// var { getAllInfo } = require("./Bart_Eventbrite_Logic/getAllInfo.js");
// var { manageEvents } = require("./Bart_Eventbrite_Logic/manageEvents.js");
// var { manageFares } = require("./Bart_Eventbrite_Logic/manageFares.js");
// var { manageRoutes } = require("./Bart_Eventbrite_Logic/manageRoutes.js");

/**
 * On start you are now receiving station data
 * which means that when you get the long/lat
 * you can just parse through the original call
 * save it in a temp variable and pass it to the long/lat func
 */

app.get("/route-submission", (req, res) => {
  /**
   *  departure = station you are departing from
   *  arrival = station you are arriving at
   */

  const departure = req.query.departure;
  const arrival = req.query.arrival;

  console.log(`Departure: ${departure} 
    Arrival: ${arrival}`);

  /**
   * This grabs all of the necessary info - routes, ticket price, and events
   * and wraps them all in a single object to pass to the front end.
   */
  getAllInfo(departure, arrival).then((apiResponse) => {
    // eventData
    const { routeData, fareData } = apiResponse;

    let departures = manageRoutes(routeData, arrival);
    let fares = manageFares(fareData);
    // let events = manageEvents( eventData );

    let routesAndEvents = {
      departure: departures,
      fares: fares,
      // events: events
    };

    res.send(JSON.stringify(routesAndEvents));
    console.log("Route submissions sent");
  });
});

app.get("/getStations", async (req, res) => {
  try {
    const stationRes = await axios.get(
      `http://api.bart.gov/api/stn.aspx?cmd=stns&key=${bartKey}&json=y`
    );
    const stationObj = stationRes.data.root.stations.station;

    /**
     * Need to figure out what I want to do with the additional
     * data that comes with stationObj
     */

    const stationNames = stationObj.map((names, abbr) => {
      return {
        name: names.name.toLowerCase(),
        abbr: names.abbr.toLowerCase(),
      };
    });

    res.send(JSON.stringify(stationNames));
    console.log("Sent");
  } catch (e) {
    console.log("Error: ", e);
  }
});





/*
  CV => Hayw
    Node    vistedQueue  UnvisitedQueue Sum
    CV       []           [WDUB, BayF]   0
    WDUB     [CV]         [BayF, Dub]    ?
    BayF     [CV, WDUB]   [DUB]
  
  [CV, WDUB, BAYF]
  return visited queue?

  if 

*/