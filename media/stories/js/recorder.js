'use strict';

const canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');

if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    var getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}

function createThumbnail(video) {
  return new Promise((done, fail) => {
    const preview = document.createElement('video');
    preview.src = URL.createObjectURL(video);
    preview.addEventListener('loadeddata', () => preview.currentTime = 2);
    preview.addEventListener('seeked', () => {
      const snapshot = document.createElement('canvas');
      const context = snapshot.getContext('2d');
      snapshot.width = preview.videoWidth;
      snapshot.height = preview.videoHeight;
      context.drawImage(preview, 0, 0);
      snapshot.toBlob(done);
    });
  });
}

function record(app) {
  return new Promise((done, fail) => {
    let tmp;
    app.mode = 'preparing';
    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(stream => {
      app.mode = 'recording';
      let recorder = new MediaRecorder(stream);
      let chunks = [];
      recorder.addEventListener('dataavailable', e => chunks.push(e.data));
      recorder.addEventListener('stop', e => {
        const rec = new Blob(chunks, {'type': recorder.mimeTipe});
        const rec1 = new Blob(chunks[0]);
        chunks = null;
        recorder = stream = null;
        tmp.video = rec;
        tmp.frame = rec1;
      });
      recorder.start();
      
//      done(tmp);
      app.preview.srcObject = stream;
    }).catch(err => fail(err));
//    done();
//    setTimeout(() => {
//      fail('Не удалось записать видео');
//    }, app.limit);
  });
}
