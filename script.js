window.addEventListener('load', () => {
    // Form Handling
    const form = document.getElementById('leadForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            btn.innerText = 'Enviando...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert('Obrigado! Recebemos seus dados e entraremos em contato em breve.');
                form.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for Anchor Links (safeguard for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonials Carousel Logic
    const track = document.querySelector('.testimonials-track');

    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');
        let currentIndex = 0;
        let autoPlayInterval;
        const autoPlayDelay = 4000;

        const getVisibleSlides = () => {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 900) return 2;
            return 3;
        };

        const updateCarousel = () => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            console.log('Slide Width:', slideWidth); // DEBUG
            const gap = 20; // CSS gap
            const amountToMove = (slideWidth + gap) * currentIndex;
            track.style.transform = `translateX(-${amountToMove}px)`;

            // Loop logic for buttons display (optional visual feedback)
            // For infinite loop feel, we usually just let it jump back to 0.
            const visibleSlides = getVisibleSlides();
            const maxIndex = slides.length - visibleSlides;

            // Update button opacity for visual cue, though we allow looping
            if (currentIndex === 0) {
                prevButton.style.opacity = '0.5';
            } else {
                prevButton.style.opacity = '1';
            }

            if (currentIndex >= maxIndex) {
                nextButton.style.opacity = '0.5';
            } else {
                nextButton.style.opacity = '1';
            }
        };

        const moveNext = () => {
            const visibleSlides = getVisibleSlides();
            const maxIndex = slides.length - visibleSlides;

            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to start
            }
            updateCarousel();
        };

        const movePrev = () => {
            const visibleSlides = getVisibleSlides();
            const maxIndex = slides.length - visibleSlides;

            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex; // Loop to end
            }
            updateCarousel();
        };

        // Auto Play Functions
        const startAutoPlay = () => {
            // Clear any existing interval just in case
            clearInterval(autoPlayInterval);
            console.log('Iniciando Autoplay...'); // DEBUG
            autoPlayInterval = setInterval(() => {
                console.log('Autoplay tick - movendo próximo slide'); // DEBUG
                moveNext();
            }, autoPlayDelay);
        };

        const stopAutoPlay = () => {
            console.log('Parando Autoplay'); // DEBUG
            clearInterval(autoPlayInterval);
        };

        // Event Listeners
        nextButton.addEventListener('click', () => {
            console.log('Clique Próximo'); // DEBUG
            moveNext();
            stopAutoPlay(); // Pause interaction
            startAutoPlay(); // Restart timer
        });

        prevButton.addEventListener('click', () => {
            console.log('Clique Anterior'); // DEBUG
            movePrev();
            stopAutoPlay();
            startAutoPlay();
        });

        window.addEventListener('resize', updateCarousel);

        // Pause on hover
        const wrapper = document.querySelector('.testimonials-wrapper');
        if (wrapper) {
            wrapper.addEventListener('mouseenter', () => {
                console.log('Mouse Enter - Pausa');
                stopAutoPlay();
            });
            wrapper.addEventListener('mouseleave', () => {
                console.log('Mouse Leave - Retoma');
                startAutoPlay();
            });
        }

        // Init
        console.log('Inicializando Carrossel'); // DEBUG
        updateCarousel();
        startAutoPlay();
    } else {
        console.error('Track do carrossel não encontrado!'); // DEBUG
    }

    // FAQ Accordion Logic
    try {
        const faqQuestions = document.querySelectorAll('.faq-question');

        if (faqQuestions.length > 0) {
            console.log('Inicializando FAQ Accordion. Itens encontrados:', faqQuestions.length); // DEBUG

            faqQuestions.forEach(question => {
                question.addEventListener('click', () => {
                    console.log('Clique na pergunta FAQ'); // DEBUG
                    const answer = question.nextElementSibling;

                    // Toggle Active Class
                    question.classList.toggle('active');

                    // Toggle Max Height
                    if (question.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        answer.style.opacity = '1'; // Ensure visibility
                    } else {
                        answer.style.maxHeight = '0';
                        answer.style.opacity = '0';
                    }
                });
            });
        } else {
            console.warn('Nenhum item de FAQ encontrado.'); // DEBUG
        }
    } catch (err) {
        console.error('Erro no FAQ:', err);
    }

    // Phone Mask Logic
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, "");
            if (value.length > 11) value = value.slice(0, 11);

            if (value.length > 10) {
                // (XX) 9XXXX-XXXX
                value = value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
            } else if (value.length > 6) {
                // (XX) XXXX-XXXX
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
            } else if (value.length > 2) {
                // (XX) XXX
                value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
            } else if (value.length > 0) {
                // (XX
                value = value.replace(/^(\d*)/, "($1");
            }
            e.target.value = value;
        });
    }
});
