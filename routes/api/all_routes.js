const bartKey = process.env.BART_API_KEY;
const moment = require('moment');
const weekdaySchedule = require('./weekday_schedule');
const weekdayAfterSeven = require('./weekday_schedule_after_7pm');
const sundaySchedule = require('./sunday_schedule');
const saturdaySchedule = require("./saturday_schedule");

module.exports = (app) => {
    
    /**
     * Get the day and time
     * 
     */
    const getDayAndTime = () => { 
        const date = new Date();

        const day = date.getDay();
        const hour = date.getHours();
        const minutes = date.getMinutes();

        return [day, hour, minutes];
    }    

    /**
     * Update the time
     */
    //  setInterval(() => getDayAndTime(), 111000);


    // app.get('/base-station-routes', async (req,res) => {
        
        // const dayAndTime = getDayAndTime();

        // (dayAndTime[0] > 0 && dayAndTime[0] < 6) 
        //dayAndTime[1] >= 19 
        /**
         *  Need to take care of special cases: 
         * 
         *  BayFair to Dublin - last train is at 1:12am
         *  Richmond to Warm Springs - last train 12:17pm
         *  Warm Springs to Richmond - last train 11:57pm
         *  
         *  SFO to Millbrae - Still part of Antioch line?
         *  Daly to SFO  till 9 and then Daly to Millbrae after
         *  Which means < 9 Need to get data for SFO to Mill = purple line
         * 
         * Sunday = 0 Saturday = 6
         *  7 pm = 19
         */

        // const monday = moment().day("Monday");
        // const friday = moment().day("Friday");
        // const sevenPM = moment("19:00", "HH:mm A");

        // if( (moment().isBetween(monday, friday) && moment().isBefore(sevenPM)) === true ){
        //     const weekData = weekdaySchedule(app); 
        //     let beforeSevenData = await weekData();
        //     beforeSevenData = JSON.stringify(beforeSevenData);
        //     res.send(beforeSevenData);
        // }

        // if((dayAndTime[0] > 0 && dayAndTime[0] < 6) && (dayAndTime[1] < 19)){
            
        //     const weekData = weekdaySchedule(app); 
        //     let beforeSevenData = await weekData();
        //     beforeSevenData = JSON.stringify(beforeSevenData);
        //     res.send(beforeSevenData);
        // } 

       
       
        
    //     if( (  moment().isBetween(monday, friday) && moment().isAfter(sevenPM) ) === true ){
    //         const weekAfterSevenData = weekdayAfterSeven(app); 
    //         let afterSevenData = await weekAfterSevenData();
    //         afterSevenData = JSON.stringify(afterSevenData);
    //         res.send(afterSevenData);
    //     }

    //     if(moment().day("Saturday") === true){
    //         const allDaySat = saturdaySchedule(app);
    //         let saturday = await allDaySat();
    //         saturday = JSON.stringify(saturday);
    //         res.send(saturday);
    //     } 

    //     if(dayAndTime[0] === 0){
    //         const sundayData = sundaySchedule(app);
    //         const sunday = await sundayData();

    //         res.send(sunday);
    //     } 
    // })

    
}

