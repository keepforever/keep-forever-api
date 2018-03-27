const express = require('express');
const app = express(); // spin up the app

const blogRoutes = require('./api/routes/blogs');

// middleware
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
