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
    path: '/login',
    method: 'POST',
    handler: function(request, response) {
        response('login successful');
    },
    config: {
        validate: {
            payload: Joi.object({
                isGuest: Joi.boolean().required(),
                username: Joi.string().when('isGuest', {
                    is: false,
                    then: Joi.required()
                }),
                password: Joi.string().alphanum(),
                accessToken: Joi.string().alphanum()
            })
            .options({ allowUnknown: true })
            .without('password', 'accessToken')
        }
    }
});

server.start(function() {
    console.log('Server running at: ', server.info.uri);
});