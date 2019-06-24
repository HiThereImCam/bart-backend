const axios = require('axios');
const bartKey = process.env.BART_API_KEY;

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

    if( (getTime[0] > 19) && ( getTime[1] < 46) ){
        return weekdaySchedule = async () => {

            const weekTime = getTime();
            const getStationData = await callBartAPI();
            const stationNamesAndTimes =  getStationData.data.root;
    
            const afterSevenBeforeEightStationsAndTimes = {
                "WarmToDaly": {
                    "1": stationNamesAndTimes.station[41].etd[0].estimate[0].minutes,
                    "2": stationNamesAndTimes.station[41].etd[0].estimate[1].minutes
                },
                "WarmToRich": {
                    "1": stationNamesAndTimes.station[41].etd[1].estimate[0].minutes,
                    "2": stationNamesAndTimes.station[41].etd[1].estimate[1].minutes
                },
                /**check this 8:20pm */
                "DublToDaly": {
                    "1": stationNamesAndTimes.station[24].etd[0].estimate[0].minutes,
                    "2": stationNamesAndTimes.station[24].etd[0].estimate[1].minutes
                },
               
                "AntcToMLBR": {
                    "1": stationNamesAndTimes.station[18].etd[0].estimate[0].minutes,
                    "2": stationNamesAndTimes.station[18].etd[0].estimate[1].minutes
                },
                "RichToDaly": {
                    "1": stationNamesAndTimes.station[40].etd[0].estimate[0].minutes,
                    "2": stationNamesAndTimes.station[40].etd[0].estimate[1].minutes
                },
                "RichToWarm": {
                    "1": stationNamesAndTimes.station[40].etd[1].estimate[0].minutes,
                    "2": stationNamesAndTimes.station[40].etd[1].estimate[1].minutes
                },
                "DalyToAntc": {
                    "1": stationNamesAndTimes.station[34].etd[0].estimate[0].minutes,
                    "2": stationNamesAndTimes.station[34].etd[0].estimate[1].minutes,
                },
                /** Check route time: 8:11pm */
                "DalyToDubl": {
                    "1": stationNamesAndTimes.station[34].etd[1].estimate[0].minutes,
                    "2": stationNamesAndTimes.station[34].etd[1].estimate[1].minutes,
                },
                "DalyToRich": {
                    "1": stationNamesAndTimes.station[34].etd[2].estimate[0].minutes,
                    "2": stationNamesAndTimes.station[34].etd[2].estimate[1].minutes,
                },
                "DalyToSFO": {
                    "1": stationNamesAndTimes.station[34].etd[3].estimate[0].minutes,
                    "2": stationNamesAndTimes.station[34].etd[3].estimate[1].minutes,
                },
                "DalyToWarm": {
                    "1": stationNamesAndTimes.station[34].etd[4].estimate[0].minutes,
                    "2": stationNamesAndTimes.station[34].etd[4].estimate[1].minutes,
                },
                "SFOToAntc": {
                    "1": stationNamesAndTimes.station[46].etd[0].estimate[0].minutes,
                    "2": stationNamesAndTimes.station[46].etd[0].estimate[1].minutes,
                }
            };
        };
    }
    if( ((getTime[0] > 19) && (getTime[1] >= 46)) && ( getTime[0] < 20)){
        /**
         *  if the time is between 7:46pm and 9pm, return these stations and times
         */

        return weekdaySchedule = async () => {
            const getStationData = await callBartAPI();
            const stationNamesAndTimes =  getStationData.data.root;

            return afterEightStationsAndTimes = {
                "WarmToDaly": {
                    "Arrival1": stationNamesAndTimes.station[41].etd[0].estimate[0].minutes,
                    "Arrival2": stationNamesAndTimes.station[41].etd[0].estimate[1].minutes
                },
                "WarmToRich": {
                    "Arrival1": stationNamesAndTimes.station[41].etd[1].estimate[0].minutes,
                    "Arrival2": stationNamesAndTimes.station[41].etd[1].estimate[1].minutes
                },
                /**check this 8:20pm */
                "DublToDaly": {
                    "Arrival1": stationNamesAndTimes.station[24].etd[0].estimate[0].minutes,
                    "Arrival2": stationNamesAndTimes.station[24].etd[0].estimate[1].minutes
                },
            
                "AntcToMLBR": {
                    "Arrival1": stationNamesAndTimes.station[18].etd[0].estimate[0].minutes,
                    "Arrival2": stationNamesAndTimes.station[18].etd[0].estimate[1].minutes
                },
                "RichToDaly": {
                    "Arrival1": stationNamesAndTimes.station[40].etd[0].estimate[0].minutes,
                    "Arrival2": stationNamesAndTimes.station[40].etd[0].estimate[1].minutes
                },
                "RichToWarm": {
                    "Arrival1": stationNamesAndTimes.station[40].etd[1].estimate[0].minutes,
                    "Arrival2": stationNamesAndTimes.station[40].etd[1].estimate[1].minutes
                },
                "DalyToAntc": {
                    "Arrival1": stationNamesAndTimes.station[34].etd[0].estimate[0].minutes,
                    "Arrival2": stationNamesAndTimes.station[34].etd[0].estimate[1].minutes,
                },
                /** Check route time: 8:11pm */
                "DalyToDubl": {
                    "Arrival1": stationNamesAndTimes.station[34].etd[1].estimate[0].minutes,
                    "Arrival2": stationNamesAndTimes.station[34].etd[1].estimate[1].minutes,
                },
                "DalyToRich": {
                    "Arrival1": stationNamesAndTimes.station[34].etd[2].estimate[0].minutes,
                    "Arrival2": stationNamesAndTimes.station[34].etd[2].estimate[1].minutes,
                },
                "DalyToSFO": {
                    "Arrival1": stationNamesAndTimes.station[34].etd[3].estimate[0].minutes,
                    "Arrival2": stationNamesAndTimes.station[34].etd[3].estimate[1].minutes,
                },
                "DalyToWarm": {
                    "Arrival1": stationNamesAndTimes.station[34].etd[4].estimate[0].minutes,
                    "Arrival2": stationNamesAndTimes.station[34].etd[4].estimate[1].minutes,
                },
                "SFOToAntc": {
                    "Arrival1": stationNamesAndTimes.station[46].etd[0].estimate[0].minutes,
                    "Arrival2": stationNamesAndTimes.station[46].etd[0].estimate[1].minutes,
                },
                "SFOToMLBR": {
                    "Arrival1": stationNamesAndTimes.station[46].etd[1].estimate[0].minutes,
                    "Arrival2": stationNamesAndTimes.station[46].etd[1].estimate[1].minutes,
                }
            };
        }
    }        
}