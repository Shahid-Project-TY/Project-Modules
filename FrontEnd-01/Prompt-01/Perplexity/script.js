// Smooth scroll for cta button and nav links
document.getElementById('ctaBtn').addEventListener('click', function() {
    document.getElementById('health').scrollIntoView({ behavior: 'smooth' });
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
        // on mobile: close navbar after click
        if(window.innerWidth < 700){
            document.getElementById('navLinks').classList.remove('open');
        }
    });
});

// Hamburger mobile menu
document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('navLinks').classList.toggle('open');
});

// Fade-in animation on section scroll
function showOnScroll() {
    document.querySelectorAll('.fade-in').forEach(sec => {
        let secTop = sec.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;
        if(secTop < windowHeight - 60) {
            sec.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', showOnScroll);

// Card & Icon Animations handled in CSS :hover

// Quiz logic
let quizDone = false;
let counts = {yes: Math.floor(Math.random()*25+20), no: Math.floor(Math.random()*30+30)};
document.querySelectorAll('.quiz-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if(quizDone) return;

        let answer = btn.getAttribute('data-answer');
        counts[answer]++;
        quizDone = true;
        
        // Calculate percentages
        let total = counts.yes + counts.no;
        let percentYes = Math.round((counts.yes / total) * 100);
        let percentNo = 100 - percentYes;

        // Animate bars
        document.getElementById('quizResults').style.display = 'block';
        setTimeout(() => {
            document.getElementById('barYes').style.width = percentYes + '%';
            document.getElementById('barNo').style.width = percentNo + '%';
            document.getElementById('percentYes').textContent = percentYes + "%";
            document.getElementById('percentNo').textContent = percentNo + "%";
        }, 300);
        
        // Disable further voting
        document.querySelectorAll('.quiz-btn').forEach(b=>b.disabled=true);
    });
});

// Optional: Accessibility & performance tweaks can be added
