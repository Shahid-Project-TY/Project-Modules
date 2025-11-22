document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Navigation & Hamburger Menu ---

    const nav = document.getElementById('navbar');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        // Toggle Nav Links
        navLinks.classList.toggle('nav-active');
        // Burger Animation
        burger.classList.toggle('toggle');
        // Smooth transition for link fade in/out
        navLinks.querySelectorAll('li').forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                // Add a slight delay for each link to appear staggered
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close menu when a link is clicked (mobile only)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });

    // Keyframes for mobile nav fade-in (CSS doesn't support keyframes in JS string easily, so this assumes a basic CSS keyframe is defined for .navLinkFade, but the timing is controlled here)
    // NOTE: For a real deployment, define @keyframes navLinkFade in style.css:
    /*
        @keyframes navLinkFade {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0px); }
        }
    */


    // --- 2. Smooth Scrolling for CTA and Nav Links ---

    document.querySelectorAll('.smooth-scroll').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Scroll smoothly to the target element's position, adjusting for fixed header
                const headerHeight = nav.offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- 3. Fade-in on Scroll Animation ---

    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px" // Start fade-in 100px before section is fully visible
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });


    // --- 4. Awareness Quiz Interactivity ---

    const quizYes = document.getElementById('quiz-yes');
    const quizNo = document.getElementById('quiz-no');
    const quizResultBox = document.getElementById('quiz-result');
    const resultText = document.getElementById('result-text');
    const barYes = document.querySelector('.bar-yes');
    const barNo = document.querySelector('.bar-no');
    const labelYes = document.querySelector('.label-yes');
    const labelNo = document.querySelector('.label-no');

    // Simple persistence (using localStorage, can be reset on page refresh)
    let yesCount = parseInt(localStorage.getItem('quiz-yes-count') || '0');
    let noCount = parseInt(localStorage.getItem('quiz-no-count') || '0');

    function updateChart(voteType) {
        if (voteType === 'yes') {
            yesCount++;
        } else if (voteType === 'no') {
            noCount++;
        }

        // Save new counts
        localStorage.setItem('quiz-yes-count', yesCount);
        localStorage.setItem('quiz-no-count', noCount);

        const total = yesCount + noCount;
        const yesPercent = total > 0 ? (yesCount / total) * 100 : 0;
        const noPercent = total > 0 ? (noCount / total) * 100 : 0;

        // Update CSS for animated bar width
        barYes.style.width = `${yesPercent}%`;
        barNo.style.width = `${noPercent}%`;

        // Update labels
        labelYes.textContent = `Yes: ${yesCount} (${Math.round(yesPercent)}%)`;
        labelNo.textContent = `No: ${noCount} (${Math.round(noPercent)}%)`;

        // Display results box
        quizResultBox.style.display = 'block';

        // Set result message
        if (voteType === 'yes') {
            resultText.innerHTML = 'Thank you for your honesty. **It\'s time to switch!** Check out the alternatives above.';
        } else if (voteType === 'no') {
            resultText.innerHTML = 'Fantastic! You are a part of the **solution**. Keep inspiring others!';
        }

        // Disable buttons after voting (optional: to prevent spamming votes)
        quizYes.disabled = true;
        quizNo.disabled = true;
    }

    // Initial check to show results if already voted/data exists
    if (yesCount > 0 || noCount > 0) {
        // Just update chart without adding a new vote
        updateChart(null); 
    } else {
         // Show only the buttons initially
         quizResultBox.style.display = 'none';
    }


    quizYes.addEventListener('click', () => updateChart('yes'));
    quizNo.addEventListener('click', () => updateChart('no'));
});