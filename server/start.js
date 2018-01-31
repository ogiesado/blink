import server from './index';

const port = process.env.NODE_PORT;

server.listen(port, () => console.log(`We are listening on port ${port}!`))
