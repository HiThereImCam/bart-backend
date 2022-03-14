/**
 * takes an array of possible station lines
 *
 * meaning that I have to import every station line
 *
 * edge case
 * 1.) how do i deal with stations that are in between two
 * transfer points
 *
 * 2.)
 *
 *
 */

// needs the possibleEndpoints, destination

// import sfiaToRich from "./train-endpoints/sfia-to-rich.js";
// import sfiaToAntc from "./train-endpoints/sfia-to-antc.js";
// import dublToDaly from "./train-endpoints/dubl-to-daly.js";
// import beryToDaly from "./train-endpoints/bery-to-daly.js";
// import beryToRich from "./train-endpoints/bery-to-rich.js";

const handleTransferPoints = (direction, destination, transferPoints) => {
  // if found what do I return?
  // you return if powell to beryessa, I need to return
  // "BERY" -> not currently in the array of endpoints

  // needs to handle the day and time to pick the right lines
  // so that it does not have to look through every line

  // 22 being 9pm

  for (
    let stationLine = 0;
    stationLine < possibleTransferLines.length;
    stationLine++
  ) {
    let stationLineObj = possibleTransferLines[stationLine]();
    let stationLine = stationLineObj[direction];

    for (
      let tranferPoint = 0;
      transferPoint < transferPoints.length;
      transferPoint++
    ) {
      if (
        stationLine.includes(destination) &&
        stationLine.includes(transferPoints[transferPoint])
      ) {
        // return abbr of line
      }
    }
  }
};

export default handleTransferPoints;

//   let lineToTransferTo = possiblelinesToTransferTo(line => {
//       let stationLineObj = line()
//       let stationLine = stationLineObj[direction]

//       if(stationLine.includes(destination)){

//       }

//     })
