const server = require('./api/server');

const port = 9000;

// START SERVER HERE
server.listen(port, () => {
    console.log(`server started on http://localhost:${port}`)
})