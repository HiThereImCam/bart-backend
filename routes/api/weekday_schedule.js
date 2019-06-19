const axios = require('axios');
const bartKey = process.env.BART_API_KEY;

module.exports = (app) => {

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

        return beforeSevenStationsAndTimes = {
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
            /** check Antc to Mill at 4:30pm weekday */
            "AntcToSFO": {
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
            "DalyToAntc": {
                "Arrival1": stationNamesAndTimes.station[34].etd[0].estimate[0].minutes,
                "Arrival2": stationNamesAndTimes.station[34].etd[0].estimate[1].minutes,
            },
            "DalyToDubl": {
                "Arrival1": stationNamesAndTimes.station[34].etd[1].estimate[0].minutes,
                "Arrival2": stationNamesAndTimes.station[34].etd[1].estimate[1].minutes,
            },
            "DalyToRich": {
                "Arrival1": stationNamesAndTimes.station[34].etd[2].estimate[0].minutes,
                "Arrival2": stationNamesAndTimes.station[34].etd[2].estimate[1].minutes,
            },
            /** check daly to SFO weekday. time rn < 9 */
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
            }
        };
    };
}
