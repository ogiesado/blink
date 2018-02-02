import makeServer from './makeServer';
import env from './utils/env';

makeServer().then((server) => {
    const port = env('NODE_PORT');
    server.listen(port, () => console.log(`We are listening on port ${port}!`))
}).catch((error) => {
    throw error;
});

