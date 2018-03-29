const express = require('express');
const app = express(); // spin up the app
const morgan = require('morgan')
// Dependency to parse body of incoming requests
const bodyParser = require('body-parser');
const blogRoutes = require('./api/routes/blogs');
const mongoose = require('mongoose');

mongoose.connect(
    "mongodb://keepforever:"+process.env.MONGO_ATLAS_PW+"@keep-forever-api-shard-00-00-14sf8.mongodb.net:27017,keep-forever-api-shard-00-01-14sf8.mongodb.net:27017,keep-forever-api-shard-00-02-14sf8.mongodb.net:27017/test?ssl=true&replicaSet=keep-forever-api-shard-0&authSource=admin"
);
mongoose.Promise = global.Promise;

// logger middleware to log requests to terminal
app.use(morgan('dev'));
// extracts urlencoded data and makes readable to us.
app.use(bodyParser.urlencoded({ extended: false }));
// extracts json data and makes easily readable to us.
app.use(bodyParser.json());

// append headers to thwart CORS errors "cross-origin-resource-sharing"
// tell the browser "hey, everything is A-OK".
// '*' gives access to all requesters, could restrict it by
// 'http://my-cool-page.com'
app.use((req, res, next) =>  {
    res.header("Access-Control-Allow-Origin", "*");
// define which headers API accepts.
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
// Browser will send an OPTIONS request to see which types of requests
// are valid per the API's config and intended capabilities.
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({})
    }
    next();
});

// '/blogs' is a filter: "only requests beginning with '/blogs' proceed..."
// app.use(filter, path to use if passes filter);
app.use('/blogs', blogRoutes);

// handles and unknow requests and forward downstream
// to next middleware
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})
// responds to error with json error object with message property.
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


module.exports = app;
