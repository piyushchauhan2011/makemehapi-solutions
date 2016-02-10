/* global process */
'use strict';
const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({
    path: '/{name}',
    method: 'GET',
    handler: function(request, response) {
        response(`Hello ${request.params.name}`);
    }
});

server.start(function() {
    console.log('Server listening at: ', server.info.uri);
});