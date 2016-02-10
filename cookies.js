/* global process */
'use strict';

const Hapi = require('hapi');
const Boom = require('boom');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.state('session', {
    path: '/',
    encoding: 'base64json',
    domain: 'localhost',
    ttl: 100
});

server.route({
    path: '/set-cookie',
    method: 'GET',
    config: {
        state: {
            parse: true,
            failAction: 'log'
        }
    },
    handler: function(request, response) {
        response({
            message: 'success'
        }).state('session', { key: 'makemehapi' });
    }
});

server.route({
    path: '/check-cookie',
    method: 'GET',
    handler: function(request, response) {
        let session = request.state.session;
        let result;
        
        if(session) {
            result = { user: 'hapi' };
        } else {
            result = Boom.unauthorized('Missing authentication');
        }
        
        response(result);
    }
});

server.start(function() {
    console.log('Server running at: ', server.info.uri);
});