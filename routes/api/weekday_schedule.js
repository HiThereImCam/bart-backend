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

    return weekdaySchedule = async () => {

        const currentTime = getTime();
        const getStationData = await callBartAPI();
        const stationNamesAndTimes =  getStationData.data.root;



        return beforeSevenStationsAndTimes = {
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
            /** check Antc to Mill at 4:30pm weekday */
            "AntcToSFO": {
                "1": stationNamesAndTimes.station[18].etd[0].estimate[0].minutes,
                "2": stationNamesAndTimes.station[18].etd[0].estimate[1].minutes
            },
            "RichToMLBR": {
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
            "DalyToDubl": {
                "1": stationNamesAndTimes.station[34].etd[1].estimate[0].minutes,
                "2": stationNamesAndTimes.station[34].etd[1].estimate[1].minutes,
            },
            "DalyToMLBR": {
                "1": stationNamesAndTimes.station[34].etd[2].estimate[0].minutes,
                "2": stationNamesAndTimes.station[34].etd[2].estimate[1].minutes,
            },
            "DalyToRich": {
                "1": stationNamesAndTimes.station[34].etd[3].estimate[0].minutes,
                "2": stationNamesAndTimes.station[34].etd[3].estimate[1].minutes,
            },
            "DalyToSFO": {
                "1": stationNamesAndTimes.station[34].etd[4].estimate[0].minutes,
                "2": stationNamesAndTimes.station[34].etd[4].estimate[1].minutes,
            },
            "DalyToWarm": {
                "1": stationNamesAndTimes.station[34].etd[5].estimate[0].minutes,
                "2": stationNamesAndTimes.station[34].etd[5].estimate[1].minutes,
            },
            "SFOToAntc": {
                "1": stationNamesAndTimes.station[46].etd[0].estimate[0].minutes,
                "2": stationNamesAndTimes.station[46].etd[0].estimate[1].minutes,
            },
            "SFOToMLBR": {
                "1": stationNamesAndTimes.station[46].etd[1].estimate[0].minutes
            }
        };
    };
}
