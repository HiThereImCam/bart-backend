// import findEndpoint from "../util/findEndpoint";

import axios from "axios";
import findEndpoint from "../util/find-endpoint.js";
import manageLongLat from "./manageLongLat.js";
import sfiaToRich from "../util/train-endpoints/sfia-to-rich.js";
import sfiaToAntc from "../util/train-endpoints/sfia-to-antc.js";
import dublToDaly from "../util/train-endpoints/dubl-to-daly.js";
import beryToDaly from "../util/train-endpoints/bery-to-daly.js";
import beryToRich from "../util/train-endpoints/bery-to-rich.js";
import Graph from "../Graph/graph.js";

// require("dotenv").config();

const bartKey = process.env.BART_API_KEY;
const eventbriteKey = process.env.EVENTBRITE_PRIVATE_KEY;

// const axios = require("axios");

// const findEndpoint = require("../util/findEndpoint");
// let { manageLongLat } = require("./manageLongLat.js");

let config = {
  headers: {
    Authorization: `Bearer ${eventbriteKey}`,
  },
};

/**
 *
 * @param {*} departure
 * @param {*} arrival
 *
 * By passing in the (departure, arrival), I am able to make API calls to Bart and Eventbrite
 * These calls get- route information, fare information, and event information
 */

const getAllInfo = async (departure, arrival) => {
  try {
    console.log("depart", departure);
    console.log("arrival", arrival);

    let routeRes = await axios.get(
      `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${departure}&key=${bartKey}&json=y`
    );
    let fareRes = await axios.get(
      `http://api.bart.gov/api/sched.aspx?cmd=fare&orig=${departure}&dest=${arrival}&date=today&key=${bartKey}&json=y`
    );

    let graph = new Graph();

    let stationLines = [
      sfiaToRich,
      sfiaToAntc,
      dublToDaly,
      beryToDaly,
      beryToRich,
    ];

    stationLines.forEach((stationLine) => {
      let currentLine = stationLine();
      for (
        let currentStation = 0, nextStation = currentStation + 1;
        nextStation < currentLine.length;
        currentStation++, nextStation++
      ) {
        graph.addEdge(currentLine[currentStation], currentLine[nextStation], 1);
      }
    });

    // graph.addEdge("HAYW", "SHAY");

    console.log("Graph: ", graph);
    console.log("hayward: ", graph.nodes.get("HAYW"));
    console.log("bayfair adjacents: ", graph.nodes.get("BAYF").adjacents);

    return {
      routeData: routeRes,
      fareData: fareRes,
      // eventData: eventRes
    };
  } catch (e) {
    console.log(`getAllInfo: ${e.message}`);
  }
};

// module.exports.getAllInfo = getAllInfo;

export default getAllInfo;

// console.log("fareRes data: ", fareRes.data);

// let stationResInfo = {};

// let stationObjects = routeRes.data.root.station[0].etd;
// stationObjects.forEach((station) => {
//   stationResInfo[station.abbreviation] = station;
// });
// // let possibleLinesAbbr = stationObjects.map(
// //   (station) => station.abbreviation
// // );

// console.log("stationResInfo: ", stationInfoRes);

// let getEndpoint = findEndpoint(departure, arrival);

// NEED isEndpoint function that returns a boolean to check if station
// is endpoint

// let eventRes = await axios.get( `http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=${arrival}&key=${bartKey}&json=y` )
//                            .then( async apiResponse => {
//                                 let longLatData = manageLongLat( apiResponse );
//                                 const { longitude, latitude } = longLatData;

//                                 console.log(longLatData)
//                                 try{
//                                     return await axios.get(`https://www.eventbriteapi.com/v3/events/search/?sort_by=best&location.latitude=${latitude}&location.longitude=${longitude}&include_adult_events=true`,
//                                     config)
//                                 }catch(e){
//                                     return {
//                                         message: "Unable to receive events. If covid, then there are no events. Else check logs"
//                                     }
//                                 }

//                             })

// console.log("routeRes stations: ", routeRes.data.root.station[0].etd);
// console.log(
//   "first destination: ",
//   routeRes.data.root.station[0].etd[0].destination
// );
// console.log(
//   "first estimates: ",
//   routeRes.data.root.station[0].etd[0].estimate
// );

// console.log(
//   "second destination: ",
//   routeRes.data.root.station[0].etd[1].destination
// );
// console.log(
//   "second estimates: ",
//   routeRes.data.root.station[0].etd[1].estimate
// );
