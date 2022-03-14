import sfiaToAntc from "./train-endpoints/sfia-to-antc.js";
import dublToDaly from "./train-endpoints/dubl-to-daly.js";
import beryToRich from "./train-endpoints/bery-to-rich.js";

/**
 * Lines that are operational Sundays and after 6pm on
 *
 * @returns [station lines]
 *
 */

const sundayAndEveningLines = () => {
  return [sfiaToAntc, dublToDaly, beryToRich];
};

export default sundayAndEveningLines;
