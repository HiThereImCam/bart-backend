const axios = require('axios');
const bartKey = process.env.BART_API_KEY;
const moment = require('moment');

module.exports = (app) => {

    const callBartAPI = async () => {
        try{
            return response = await axios.get(
                `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=${bartKey}&json=y`);
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    return saturdaySchedule = async() => {

        const getStationData = await callBartAPI();
        const stationNamesAndTimes =  getStationData.data.root;
        

        const dataUnavailable = "Data is unavailable at this time";
        
        /**
         * Original object is going to have only the earliest departures
         * and then add to the object through out the day
         * if statement = O(m+n)
         *  The original object is going to have all the trains before 7am
         *  and then nested if statements act as a time release to add to the object
         */
       let schedule = {
            WarmToRich: {
                station: stationNamesAndTimes.station[41].name,
                destination: stationNamesAndTimes.station[41].etd[0] !== undefined ? stationNamesAndTimes.station[41].etd[0].destination : 
                             dataUnavailable,
                firstArrival: stationNamesAndTimes.station[41].etd[0].estimate[0] !== undefined ? stationNamesAndTimes.station[41].etd[0].estimate[0].minutes :
                             dataUnavailable,
                secondArrival: stationNamesAndTimes.station[41].etd[0].estimate[1] !== undefined ? stationNamesAndTimes.station[41].etd[0].estimate[1].minutes :
                             dataUnavailable
            },
            RichToWarm: {
                station: stationNamesAndTimes.station[40].name,
                destination: stationNamesAndTimes.station[40].etd[0] !== undefined ? stationNamesAndTimes.station[40].etd[0].destination :
                             dataUnavailable,
                firstArrival: stationNamesAndTimes.station[40].etd[0].estimate[0] !== undefined ? stationNamesAndTimes.station[40].etd[0].estimate[0].minutes :
                             dataUnavailable,
                secondArrival: stationNamesAndTimes.station[40].etd[0].estimate[1] !== undefined ? stationNamesAndTimes.station[40].etd[0].estimate[1].minutes :
                             dataUnavailable
            },
            /**
             * Dubl to Daly probably will change. Only have json response after 7am
             */
            DublToDaly:{
                station: stationNamesAndTimes.station[24].name,
                destination: stationNamesAndTimes.station[24].etd[0] !== undefined ? stationNamesAndTimes.station[24].etd[0].destination : 
                             dataUnavailable,
                firstArrival: stationNamesAndTimes.station[24].etd[0].estimate[0] !== undefined ? stationNamesAndTimes.station[24].etd[0].estimate[0].minutes :
                             dataUnavailable,
                secondArrival: stationNamesAndTimes.station[24].etd[0].estimate[1] !== undefined ? stationNamesAndTimes.station[24].etd[0].estimate[1].minutes :
                             dataUnavailable
            },

            DalyToDubl: {
                station: stationNamesAndTimes.station[34].name,
                destination: stationNamesAndTimes.station[34].etd[0] !== undefined ? stationNamesAndTimes.station[34].etd[0].destination :
                             dataUnavailable,
                firstArrival: stationNamesAndTimes.station[34].etd[0].estimate[0] !== undefined ? stationNamesAndTimes.station[34].etd[0].estimate[0].minutes : 
                             dataUnavailable,
                secondArrival: stationNamesAndTimes.station[34].etd[0].estimate[1] !== undefined ? stationNamesAndTimes.station[34].etd[0].estimate[1].minutes :
                             dataUnavailable
            },
            AntcToMlbr: {
                station: stationNamesAndTimes.station[18].name,
                destination: stationNamesAndTimes.station[18].etd[0] !== undefined ? stationNamesAndTimes.station[18].etd[0].destination :
                             dataUnavailable,
                firstArrival: stationNamesAndTimes.station[18].etd[0].estimate[0] !== undefined ? stationNamesAndTimes.station[18].etd[0].estimate[0].minutes :
                             dataUnavailable,
                secondArrival: stationNamesAndTimes.station[18].etd[0].estimate[1] !== undefined ? stationNamesAndTimes.station[18].etd[0].estimate[1].minutes : 
                             dataUnavailable
            },
            MlbrToAntc: {
                station: stationNamesAndTimes.station[45].name,
                destination: stationNamesAndTimes.station[45].etd[0] !== undefined ? stationNamesAndTimes.station[18].etd[0].destination : 
                             dataUnavailable,
                firstArrival: stationNamesAndTimes.station[45].etd[0].estimate[0] !== undefined ? stationNamesAndTimes.station[18].etd[0].estimate[0].minutes :
                             dataUnavailable,
                secondArrival: stationNamesAndTimes.station[45].etd[0].estimate[1] !== undefined ? stationNamesAndTimes.station[18].etd[0].estimate[1].minutes :
                             dataUnavailable
            }
        }
        
        let eightThirty = moment("08:30", "HH:mm A");
        let nineForty = moment("09:40", "HH:mm A");

        if(moment().isAfter(eightThirty)){
            schedule.RichToMlbr = {
                station: stationNamesAndTimes.station[40].name,
                destination: stationNamesAndTimes.station[40].etd[1] !== undefined ? stationNamesAndTimes.station[40].etd[1].destination :
                             dataUnavailable,
                firstArrival: stationNamesAndTimes.station[40].etd[1].estimate[0] !== undefined ? stationNamesAndTimes.station[40].etd[1].estimate[0].minutes : 
                             dataUnavailable,
                secondArrival: stationNamesAndTimes.station[40].etd[1].estimate[1] !== undefined ? stationNamesAndTimes.station[40].etd[1].estimate[1].minutes :
                             dataUnavailable
            },
            schedule.WarmToDaly = {
                station: stationNamesAndTimes.station[41].name,
                destination: stationNamesAndTimes.station[41].etd[1] !== undefined ? stationNamesAndTimes.station[41].etd[1].destination :
                            dataUnavailable,
                firstArrival: stationNamesAndTimes.station[41].etd[1].estimate[0] !== undefined ? stationNamesAndTimes.station[41].etd[1].estimate[0].minutes :
                            dataUnavailable,
                secondArrival: stationNamesAndTimes.station[41].etd[1].estimate[1] !== undefined ? stationNamesAndTimes.station[41].etd[1].estimate[1].minutes :
                            dataUnavailable
            }
        }

        if(moment().isAfter(nineForty)){
            schedule[DalyToRich] = {
                station: stationNamesAndTimes.station[34].name,
                destination: stationNamesAndTimes.station[34].etd[3] !== undefined ? stationNamesAndTimes.station[34].etd[3].destination :
                             dataUnavailable,
                firstArrival: stationNamesAndTimes.station[34].etd[3].estimate[0] !== undefined ? stationNamesAndTimes.station[34].etd[3].estimate[0].minutes :
                             dataUnavailable,
                secondArrival: stationNamesAndTimes.station[34].etd[3].estimate[1] !== undefined ? stationNamesAndTimes.station[34].etd[3].estimate[1].minutes :
                             dataUnavailable
            }
            schedule[DalyToWarm] = {
                station: stationNamesAndTimes.station[34].name,
                destination: stationNamesAndTimes.station[34].etd[4] !== undefined ? stationNamesAndTimes.station[34].etd[4].destination :
                            dataUnavailable,
                firstArrival: stationNamesAndTimes.station[34].etd[4].estimate[0] !== undefined ? stationNamesAndTimes.station[34].etd[4].estimate[0].minutes :
                            dataUnavailable,
                secondArrival: stationNamesAndTimes.station[34].etd[4].estimate[1] !== undefined ? stationNamesAndTimes.station[34].etd[4].estimate[1].minutes :
                            dataUnavailable
            } 
        }

        return schedule;
    }
}

