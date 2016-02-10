/* global process */
/* global __dirname */
'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({
    path: '/upload',
    method: 'POST',
    config: {
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        }
    },
    handler: function(request, response) {
        let body = '';
        request.payload.file.on('data', function(data) {
            body += data;
        });
        
        request.payload.file.on('end', function() {
            response(JSON.stringify({
                description: request.payload.description,
                file: {
                    data: body,
                    filename: request.payload.file.hapi.filename,
                    headers: request.payload.file.hapi.headers
                }
            }));
        });
    }
});

server.start(function() {
    console.log('Server running at: ', server.info.uri);
});