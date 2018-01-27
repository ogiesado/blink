const server = require('./server');

console.log(process.env.NODE_ENV);

server.listen(3000, () => console.log('We are listening on port 3000!'))
