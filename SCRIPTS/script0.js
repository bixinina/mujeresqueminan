gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
    let timeout;

    function redirectToPage1() {
        window.location.href = 'PAGES/page1.html';
    }

    function resetTimer() {
        clearTimeout(timeout);
        // Set timeout to 30 seconds (30000 ms)
        timeout = setTimeout(redirectToPage1, 40000);
    }

    // Detect user interactions
    document.addEventListener('mousemove', resetTimer, false);
    document.addEventListener('mousedown', resetTimer, false);
    document.addEventListener('keypress', resetTimer, false);
    document.addEventListener('scroll', resetTimer, false);
    document.addEventListener('touchstart', resetTimer, false);

    // Start the timer for the first time
    resetTimer();
});

document.addEventListener("DOMContentLoaded", function () {
    const outroMessages = [
        "Mujeres que minan es un archivo abierto, mutable y en continua transformación",
        "un homenaje a todas las mujeres que sostuvieron una red de cuidados en la era minera",
        "espero lo disfrutes y te vuelvas custodia de la realidad que nunca se cónto",
        "Mujeres que minan es un archivo abierto, mutable y en continua transformación" // Repeats the first message to create a loop
    ];

    let currentMessageIndex = 0;
    const outroTextElement = document.querySelector('.outro h1');

    function updateOutroText() {
        outroTextElement.textContent = outroMessages[currentMessageIndex];
        currentMessageIndex = (currentMessageIndex + 1) % outroMessages.length;
    }

    ScrollTrigger.create({
        trigger: ".outro",
        start: "top center", // Adjust this if needed to trigger at the right time
        onEnter: () => {
            // Start updating the text every 10 seconds
            updateOutroText();
            setInterval(updateOutroText, 5000); // 10000ms = 10 seconds
        },
        once: true // Only trigger the onEnter once when the user first reaches the outro
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const cards = [
        { id: "#card1", endTranslateX: -2000, rotate: 45 },
        { id: "#card2", endTranslateX: -2000, rotate: -30 },
        { id: "#card3", endTranslateX: -2000, rotate: 45 },
        { id: "#card4", endTranslateX: -2000, rotate: -30 },
    ];

    ScrollTrigger.create({
        trigger: ".wrapper-404",
        start: "top top",
        end: "+=1200vh",  // Extended duration
        scrub: 1,
        pin: true,
        pinSpacing: true,  // Keep spacing for smooth transitions
        onUpdate: (self) => {
            gsap.to(".wrapper-404", {
                x: `${-350 * self.progress}vw`,
                duration: 0.5,
                ease: "power3.out",
            });
        },
    });

    cards.forEach((card) => {
        ScrollTrigger.create({
            trigger: card.id,
            start: "top center",  // Adjusted to trigger slightly later
            end: "+=1200vh",
            scrub: 1,
            onUpdate: (self) => {
                gsap.to(card.id, {
                    x: `${card.endTranslateX * self.progress}px`,
                    rotate: `${card.rotate * self.progress * 2}`,
                    duration: 0.5,
                    ease: "power3.out",
                });
            },
        });
    });

    // Parallax Effect for Outro
    const parallax = document.querySelector('.parallax');
    const front = document.querySelector('.front-layer');
    const back = document.querySelector('.back-layer');

    const sFront = 150;
    const sBack = 400;

    parallax.addEventListener('mousemove', e => {
        const x = e.clientX;
        const y = e.clientY;

        front.style.transform = `translate(${x / sFront}%, ${y / sFront}%)`;
        back.style.transform = `translate(${x / sBack}%, ${y / sBack}%)`;
    });
});



