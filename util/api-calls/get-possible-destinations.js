import getStationEndpoints from "../get-station-endpoints.js";

const bartKey = process.env.BART_API_KEY;

const getPossibleDestinations = async (departure) => {
  let routeRes = await axios.get(
    `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${departure}&key=${bartKey}&json=y`
  ); // returns array of endpoint objects

  let arrOfEndpointObjs = routeRes.data.root.station[0].etd;
  let stationEndpoints = getStationEndpoints(arrOfEndpointObjs);

  return stationEndpoints;
};

export default getPossibleDestinations;
