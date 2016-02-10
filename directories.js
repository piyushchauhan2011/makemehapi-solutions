/* global process */
/* global __dirname */
'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const Path = require('path');
const Inert = require('inert');

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.register(Inert, function(err) {
    if (err) throw err;
});

server.route({
    path: '/foo/bar/baz/{filename}',
    method: 'GET',
    handler: {
        directory: { path: Path.join(__dirname, 'public') }
    }
});

server.start(function () {
    console.log('Server running at: ', server.info.uri);
});