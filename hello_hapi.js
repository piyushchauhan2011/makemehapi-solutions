/* global process */
'use strict';
const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({ path: '/', method: 'GET', handler: handler });

function handler(request, response) {
    response('Hello hapi');
}

server.start(function () {
    console.log('Server running at: ', server.info.uri);
});