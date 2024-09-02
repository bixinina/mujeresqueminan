document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const bottomContainer = document.createElement('div');
    bottomContainer.style.position = 'absolute';
    bottomContainer.style.bottom = '20px';
    bottomContainer.style.left = '50%';
    bottomContainer.style.transform = 'translateX(-50%)';
    bottomContainer.style.fontSize = '5em';
    bottomContainer.style.color = 'rgb(254, 0, 0)';
    bottomContainer.style.fontFamily = 'Clash Display';
    bottomContainer.style.textAlign = 'center';
    container.appendChild(bottomContainer);

    // Video functionality
    const videoContainer = document.querySelector('.video-container');
    const videoSources = [
        '../PAGINA3/VIDEO/vid1.mp4',
        '../PAGINA3/VIDEO/vid2.mp4',
        '../PAGINA3/VIDEO/vid3.mp4',
        '../PAGINA3/VIDEO/vid4.mp4',
        '../PAGINA3/VIDEO/vid5.mp4',
        '../PAGINA3/VIDEO/vid6.mp4',
        '../PAGINA3/VIDEO/vid7.mp4',
        '../PAGINA3/VIDEO/vid8.mp4',
        '../PAGINA3/VIDEO/vid9.mp4'
    ];

    videoSources.forEach((src, index) => {
        const video = document.createElement('video');
        video.src = src;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.style.position = 'absolute';
        video.style.opacity = 0;
        video.style.transition = 'opacity 1s ease-in-out';

        // Positioning the video at a random location
        const posX = Math.random() * 80; // 0-80vw
        const posY = Math.random() * 80; // 0-80vh
        video.style.left = `${posX}vw`;
        video.style.top = `${posY}vh`;

        // Delayed appearance
        setTimeout(() => {
            video.style.opacity = 1;
        }, index * 4000); // Adjust timing as needed

        videoContainer.appendChild(video);
    });

    // Words and animation
    const words = ['la', 'mejor', 'forma', 'de', 'evitar', 'que', 'los', 'muertos', 'no', 'provoquen', 'disturbios', 'no', 'es', 'solo', 'enterrarlos', ',', 'es', 'enterrar', 'sus', 'restos', 'sus', 'desechos', '.', 'En', 'este', 'acto', 'es', 'y', 'en', 'relación', 'a', 'la', 'sepultura', 'es', 'que', 'se', 'encuentra', 'la', 'segunda', 'dimesión', 'del', 'intercambio', 'entre', 'muerte', 'y', 'archivo', ':', 'archivar', '-', 'Resuche'];
    const sentenceOrder = ['la', 'mejor', 'forma', 'de', 'evitar', 'que', 'los', 'muertos', 'no', 'provoquen', 'disturbios', 'no', 'es', 'solo', 'enterrarlos', ',', 'es', 'enterrar', 'sus', 'restos', 'sus', 'desechos', '.', 'En', 'este', 'acto', 'es', 'y', 'en', 'relación', 'a', 'la', 'sepultura', 'es', 'que', 'se', 'encuentra', 'la', 'segunda', 'dimesión', 'del', 'intercambio', 'entre', 'muerte', 'y', 'archivo', ':', 'archivar', '-', 'Resuche'];
    let revealedWords = [];

    const centralTextHeight = 50; // Height of the central text area in vh
    const centralTextWidth = 80; // Width of the central text area in vw

    words.forEach((word) => {
        const wordElement = document.createElement('div');
        wordElement.textContent = word;
        wordElement.classList.add('word');

        // Assign a random font size
        const fontSize = Math.random() * 2 + 3; // Between 3em and 4em
        wordElement.style.fontSize = `${fontSize}em`;

        // Assign a random position, avoiding the central text area
        let posX, posY;
        do {
            posX = Math.random() * 100; // Allow full horizontal range
            posY = Math.random() * 100; // Allow full vertical range
        } while (
            posX > (50 - centralTextWidth / 2) && posX < (50 + centralTextWidth / 2) &&
            posY > (50 - centralTextHeight / 2) && posY < (50 + centralTextHeight / 2)
        );

        wordElement.style.left = `${posX}vw`;
        wordElement.style.top = `${posY}vh`;

        // Assign random animation duration and delay
        const duration = Math.random() * 5 + 5; // Between 1s and 4s
        const delay = Math.random() * 2; // Between 0s and 2s

        // Assign random rotation, translation, and blur
        const angle = Math.random() * 90 - 45; // Between -45deg and 45deg
        const translateX = Math.random() * 200 - 100; // Between -100px and 100px
        const translateY = Math.random() * 200 - 100; // Between -100px and 100px
        const finalBlur = Math.random() * 20 + 10; // Between 10px and 30px

        wordElement.style.setProperty('--initial-transform', `rotate(0deg) translate(0px, 0px)`);
        wordElement.style.setProperty('--final-transform', `rotate(${angle}deg) translate(${translateX}px, ${translateY}px)`);
        wordElement.style.setProperty('--final-blur', `${finalBlur}px`);

        // Mouseover event to start the animation
        wordElement.addEventListener('mouseover', () => {
            wordElement.style.animationDuration = `${duration}s`;
            wordElement.style.animationDelay = '0s';
            wordElement.classList.add('animate');

            // Add word to revealedWords array in a fixed order after it disappears
            setTimeout(() => {
                if (!revealedWords.includes(word)) {
                    revealedWords.push(word);
                    revealedWords.sort((a, b) => sentenceOrder.indexOf(a) - sentenceOrder.indexOf(b));
                    bottomContainer.textContent = revealedWords.join(' ');
                }
            }, parseFloat(duration) * 1000); // Wait for the animation to complete
        });

        container.appendChild(wordElement);
    });

    // Rotating text logic
    const rotatingText = document.getElementById('rotatingText');
    const finalWords = document.getElementById('finalWords');

    const texts = [
        'El archivo, en su complejidad y ambigüedad, se nos presenta como un lugar donde la memoria y el olvido coexisten en una tensión constante, donde la autoridad que decide qué conservar y qué desechar se enfrenta a los deseos de quienes buscan preservar lo que, de otro modo, quedaría invisibilizado.',
        'En lugar de perpetuar una narrativa lineal y fija, este archivo disidente busca mantener una memoria en movimiento, una memoria que, esté siempre abierta al porvenir, a lo que aún no ha sido dicho. Este archivo no solo es un espacio de conservación, sino también de resistencia y transformación.',
        'El archivo también tiene una dimensión afectiva. No es simplemente una colección de documentos fríos, sino que está impregnado de emociones, afectos y deseos. Las memorias que se activan en el archivo resuenan no solo en el plano intelectual, sino también en el emocional.'
    ];

    let textIndex = 0;

    function changeText() {
        rotatingText.style.opacity = 0;
        setTimeout(() => {
            rotatingText.textContent = texts[textIndex];
            rotatingText.style.opacity = 1;
            textIndex++;
            if (textIndex < texts.length) {
                setTimeout(changeText, 10000);
            } else {
                setTimeout(showContinueButton, 10000);
            }
        }, 1000); // Time for fade out/in
    }

    function showContinueButton() {
        rotatingText.style.display = 'none';
        finalWords.style.display = 'flex';
        finalWords.style.justifyContent = 'center';
        finalWords.style.alignItems = 'center';
        finalWords.style.height = '100vh';
    
        finalWords.innerHTML = `
            <button id="continueButton" class="continue-button">
                Continue
            </button>
        `;
    
        // Redirect to a specific page when the button is clicked
        const continueButton = document.getElementById('continueButton');
        continueButton.addEventListener('click', () => {
            window.location.href = '../PAGES/page4.html'; // Replace 'nextpage.html' with the actual page
        });
    
        // Start a timer to redirect after 10 seconds of inactivity
        const inactivityTimeout = setTimeout(() => {
            window.location.href = '../PAGES/page4.html'; // Replace 'page5.html' with the actual page
        }, 10000); // 10000ms = 10 seconds
    
        // Clear the inactivity timer if the user interacts with the button
        continueButton.addEventListener('click', () => {
            clearTimeout(inactivityTimeout);
        });
    }
    
    

    // Start the text rotation
    rotatingText.textContent = texts[0];
    rotatingText.style.opacity = 1;
    setTimeout(changeText, 10000);
});
