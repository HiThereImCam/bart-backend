const axios = require('axios');
const bartKey = process.env.BART_API_KEY;
const moment = require('moment');

module.exports = (app) => {

    const getTime = () => { 
        const date = new Date();

        const hour = date.getHours();
        const minutes = date.getMinutes();

        return [ hour, minutes];
    };

    const callBartAPI = async () => {
        try{
            return response = await axios.get(
                `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=${bartKey}&json=y`);
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    return weekdaySchedule = async () => {

        const getStationData = await callBartAPI();
        const stationNamesAndTimes =  getStationData.data.root;

        const dataUnavailable = "Data is unavailable at this time";

          // return stationNamesAndTimes.station[34].etd[3];

          /**
           * Problem:
           *  The number of objects in Daly City changes
           *  Specifically- the antioch line 
           *  3:25pm station[34].etd[3] becomes Pittsburgh Bay Point
           *  The train afterwards becomes Pleasant Hill
           *  Need to know when those trains are added and when they are removed 
           */
          // return stationNamesAndTimes;
          let schedule = {

               WarmToDaly: {
                    station: "Warm Springs",
                    destination: stationNamesAndTimes.station[41].etd[0] === undefined ? dataUnavailable :
                              stationNamesAndTimes.station[41].etd[0].destination,
                    firstArrival: stationNamesAndTimes.station[41].etd[0].estimate[0] === undefined ? dataUnavailable:
                         stationNamesAndTimes.station[41].etd[0].estimate[0].minutes,
                    secondArrival: stationNamesAndTimes.station[41].etd[0].estimate[1] === undefined ? dataUnavailable:
                         stationNamesAndTimes.station[41].etd[0].estimate[1].minutes
               },
               WarmToRich: {
                    station: "Warm Springs",
                    destination: stationNamesAndTimes.station[41].etd[1] === undefined ? dataUnavailable:
                              stationNamesAndTimes.station[41].etd[1].destination,
                    firstArrival: stationNamesAndTimes.station[41].etd[1].estimate[0] === undefined ? dataUnavailable :
                         stationNamesAndTimes.station[41].etd[1].estimate[0].minutes,
                    secondArrival: stationNamesAndTimes.station[41].etd[1].estimate[1] === undefined ? dataUnavailable :
                         stationNamesAndTimes.station[41].etd[1].estimate[1].minutes
               },
               DublToDaly: {
                    station: "Dublin",
                    destination: stationNamesAndTimes.station[24].etd[0] === undefined ? dataUnavailable : 
                              stationNamesAndTimes.station[41].etd[0].destination,
                    firstArrival: stationNamesAndTimes.station[24].etd[0].estimate[0] === undefined ? dataUnavailable :
                         stationNamesAndTimes.station[24].etd[0].estimate[0].minutes,
                    secondArrival: stationNamesAndTimes.station[24].etd[0].estimate[1] === undefined ? dataUnavailable :
                         stationNamesAndTimes.station[24].etd[0].estimate[1].minutes
               },
               /** check Antc to Mill at 4:30pm weekday */
               AntcToSFO: {
                    station: stationNamesAndTimes.station[18].name,
                    destination: stationNamesAndTimes.station[18].etd[0] === undefined ? dataUnavailable: 
                              stationNamesAndTimes.station[18].etd[0].destination,
                    firstArrival: stationNamesAndTimes.station[18].etd[0].estimate[0] === undefined ? dataUnavailable :
                         stationNamesAndTimes.station[18].etd[0].estimate[0].minutes,
                    secondArrival: stationNamesAndTimes.station[18].etd[0].estimate[1] === undefined ? dataUnavailable :
                         stationNamesAndTimes.station[18].etd[0].estimate[1].minutes
               },
               RichToMLBR: {
                    station: stationNamesAndTimes.station[40].name,
                    destination: stationNamesAndTimes.station[18].etd[0] === undefined ?  dataUnavailable: 
                         stationNamesAndTimes.station[18].etd[0].destination,
                    firstArrival: stationNamesAndTimes.station[40].etd[0].estimate[0] === undefined ? dataUnavailable :
                         stationNamesAndTimes.station[40].etd[0].estimate[0].minutes,
                    secondArrival: stationNamesAndTimes.station[40].etd[0].estimate[1] === undefined ? dataUnavailable :
                         stationNamesAndTimes.station[40].etd[0].estimate[1].minutes
               },
               RichToWarm: {
                    station: stationNamesAndTimes.station[40].name,
                    destination: stationNamesAndTimes.station[40].etd[1] === undefined ? dataUnavailable: 
                    stationNamesAndTimes.station[40].etd[1].destination,
                    firstArrival: stationNamesAndTimes.station[40].etd[1].estimate[0] === undefined ? dataUnavailable :
                         stationNamesAndTimes.station[40].etd[1].estimate[0].minutes,
                    secondArrival: stationNamesAndTimes.station[40].etd[1].estimate[1] === undefined ? dataUnavailable :
                         stationNamesAndTimes.station[40].etd[1].estimate[1].minutes
               },
               DalyToAntc: {
                    station: stationNamesAndTimes.station[34].name,
                    destination: stationNamesAndTimes.station[34].etd[0] === undefined ?  dataUnavailable: 
                              stationNamesAndTimes.station[34].etd[0].destination,
                    firstArrival: stationNamesAndTimes.station[34].etd[0].estimate[0] === undefined ? dataUnavailable :
                         stationNamesAndTimes.station[34].etd[0].estimate[0].minutes,
                    secondArrival: stationNamesAndTimes.station[34].etd[0].estimate[1] === undefined ? dataUnavailable :
                         stationNamesAndTimes.station[34].etd[0].estimate[1].minutes
               },
               DalyToDubl: {
                    station: stationNamesAndTimes.station[34].name,
                    destination: stationNamesAndTimes.station[34].etd[1] === undefined ? dataUnavailable :
                              "Dublin",
                    firstArrival: stationNamesAndTimes.station[34].etd[1].estimate[0] === undefined ? dataUnavailable :
                         stationNamesAndTimes.station[34].etd[1].estimate[0].minutes,
                    secondArrival: stationNamesAndTimes.station[34].etd[1].estimate[1] === undefined ? dataUnavailable :
                         stationNamesAndTimes.station[34].etd[1].estimate[1].minutes
               },
               DalyToMLBR: {
                    station: stationNamesAndTimes.station[34].name,
                    destination: stationNamesAndTimes.station[34].etd[2] === undefined ? dataUnavailable :
                              stationNamesAndTimes.station[34].etd[2].destination,
                    firstArrival: stationNamesAndTimes.station[34].etd[2].estimate[0] === undefined ? dataUnavailable :
                         stationNamesAndTimes.station[34].etd[2].estimate[0].minutes,
                    secondArrival: stationNamesAndTimes.station[34].etd[2].estimate[1] === undefined ? dataUnavailable :
                         stationNamesAndTimes.station[34].etd[2].estimate[1].minutes
               },
               //   DalyToRich: {
               //       station: stationNamesAndTimes.station[34].name,
               //       destination: stationNamesAndTimes.station[34].etd[3] === undefined ? dataUnavailable :
               //                   stationNamesAndTimes.station[34].etd[3].destination,
               //       firstArrival: stationNamesAndTimes.station[34].etd[3] !== undefined ? stationNamesAndTimes.station[34].etd[3].estimate[0].minutes : 
               //                     dataUnavailable ,
               //       secondArrival: stationNamesAndTimes.station[34].etd[3] !== undefined ? stationNamesAndTimes.station[34].etd[3].estimate[1].minutes :
               //                      dataUnavailable
                         
               //   },
               DalyToSFO: {
                    station: stationNamesAndTimes.station[34].name,
                    destination: stationNamesAndTimes.station[34].etd[4] === undefined ? dataUnavailable : 
                              stationNamesAndTimes.station[34].etd[4].destination,
                    firstArrival: stationNamesAndTimes.station[34].etd[4].estimate[0] === undefined ? dataUnavailable : 
                         stationNamesAndTimes.station[34].etd[4].estimate[0].minutes,
                    secondArrival: stationNamesAndTimes.station[34].etd[4].estimate[1] === undefined ? dataUnavailable : 
                         stationNamesAndTimes.station[34].etd[4].estimate[1].minutes
               },
               DalyToWarm: {
                    station: stationNamesAndTimes.station[34].name,
                    destination: stationNamesAndTimes.station[34].etd[5] === undefined ? dataUnavailable :
                              "Warm Springs",
                    firstArrival: stationNamesAndTimes.station[34].etd[5].estimate[0] === undefined ? dataUnavailable : 
                         stationNamesAndTimes.station[34].etd[5].estimate[0].minutes,
                    secondArrival: stationNamesAndTimes.station[34].etd[5].estimate[1] === undefined ? dataUnavailable : 
                         stationNamesAndTimes.station[34].etd[5].estimate[1].minutes
               },
               SFOToAntc: {
                    station: stationNamesAndTimes.station[46].name,
                    destination: stationNamesAndTimes.station[46].etd[0] === undefined ? dataUnavailable : 
                              stationNamesAndTimes.station[46].etd[0].destination,
                    firstArrival: stationNamesAndTimes.station[46].etd[0].estimate[0] === undefined ? dataUnavailable : 
                         stationNamesAndTimes.station[46].etd[0].estimate[0].minutes,
                    secondArrival: stationNamesAndTimes.station[46].etd[0].estimate[1] === undefined ? dataUnavailable : 
                         stationNamesAndTimes.station[46].etd[0].estimate[1].minutes
               },
               SFOToMlbr: {
                    station: stationNamesAndTimes.station[46].name,
                    destination: stationNamesAndTimes.station[46].etd[1] === undefined ?  dataUnavailable :
                              stationNamesAndTimes.station[46].etd[1].destination,
                    firstArrival: stationNamesAndTimes.station[46].etd[1] === undefined ? dataUnavailable : 
                         stationNamesAndTimes.station[46].etd[1].estimate[0].minutes,
                    secondArrival: stationNamesAndTimes.station[46].etd[1].estimate[1] !== undefined ? stationNamesAndTimes.station[46].etd[1].estimate[1].minutes : 
                                   dataUnavailable 
                         /**
                          * Have to find a better condition to find if something doesnt exist
                          */
               }
          };

          /**
           * 17 = 5 pm
           * After 5:45pm, Warm Springs to Daly closes
           * Daly City is = etd[0] but when the route closes
           * Richmond becomes etd[0]
           */

        let afterFiveFortyFive = moment("17:45", "HH:mm A");
        if(moment().isAfter(afterFiveFortyFive)){
            delete beforeSevenStationsAndTimes.WarmToDaly;
            beforeSevenStationsAndTimes.WarmToRich.firstArrival = stationNamesAndTimes.station[41].etd[0].estimate[0] === undefined ? dataUnavailable :
            stationNamesAndTimes.station[41].etd[0].estimate[0].minutes;
            beforeSevenStationsAndTimes.WarmToRich.secondArrival = stationNamesAndTimes.station[41].etd[0].estimate[1] === undefined ? dataUnavailable :
            stationNamesAndTimes.station[41].etd[0].estimate[1].minutes;
            return beforeSevenStationsAndTimes;
        }

        if(schedule.AntcToSFO.station === schedule.AntcToSFO.destination){
             schedule.AntcToSFO.destination = stationNamesAndTimes.station[18].etd[1].destination;
             schedule.AntcToSFO.firstArrival = stationNamesAndTimes.station[18].etd[1].estimate[0].minutes;
             schedule.AntcToSFO.secondArrival = stationNamesAndTimes.station[18].etd[1].estimate[1].minutes;
        }

        return schedule;
      };
}
 