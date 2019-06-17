/*
    not sure what body-parser is
    go back and check

    not gonna have bcrypt just yet
*/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();


require('dotenv').config();
require('./routes')(app);



const bartKey = process.env.BART_API_KEY;
const port = process.env.PORT || 5000;

app.use(cors());

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
})

app.get('/', (req,res) => {
    res.send(`Port ${port}`);
})


