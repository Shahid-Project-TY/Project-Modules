import { useState, useEffect, useRef } from "react";
import "./GPT.css";
import { FaFaucet, FaLeaf, FaCloudRain } from "react-icons/fa";

function App() {
  const tipsRef = useRef(null);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [progress, setProgress] = useState(0);
  const [showChart, setShowChart] = useState(false);

  // Scroll animation trigger
  useEffect(() => {
    const handleScroll = () => {
      const chartPos = document.getElementById("infographic").offsetTop;
      if (window.scrollY + window.innerHeight > chartPos + 100) {
        setShowChart(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleQuiz = () => {
    if (quizAnswer === "yes") setProgress(80);
    else if (quizAnswer === "no") setProgress(30);
    else setProgress(0);
  };

  const scrollToTips = () => {
    tipsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="page">

      {/* HERO SECTION */}
      <header className="hero">
        <h1>Save Water, Save Life</h1>
        <p>Small actions today create a sustainable tomorrow.</p>
        <button onClick={scrollToTips} className="cta-btn">
          Learn Tips
        </button>
      </header>

      {/* TIPS SECTION */}
      <section className="tips-section" ref={tipsRef}>
        <h2>Water Conservation Tips</h2>

        <div className="tips-grid">
          <div className="tip-card">
            <FaFaucet className="icon" />
            <h3>Fix Leaking Taps</h3>
            <p>Save up to 20 gallons a day by repairing leaks.</p>
          </div>

          <div className="tip-card">
            <FaLeaf className="icon" />
            <h3>Use Efficient Appliances</h3>
            <p>Modern appliances use less water with better performance.</p>
          </div>

          <div className="tip-card">
            <FaCloudRain className="icon" />
            <h3>Collect Rainwater</h3>
            <p>Perfect for gardening and outdoor cleaning.</p>
          </div>
        </div>
      </section>

      {/* INFOGRAPHIC */}
      <section id="infographic" className="infographic">
        <h2>Your Daily Water Usage</h2>

        <div className="bar-container">
          <div
            className="bar"
            style={{ height: showChart ? "70%" : "0%" }}
          ></div>
          <p>Average Household Usage</p>
        </div>
      </section>

      {/* QUIZ SECTION */}
      <section className="quiz-section">
        <h2>Quick Water Habit Check</h2>
        <p>Do you consciously try to save water?</p>

        <div className="quiz-options">
          <label>
            <input
              type="radio"
              name="quiz"
              value="yes"
              onChange={(e) => setQuizAnswer(e.target.value)}
            />
            Yes
          </label>

          <label>
            <input
              type="radio"
              name="quiz"
              value="no"
              onChange={(e) => setQuizAnswer(e.target.value)}
            />
            No
          </label>
        </div>

        <button className="quiz-btn" onClick={handleQuiz}>
          Show My Score
        </button>

        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Smart Water Initiative</p>
        <div className="footer-links">
          <a href="#">Contact</a>
          <a href="#">Resources</a>
          <a href="#">Social</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
