/**
 *
 * @param { object } routes
 * @param { string } arrival
 *
 * Checks if arrival abbreviation is the same what is passed to it
 * Then parses station data to grab the first/second departures
 */
let manageRoutes = (routes, arrival) => {
  const arrivalData = routes.data.root.station[0];

  const dataUnavailable = "Data unavailable";
  let stationDepartures = {};

  for (let i = 0; i < arrivalData.etd.length; i++) {
    console.log("arrival: ", arrivalData.etd[i].destination);
    console.log("abbr: ", arrivalData.etd[i].abbreviation);

    /**
     * Need to create a test case that if abbr != destination
     * then return error status of some kind
     */
    if (arrivalData.etd[i].abbreviation === arrival) {
      let stationEstimates = arrivalData.etd[i].estimate;
      console.log(arrivalData.etd[i]);
      stationDepartures = {
        firstDeparture: stationEstimates[0].minutes,
        secondDeparture:
          stationEstimates[1] !== undefined
            ? stationEstimates[1].minutes
            : dataUnavailable,
      };
    }
  }

  return stationDepartures;
};

module.exports.manageRoutes = manageRoutes;
