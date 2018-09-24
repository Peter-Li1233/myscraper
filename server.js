const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// //my scraping tools: request and cheerio package
// const request = require('request');
// const cheerio = require('cheerio');

// //Require all the models
// var db = require('./models');

var PORT = process.env.PORT || 3000;

//Initialize Express
var app = express();

//Configure middleware

//Use morgan logger for logging requests
app.use(logger('dev'));
//Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({extended: true}));
//Use express.static to server the public folder as a static directory
app.use(express.static('public'));

//Connect to Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';
//Set mongoose to leverage built in Javascript ES6 Promises
//Connect to Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

//Routes
require("./routes/api-routes")(app);

//Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});

