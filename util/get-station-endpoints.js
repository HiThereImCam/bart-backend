/**
 *
 * @param {array of objects} arrOfStationEndpointObj
 *
 * iterate through array of station endpoint objects
 * returns array of station endpoints
 * each endpoint represents the final destination
 *
 */

const getStationEndpoints = (arrOfStationEndpointObj) => {
  let stationEndpoints = arrOfStationEndpointObj.map(
    (stationEndpointObj) => stationEndpointObj.destination
  );

  return stationEndpoints;
};

export default getStationEndpoints;
