/*
    not sure what body-parser is
    go back and check

    not gonna have bcrypt just yet
*/

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();


require('dotenv').config();
require('./routes')(app);
// require('./routes/api/all_routes');

require('./routes');

const bartKey = process.env.BART_API_KEY;
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
})

app.get('/', (req,res) => {
    res.send(`Port ${port}`);
})

const callBartAPI = async (routes) => {
    try{
        return response = await axios.get(
            `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${routes}&key=${bartKey}&json=y`);
    }catch(e){
        console.log(`Error: ${e}`);
    }
};


// app.get('/test', (req,res) => {
    
//     const hayward = "HAYW";
//     callBartAPI(hayward).then( apiResponse => {
//         console.log(apiResponse.data.root.station)
//     })

// })

app.post('/submission', (req,res) => {
    // console.log(req.body.station);
    const station = req.body.station;
    const destination = req.body.destination;
    console.log(station);

    callBartAPI(station).then( apiResponse => {
        // res.send( apiResponse.data.root.station )
        const destinationData = apiResponse.data.root.station[0];
        const dataUnavailable = "Data is unavailable at this time";
        // res.send(destinationData.etd);

        // console.log(destinationData.etd[0])

        for( let i = 0; i < destinationData.etd.length; i++){
            if(destinationData.etd[i].abbreviation === destination){
                let stationEstimates = destinationData.etd[i].estimate;
                let stationDepartures = {
                    firstArrival: stationEstimates[0].minutes,
                    secondArrival: stationEstimates[1] !== undefined ? stationEstimates[1].minutes : dataUnavailable 
                }
                
                res.send(JSON.stringify(stationDepartures));
                
            }
            // console.log(destinationData.etd[i]);
        }
    })
})


