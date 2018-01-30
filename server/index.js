const server = require('express')();

server.get('/', (req, res) => {
    res.send('Here we go yep yep! ' + process.env.NODE_ENV);
});

module.exports = server;