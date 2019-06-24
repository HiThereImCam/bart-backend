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

    return sundaySchedule = async() => {

        const currentTime = getTime();
        const getStationData = await callBartAPI();
        const stationNamesAndTimes =  getStationData.data.root;
        
     //    return stationNamesAndTimes.station[18].etd[0].estimate[0].minutes;
        /**
         *  If the last train passed, train === undefined
         * 
         *  Should send an update to the user that Dublin/Pleasanton only goes to MacArthur
         *  Maybe update them to go to 12th St/Oakland City Center to be able to transfer anywhere they want?
         */
        let sundayStationsAndTimes = {
            "AntcToMlbr":{
                "1": stationNamesAndTimes.station[18].etd[0].estimate[0].minutes === undefined ? "We're sorry. There are no available trains at the moment" :
                     stationNamesAndTimes.station[18].etd[0].estimate[0].minutes,
                "2": stationNamesAndTimes.station[18].etd[0].estimate[1].minutes === undefined ? "We're sorry. There are no available trains at the moment" :
                     stationNamesAndTimes.station[18].etd[0].estimate[1].minutes
            },    
            "DublToMacArthur":{
                "1": stationNamesAndTimes.station[24].etd[0].estimate[0].minutes === undefined ? "We're sorry. There are no available trains at the moment" :
                     stationNamesAndTimes.station[24].etd[0].estimate[0].minutes,
                "2": stationNamesAndTimes.station[24].etd[0].estimate[1].minutes === undefined ? "We're sorry. There are no available trains at the moment" :
                     stationNamesAndTimes.station[24].etd[0].estimate[1].minutes
            },
            "DalyToAntc":{
                "1": stationNamesAndTimes.station[34].etd[0].estimate[0].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[34].etd[0].estimate[0].minutes,
                "2": stationNamesAndTimes.station[34].etd[0].estimate[1].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[34].etd[0].estimate[1].minutes
            },
            "DalyToSFO":{
                "1": stationNamesAndTimes.station[34].etd[1].estimate[0].minutes === undefined ? "We're sorry. There are no available trains at the moment" :
                     stationNamesAndTimes.station[34].etd[1].estimate[0].minutes,
                "2": stationNamesAndTimes.station[34].etd[1].estimate[1].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[34].etd[1].estimate[1].minutes 
            },
            "RichToWarm":{
                "1": stationNamesAndTimes.station[40].etd[0].estimate[0].minutes === undefined ? "We're sorry. There are no available trains at the moment" :
                     stationNamesAndTimes.station[40].etd[0].estimate[0].minutes,
                "2": stationNamesAndTimes.station[40].etd[0].estimate[1].minutes === undefined ? "We're sorry. There are no available trains at the moment" :
                     stationNamesAndTimes.station[40].etd[0].estimate[1].minutes,
            },
            "WarmToRich":{
                "1": stationNamesAndTimes.station[41].etd[0].estimate[0].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[41].etd[0].estimate[0].minutes,
                "2": stationNamesAndTimes.station[41].etd[0].estimate[1].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[41].etd[0].estimate[1].minutes
            },
            "MlbrToSFO":{
                "1": stationNamesAndTimes.station[45].etd[0].estimate[0].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[45].etd[0].estimate[0].minutes,
                "2": stationNamesAndTimes.station[45].etd[0].estimate[1].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[45].etd[0].estimate[1].minutes
            },
            "SFOToAntc":{
                "1": stationNamesAndTimes.station[46].etd[0].estimate[0].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[46].etd[0].estimate[0].minutes,
                "2": stationNamesAndTimes.station[46].etd[0].estimate[1].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[46].etd[0].estimate[1].minutes
            },
            "SFOToMlbr":{
                "1": stationNamesAndTimes.station[46].etd[1].estimate[0].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[46].etd[1].estimate[0].minutes,
                "2": stationNamesAndTimes.station[46].etd[1].estimate[1].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[46].etd[1].estimate[1].minutes
            }
        }

        return sundayStationsAndTimes;
        
     }

}