const video = document.getElementById('video')
/*
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)
*/

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

startVideo(); 
/*
video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})
*/
/*
// Draw visuals based on emotion
function draw() {
  background(0, 20); // Semi-transparent black for fade effect

  if (emotion === "happiness") {
    fill(255, 204, 0, 150);
    for (let i = 0; i < 10; i++) {
      ellipse(random(width), random(height), random(50, 150));
    }
  } else if (emotion === "sadness") {
    fill(0, 102, 255, 150);
    for (let i = 0; i < 5; i++) {
      ellipse(random(width), random(height), random(30, 80));
    }
  } else if (emotion === "calm") {
    fill(102, 255, 178, 150);
    for (let i = 0; i < 8; i++) {
      rect(random(width), random(height), random(50, 150), random(50, 150));
    }
  } else if (emotion === "surprise") {
    fill(255, 50, 50, 150);
    for (let i = 0; i < 20; i++) {
      ellipse(random(width), random(height), random(10, 50));
    }
  }
  
}
*/