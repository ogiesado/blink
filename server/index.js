const server = require('express')();

server.get('/', (req, res) => {
    res.send('We are up in here! ENV XX--YY Jump Lucy ' + process.env.NODE_ENV);
});

module.exports = server;