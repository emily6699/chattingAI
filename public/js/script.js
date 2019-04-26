'use strict';

const socket = io();

const outputYou = document.querySelector('.output-you');
const outputBot = document.querySelector('.output-bot');


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.querySelector('button').addEventListener('click', () => {
    console.log('start to listen')
    recognition.start();
});

recognition.addEventListener('speechstart', () => {
    console.log('Speech has been detected.');
});


recognition.addEventListener('result', (e) => {
    console.log('Result has been detected.')

    let last = e.results.length - 1;
    let text = e.results[last][0].transcript;

    outputYou.textContent = text;
    console.log('Confidence: ' + e.resultes[0][0].confidence);

    // we will use Socket.IO here later...
    socket.emit('chat message', text);
});

recognition.addEventListener('speechend', () => {
    console.log('speech end')
    recognition.stop();
});

recognition.addEventListener('error', (e) => {

    outputBot.textContent = 'Error: ' + e.error;

});

const synthVoice = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    synth.speack(utterance);
}

socket.on('Robot2019 said', function (replyText) {
    synthVoice(replyText);

    if (replyText == '') replyText = '(No answer...)';
    outputBot.textContent = replyText;
});