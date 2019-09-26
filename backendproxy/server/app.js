const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');
require('dotenv').config;
const app = express();
app.use(cors());
app.use(morgan('tiny'));




app.get('/weatherdata',(req, res) =>{
    const url = 'https://www.zipcodeapi.com/rest/ACyNGg4mkGWQGw6nw9KWGdoW5iLJsrM8dkRNT4Yr53SESP7NlYCzpWraFAuGrgCJ/info.json/' + zipcode + '/radians';
    fetch(`${url}&key=${process.env.theKey}`)
    .then(response => response.json())
    .then(json => {
        res.json(json);
    })
});

function dataNotFound(req,res,next){
    res.status(404);
    const error = new Error('Data Not Found');
    next(error);
}

function errorHandler(error,req,res,next){
    res.status(res.statusCode || 500);
    res.json({
        message: error.message
    })
}

app.use(dataNotFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log('listening on port', port);
});