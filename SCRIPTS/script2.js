// Inicializamos un contador para las imágenes adicionales
let imageCounter = 6;
let maxImages = 30;
let revealedImages = 0; // To track the number of revealed images
let maxRevealTime = 120000; // 2 minutes timeout (120,000 ms)

// Timer to reveal buttons if the user hasn't revealed all images
let timeoutId = setTimeout(showButtons, maxRevealTime);

let inactivityTimeout;
let feedbackTimeout;

function startInactivityTimeout() {
    // Set the total time before redirecting (e.g., 10 seconds)
    const inactivityTime = 25000; // 10 seconds

    // Set the time before showing the feedback (e.g., 7 seconds)
    const feedbackTime = inactivityTime - 10000; // Show feedback 3 seconds before redirect

    feedbackTimeout = setTimeout(() => {
        showFeedback();
    }, feedbackTime);

    inactivityTimeout = setTimeout(() => {
        window.location.href = 'Page3.html'; // Redirect to Page3.html after inactivity
    }, inactivityTime);
}

function showFeedback() {
    const feedbackContainer = document.createElement('div');
    feedbackContainer.id = 'feedback-message';
    feedbackContainer.textContent = 'Un archivo vivo que siempre continua';
    document.body.appendChild(feedbackContainer);
}

function resetInactivityTimeout() {
    clearTimeout(inactivityTimeout);
    clearTimeout(feedbackTimeout);
    removeFeedback();
}

function removeFeedback() {
    const feedbackContainer = document.getElementById('feedback-message');
    if (feedbackContainer) {
        document.body.removeChild(feedbackContainer);
    }
}

// Attach the reset function to button clicks
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('corner-button')) {
        resetInactivityTimeout(); // Cancel the timeout if a button is clicked
    }
});


// Función para rotar imágenes
var images = document.getElementsByClassName('coal-image');
var rotationSpeeds = [2, 0.2, 1, 1.5, 2]; // Velocidades de rotación para las primeras 5 imágenes

for (var i = 0; i < images.length; i++) {
    rotateImage(images[i], rotationSpeeds[i]);
}

function rotateImage(image, rotationSpeed) {
    var rotation = 0;
    setInterval(function() {
        rotation += rotationSpeed;
        image.style.transform = 'rotate(' + rotation + 'deg)';
    }, 75);
}

// Función para reproducir sonidos
function playSound(soundFile) {
    var audio = new Audio(soundFile);
    audio.play();
}

// Función para mostrar frases y agregar imágenes adicionales
function showPhrase(phrase, top, left) {
    var container = document.getElementById("phrase-container");

    var newPhrase = document.createElement("div");
    newPhrase.classList.add("phrase");
    newPhrase.innerText = phrase;
    newPhrase.style.top = top;
    newPhrase.style.left = left;

    container.appendChild(newPhrase);

    // Remover la frase después de un tiempo especificado
    setTimeout(function() {
        container.removeChild(newPhrase);
    }, 7000); // Aquí puedes ajustar el tiempo en milisegundos. 5000ms = 5 segundos

    // Agregar una nueva imagen si no se ha alcanzado el máximo
    if (imageCounter <= maxImages) {
        addNewImage();
    }
    // Count each revealed image
    revealedImages++;

    // Check if all images are revealed
    if (revealedImages === maxImages) {
        clearTimeout(timeoutId); // Stop the timeout
        setTimeout(showButtons, 5000); // Wait 5 seconds then show buttons
    }
}

function showButtons() {
    // Create buttons if not already present
    if (document.getElementById('corner-buttons')) return;

    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'corner-buttons';

    // Array of pages to link to
    const pages = ['page3.html', 'page3.html', 'page3.html', 'page3.html'];


    // Shuffle the array to randomize the links
    for (let i = pages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pages[i], pages[j]] = [pages[j], pages[i]];
    }

    const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

    pages.forEach((page, index) => {
        const button = document.createElement('button');
        button.textContent = "adelante" //+ page.split('.')[0];
        button.classList.add('corner-button', positions[index]); // Apply CSS classes
        button.onclick = () => window.location.href = page;
        buttonContainer.appendChild(button);
    });

    document.body.appendChild(buttonContainer);

    // Start the timeout to redirect if no button is clicked
    startInactivityTimeout();
}


