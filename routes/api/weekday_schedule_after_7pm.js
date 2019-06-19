const axios = require('axios');
const bartKey = process.env.BART_API_KEY;

module.exports = (app) => {

    const getDayAndTime = () => { 
        const date = new Date();

        const hour = date.getHours();
        const minutes = date.getMinutes();

        return [ hour, minutes];
    }

    const callBartAPI = async () => {
        try{
            return response = await axios.get(
                `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=${bartKey}&json=y`);
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };


    const weekdaySchedule = async () => {

        const getStationData = await callBartAPI();
        const stationNamesAndTimes =  getStationData.data.root;

        const afterSevenBeforeEightStationsAndTimes = {
            "WarmToDaly": {
                "Arrival1": beforeSixData.station[41].etd[0].estimate[0].minutes,
                "Arrival2": beforeSixData.station[41].etd[0].estimate[1].minutes
            },
            "WarmToRich": {
                "Arrival1": beforeSixData.station[41].etd[1].estimate[0].minutes,
                "Arrival2": beforeSixData.station[41].etd[1].estimate[1].minutes
            },
            /**check this 8:20pm */
            "DublToDaly": {
                "Arrival1": beforeSixData.station[24].etd[0].estimate[0].minutes,
                "Arrival2": beforeSixData.station[24].etd[0].estimate[1].minutes
            },
           
            "AntcToMLBR": {
                "Arrival1": beforeSixData.station[18].etd[0].estimate[0].minutes,
                "Arrival2": beforeSixData.station[18].etd[0].estimate[1].minutes
            },
            "RichToDaly": {
                "Arrival1": beforeSixData.station[40].etd[0].estimate[0].minutes,
                "Arrival2": beforeSixData.station[40].etd[0].estimate[1].minutes
            },
            "RichToWarm": {
                "Arrival1": beforeSixData.station[40].etd[1].estimate[0].minutes,
                "Arrival2": beforeSixData.station[40].etd[1].estimate[1].minutes
            },
            "DalyToAntc": {
                "Arrival1": beforeSixData.station[34].etd[0].estimate[0].minutes,
                "Arrival2": beforeSixData.station[34].etd[0].estimate[1].minutes,
            },
            "DalyToAntc": {
                "Arrival1": beforeSixData.station[34].etd[0].estimate[0].minutes,
                "Arrival2": beforeSixData.station[34].etd[0].estimate[1].minutes,
            },
            /** Check route time: 8:11pm */
            "DalyToDubl": {
                "Arrival1": beforeSixData.station[34].etd[1].estimate[0].minutes,
                "Arrival2": beforeSixData.station[34].etd[1].estimate[1].minutes,
            },
            "DalyToRich": {
                "Arrival1": beforeSixData.station[34].etd[2].estimate[0].minutes,
                "Arrival2": beforeSixData.station[34].etd[2].estimate[1].minutes,
            },
            /** check daly to SFO weekday. time rn < 9 */
            "DalyToSFO": {
                "Arrival1": beforeSixData.station[34].etd[3].estimate[0].minutes,
                "Arrival2": beforeSixData.station[34].etd[3].estimate[1].minutes,
            },
            "DalyToWarm": {
                "Arrival1": beforeSixData.station[34].etd[4].estimate[0].minutes,
                "Arrival2": beforeSixData.station[34].etd[4].estimate[1].minutes,
            },
            "SFOToAntc": {
                "Arrival1": beforeSixData.station[46].etd[0].estimate[0].minutes,
                "Arrival2": beforeSixData.station[46].etd[0].estimate[1].minutes,
            }
        };
    };
}