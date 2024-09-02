// Escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 800);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0xEFF1FA));  // Set background color to #eff1fa
renderer.setClearAlpha(0.92);  // Set the alpha value
document.body.appendChild(renderer.domElement);

// Luz
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// Create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener);

// Create a global audio source
const sound = new THREE.Audio(listener);

// Load a sound and set it as the audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load('../PAGINA4/SOUND/ambient.wav', (buffer) => {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  sound.play();
});

// Variables para el control de la cámara
let cameraSpeed = 0.03;
let mouseX = 0;

let hasCompleted = false;

// Función para cargar una textura
function loadTexture(url) {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    loader.load(url, resolve, undefined, reject);
  });
}

async function createRectangle(url, width, height, depth) {
  try {
    const texture = await loadTexture(url);  // Cargar la textura desde la URL proporcionada
    const geometry = new THREE.PlaneGeometry(width, height);  // Crear la geometría del rectángulo con dimensiones width x height
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });  // Crear el material usando la textura cargada
    const mesh = new THREE.Mesh(geometry, material);  // Crear la malla (mesh) combinando la geometría y el material
    mesh.position.set(
        Math.random() * 120 - 60,  // Adjust range for X
        Math.random() * 80 - 40,   // Y remains the same
        Math.random() * 800 - 400  // Random Z position to ensure all objects are within view
      );      
    return mesh;  // Devolver la malla creada
  } catch (error) {
    console.error('Error al cargar textura:', error);  // Manejar errores si ocurre algún problema al cargar la textura
    return null;  // Devolver null si hay un error
  }
}

// Crear múltiples rectángulos con imágenes locales
const rectangles = [];
const imageUrls = [];

// Generar URLs dinámicamente desde dos carpetas diferentes
const numImages = 121;
for (let i = 1; i <= numImages; i++) {
  if (i <= 60) {
    imageUrls.push(`../PAGINA4/IMG/img (${i}).jpg`);
  } else {
    imageUrls.push(`../PAGINA4.2/IMG/img (${i}).jpg`);
  }
}

const numRectangles = 121;
const rectangleWidth = 10;
const rectangleHeight = 6;
const distanceBetweenRectangles = 8;

async function setup() {
  for (let i = 0; i < numRectangles; i++) {
    const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    const rect = await createRectangle(imageUrl, rectangleWidth, rectangleHeight, i * distanceBetweenRectangles);
    if (rect) {
      scene.add(rect);
      rectangles.push(rect);
    }
  }
}

setup().then(() => {
  camera.position.set(0, 0, 500);

  function animate() {
    requestAnimationFrame(animate);
    camera.position.z -= cameraSpeed;
    camera.position.x += (mouseX - camera.position.x) * 0.02;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  });

  window.addEventListener('wheel', (event) => {
    camera.position.z -= event.deltaY * 0.01;
  });

  // Show completion screen after 10 seconds
  setTimeout(() => {
    document.getElementById('completionScreen').style.display = 'block';
  }, 20000); // 10,000 milliseconds = 10 seconds

  // Exit button functionality
  document.getElementById('exitButton').addEventListener('click', () => {
    window.location.href = '../index.html'; // Redirect to page0
  });

}).catch(error => {
  console.error('Error al configurar la escena:', error);
});

  