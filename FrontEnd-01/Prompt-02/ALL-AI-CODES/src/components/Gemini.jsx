import React, { useState, useRef } from 'react';
// Import icons from react-icons
import { FaFaucet, FaShower, FaTint, FaLeaf, FaRecycle, FaChartBar, FaWater, FaCheckCircle, FaTimesCircle, FaTwitter, FaFacebookF, FaEnvelope } from 'react-icons/fa';

import './Gemini.css'; // Import the corresponding CSS file

// --- Sub-Components ---

// 1. Tip Card Component
const TipCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="tip-card">
      <div className="tip-icon-container">
        <Icon className="tip-icon" />
      </div>
      <h3 className="tip-title">{title}</h3>
      <p className="tip-description">{description}</p>
    </div>
  );
};

// 2. Infographic Component
const Infographic = () => {
  const [savings, setSavings] = useState(0);

  // Simple state update function for a dynamic infographic effect
  // In a real app, this might be triggered by scroll or a button
  const simulateSavings = () => {
    setSavings(100); // Maximize the bar for visual impact
    setTimeout(() => setSavings(65), 100); // Reset or set to a mid-value
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const infographicElement = document.getElementById('infographic-section');
      if (infographicElement) {
        const rect = infographicElement.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible) {
          simulateSavings();
          window.removeEventListener('scroll', handleScroll); // Only trigger once
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="infographic-section" className="infographic-section">
      <h2 className="section-heading">Water Usage Insights 📈</h2>
      <p className="section-subtitle">A typical household can save up to 30% of their water consumption by applying smart management tips.</p>
      
      <div className="infographic-chart">
        <div className="chart-bar bar-before">
          <FaWater className="chart-icon" />
          <span className="bar-label">Current Usage (100%)</span>
          <div className="bar-fill initial-usage"></div>
        </div>
        <div className="chart-bar bar-after">
          <FaTint className="chart-icon" />
          <span className="bar-label">Potential Savings ({savings}%)</span>
          {/* Dynamically adjust height based on savings state */}
          <div className="bar-fill potential-savings" style={{ height: `${savings}%` }}></div>
        </div>
      </div>
      <p className="chart-note">*Data is illustrative and based on average household efficiency gains.</p>
    </section>
  );
};


// 3. Quiz Component
const WaterQuiz = () => {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState(0);
  const quizRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    setShowResult(true);
    // Simulate result calculation
    const newProgress = option === 'B' ? 75 : (option === 'A' ? 30 : 50); // B is the best answer
    setProgress(newProgress);

    // Scroll to the result to ensure visibility
    setTimeout(() => {
      quizRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const options = [
    { key: 'A', text: 'Daily, by letting the tap run while brushing.', isCorrect: false },
    { key: 'B', text: 'Only when full, using an efficient model.', isCorrect: true },
    { key: 'C', text: 'Twice a day, regardless of the load size.', isCorrect: false },
  ];

  return (
    <section id="quiz-section" className="quiz-section" ref={quizRef}>
      <h2 className="section-heading">💧 Water Habit Check</h2>
      <p className="section-subtitle">Take a quick poll: How often do you run your washing machine?</p>
      
      <div className="quiz-options">
        {options.map((option) => (
          <button 
            key={option.key} 
            className={`quiz-button ${selected === option.key ? 'selected' : ''}`}
            onClick={() => handleSelect(option.key)}
            disabled={showResult}
          >
            {option.text}
          </button>
        ))}
      </div>

      {showResult && (
        <div className="quiz-result fade-in">
          <div className="result-header">
            {selected === 'B' ? (
              <>
                <FaCheckCircle className="result-icon correct" />
                <h3 className="result-text correct">Excellent Habit!</h3>
              </>
            ) : (
              <>
                <FaTimesCircle className="result-icon incorrect" />
                <h3 className="result-text incorrect">Room for Improvement!</h3>
              </>
            )}
          </div>

          <div className="progress-bar-container">
            <p>Your Efficiency Score: **{progress}%**</p>
            <div className="progress-bar-track">
              {/* Progress bar fill with transition */}
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <p className="quiz-feedback">**Tip:** Waiting for a full load and using an efficient machine significantly reduces water waste. Every drop counts!</p>
        </div>
      )}
    </section>
  );
};


// --- Main App Component ---
const App = () => {
  const tipsRef = useRef(null);

  const waterTips = [
    { icon: FaFaucet, title: 'Fix Leaking Taps', description: 'A single dripping tap can waste hundreds of liters of water per month. Check and repair immediately.' },
    { icon: FaShower, title: 'Shorter Showers', description: 'Aim for a 5-minute shower instead of a bath. Install a low-flow showerhead for even more savings.' },
    { icon: FaLeaf, title: 'Smart Gardening', description: 'Water your plants early in the morning or late evening to minimize evaporation. Use mulch to retain soil moisture.' },
    { icon: FaRecycle, title: 'Use Water-Wise Appliances', description: 'Invest in appliances (washing machines, dishwashers) with a high water efficiency rating.' },
    { icon: FaTint, title: 'Collect Rainwater', description: 'Install a simple rain barrel to collect water for gardening, cleaning, and other non-drinking uses.' },
    { icon: FaChartBar, title: 'Monitor Usage', description: 'Regularly check your water meter for unexplained spikes, which could indicate a hidden leak.' },
  ];

  // Function to scroll to the conservation tips section
  const scrollToTips = () => {
    tipsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* 1. Header / Hero Section */}
      <header className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Save Water, Save Life 💧</h1>
          <p className="hero-subtitle">Every Drop is a Promise for Tomorrow: Smart Management and Conservation for a Greener Future.</p>
          <button className="cta-button" onClick={scrollToTips}>
            Get Conservation Tips
          </button>
        </div>
      </header>

      {/* 2. Water Conservation Tips Section */}
      <section id="conservation-tips" ref={tipsRef} className="tips-section">
        <h2 className="section-heading">Smart Water Conservation Tips 💡</h2>
        <p className="section-subtitle">Simple changes lead to massive impact. Start your journey today!</p>
        <div className="tips-grid">
          {waterTips.map((tip, index) => (
            <TipCard 
              key={index} 
              icon={tip.icon} 
              title={tip.title} 
              description={tip.description} 
            />
          ))}
        </div>
      </section>

      {/* 3. Infographics / Visual Representation */}
      <Infographic />

      {/* 4. Interactive Features (Quiz) */}
      <WaterQuiz />

      {/* 5. Footer */}
      <footer className="footer-section">
        <div className="footer-content">
          <p className="footer-text">© 2025 Smart Water Initiative. All rights reserved.</p>
          <div className="footer-links">
            <a href="#conservation-tips" className="footer-link">Tips</a>
            <a href="mailto:contact@smartwater.org" className="footer-link">Contact</a>
            <a href="#" className="footer-link">Resources</a>
          </div>
          <div className="social-icons">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter className="social-icon" /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF className="social-icon" /></a>
            <a href="mailto:info@example.com" aria-label="Email"><FaEnvelope className="social-icon" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;