// Función para agregar nuevas imágenes
function addNewImage() {
    var content = document.getElementById("content");

    var newImage = document.createElement("img");
    newImage.src = `../PAGINA2/IMG/FINALES/final${imageCounter}.png`;
    newImage.alt = `Trozo de carbón ${imageCounter}`;
    newImage.classList.add("coal-image");

    // Posición aleatoria
    newImage.style.top = Math.random() * 80 + 'vh';
    newImage.style.left = Math.random() * 80 + 'vw';

    // Asignar velocidad de rotación aleatoria
    var randomRotationSpeed = Math.random() * 4 + 1;
    rotateImage(newImage, randomRotationSpeed);

    // Obtener sonido y frase específicos para la imagen
    var soundFile = getSoundForImage(imageCounter);
    var phrase = getPhraseForImage(imageCounter);

    // Agregar funcionalidad de clic para mostrar frase y agregar otra imagen
    newImage.onclick = function () {
        playSound(soundFile);
        showPhrase(phrase, Math.random() * 80 + 'vh', Math.random() * 80 + 'vw');
    };

    content.appendChild(newImage);

    // Incrementar el contador para la siguiente imagen
    imageCounter++;
}

// Función para obtener la frase asociada a cada imagen
function getPhraseForImage(imageNumber) {
    const phrases = {
        6: "a un lado,",
        7: "rodeando,",
        8: "sosteniendo,",
        9: "cuidando,",
        10: "aguantando",
        11: "se dice que las mujeres no estaban en el interior de la mina, estaban afuera, en tareas de limpieza y administración",
        12: "puede ser, pero puede ser que no",
        13: "y de ser así, estaban igualmente",
        14: "y de no ser así, estaban dentro picando carbón",
        15: "y además de estar ahí, estaban en casa, en una casa pobre y vacía",
        16: "estaban haciendo de los pueblos los lugares que hoy habitamos",
        17: "Estaban pendientes. Estaban serenas. Estaban cuidándose entre ellas",
        18: "¿Cómo se trae al presente una ausencia?",
        19: "activar esa memoria inamovible, meramente reconstructiva, y tratar de percibirla en tanto potencia en constante actualización",
        20: "materias de personas ausentes",
        21: "nos han habitado por completo",
        22: "el gesto reincidente de volver a mirar",
        23: "tejiendo una especie de continuidad",
        24: "sinergia de memorias entre lo vivo y lo ausente",
        25: "una vía para visibilizar realidades paralelas",
        26: "el prevalecimiento de la palabra encarnada",
        27: "pequeñas hendiduras de la experiencia y la materia",
        28: "transferencias, equidades y diálogo",
        29: "mujer minera",
        30: "mujer minera"
    };

    // Devolver la frase asociada a la imagen, o una genérica si no está definida
    return phrases[imageNumber] || "Una historia de fortaleza y dedicación en la minería.";
}

// Función para obtener el sonido asociado a cada imagen
function getSoundForImage(imageNumber) {
    const sounds = {
        6: "../PAGINA2/SOUNDS/s6.mp3",
        7: "../PAGINA2/SOUNDS/s7.mp3",
        8: "../PAGINA2/SOUNDS/s8.mp3",
        9: "../PAGINA2/SOUNDS/s9.mp3",
        10: "../PAGINA2/SOUNDS/s10.mp3",
        11: "../PAGINA2/SOUNDS/s11.mp3",
        12: "../PAGINA2/SOUNDS/s12.mp3",
        13: "../PAGINA2/SOUNDS/s13.mp3",
        14: "../PAGINA2/SOUNDS/s14.mp3",
        15: "../PAGINA2/SOUNDS/s15.mp3",
        16: "../PAGINA2/SOUNDS/s16.mp3",
        17: "../PAGINA2/SOUNDS/s17.mp3",
        18: "../PAGINA2/SOUNDS/s18.mp3",
        19: "../PAGINA2/SOUNDS/s19.mp3",
        20: "../PAGINA2/SOUNDS/s20.mp3",
        21: "../PAGINA2/SOUNDS/s21.mp3",
        22: "../PAGINA2/SOUNDS/s22.mp3",
        23: "../PAGINA2/SOUNDS/s21.mp3",
        24: "../PAGINA2/SOUNDS/s20.mp3",
        25: "../PAGINA2/SOUNDS/s19.mp3",
        26: "../PAGINA2/SOUNDS/s18.mp3",
        27: "../PAGINA2/SOUNDS/s7.mp3",
        28: "../PAGINA2/SOUNDS/s16.mp3",
        29: "../PAGINA2/SOUNDS/s15.mp3",
        30: "../PAGINA2/SOUNDS/s14.mp3"
    };

    // Devolver el sonido asociado a la imagen, o un sonido genérico si no está definido
    return sounds[imageNumber] || "../MEDIA/PAGINA1/SOUNDS/s14.mp3";
}
