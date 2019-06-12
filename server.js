/*
    not sure what body-parser is
    go back and check

    not gonna have bcrypt just yet
*/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

require('dotenv').config();

const bartKey = process.env.BART_API_KEY;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
})


// Grabbing all of the stations data
app.get('/', async(req, res, next) => {
    
    try{
        const response  = await axios.get(
                `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=${bartKey}&json=y`
        );
        const data = response.data.root;
        res.send(data);
    }catch(e){
        // 503 = response unavailable. throw err
        console.log(`Error: ${e}`);
    }
})

