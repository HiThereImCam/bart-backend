const bartKey = process.env.BART_API_KEY;
const eventbriteKey = process.env.EVENTBRITE_PRIVATE_KEY;

const axios = require("axios");
let { manageLongLat } = require("./manageLongLat.js");

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

    console.log("routeRes stations: ", routeRes.data.root.station[0].etd);
    console.log("fareRes data: ", fareRes.data);

    // NEED isEndpoint function that returns a boolean to check if station
    // is endpoint
    return {
      routeData: routeRes,
      fareData: fareRes,
      // eventData: eventRes
    };
  } catch (e) {
    console.log(`getAllInfo: ${e.message}`);
  }
};

module.exports.getAllInfo = getAllInfo;
