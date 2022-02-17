import sfiaToRich from "./train-endpoints/sfia-to-rich.js";
import sfiaToAntc from "./train-endpoints/sfia-to-antc.js";
import dublToDaly from "./train-endpoints/dubl-to-daly.js";
import beryToDaly from "./train-endpoints/bery-to-daly.js";
import beryToRich from "./train-endpoints/bery-to-rich.js";

const getStationLine = (possibleStationLineAbbr) => {
  let possibleEndpoints = [
    sfiaToRich,
    sfiaToAntc,
    dublToDaly,
    beryToRich,
    beryToDaly,
  ];

  for (let idx = 0; idx < possibleEndpoints.length; idx++) {
    let stationLine = possibleEndpoints[idx]();

    if (stationLine.includes(possibleStationLineAbbr)) {
      return stationLine;
    }
  }
};

export default getStationLine;
