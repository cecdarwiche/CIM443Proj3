const video = document.getElementById('video')
//let section = document.querySelectorAll("section"); //select all <section> elements
const suggestSection = document.querySelector('.suggestsec');
const suggestions = suggestSection.querySelectorAll('h3');



Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    if (detections.length > 0) {
      // Get the first face's expressions
      const expressions = detections[0].expressions;

      // Find the emotion with the highest probability
      const dominantEmotion = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );

      // Change background based on the detected emotion
      
      changeBackground(dominantEmotion);
    }
  }, 3000);
});

// Function to change the background based on emotion
function changeBackground(emotion) {
  const body = document.body;
  const section = document.querySelector("section"); // Ensure this matches your HTML structure

  // Hide all <h2> elements
  let allEmotions = section.querySelectorAll("h2");
  for (let elem of allEmotions) {
    elem.style.display = "none";
  }

  // Change background and show relevant text
  if (emotion == 'happy') {
    body.style.background = 'linear-gradient(to right, #ff9a9e, #fad0c4)';
    let emotions = section.querySelectorAll("h2.happy");
    for (let emotion of emotions) {
      emotion.style.display = "block"; 
    }
    updateSuggestion(emotion);
    updateParticles(emotion);
  } else if (emotion == 'sad') {
    body.style.background = 'linear-gradient(to right, #a1c4fd, #c2e9fb)';
    let emotions = section.querySelectorAll("h2.sad");
    for (let emotion of emotions) {
      emotion.style.display = "block"; 
    }
    updateSuggestion(emotion);
    updateParticles(emotion);
  } else if (emotion == 'angry') {
    body.style.background = 'linear-gradient(to right, #f83600, #f9d423)';
    let emotions = section.querySelectorAll("h2.angry");
    for (let emotion of emotions) {
      emotion.style.display = "block"; 
    }
    updateSuggestion(emotion);
    updateParticles(emotion);
  } else if (emotion == 'surprised') {
    body.style.background = 'linear-gradient(to right, #ffecd2, #fcb69f)';
    let emotions = section.querySelectorAll("h2.surprised");
    for (let emotion of emotions) {
      emotion.style.display = "block"; 
    }
    updateSuggestion(emotion);
    updateParticles(emotion);
  } else if (emotion == 'neutral') {
    body.style.background = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
    let emotions = section.querySelectorAll("h2.neutral");
    for (let emotion of emotions) {
      emotion.style.display = "block"; 
    }
    updateSuggestion(emotion);
    updateParticles(emotion);
    
  }
}

function updateSuggestion(emotion) {
  // Hide all suggestions
  suggestions.forEach(suggestion => {
    suggestion.style.display = 'none';
  });

  // Show the relevant suggestion
  const suggestionToShow = suggestSection.querySelector(`h3.${emotion}`);
  if (suggestionToShow) {
    suggestionToShow.style.display = 'block';
  }
}

//MOVING PARTICLES
tsParticles.load("particles-js", {
  particles: {
      number: {
          value: 80, // Number of particles
          density: {
              enable: true,
              value_area: 800,
          },
      },
      color: {
          value: "#ffffff", // Default color (update dynamically based on emotion)
      },
      shape: {
          type: "circle",
      },
      opacity: {
          value: 0.5,
          random: true,
      },
      size: {
          value: 5,
          random: true,
      },
      move: {
          enable: true,
          speed: 3,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
      },
  },
  interactivity: {
      detect_on: "canvas",
      events: {
          onhover: {
              enable: true,
              mode: "repulse",
          },
          onclick: {
              enable: true,
              mode: "push",
          },
      },
      modes: {
          repulse: {
              distance: 100,
              duration: 0.4,
          },
          push: {
              particles_nb: 4,
          },
      },
  },
});



//countdown

let countdownTime = 3; // Initial countdown time in seconds

// Function to start the countdown
function startCountdown() {
  const countdownElement = document.getElementById('countdown');

  const interval = setInterval(() => {
    countdownElement.textContent = countdownTime; // Update the displayed time
    countdownTime--;

    if (countdownTime <= 0) {
      clearInterval(interval); // Stop the countdown when it reaches 0
      countdownTime = 3; // Reset the countdown
      startCountdown(); // Start a new countdown
    }
  }, 1000); // Update every second
}


// Start the initial countdown
startCountdown();

