import React, { useState, useEffect } from "react";
import { FaFaucet, FaLeaf, FaCloudRain } from "react-icons/fa";
import "./Copilot.css";

function App() {
  const [progress, setProgress] = useState(0);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) setProgress(70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTips = () => {
    document.getElementById("tips").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero Section */}
      <header className="hero">
        <h1>Save Water, Save Life</h1>
        <p>Every drop counts — conserve water for a sustainable future.</p>
        <button onClick={scrollToTips}>Learn Tips</button>
      </header>

      {/* Tips Section */}
      <section id="tips" className="tips">
        <h2>Water Conservation Tips</h2>
        <div className="tips-grid">
          <div className="tip-card"><FaFaucet className="icon" /><p>Fix leaking taps</p></div>
          <div className="tip-card"><FaLeaf className="icon" /><p>Use water-efficient appliances</p></div>
          <div className="tip-card"><FaCloudRain className="icon" /><p>Collect rainwater</p></div>
        </div>
      </section>

      {/* Infographic */}
      <section className="infographic">
        <h2>Water Usage Savings</h2>
        <div className="bar-container">
          <div className="bar" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="quiz">
        <h2>Quick Quiz</h2>
        <p>Do you turn off the tap while brushing?</p>
        <div className="quiz-options">
          <button onClick={() => setAnswer("yes")}>Yes</button>
          <button onClick={() => setAnswer("no")}>No</button>
        </div>
        {answer && (
          <div className="progress">
            <div
              className="progress-bar"
              style={{ width: answer === "yes" ? "80%" : "20%" }}
            >
              {answer === "yes" ? "Great habit!" : "Try to improve!"}
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Contact: info@savewater.org</p>
        <div className="social">
          <a href="#">Twitter</a>
          <a href="#">Facebook</a>
          <a href="#">Resources</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
