import React, { useState, useEffect } from 'react';
import { Droplets, Wrench, Leaf, CloudRain, Gauge, Award, Heart, TreePine } from 'lucide-react';
import './Claude.css';

// Header Component
const Header = () => {
  const scrollToTips = () => {
    document.getElementById('tips-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Save Water, Save Life</h1>
        <p className="hero-subtitle">
          Every drop counts. Join the movement towards sustainable water management
          and make a difference for our planet's future.
        </p>
        <button className="cta-button" onClick={scrollToTips}>
          Discover Water Saving Tips
        </button>
      </div>
      <div className="water-wave"></div>
    </header>
  );
};

// Tip Card Component
const TipCard = ({ icon: Icon, title, description, delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`tip-${title}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [title]);

  return (
    <div
      id={`tip-${title}`}
      className={`tip-card ${isVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="tip-icon">
        <Icon size={40} />
      </div>
      <h3 className="tip-title">{title}</h3>
      <p className="tip-description">{description}</p>
    </div>
  );
};

// Tips Section Component
const TipsSection = () => {
  const tips = [
    {
      icon: Wrench,
      title: 'Fix Leaking Taps',
      description: 'A dripping tap can waste over 15 liters per day. Regular maintenance saves water and money.',
      delay: 0
    },
    {
      icon: Gauge,
      title: 'Water-Efficient Appliances',
      description: 'Use dishwashers and washing machines only when full. Choose appliances with high water efficiency ratings.',
      delay: 100
    },
    {
      icon: CloudRain,
      title: 'Collect Rainwater',
      description: 'Install rain barrels to collect rainwater for gardening and outdoor use. It\'s free and sustainable.',
      delay: 200
    },
    {
      icon: Leaf,
      title: 'Smart Irrigation',
      description: 'Water plants early morning or evening. Use drip irrigation systems to reduce water waste.',
      delay: 300
    },
    {
      icon: Droplets,
      title: 'Shorter Showers',
      description: 'Reduce shower time by 2-3 minutes to save up to 20 liters of water per shower.',
      delay: 400
    },
    {
      icon: TreePine,
      title: 'Native Plants',
      description: 'Choose drought-resistant native plants that require less water for your garden.',
      delay: 500
    }
  ];

  return (
    <section id="tips-section" className="tips-section">
      <div className="container">
        <h2 className="section-title">Water Conservation Tips</h2>
        <p className="section-subtitle">Simple actions that make a big impact</p>
        <div className="tips-grid">
          {tips.map((tip, index) => (
            <TipCard key={index} {...tip} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Infographic Component
const Infographic = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('infographic');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const data = [
    { label: 'Toilet', percentage: 30, liters: '30L/day' },
    { label: 'Shower', percentage: 25, liters: '25L/day' },
    { label: 'Kitchen', percentage: 20, liters: '20L/day' },
    { label: 'Laundry', percentage: 15, liters: '15L/day' },
    { label: 'Garden', percentage: 10, liters: '10L/day' }
  ];

  return (
    <section id="infographic" className="infographic-section">
      <div className="container">
        <h2 className="section-title">Average Household Water Usage</h2>
        <p className="section-subtitle">Understanding where water goes helps you save better</p>
        <div className="chart-container">
          {data.map((item, index) => (
            <div key={index} className="chart-item">
              <div className="bar-label">{item.label}</div>
              <div className="bar-wrapper">
                <div
                  className={`bar ${isVisible ? 'grow' : ''}`}
                  style={{
                    width: isVisible ? `${item.percentage}%` : '0%',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <span className="bar-percentage">{item.percentage}%</span>
                </div>
              </div>
              <div className="bar-value">{item.liters}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Quiz Component
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: 'How long is your average shower?',
      options: [
        { text: 'Less than 5 minutes', points: 3 },
        { text: '5-10 minutes', points: 2 },
        { text: 'More than 10 minutes', points: 1 }
      ]
    },
    {
      question: 'Do you turn off the tap while brushing teeth?',
      options: [
        { text: 'Always', points: 3 },
        { text: 'Sometimes', points: 2 },
        { text: 'Never', points: 1 }
      ]
    },
    {
      question: 'How often do you run the dishwasher?',
      options: [
        { text: 'Only when full', points: 3 },
        { text: 'When mostly full', points: 2 },
        { text: 'Whenever needed', points: 1 }
      ]
    }
  ];

  const handleAnswer = (points) => {
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const totalScore = answers.reduce((sum, points) => sum + points, 0);
  const maxScore = questions.length * 3;
  const percentage = (totalScore / maxScore) * 100;

  const getResultMessage = () => {
    if (percentage >= 80) return { title: 'Water Hero!', message: 'You\'re doing an excellent job conserving water. Keep it up!', icon: Award };
    if (percentage >= 60) return { title: 'Good Effort!', message: 'You\'re on the right track. A few improvements will make you a water hero!', icon: Heart };
    return { title: 'Room for Improvement', message: 'There\'s potential to save much more water. Start with small changes!', icon: Droplets };
  };

  return (
    <section className="quiz-section">
      <div className="container">
        <h2 className="section-title">Test Your Water Habits</h2>
        <div className="quiz-container">
          {!showResult ? (
            <>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              <div className="question-counter">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <h3 className="quiz-question">{questions[currentQuestion].question}</h3>
              <div className="quiz-options">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className="quiz-option"
                    onClick={() => handleAnswer(option.points)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="quiz-result">
              {React.createElement(getResultMessage().icon, { size: 60, className: 'result-icon' })}
              <h3 className="result-title">{getResultMessage().title}</h3>
              <p className="result-message">{getResultMessage().message}</p>
              <div className="score-display">
                Your Score: {totalScore} / {maxScore}
              </div>
              <div className="score-bar">
                <div
                  className="score-fill"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <button className="reset-button" onClick={resetQuiz}>
                Take Quiz Again
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Water Conservation</h4>
            <p>Join us in making a difference. Every small action contributes to a sustainable future.</p>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="https://www.epa.gov/watersense" target="_blank" rel="noopener noreferrer">EPA WaterSense</a></li>
              <li><a href="https://www.un.org/waterforlifedecade/" target="_blank" rel="noopener noreferrer">UN Water</a></li>
              <li><a href="https://www.worldwatercouncil.org/" target="_blank" rel="noopener noreferrer">World Water Council</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Smart Water Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="app">
      <Header />
      <TipsSection />
      <Infographic />
      <Quiz />
      <Footer />
    </div>
  );
};

export default App;