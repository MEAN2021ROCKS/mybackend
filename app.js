const express = require('express');
const bodyParser = require('body-parser');

let app = express();
process.env.NODE_ENV = process.env.NODE_ENV || 'local'; //local server
const config = require('./app/config/config.js').get(process.env.NODE_ENV);
require('./app/config/db');

// All api requests
app.use(function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization,multipart/form-data');

    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// start server
var port = process.env.PORT || config.port;
app.listen(port).timeout = 1800000; //30 min
console.log("Available on:", config.backendBaseUrl)
