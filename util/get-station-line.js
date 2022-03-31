// import getDayAndTime from "./get-day-and-time";
// import mondayThruSaturdayLines from "./mon-thru-sat-til-evening-lines";
// import sundayAndEveningLines from "./sun-and-evening-lines.js";

// const getStationLine = (direction, lineAbbr = null, currLine = null) => {
//   const [day, hour] = getDayAndTime();

//   // 22 being 9pm
//   let possibleEndpoints =
//     day !== "Sunday" && hour < 22
//       ? mondayThruSaturdayLines()
//       : sundayAndEveningLines();

//   if (lineAbbr !== null) {
//     for (let idx = 0; idx < possibleEndpoints.length; idx++) {
//       let stations = possibleEndpoints[idx]();
//       let stationLine = possibleEndpoints(idx);
//       if (stationLine[direction].includes(lineAbbr)) {
//         return [stations, stationsLine];
//       }
//     }
//   }
// };

// export default getStationLine;

/**
 *
 * @param {array} path
 *
 * path is the array of stations
 *
 * what I want this function to accomplish
 *
 * 1.) find the correct starting line via the first station in path
 * 2.) check if there is a transferPoint within the line
 *        - if departure and destination are not within the same line
 *          then we know that useTransferPoint is true
 *
 *
 */

import getPossibleDestinations from "./api-calls/get-possible-destinations";

const getStationLine = (path) => {
  let useTransferPoint = false;
  let arrOfStationEndpoints = getPossibleDestinations(departure);
};

export default getStationLine;
