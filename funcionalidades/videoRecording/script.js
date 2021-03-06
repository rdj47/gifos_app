async function giphyConnection (url,form) {
    try {
        //const resp = await fetch(url);
        const resp = await fetch(url, {
        method: 'POST',
        //mode: 'no-cors',  
        body: form,
        headers: {'Access-Control-Allow-Origin': '*'}});
        const info = await resp.json();
        return info;
        //console.log (await response.text());
    }
    catch (err) {
        console.log('fetch failed', err);
    }
}
//let api_key = "TWYJkQI33iJE8p0rxE9ckezdCATJKI40";
let api_key = "12xR8EXZYIjZ3NLdqajJlmVoKMgAT2Y7";

/*// Test function for Accessing Media Devices
async function getVideoDevices(constrains) {
    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia(constrains);
    } catch(err) {
    }
  }
let constrains = { audio: false, video: {height: { max: 600 } }};
let videoDevices = getVideoDevices(constrains);
videoDevices.then(function(mediaStream) {
    var video = document.querySelector('video');
    console.log (video.id);
    video.srcObject = mediaStream;
    video.onloadedmetadata = function(e) {
        video.play();
    };
  })
  .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.*/

'use strict';

const video = document.getElementById('video');
const snap = document.getElementById("snap");
const canvas = document.getElementById('canvas');
const errorMsgElement = document.querySelector('span#errorMsg');

const constraints = {
audio: true,
video: {
width: 800, height: 600
}
};

// Acceso a la webcam
async function init() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    } catch (e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    }
}
// Correcto!
function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;
}
// Load init
init();
// Dibuja la imagen
    var context = canvas.getContext('2d');
    snap.addEventListener("click", function() {
    context.drawImage(video, 0, 0, 640, 480);
});

let recordGifo = document.getElementById('recorder');
let stopRecordGifo = document.getElementById('stop-recorder');

//recordGifo.addEventListener('click', startRecord);

// Start video
let startRecord = function () { 
    navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(async function(stream) {
    let recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
    });
    recorder.startRecording();
    let stopRecord = function () { recorder.stopRecording(function() {
        // Handle video data
        let blob = recorder.getBlob();
        let form = new FormData();
        form.append('file', recorder.getBlob(), 'myGif.gif');
        console.log(form.get('file'));
        invokeSaveAsDialog(blob);
        let fileName= "RDJ472007_myGif.gif";
        console.log (`http://upload.giphy.com/v1/gifs?file=${fileName}&api_key=${api_key}`);
        let uploadGif= giphyConnection (`https://upload.giphy.com/v1/gifs?api_key=${api_key}`,form);
        uploadGif.then (response => {
            console.log (response);
            console.log (response.data[0]);
            console.log ("Longitud Array Objetos: "+ response.data.length);
            for (let i=0; i<response.data.length; i++) {
            console.log("GIF Requested: "+response.data[i]);
        }
        }).catch(error => {
            console.log(error);
        })
    });}
    stopRecordGifo.addEventListener('click',stopRecord);
    //const sleep = m => new Promise(r => setTimeout(r, m));
    //await sleep(3000);

// Stop video

});}

recordGifo.addEventListener('click', startRecord);