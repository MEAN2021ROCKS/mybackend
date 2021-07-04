'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

let app = express();

global.__rootRequire = function (relpath) {
  return require(path.join(__dirname, relpath));
};

process.env.NODE_ENV = process.env.NODE_ENV || 'local'; //local server
const config = require('./app/config/config.js').get(process.env.NODE_ENV);
require('./app/config/db');

// imports
const v1Routes = require('./app/api/v1/routes');

// constant Files
const errorTypes = require('./app/lib/errorTypes');
const coomonQuery = require('./app/lib/commonQuerries');
const { verify } = require('./app/lib/verifyUser');

app.use(cors());

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(async (req, res, next) => {
  console.log(req.originalUrl);
  const allowed = req.originalUrl;
  if (allowed === '/api/v1/admin/user/login' || allowed === '/api/v1/admin/user/signup') {
     next();
  }
  else {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(' ');
    const verified = await coomonQuery.verifyToken(token[1]);
    console.log('im verifying');
    if (verified.status) {
      req.user = verified.user;
      const roleVerify = await verify(req, res);
      if (!roleVerify) {
        return res.status(401).json({ 'flowStatus': 'UnAuthorized' });
      }
      next();        
    } else {      
      return res.status(401).json({ 'flowStatus': 'UnAuthorized' });        
    }
  }  
});

app.use((req, res, next) => {
  res.customResponse = (data, returnToPromise = fasle) => {
    if (returnToPromise) {
      return Promise.resolve(data);
    } else {
      try {
        if (!res.headersSent) {
          if (data.flowStatus === 'SUCCESS') {
            return res.json(data);
          } else if (data.flowStatus === 'FAILURE' && res.statusCode === 200) {
            return res.send(data)
          } else {
            return res.send(data);
          }
        } else {
          return;
        }

      } catch (error) {
        return res.status(500).json({flowStatus: 'FAILURE', flowStatusMessage: error.message})

      }
    }
  }
  res.customError = (type, errMessgae) => {
    if (type === errorTypes.errorTypes.INPUT || type === errorTypes.errorTypes.EMAIL || type === errorTypes.errorTypes.NOTFOUND || type === errorTypes.errorTypes.PASSWORD) {
      return res.status(200).customResponse({flowStatus: 'FAILURE', flowStatusMessage:errMessgae, result : {}}, false);
    }
  }
  next();
})

// Routes Calling
app.use('/render', (req,res)=>{
  res.render(__dirname+'/app/templates/register',{name:'obul'});
})
app.use('/api/v1', v1Routes)

// start server
var port = process.env.PORT || config.port;
app.listen(port).timeout = 1800000; //30 min
console.log("Available on:", config.backendBaseUrl)
