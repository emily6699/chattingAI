const socket = io();

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;

document.querySelector('button').addEventListener('click', ()=>{
    recognition.start();
});


recognition.addEventListener('result', (e)=>{
    let last = e.results.length-1;
    let text = e.results[last][0].transcript;

    console.log('Confidence: ' + e.resultes[0][0].confidence);

    // we will use Socket.IO here later...
    socket.emit('chat message', text);
})