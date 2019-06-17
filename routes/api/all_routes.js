const axios = require('axios');
const bartKey = process.env.BART_API_KEY;


module.exports = (app) => {

    /**
     * Get the day and time
     * 
     */
    function getDayAndTime(){
        const date = new Date();

        const day = date.getDay();
        const hour = date.getHours();
        const minutes = date.getMinutes();

        return [day, hour, minutes];
    }    
    
    /*
     *  Async/await returns a promise
     *  Call Bart API 
     */

     const callBartAPI = async () => {
        try{
            const response = await axios.get(
                `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=${bartKey}&json=y`);
            return response;
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    /**
     * Call Bart API every 1.50 minutes
     * This works. Need to work on testing function for this
     */
    setInterval(() => callBartAPI(), 111000);


    /**
     * Update the time
     */
     setInterval(() => getDayAndTime(), 111000);


    app.get('/base-station-routes', async (req,res) => {
        
        
        const dayAndTime = getDayAndTime();

        const getStationData = await callBartAPI();
        const allStationData = getStationData.data.root;
        
        // res.send(allStationData.station[41]);
      

        if((dayAndTime[0] > 0 && dayAndTime[0] <= 6) && (dayAndTime[1] < 19)){
            const baseStationsAndTimes = {
                "WarmToDaly": {
                    "Arrival1": allStationData.station[41].etd[0].estimate[0].minutes,
                    "Arrival2": allStationData.station[41].etd[0].estimate[1].minutes
                },
                "WarmToRich": {
                    "Arrival1": allStationData.station[41].etd[1].estimate[0].minutes,
                    "Arrival2": allStationData.station[41].etd[1].estimate[1].minutes
                },
                "DublToDaly": {
                    "Arrival1": allStationData.station[24].etd[0].estimate[0].minutes,
                    "Arrival2": allStationData.station[24].etd[0].estimate[1].minutes
                },
                "AntcToMLBR": {
                    "Arrival1": allStationData.station[18].etd[0].estimate[0].minutes,
                    "Arrival2": allStationData.station[18].etd[0].estimate[1].minutes
                },
                "RichToDaly": {
                    "Arrival1": allStationData.station[40].etd[0].estimate[0].minutes,
                    "Arrival2": allStationData.station[40].etd[0].estimate[1].minutes
                },
                "RichToWarm": {
                    "Arrival1": allStationData.station[40].etd[1].estimate[0].minutes,
                    "Arrival2": allStationData.station[24].etd[1].estimate[1].minutes
                },
                "DalyToAntc": {
                    "Arrival1": allStationData.station[34].etd[0].estimate[0].minutes,
                    "Arrival2": allStationData.station[34].etd[0].estimate[1].minutes,
                },
                "DalyToAntc": {
                    "Arrival1": allStationData.station[34].etd[0].estimate[0].minutes,
                    "Arrival2": allStationData.station[34].etd[0].estimate[1].minutes,
                },
                "DalyToDubl": {
                    "Arrival1": allStationData.station[34].etd[1].estimate[0].minutes,
                    "Arrival2": allStationData.station[34].etd[1].estimate[1].minutes,
                },
                "DalyToRich": {
                    "Arrival1": allStationData.station[34].etd[2].estimate[0].minutes,
                    "Arrival2": allStationData.station[34].etd[2].estimate[1].minutes,
                },
                "DalyToSFO": {
                    "Arrival1": allStationData.station[34].etd[3].estimate[0].minutes,
                    "Arrival2": allStationData.station[34].etd[3].estimate[1].minutes,
                },
                "DalyToWarm": {
                    "Arrival1": allStationData.station[34].etd[4].estimate[0].minutes,
                    "Arrival2": allStationData.station[34].etd[4].estimate[1].minutes,
                },
                "SFOToAntc": {
                    "Arrival1": allStationData.station[46].etd[0].estimate[0].minutes,
                    "Arrival2": allStationData.station[46].etd[0].estimate[1].minutes,
                }
            };

            res.send(baseStationsAndTimes);
        }
    
        // if(dateAndTime[0] === 1){
        //    console.log(sundaySchedule);
        // }

    })
}
