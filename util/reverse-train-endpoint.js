const reverseTrainEndpoint = (trainLine) => {
  let reversedTrainLine = {};

  for (station in trainLine) {
    let currStation = station;
    let lineCpy = [...trainLine[currStation]];
    let newStationKey = lineCpy.pop();
    lineCpy.unshift(currStation);
    lineCpy = lineCpy.reverse();

    reversedTrainLine[newStationKey] = lineCpy;
  }

  return reversedTrainLine;
};

export default reverseTrainEndpoint;
