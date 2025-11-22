// Hamburger menu toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Fade‑in sections on scroll
const fadeSections = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
fadeSections.forEach(sec => observer.observe(sec));

// Simple quiz
const quizBtns = document.querySelectorAll('.quiz-btn');
quizBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const answer = btn.dataset.answer;
        const resultText = document.getElementById('result-text');
        const resultDiv = document.querySelector('.result');
        if (answer === 'yes') {
            resultText.textContent = "That's a habit we can change together! 🌍";
        } else {
            resultText.textContent = "Great, keep reducing single‑use waste!";
        }
        resultDiv.style.display = 'block';
    });
});