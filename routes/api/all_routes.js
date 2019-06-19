const bartKey = process.env.BART_API_KEY;
const weekdaySchedule = require('./weekday_schedule');

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
     setInterval(() => getDayAndTime(), 111000);


    app.get('/base-station-routes', async (req,res) => {
        
        
        const dayAndTime = getDayAndTime();

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
         */

        if((dayAndTime[0] > 0 && dayAndTime[0] < 6) && (dayAndTime[1] < 19)){
            
            const weekData = weekdaySchedule(app); 
            const beforeSevenData = await weekData();

            if(beforeSevenData["DalyToWarm"].Arrival2 === null){
                beforeSevenData["DalyToWarm"].Arrival2 = "Last train from Daly City to Warm Springs arrives 6:57pm";
            }
            res.send(beforeSevenData);
        } 

        if((dayAndTime[0] > 0 && dayAndTime[0] < 6) && (dayAndTime[1] > 19)){
            
            const weekData = weekdaySchedule(app); 
            const afterSevenData = await weekData();

            if(afterSevenData["DalyToSFO"].Arrival2 === null ){
                afterSevenData["DalyToSFO"].Arrival2 = "Last train from Daly City to SFO arrives at 8:33pm";
            }
            
            res.send(afterSevenData);
        } 



       
    
        // if(dateAndTime[0] === 1){
        //    console.log(sundaySchedule);
        // }

    })
}

