import sfiaToRich from "./train-endpoints/sfia-to-rich";
import sfiaToAntc from "./train-endpoints/sfia-to-antc";
import dublToDaly from "./train-endpoints/dubl-to-daly";
import beryToDaly from "./train-endpoints/bery-to-daly";
import beryToRich from "./train-endpoints/bery-to-rich";

const findEndpoint = (arrival, stationEndpointAbbr) => {
  // let sfoToRichLine = sfoToRich();
  let endponts = [sfiaToRich, sfiaToAntc, dublToDaly, beryToRich, beryToDaly];
  let isStationInLine = sfoToRichLine.filter((station) => arrival === station);
};

export default findEndpoint;
