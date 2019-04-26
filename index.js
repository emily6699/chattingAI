'use strict';

require('dotenv').config()


const express = require('express');
const app = express();

// app.use(express.static(__dirname + '/public/views')); //html
app.use(express.static(__dirname + '/public')); //js, css, images

const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

const io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log('a user connected')
})

const apiai = require('apiai')('bbf75702f8f143a69c5a6bada55eb814')

//Web UI
app.get('/', (req, res) => {
    res.sendFile('/Users/emily/fs/robotAI/public/views/index.html');
})

io.on('connection', function (socket) {
    socket.on('chat message', (test) => {
        console.log('Message: ' + text)
        // get a reply from API.AI

        let apiaiReq = apiai.textRequest(test, {
            sessionId: APIAI_SESSION_ID
        });

        apiaiReq.on('response', (response) => {
            let aiTest = response.result.fulfillment.speech;
            socket.emit('bot reply', aiTest); // Send the result back to the browser!
        });

        apiaiReq.on('error', (error) => {
            console.log(error);
        });

        apiaiReq.end();
    })

})

