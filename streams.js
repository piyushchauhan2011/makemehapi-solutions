/* global process */
/* global __dirname */
'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Rot13 = require('rot13-transform');
const Fs = require('fs');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({
    path: '/',
    method: 'GET',
    handler: function (request, response) {
        const fileStream = Fs.createReadStream(Path.join(__dirname, 'public/rot13.txt'));
        let result =
            fileStream
                .pipe(Rot13());
        response(result);
    }
});

server.start(function () {
    console.log('Server running at: ', server.info.uri);
});