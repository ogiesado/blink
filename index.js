const server = require('./server');
const port = process.env.NODE_PORT;
const db = {
    stop(callback) {
        callback(null);
    }
};

process.on('SIGINT', function () {
    db.stop(function (err) {
        process.exit(err ? 1 : 0);
    });
});

server.listen(port, () => console.log(`We are listening on port ${port}!`))
