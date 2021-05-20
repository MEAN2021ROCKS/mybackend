'use strict';
let mongoose = require('mongoose');

const config = require('./config').get(process.env.NODE_ENV);
mongoose.Promise = global.Promise;
mongoose.connect(config.db.url, {user: config.db.user, pass: config.db.password, useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection failed"));
db.once('open', function() {
    console.log('Database Connected Successfully!');    
});
