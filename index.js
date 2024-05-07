// import the server instance from the server file
const server = require('./api/server');

// specify and define the port the server will listen for incoming connections on
const port = 9000;

// start the server on the specified port and begin listening for incoming client connections
// output a message to the console when the server starts successfully
server.listen(port, () => {
    console.log(`server started on http://localhost:${port}`)
})