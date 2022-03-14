import getDayAndTime from "./get-day-and-time";
import mondayThruSaturdayLines from "./mon-thru-sat-til-evening-lines";
import sundayAndEveningLines from "./sun-and-evening-lines.js";

const getStationLine = (direction, lineAbbr = null, currLine = null) => {
  const [day, hour] = getDayAndTime();

  // 22 being 9pm
  let possibleEndpoints =
    day !== "Sunday" && hour < 22
      ? mondayThruSaturdayLines()
      : sundayAndEveningLines();

  if (lineAbbr !== null) {
    for (let idx = 0; idx < possibleEndpoints.length; idx++) {
      let stations = possibleEndpoints[idx]();
      let stationLine = possibleEndpoints(idx);
      if (stationLine[direction].includes(lineAbbr)) {
        return [stations, stationsLine];
      }
    }
  }
};

export default getStationLine;
