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

import sfiaToRich from "./train-endpoints/sfia-to-rich.js";
import sfiaToAntc from "./train-endpoints/sfia-to-antc.js";
import dublToDaly from "./train-endpoints/dubl-to-daly.js";
import beryToDaly from "./train-endpoints/bery-to-daly.js";
import beryToRich from "./train-endpoints/bery-to-rich.js";

const handleTransferPoints = (arrival, possibleEndpoints) => {
  // if found what do I return?
  // you return if powell to beryessa, I need to return
  // "BERY" -> not currently in the array of endpoints
};

export default handleTransferPoints;
