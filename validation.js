/* global process */
/* global __dirname */
'use strict';

const Hapi = require('hapi');
const Joi = require('joi');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({
    path: '/chickens/{breed}',
    method: 'GET',
    handler: function(request, response) {
        response('You asked for the chickens ' + request.params.breed);
    },
    config: {
        validate: {
            params: {
                breed: Joi.required()
            }
        }
    }
});

server.start(function() {
    console.log('Server running at: ', server.info.uri);
});