/* global process */
'use strict';

const Hapi = require('hapi');
const Auth = require('hapi-auth-basic');

let user = { name: 'hapi', password: 'auth' };
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

let validate = function(request, username, password, callback) {
    let isValid = username === user.name && password === user.password;
    
    return callback(null, isValid, { name: user.name });
};

server.register(Auth, function(err) {
    server.auth.strategy('simple', 'basic', { validateFunc: validate });
});

server.route({
    path: '/',
    method: 'GET',
    config: {
        auth: 'simple'
    },
    handler: function(request, response) {
        response('Authenticated');
    }
});

server.start(function() {
    console.log('Server running at: ', server.info.uri);
});