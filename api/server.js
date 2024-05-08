// import the express library to provide web server functionalities
const express = require('express');

// import the custom users model containing the database access utility functions
const users = require('./users/model');

// create an instance of an express application representing the web server
const server = express();

// add global middleware to the web server to parse incoming JSON payloads from the request body
server.use(express.json());

// endpoints
server.post('/api/users', async (req, res) => {
    const { name, bio } = req.body;
    try {
        if (!name || !bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            const createdUser = await users.insert({ name, bio })
            res.status(201).json({ ...createdUser })
        }
    } catch (err) {
        res.status(500).json({
            message: "There was an error while saving the user to the database"
        })
    }
})

server.get('/api/users', async (req, res) => {
    try {
        const foundUsers = await users.find()
        res.status(200).json({foundUsers})
    } catch (err) {
        res.status(500).json({
            message: "The users information could not be retrieved"
        })
    }
})

server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const foundUser = await users.findById(id)
        if (!foundUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            res.status(200).json({foundUser})
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be retrieved"
        })
    }
})

server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await users.remove(id)
        if (!deletedUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            res.status(200).json({deletedUser})
        }
    } catch (err) {
        res.status(500).json({
            message: "The user could not be removed"
        })
    }
})

server.put('/api/users/:id', async (req, res) => {
    try {
        const { name, bio } = req.body;
        if (!name || !bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            const { id } = req.params;
            const updatedUser = await users.update(id, { name, bio })
            if (!updatedUser) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.status(200).json({updatedUser})
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be modified"
        })
    }
})

// expose the server to other modules
module.exports = server;
