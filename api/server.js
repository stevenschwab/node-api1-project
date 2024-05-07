// import the express library to provide web server functionalities
const express = require('express');

// import the custom users model containing the database access utility functions
const users = require('./users/model');

// create an instance of an express application representing the web server
const server = express();

// add global middleware to the web server to parse incoming JSON payloads from the request body
server.use(express.json());

// endpoints
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    try {
        throw new Error('error')
    } catch (err) {
        res.status(500).json({
            message: "There was an error while saving the user to the database"
        })
    }
})

// expose the server to other modules
module.exports = server;
