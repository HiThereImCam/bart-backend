/**
 * Monday thru Saturday lines that are operational til 6pm
 */

import sfiaToRich from "./train-endpoints/sfia-to-rich.js";
import sfiaToAntc from "./train-endpoints/sfia-to-antc.js";
import dublToDaly from "./train-endpoints/dubl-to-daly.js";
import beryToDaly from "./train-endpoints/bery-to-daly.js";
import beryToRich from "./train-endpoints/bery-to-rich.js";

const mondayThruSaturdayLines = () => {
  return [sfiaToRich, sfiaToAntc, dublToDaly, beryToRich, beryToDaly];
};

export default mondayThruSaturdayLines;
