// ===== NAVIGATION FUNCTIONALITY =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Add shadow to navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== SMOOTH SCROLL FUNCTIONALITY =====
const ctaButton = document.getElementById('ctaButton');

ctaButton.addEventListener('click', () => {
    const healthSection = document.getElementById('health');
    healthSection.scrollIntoView({ behavior: 'smooth' });
});

// ===== SCROLL ANIMATION FOR SECTIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    observer.observe(section);
});

// ===== CARD HOVER EFFECTS =====
const cards = document.querySelectorAll('.card, .impact-card, .alt-card, .fact-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== INTERACTIVE QUIZ FUNCTIONALITY =====
const quizQuestion = document.getElementById('quizQuestion');
const quizResult = document.getElementById('quizResult');
const quizButtons = document.querySelectorAll('.quiz-btn');
const retakeQuiz = document.getElementById('retakeQuiz');
const resultTitle = document.getElementById('resultTitle');
const resultMessage = document.getElementById('resultMessage');
const yearlyUse = document.getElementById('yearlyUse');
const treesHarmed = document.getElementById('treesHarmed');
const wasteProduced = document.getElementById('wasteProduced');

// Quiz button click handler
quizButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const weeklyUse = parseInt(e.target.dataset.value);
        calculateImpact(weeklyUse);
    });
});

// Calculate environmental impact based on usage
function calculateImpact(weeklyUse) {
    const yearlyUsage = weeklyUse * 52;
    const treesPerYear = (yearlyUsage / 20).toFixed(2); // Approx 20 cups per tree
    const wasteKg = (yearlyUsage * 0.011).toFixed(2); // Approx 11g per cup
    
    // Hide question, show result
    quizQuestion.classList.add('hidden');
    quizResult.classList.remove('hidden');
    
    // Update statistics
    yearlyUse.textContent = yearlyUsage;
    treesHarmed.textContent = treesPerYear;
    wasteProduced.textContent = wasteKg;
    
    // Customize message based on usage
    if (weeklyUse === 0) {
        resultTitle.textContent = '🌟 Eco Warrior!';
        resultMessage.textContent = 'Amazing! You\'re already making a positive impact by using reusable cups. Keep inspiring others!';
        document.querySelector('.result-icon').textContent = '🏆';
    } else if (weeklyUse <= 5) {
        resultTitle.textContent = '👍 Good Start!';
        resultMessage.textContent = 'You\'re doing better than average, but there\'s room for improvement. Consider switching to a reusable cup full-time!';
        document.querySelector('.result-icon').textContent = '🌱';
    } else if (weeklyUse <= 15) {
        resultTitle.textContent = '⚠️ Time to Change';
        resultMessage.textContent = 'Your paper cup usage is contributing significantly to environmental damage. Make the switch to reusable today!';
        document.querySelector('.result-icon').textContent = '🌍';
    } else {
        resultTitle.textContent = '🚨 Urgent Action Needed';
        resultMessage.textContent = 'Your paper cup consumption is extremely high. Switching to reusable cups could save trees, reduce waste, and protect your health!';
        document.querySelector('.result-icon').textContent = '⛔';
    }
    
    // Animate result appearance
    quizResult.style.animation = 'fadeInUp 0.6s ease';
}

// Retake quiz functionality
retakeQuiz.addEventListener('click', () => {
    quizResult.classList.add('hidden');
    quizQuestion.classList.remove('hidden');
});

// ===== ANIMATE NUMBERS ON SCROLL =====
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observe stat elements for animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/[^0-9]/g, ''));
            if (!isNaN(number)) {
                entry.target.classList.add('animated');
                animateValue(entry.target, 0, number, 2000);
            }
        }
    });
}, { threshold: 0.5 });

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== DYNAMIC ACTIVE NAV LINK =====
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== BUTTON RIPPLE EFFECT =====
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ===== SMOOTH REVEAL FOR CARDS =====
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100); // Stagger animation
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .impact-card, .alt-card, .fact-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    cardObserver.observe(card);
});

// ===== CONSOLE MESSAGE =====
console.log('%c🌿 Say No to Paper Cups! 🌍', 'color: #2d6a4f; font-size: 20px; font-weight: bold;');
console.log('%cEvery choice matters. Make yours count.', 'color: #52b788; font-size: 14px;');

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});