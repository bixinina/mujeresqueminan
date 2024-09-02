document.addEventListener("DOMContentLoaded", function() {
    let redirectTimeout;

    function initializeScrollTriggers() {
        // Animate right-aligned elements
        gsap.utils.toArray(".img-container.right img, .img-container.right video").forEach((el) => {
            gsap.fromTo(el,
                { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" },
                { 
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 75%",
                        end: "bottom 70%",
                        scrub: true,
                    }
                }
            );
        });

        // Animate left-aligned elements
        gsap.utils.toArray(".img-container.left img, .img-container.left video").forEach((el) => {
            gsap.fromTo(el,
                { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
                { 
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 75%",
                        end: "bottom 70%",
                        scrub: true,
                    }
                }
            );
        });

        // Animate text elements
        gsap.utils.toArray(".img-container p").forEach((text) => {
            gsap.from(text, {
                opacity: 0,
                y: 20,
                scrollTrigger: {
                    trigger: text,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
            });
        });

        // Add event listeners to handle video playback based on scroll position
        gsap.utils.toArray("video").forEach((video) => {
            ScrollTrigger.create({
                trigger: video,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                    video.play();
                    video.muted = false; // Ensure sound is enabled
                },
                onLeave: () => video.pause(),
                onEnterBack: () => {
                    video.play();
                    video.muted = false; // Ensure sound is enabled
                },
                onLeaveBack: () => video.pause(),
            });
        });
    }

    // Call the function to initialize ScrollTriggers
    initializeScrollTriggers();

    // Show 'more' button when scrolling to the bottom
    window.addEventListener('scroll', () => {
        const button = document.getElementById('moreButton');
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
            button.classList.add('visible');
            console.log('Button visible');
            // Clear any existing timeout when button becomes visible
            clearTimeout(redirectTimeout);
            // Set a new timeout for redirection
            redirectTimeout = setTimeout(() => {
                window.location.href = 'page5.html';
            }, 10000); // 10 seconds
        } else {
            button.classList.remove('visible');
            console.log('Button hidden');
            // Clear timeout if button is hidden before the 10 seconds
            clearTimeout(redirectTimeout);
        }
    });

    // Add event listener to handle button click
    document.getElementById('moreButton').addEventListener('click', () => {
        // Clear timeout if button is clicked
        clearTimeout(redirectTimeout);
        window.location.href = 'page5.html';
    });
});
