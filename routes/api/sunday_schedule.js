const axios = require('axios');
const bartKey = process.env.BART_API_KEY;
var moment = require('moment');

module.exports = (app) => {
   
    const callBartAPI = async () => {
        try{
            return response = await axios.get(
                `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=${bartKey}&json=y`);
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    return sundaySchedule = async() => {

 
        
        const getStationData = await callBartAPI();
        const stationNamesAndTimes =  getStationData.data.root;


          
     //    if(moment().format("hh:mm A").isBetween(test,test1)){
     //         console.log("hello world");
     //    }


     
     // if(moment(currentTime).isBetween(test1,test2)){
     //      console.log("It works");
     // }

     // if(moment(moment()).format("hh"))
        
     //    return Number.isNaN(stationNamesAndTimes.station[18].etd[0].estimate[0].minutes);
        /**
         *  If the last train passed, train === undefined
         * 
         *  Should send an update to the user that Dublin/Pleasanton only goes to MacArthur
         *  Maybe update them to go to 12th St/Oakland City Center to be able to transfer anywhere they want?
         */
        let sundayStationsAndTimes = {
            AntcToMlbr:{
                station: stationNamesAndTimes.station[18].name,
                destination: stationNamesAndTimes.station[18].etd[0] === undefined ? "We're sorry. There are no available trains at the moment" :
                             stationNamesAndTimes.station[18].etd[0].destination,
               firstArrival: stationNamesAndTimes.station[18].etd[0].estimate[0]=== undefined ? "We're sorry. There are no available trains at the moment" :
                     stationNamesAndTimes.station[18].etd[0].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[18].etd[0].estimate[1] === undefined ? "We're sorry. There are no available trains at the moment" :
                     stationNamesAndTimes.station[18].etd[0].estimate[1].minutes
            },    
            DublToMacArthur:{
                station: stationNamesAndTimes.station[24].etd[0].name,
                destination: stationNamesAndTimes.station[24].etd[0] === undefined ? "We're sorry. There are no available trains at the moment" :
                             stationNamesAndTimes.station[24].etd[0].destination,
                firstArrival: stationNamesAndTimes.station[24].etd[0].estimate[0].minutes === undefined ? "We're sorry. There are no available trains at the moment" :
                     stationNamesAndTimes.station[24].etd[0].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[24].etd[0].estimate[1].minutes === undefined ? "We're sorry. There are no available trains at the moment" :
                     stationNamesAndTimes.station[24].etd[0].estimate[1].minutes
            },
            DalyToAntc:{
                station: stationNamesAndTimes.station[34].name,
                destination: stationNamesAndTimes.station[34].etd[0] === undefined ? "We're sorry. There are no available trains at the moment" : 
                             stationNamesAndTimes.station[34].etd[0].destination,
                firstArrival: stationNamesAndTimes.station[34].etd[0].estimate[0].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[34].etd[0].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[34].etd[0].estimate[1].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[34].etd[0].estimate[1].minutes
            },
            DalyToSFO:{
                station: stationNamesAndTimes.station[34].name,
                destination: stationNamesAndTimes.station[34].etd[1] === undefined ? "We're sorry. There are no available trains at the moment" : 
                             stationNamesAndTimes.station[34].etd[1].destination,
                firstArrival: stationNamesAndTimes.station[34].etd[1].estimate[0].minutes === undefined ? "We're sorry. There are no available trains at the moment" :
                     stationNamesAndTimes.station[34].etd[1].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[34].etd[1].estimate[1].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[34].etd[1].estimate[1].minutes 
            },
            RichToWarm:{
                station: stationNamesAndTimes.station[40].name,
                destination: stationNamesAndTimes.station[40].etd[0] === undefined ? "We're sorry. There are no available trains at the moment" : 
                             stationNamesAndTimes.station[40].etd[0].destination,
                firstArrival: stationNamesAndTimes.station[40].etd[0].estimate[0].minutes === undefined ? "We're sorry. There are no available trains at the moment" :
                     stationNamesAndTimes.station[40].etd[0].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[40].etd[0].estimate[1].minutes === undefined ? "We're sorry. There are no available trains at the moment" :
                     stationNamesAndTimes.station[40].etd[0].estimate[1].minutes,
            },
            WarmToRich:{
                station: stationNamesAndTimes.station[41].name,
                destination: stationNamesAndTimes.station[41].etd[0] === undefined ? "We're sorry. There are no available trains at the moment" : 
                             stationNamesAndTimes.station[41].etd[0].destination,
                firstArrival: stationNamesAndTimes.station[41].etd[0].estimate[0].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[41].etd[0].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[41].etd[0].estimate[1].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[41].etd[0].estimate[1].minutes
            },
            MlbrToSFO:{
                station: stationNamesAndTimes.station[45].name,
                destination: stationNamesAndTimes.station[45].etd[0] === undefined ? "We're sorry. There are no available trains at the moment" : 
                             stationNamesAndTimes.station[45].etd[0].destination,
                firstArrival: stationNamesAndTimes.station[45].etd[0].estimate[0].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[45].etd[0].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[45].etd[0].estimate[1].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[45].etd[0].estimate[1].minutes
            },
            SFOToAntc:{
                station: stationNamesAndTimes.station[46].name,
                destination: stationNamesAndTimes.station[46].etd[0] === undefined ? "We're sorry. There are no available trains at the moment" : 
                             stationNamesAndTimes.station[46].etd[0].destination,
                firstArrival: stationNamesAndTimes.station[46].etd[0].estimate[0].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[46].etd[0].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[46].etd[0].estimate[1] === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[46].etd[0].estimate[1].minutes
            },
            SFOToMlbr:{
                station: stationNamesAndTimes.station[46].name,
                destination: stationNamesAndTimes.station[46].etd[1] === undefined ? "We're sorry. There are no available trains at the moment" : 
                             stationNamesAndTimes.station[46].etd[1].destination,
                firstArrival: stationNamesAndTimes.station[46].etd[1].estimate[0].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[46].etd[1].estimate[0].minutes,
                secondArrival: stationNamesAndTimes.station[46].etd[1].estimate[1].minutes === undefined ? "We're sorry. There are no available trains at the moment" : 
                     stationNamesAndTimes.station[46].etd[1].estimate[1].minutes
            }
        }
        
        /**
         * Dublin to MacArthur starts at 7:55
         */
     //    const sevenThirtyFive = moment("07:35", "HH:mm A");
     //    if(moment().isAfter(sevenThirtyFive)){

     //    }

        return sundayStationsAndTimes;
        
     }

}