import { useState, useEffect, useRef } from "react";
import {
  FaTint,       // 🔁 changed from FaTiltle → FaTint
  FaWater,
  FaRecycle,
  FaCloudRain,
  FaChartBar,
  FaQuestionCircle,
} from "react-icons/fa";
import { HiArrowDown } from "react-icons/hi";
import { animateScroll as scroll } from "smoothscroll-polyfill";
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();   // enables smooth scrolling for older browsers

import "./Meta.css";

export default function App() {
  const [quizAnswer, setQuizAnswer] = useState("");
  const [waterSaved, setWaterSaved] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const infographicRef = useRef(null);

  useEffect(() => {
    // Simple scroll-based animation trigger
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (infographicRef.current) observer.observe(infographicRef.current);
    return () => observer.disconnect();
  }, []);

  const handleQuiz = (e) => {
    e.preventDefault();
    const daily = parseInt(quizAnswer);
    if (!isNaN(daily)) {
      const saved = Math.round(daily * 0.3); // assume 30 % saving by following tips
      setWaterSaved(saved);
    }
  };

  return (
    <div className="app">
      {/* ---------- Header / Hero ---------- */}
      <header className="hero-meta">
        <div className="hero-overlay">
          <h1>Save Water, Save Life</h1>
          <p>Every drop counts – together we can protect our most precious resource.</p>
          <button onClick={() => scroll.scrollTo(600)} className="cta">
            Discover Tips <HiArrowDown />
          </button>
        </div>
      </header>

      {/* ---------- Tips Grid ---------- */}
      <section className="tips">
        <h2>Simple Water-Saving Tips</h2>
        <div className="tip-grid">
          <TipCard
            icon={<FaTint />}  
            title="Fix Leaking Taps"
            desc="A single drip can waste > 3 L per day. Fix it today!"
          />
          <TipCard
            icon={<FaWater />}
            title="Water-Efficient Appliances"
            desc="Use low-flow showerheads & dual-flush toilets."
          />
          <TipCard
            icon={<FaRecycle />}
            title="Reuse Greywater"
            desc="Redirect kitchen water to plants where safe."
          />
          <TipCard
            icon={<FaCloudRain />}
            title="Collect Rainwater"
            desc="Install a barrel to water your garden for free."
          />
        </div>
      </section>

      {/* ---------- Infographic ---------- */}
      <section className="infographic" ref={infographicRef}>
        <h2>Your Daily Water Footprint</h2>
        <div className="chart">
          <div className="bar-container">
            <div
              className="bar"
              style={{
                height: isVisible ? "70%" : "0%",
                background: "linear-gradient(to top, #4caf50, #2196f3)",
              }}
            ></div>
          </div>
          <div className="axis">
            <span>200 L</span>
            <span>150 L</span>
            <span>100 L</span>
            <span>50 L</span>
            <span>0 L</span>
          </div>
        </div>
        <p className="note">
          Average Indian household uses ~150 L per person per day.
          <br />
          <strong>Goal:</strong> Get below 100 L!
        </p>
      </section>

      {/* ---------- Interactive Quiz ---------- */}
      <section className="quiz">
        <h2>Check Your Habits</h2>
        <form onSubmit={handleQuiz}>
          <label>
            How many litres of water do you use daily?{" "}
            <input
              type="number"
              value={quizAnswer}
              onChange={(e) => setQuizAnswer(e.target.value)}
              placeholder="150"
              min="0"
            />
          </label>
          <button type="submit">See Result</button>
        </form>
        {waterSaved > 0 && (
          <div className="result">
            <p>
              By following our tips you could save up to{" "}
              <strong>{waterSaved} L</strong> per day!
            </p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${(waterSaved / 150) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </section>

      {/* ---------- Footer ---------- */}
      <footer>
        <div className="footer-content">
          <div className="contact">
            <h3>Contact Us</h3>
            <p>📧 hello@savewater.org</p>
            <p>📞 +91-98765 43210</p>
          </div>
          <div className="social">
            <h3>Follow</h3>
            <a href="https://twitter.com/savewater" target="_blank" rel="noopener">
              Twitter
            </a>
            <a href="https://instagram.com/savewater" target="_blank" rel="noopener">
              Instagram
            </a>
            <a href="https://facebook.com/savewater" target="_blank" rel="noopener">
              Facebook
            </a>
          </div>
          <div className="resources">
            <h3>Resources</h3>
            <a
              href="https://www.worldwaterday.org/"
              target="_blank"
              rel="noopener"
            >
              World Water Day
            </a>
            <a
              href="https://www.unwater.org/"
              target="_blank"
              rel="noopener"
            >
              UN Water
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Save Water – All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

function TipCard({ icon, title, desc }) {
  return (
    <div className="tip-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
