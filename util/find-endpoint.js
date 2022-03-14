import sfiaToRich from "./train-endpoints/sfia-to-rich.js";
import sfiaToAntc from "./train-endpoints/sfia-to-antc.js";
import dublToDaly from "./train-endpoints/dubl-to-daly.js";
import beryToDaly from "./train-endpoints/bery-to-daly.js";
import beryToRich from "./train-endpoints/bery-to-rich.js";
import transferPoints from "./transfer-points.js";
// import sfOnlyStations from "./sf-only-stations.js";

// import getStationLine from "./get-station-line";
// import getStationLine from "./get-station-line";
// import handleTransferPoints from "./handle-transfer-points";

const findEndpoint = (direction, destination, possibleStationLineAbbr) => {
  // let sfoToRichLine = sfoToRich();
  // let possibleEndpoints = [
  //   sfiaToRich,
  //   sfiaToAntc,
  //   dublToDaly,
  //   beryToRich,
  //   beryToDaly,
  // ];
  // const [stations, stationLine] = getStationLine(
  //   direction,
  //   possibleStationLineAbbr
  // );
  // let transferPoints = transferPoints(); // returns an array of transfer points
  // let stationTransferPoints = transferPoints.filter((stationAbbr) =>
  //   stations.includes(stationAbbr)
  // );
  // // let sfOnlyStations = sfOnlyStations();
  // // look for endpoints that only contain the destination
  // for (let idx = 0; idx < stations.length; idx++) {
  //   if (stations[idx].includes(destination)) {
  //     return possibleStationLineAbbr;
  //   } else if (stationTransferPoints) {
  //     handleTransferPoints(
  //       direction,
  //       destination,
  //       stationTransferPoints,
  //       stationLine
  //     );
  //   }
  // }
};

// let endpoints = possibleEndpoints.filter((stationLine) => {
//   let stations = stationLine();
//   if (stations.includes(arrival) && stations.includes(possibleLinesAbbr)) {
//     return stationLine;
//   }
// });

// handle transfer points
/**
 * if destination is not in line check for transfer points
 * if there are transfer points, filter out endpoints array to return a new array
 * containing the other endpoints.
 * Iterate through the endpoints until you find a line that has both the transfer point
 * and the destination
 */

// need to check where they are departing from to choose the transfer point if arrival is not on line

// this can either return boolean or stationEndpointAbbr
export default findEndpoint;

/**
 
 let found = false;

  while (!found) {
    for (
      let stationEndpoints = 0;
      stationEndpoints < endpoints.length;
      stationEndpoints++
    ) {
      let stations = endpoints[stationEndpoints]();

      if (stations.includes(arrival) && stations.includes()) {
        // if stations includes arriving station return stationEndpointAbbr
        return stationEndpointAbbr;
      } else {
      }
    }
  }


 */

/*
  for (let idx = 0; idx < possibleEndpoints.length; idx++) {
    let stations = possibleEndpoints[idx]();

    if (
      stations.includes(possibleLinesAbbr[idx]) &&
      stations.includes(arrival)
    ) {
      return possibleStationLinesAbbr;
    } else if(){
      // check for transfer points

      let currentTransferPoints = stations.filter((station) =>
        transferPoints.includes(station)
      );

      possibleEndpointsCpy = [...possibleEndpoints];
      possibleEndpointsCpy = possibleEndpointsCpy.slice(
        idx + 1,
        possibleEndpoints.length
      );
    }else{

      // not found
      return false;
    }
  
  */
