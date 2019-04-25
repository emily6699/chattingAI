const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views')); //html
app.use(express.static(__dirname + '/publice')); //js, css, images

const server = app.listen(5000);


const apiai = require('apiai')(bbf75702f8f143a69c5a6bada55eb814)

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

import.on('connection', function (socket) {
    socket.on('chat message', (test) => {
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

