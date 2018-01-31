import express from 'express';
import path from 'path';

/**
 * Bootraps the server
 * @param {Express} server The server app
 * @return {void}
 */
export default function(server) {
    server.use('/assets', express.static('build'));
    server.use('/files', express.static(path.join('storage', 'public')));

    server.get('/', (req, res) => {
        res.send('Hope is not a strategy.  A solid plan is... for sure ' + process.env.NODE_ENV);
    });

    const db = {
        stop(callback) {
            console.log('shutting down db...');
            callback(null);
        }
    };

    process.on('SIGINT', function () {
        console.log('SHATXX');
        db.stop(function (err) {
            process.exit(err ? 1 : 0);
        });
    });
}
