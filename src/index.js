'use strict';

// load modules
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = require('body-parser').json;
const morgan = require('morgan');
const mongoose = require('mongoose');
var routes = require('./routes/index');


const app = express();

// mongodb connection
mongoose.connect("mongodb://localhost:27017/course-api");
var db = mongoose.connection;
// display message if mongodb connection error
db.on('error', console.error.bind(console, 'connection error'));
// open mongo connection, display message on mongodb success
db.once("open", function(){
	console.log("db connection successful");
});


// set our port
app.set('port', process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan('dev'));

// parse incoming requests
app.use(jsonParser());
app.use(bodyParser.urlencoded({ extended: false }));

// TODO add additional routes here

// send a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Course Review API'
  });
});

app.use('/api', routes);


// uncomment this route in order to test the global error handler
// app.get('/error', function (req, res) {
//   throw new Error('Test error');
// });

// send 404 if no other route matched
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route Not Found'
  })
})

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
