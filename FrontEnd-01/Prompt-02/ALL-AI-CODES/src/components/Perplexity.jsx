import React, { useState, useEffect, useRef } from 'react';
import { FaFaucet, FaShower, FaCloudRain } from 'react-icons/fa';
import './Perplexity.css';

export default function App() {
  // Smooth scroll to Tips
  const scrollToTips = () => {
    document.getElementById('tips').scrollIntoView({ behavior: 'smooth' });
  };

  // Quiz state
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [progress, setProgress] = useState(0);

  // Animate infographic bar on scroll
  const barRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (!barRef.current) return;
      const rect = barRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        barRef.current.style.width = '75%';  // animate bar growing
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Update progress bar when quizAnswer changes
  useEffect(() => {
    if (quizAnswer === null) {
      setProgress(0);
    } else if (quizAnswer === 'low') {
      setProgress(30);
    } else if (quizAnswer === 'moderate') {
      setProgress(60);
    } else if (quizAnswer === 'high') {
      setProgress(90);
    }
  }, [quizAnswer]);

  const tips = [
    { icon: <FaFaucet />, text: 'Fix leaking taps immediately.' },
    { icon: <FaShower />, text: 'Use water-efficient appliances.' },
    { icon: <FaCloudRain />, text: 'Collect and reuse rainwater.' }
  ];

  return (
    <div>
      {/* Header/Hero Section */}
      <header className="hero-section">
        <div className="hero-overlay">
          <h1>Save Water, Save Life</h1>
          <p>Small changes lead to a big impact on water conservation.</p>
          <button className="cta-button" onClick={scrollToTips}>
            See Tips
          </button>
        </div>
      </header>

      {/* Water Conservation Tips Section */}
      <section id="tips" className="tips-section">
        <h2>Water Conservation Tips</h2>
        <div className="tips-grid">
          {tips.map((tip, idx) => (
            <div className="tip-card" key={idx}>
              <div className="tip-icon">{tip.icon}</div>
              <p>{tip.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Infographic Section */}
      <section className="infographic-section">
        <h2>Water Usage Savings</h2>
        <div className="infographic-bar-container">
          <div className="infographic-bar" ref={barRef}></div>
        </div>
        <p>Typical household saves 75% of water using efficient methods.</p>
      </section>

      {/* Interactive Quiz Section */}
      <section className="quiz-section">
        <h2>How Would You Rate Your Water Usage?</h2>
        <form>
          <label>
            <input
              type="radio"
              name="usage"
              value="low"
              checked={quizAnswer === 'low'}
              onChange={(e) => setQuizAnswer(e.target.value)}
            />
            Low
          </label>
          <label>
            <input
              type="radio"
              name="usage"
              value="moderate"
              checked={quizAnswer === 'moderate'}
              onChange={(e) => setQuizAnswer(e.target.value)}
            />
            Moderate
          </label>
          <label>
            <input
              type="radio"
              name="usage"
              value="high"
              checked={quizAnswer === 'high'}
              onChange={(e) => setQuizAnswer(e.target.value)}
            />
            High
          </label>
        </form>
        <progress max="100" value={progress} className="progress-bar"></progress>
        <p>Your water usage is {quizAnswer ? quizAnswer : 'not selected'}</p>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div>
          <span>Contact: info@smartwater.org</span>
          <span>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="footer-link">
              Twitter
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="footer-link">
              Facebook
            </a>
            <a href="https://water.org/resources" target="_blank" rel="noopener noreferrer" className="footer-link">
              More Resources
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
