/* global process */
/* global __dirname */
'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const Path = require('path');
const Vision = require('vision');

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.register(Vision, function(err) {
    if (err) throw err;
});

server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'templates')
});

server.route({
    path: '/',
    method: 'GET',
    handler: {
        view: 'index.html'
    }
});

server.start(function () {
    console.log('Server running at: ', server.info.uri);
});