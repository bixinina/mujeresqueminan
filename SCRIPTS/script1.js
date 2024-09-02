let coalStone, coalStone2, coalStone3, coalStone4, coalStone5, pickaxe;
let currentCursor;
let cursorChangeTime;
let rotationAngle = 0;
let isPickaxeActive = false;
let coalStoneLayer;
let pickaxeSounds = []; // Array to hold the pickaxe sounds
let currentPickaxeSound = 0; // Index to track current pickaxe sound
let pickaxeTimer = 0; // Timer to track pickaxe activity
let redirectTime = 25000; // Time in milliseconds to redirect (20 seconds)
let sound1, sound2, sound3, sound4, sound5;

function preload() {
  coalStone = loadImage('../PAGINA1/IMG/coalStone.png');
  coalStone2 = loadImage('../PAGINA1/IMG/coalStone2.png');
  coalStone3 = loadImage('../PAGINA1/IMG/coalStone3.png');
  coalStone4 = loadImage('../PAGINA1/IMG/coalStone4.png');
  coalStone5 = loadImage('../PAGINA1/IMG/coalStone5.png'); // New coalStone5
  pickaxe = loadImage('../PAGINA1/IMG/newCursor.png');
  
  sound1 = loadSound('../PAGINA1/SOUNDS/son1.mp3');
  sound2 = loadSound('../PAGINA1/SOUNDS/son2.mp3');
  sound3 = loadSound('../PAGINA1/SOUNDS/son3.mp3');
  sound4 = loadSound('../PAGINA1/SOUNDS/son5.mp3');
  sound5 = loadSound('../PAGINA1/SOUNDS/son4.mp3');

  // Load pickaxe sounds
  pickaxeSounds = [
    loadSound('../PAGINA1/SOUNDS/pico1.mp3'),
    loadSound('../PAGINA1/SOUNDS/pico2.mp3'),
    loadSound('../PAGINA1/SOUNDS/pico1.mp3')
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  coalStoneLayer = createGraphics(windowWidth, windowHeight);
  coalStoneLayer.clear();
  currentCursor = coalStone;
  cursorChangeTime = millis();
  sound1.loop();
}

function draw() {
  background(239, 241, 250);
  image(coalStoneLayer, 0, 0, windowWidth, windowHeight);
  let elapsedTime = millis() - cursorChangeTime;

  if (elapsedTime < 10000) {
      changeCursor(coalStone, sound1);
  } else if (elapsedTime < 20000) {
      changeCursor(coalStone2, sound2);
  } else if (elapsedTime < 30000) {
      changeCursor(coalStone3, sound3);
  } else if (elapsedTime < 40000) {
      changeCursor(coalStone4, sound4);
  } else if (elapsedTime < 50000) {
      changeCursor(coalStone5, sound5); // New condition for coalStone5
  } else if (elapsedTime >= 50000 && !isPickaxeActive) {
      isPickaxeActive = true;
      currentCursor = pickaxe;
      pickaxeTimer = millis(); // Start the timer when the pickaxe becomes active
      stopAllSounds();
      
      // Schedule the message to appear 5 seconds before the redirect
      setTimeout(() => {
          document.getElementById('redirectMessage').style.display = 'block';
      }, redirectTime - 5000); // 5 seconds before redirect

      // Schedule the page redirection
      setTimeout(() => {
          window.location.href = '../PAGES/page2.html'; // Adjusted relative path
      }, redirectTime); // Redirect after the specified time
  }

  if (isPickaxeActive) {
      push();
      translate(mouseX, mouseY);
      rotate(radians(rotationAngle));
      imageMode(CENTER);
      image(currentCursor, 0, 0);
      pop();
  } else {
      coalStoneLayer.image(currentCursor, mouseX - currentCursor.width / 2, mouseY - currentCursor.height / 2);
  }
}

function mousePressed() {
    if (isPickaxeActive) {
        pickaxeSounds[currentPickaxeSound].play(); // Play current pickaxe sound
        currentPickaxeSound = (currentPickaxeSound + 1) % pickaxeSounds.length; // Update to next sound in the array
        
        rotationAngle = -30; // Rotate the pickaxe left by 30 degrees
        fadeTraces(mouseX, mouseY, 50); // More interesting trace erasure
        
        // Immediately reset rotationAngle after the draw() has rendered
        setTimeout(() => {
            rotationAngle = 0; // Return to the initial position
        }, 100); // 100ms delay for visual effect, adjust as needed
    }
}

function fadeTraces(x, y, size) {
    coalStoneLayer.noStroke();
    coalStoneLayer.fill(239, 241, 250, 60); // Black color with 50% opacity to simulate coal dust
    for (let i = 0; i < 10; i++) { // Create a "dripping" effect
        let offsetX = random(-size, size);
        let offsetY = random(-size, size);
        let dropSize = random(80, 120);
        coalStoneLayer.ellipse(x + offsetX, y + offsetY, dropSize, dropSize * 2);
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  coalStoneLayer.resizeCanvas(windowWidth, windowHeight);
}

function changeCursor(newCursor, sound) {
  if (currentCursor !== newCursor) {
    currentCursor = newCursor;
    stopAllSounds();
    sound.loop();
  }
}

function stopAllSounds() {
  sound1.stop();
  sound2.stop();
  sound3.stop();
  sound4.stop();
}
