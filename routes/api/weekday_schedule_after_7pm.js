const axios = require('axios');
const bartKey = process.env.BART_API_KEY;
var moment = require('moment');

module.exports = (app) => {

    const getDayAndTime = () => { 
        const date = new Date();

        const day = date.getDay();
        const hour = date.getHours();
        const minutes = date.getMinutes();

        return [ day, hour, minutes];
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

        const dayAndTime = getDayAndTime();
        const getStationData = await callBartAPI();
        const stationNamesAndTimes =  getStationData.data.root;
        const dataUnavailable = "Data is unavailable at this time";
         
        // return stationNamesAndTimes;
        
        let afterSevenStationsAndTimes = {
            WarmToRich: {
                station: stationNamesAndTimes.station[41].name,
                destination: stationNamesAndTimes.station[41].etd[0] === undefined ? dataUnavailable :
                            stationNamesAndTimes.station[41].etd[0].destination,
                firstArrival: stationNamesAndTimes.station[41].etd[0].estimate[0] === undefined ? dataUnavailable : 
                            stationNamesAndTimes.station[41].etd[0].estimate[0].minutes,
                secondArrival:  stationNamesAndTimes.station[41].etd[0].estimate[1] === undefined? dataUnavailable :
                        stationNamesAndTimes.station[41].etd[0].estimate[1].minutes
            },
            DublToDaly: {
                station: stationNamesAndTimes.station[24].name,
                destination: stationNamesAndTimes.station[24].etd[0] === undefined ? dataUnavailable : 
                            stationNamesAndTimes.station[24].etd[0].destination,
                firstArrival: stationNamesAndTimes.station[24].etd[0].estimate[0] === undefined ? dataUnavailable :
                            stationNamesAndTimes.station[24].etd[0].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[24].etd[0].estimate[1] === undefined ? dataUnavailable :
                    stationNamesAndTimes.station[24].etd[0].estimate[1].minutes
            },
            AntcToMLBR: {
                station: stationNamesAndTimes.station[18].name,
                destination: stationNamesAndTimes.station[18].etd[0] === undefined ? dataUnavailable : 
                            stationNamesAndTimes.station[18].etd[0].destination,
                firstArrival: stationNamesAndTimes.station[18].etd[0].estimate[0] === undefined ? dataUnavailable : 
                            stationNamesAndTimes.station[18].etd[0].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[18].etd[0].estimate[1] === undefined ? dataUnavailable :
                            stationNamesAndTimes.station[18].etd[0].estimate[1].minutes
            },
            RichToMlbr: {
                station: stationNamesAndTimes.station[40].name,
                destination: stationNamesAndTimes.station[40].etd[0] === undefined ? dataUnavailable :
                            stationNamesAndTimes.station[40].etd[0].destination,
                firstArrival: stationNamesAndTimes.station[40].etd[0].estimate[0] === undefined ? dataUnavailable : 
                            stationNamesAndTimes.station[40].etd[0].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[40].etd[0].estimate[1] === undefined ? dataUnavailable : 
                            stationNamesAndTimes.station[40].etd[0].estimate[1].minutes
            },
            RichToWarm: {
                station: stationNamesAndTimes.station[40].name,
                destination: stationNamesAndTimes.station[40].etd[1] === undefined ? dataUnavailable : 
                            stationNamesAndTimes.station[40].etd[1].destination,
                firstArrival: stationNamesAndTimes.station[40].etd[1]=== undefined ? dataUnavailable : 
                                stationNamesAndTimes.station[40].etd[1].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[40].etd[1]=== undefined ? dataUnavailable : 
                                stationNamesAndTimes.station[40].etd[1].estimate[1].minute
            },
            DalyToAntc: {
                station: stationNamesAndTimes.station[34].name,
                destination: stationNamesAndTimes.station[34].etd[0] === undefined ? dataUnavailable :
                            stationNamesAndTimes.station[34].etd[0].destination,
                firstArrival: stationNamesAndTimes.station[34].etd[0].estimate[0] === undefined ? dataUnavailable : 
                            stationNamesAndTimes.station[34].etd[0].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[34].etd[0].estimate[1] === undefined ? dataUnavailable : 
                            stationNamesAndTimes.station[34].etd[0].estimate[1].minutes
            },
            DalyToDubl: {
                station: stationNamesAndTimes.station[34].name,
                destination: stationNamesAndTimes.station[34].etd[1] === undefined ? dataUnavailable :
                            stationNamesAndTimes.station[34].etd[1].destination,
                firstArrival: stationNamesAndTimes.station[34].etd[1].estimate[1] === undefined ? dataUnavailable : 
                            stationNamesAndTimes.station[34].etd[1].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[34].etd[1].estimate[1] === undefined ? dataUnavailable :
                            stationNamesAndTimes.station[34].etd[1].estimate[1].minutes,
            },
            DalyToRich: {
                station: stationNamesAndTimes.station[34].name,
                destination: stationNamesAndTimes.station[34].etd[2] === undefined ? dataUnavailable :
                            stationNamesAndTimes.station[34].etd[2].destination,
                firstArrival: stationNamesAndTimes.station[34].etd[2].estimate[0] === undefined ? dataUnavailable : 
                            stationNamesAndTimes.station[34].etd[2].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[34].etd[2].estimate[1] === undefined ? dataUnavailable : 
                            stationNamesAndTimes.station[34].etd[2].estimate[1].minutes,
            },
            DalyToSFO: {
                station: stationNamesAndTimes.station[34].name,
                destination: stationNamesAndTimes.station[34].etd[3] === undefined ? dataUnavailable :
                            stationNamesAndTimes.station[34].etd[3].destination,
                firstArrival: stationNamesAndTimes.station[34].etd[3].estimate[0] === undefined ? dataUnavailable :
                            stationNamesAndTimes.station[34].etd[3].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[34].etd[3].estimate[1].minutes === undefined ? dataUnavailable :
                            stationNamesAndTimes.station[34].etd[3].estimate[1].minutes
            },
            SFOToAntc: {
                station: stationNamesAndTimes.station[45].name,
                destination: stationNamesAndTimes.station[45].etd[0] === undefined? dataUnavailable :
                            stationNamesAndTimes.station[45].etd[0].destination,
                firstArrival: stationNamesAndTimes.station[45].etd[0] === undefined ? dataUnavailable : 
                            stationNamesAndTimes.station[45].etd[0].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[45].etd[0] === undefined ? dataUnavailable : 
                            stationNamesAndTimes.station[45].etd[0].estimate[0].minutes,
            }
        }


        let afterEightFortySix = moment("20:46","HH:mm A");
        let nine = moment("21:00", "HH:mm A");
        let nineOSix = moment("21:06", "HH:mm A");
        const sevenForty = moment("19:40", "HH:mm A");

        /**
         * 
         * Last train from Richmond to Daly at 7:40pm 
         * 
         */
        if(moment().isAfter(sevenForty) === true ){
            delete afterSevenStationsAndTimes.RichToMlbr;
            afterSevenStationsAndTimes.RichToWarm.destination = stationNamesAndTimes.station[40].etd[0] === undefined ? dataUnavailable : 
            stationNamesAndTimes.station[40].etd[0].destination;
            afterSevenStationsAndTimes.RichToWarm.firstArrival = stationNamesAndTimes.station[40].etd[0].estimate[0] === undefined ? dataUnavailable : 
            stationNamesAndTimes.station[40].etd[0].estimate[0].minutes;
            afterSevenStationsAndTimes.RichToWarm.secondArrival = stationNamesAndTimes.station[40].etd[0].estimate[1] === undefined ? dataUnavailable : 
            stationNamesAndTimes.station[40].etd[0].estimate[1].minutes;
        } 

        /**
         * If it's a weekday starting at 9pm or all day Saturday
         * Add the SFO to Millbrae route
         */
        if(moment().isAfter(nine) === true ){

            afterSevenStationsAndTimes.SFOToMLBR = {
                station: stationNamesAndTimes.station[46].name,
                destination: stationNamesAndTimes.station[46].etd[1] === undefined ? dataUnavailable : 
                            stationNamesAndTimes.station[46].etd[1].destination,
                firstArrival: stationNamesAndTimes.station[46].etd[1].estimate[0] === undefined ? dataUnavailable : 
                            stationNamesAndTimes.station[46].etd[1].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[46].etd[1].estimate[0] === undefined ? dataUnavailable : 
                stationNamesAndTimes.station[46].etd[1].estimate[1].minutes
            }
            if(moment().isAfter(nineOSix) === true ){
                delete afterSevenStationsAndTimes.DalyToRich;
                afterSevenStationsAndTimes.DalyToSFO.destination = stationNamesAndTimes.station[34].etd[2].destination;
                afterSevenStationsAndTimes.DalyToSFO.firstArrival = stationNamesAndTimes.station[34].etd[2].estimate[0] === undefined ? dataUnavailable :
                stationNamesAndTimes.station[34].etd[2].estimate[0].minutes;
                afterSevenStationsAndTimes.DalyToSFO.secondArrival = stationNamesAndTimes.station[34].etd[2].estimate[1] === undefined ? dataUnavailable :
                stationNamesAndTimes.station[34].etd[2].estimate[1].minutes;
            }
            
            return afterSevenStationsAndTimes;
        }

        return afterSevenStationsAndTimes;
        
     };
}