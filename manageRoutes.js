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
        
        console.log("destination: ", destination);
        console.log("abbr: ", destinationData.etd[i].abbreviation);

        /**
         * Need to create a test case that if abbr != destination
         * then return error status of some kind
         */
        if(destinationData.etd[i].abbreviation === destination){
            let stationEstimates = destinationData.etd[i].estimate;

            stationDepartures = {
                firstDeparture: stationEstimates[0].minutes,
                secondDeparture: stationEstimates[1] !== undefined ? stationEstimates[1].minutes : dataUnavailable 
            }
        }
    }

    console.log("Station Departures: ", stationDepartures)
    return stationDepartures;
}

module.exports.manageRoutes = manageRoutes;