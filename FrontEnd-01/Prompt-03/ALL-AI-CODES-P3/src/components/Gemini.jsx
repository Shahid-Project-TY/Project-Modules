import React, { useState, useEffect } from 'react';
import "./Gemini.css"

// Reusable SVG Icon Components
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.805 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.733.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.835 2.809 1.305 3.492.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.292-1.552 3.301-1.23 3.301-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.923.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.201-6.094 8.201-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.263-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M16 11h-3V5h-2v6H8l4 4 4-4zM4 19h16v2H4v-2z"/>
  </svg>
);

const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M8 12h-3l7-8 7 8h-3v8h-8v-8z"/>
  </svg>
);

// --- Data Stubs ---
const PROJECTS = [
  {
    title: "E-Commerce REST API",
    description: "Built a robust, scalable backend for an online store using Node.js, Express, and MongoDB. Implemented authentication, product management, and order processing.",
    technologies: ["Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    title: "Real-Time Chat Application",
    description: "A full-stack application enabling real-time messaging using React for the frontend and WebSockets (Socket.io) for instant bidirectional communication.",
    technologies: ["React", "Socket.io", "PostgreSQL", "Tailwind CSS"],
  },
  {
    title: "AI-Powered Recipe Generator",
    description: "Integrated a large language model (LLM) API with a React frontend to generate creative recipes based on user-provided ingredients and dietary restrictions.",
    technologies: ["React", "Python/Flask", "OpenAI API", "CSS Grid"],
  },
];

const SKILLS = [
  { name: "React", level: 90 },
  { name: "Node.js/Express", level: 85 },
  { name: "JavaScript (ES6+)", level: 95 },
  { name: "SQL/NoSQL DBs", level: 80 },
  { name: "Python", level: 75 },
  { name: "Vanilla CSS", level: 90 },
];

// --- Main Portfolio Component ---
const Portfolio = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [showScroll, setShowScroll] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  // Function for smooth scrolling
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  // Handle scroll-to-top button visibility
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400){
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400){
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", formState);
    alert("Message sent! (Simulated)");
    setFormState({ name: '', email: '', message: '' });
  };


  return (
    <div className="portfolio">
      {/* Header / Navigation */}
      <header className="header">
        <div className="container header-content">
          <div className="logo" onClick={() => scrollToSection('home')}>
            &lt;**J.D** /&gt;
          </div>
          <nav className="nav-menu">
            <a onClick={() => scrollToSection('about')} className="nav-link">About</a>
            <a onClick={() => scrollToSection('projects')} className="nav-link">Projects</a>
            <a onClick={() => scrollToSection('resume')} className="nav-link">Skills</a>
            <a onClick={() => scrollToSection('contact')} className="nav-link contact-btn">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container hero-content">
          <h1 className="name">John Doe</h1>
          <p className="role">Full-Stack Developer</p>
          <div className="tagline-container">
            <p className="tagline">
              <span className="static-text">I build **seamless** digital experiences. </span>
              <span className="animated-text">Code. **Deploy**. Innovate.</span>
            </p>
          </div>
          <button className="primary-button" onClick={() => scrollToSection('projects')}>
            View My Work
          </button>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="about-section section-padding">
        <div className="container">
          <h2 className="section-title">**About** Me</h2>
          <div className="about-content">
            <div className="profile-image-container">
              {/* Profile Image Placeholder */}
              <div className="profile-placeholder">
                <p>J.D</p>
              </div>
            </div>
            <div className="bio">
              <p>Hello! I'm John Doe, a passionate full-stack developer with 5+ years of experience in creating efficient, scalable, and user-friendly web applications. My expertise lies in the **MERN stack**, focusing on cutting-edge React features and robust Node.js backends. I thrive on solving complex technical challenges and delivering high-quality code that makes a real impact.</p>
              <p>I believe in clean architecture, test-driven development, and continuous learning. When I'm not coding, you can find me exploring new technologies or contributing to open-source projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section section-padding">
        <div className="container">
          <h2 className="section-title">My **Projects**</h2>
          <div className="projects-grid">
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                className={`project-card ${activeCard === index ? 'expanded' : ''}`}
                onClick={() => setActiveCard(activeCard === index ? null : index)}
              >
                <div className="project-screenshot-placeholder">
                  <p>{project.title}</p>
                </div>
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="technologies-list">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
                {activeCard === index && (
                  <div className="project-details-overlay">
                    <p>This is where more technical details and links (Live Demo/Code) would go. Click to collapse.</p>
                    <button className="secondary-button">View Code</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume / Skills Section */}
      <section id="resume" className="skills-section section-padding">
        <div className="container">
          <h2 className="section-title">Tech **Stack** & Skills</h2>
          <div className="skills-content">
            <div className="skills-list">
              {SKILLS.map((skill, index) => (
                <div key={index} className="skill-item">
                  <span className="skill-name">{skill.name}</span>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${skill.level}%` }}
                    >
                      <span>{skill.level}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="resume-download-box">
              <h3>Ready for a deeper dive?</h3>
              <p>Download my comprehensive resume to learn more about my experience, education, and detailed project contributions.</p>
              <a href="/path/to/resume.pdf" download="John_Doe_FullStack_Resume.pdf" className="primary-button download-btn">
                <DownloadIcon /> Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section section-padding">
        <div className="container">
          <h2 className="section-title">Get **In Touch**</h2>
          <div className="contact-content">
            <form onSubmit={handleFormSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formState.message}
                  onChange={handleFormChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="primary-button send-btn">
                Send Message
              </button>
            </form>
            <div className="social-links">
              <h3>Connect with me</h3>
              <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                <LinkedInIcon /> LinkedIn Profile
              </a>
              <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer" className="social-link github">
                <GitHubIcon /> GitHub Repos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            <a onClick={() => scrollToSection('about')}>About</a>
            <a onClick={() => scrollToSection('projects')}>Projects</a>
            <a onClick={() => scrollToSection('contact')}>Contact</a>
          </div>
          <p className="copyright">
            &copy; {new Date().getFullYear()} John Doe. Built with React and Vanilla CSS.
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button className="scroll-to-top" onClick={() => scrollToSection('home')}>
          <ArrowUpIcon />
        </button>
      )}
    </div>
  );
};

export default Portfolio;

// To run this component, you would need to:
// 1. Create a file named 'Portfolio.jsx' and paste the content above.
// 2. Create a file named 'Portfolio.css' and paste the CSS content below.
// 3. In your main App.jsx file, import and render the Portfolio component, and import the CSS file.
//    (e.g., import Portfolio from './Portfolio.jsx'; import './Portfolio.css';)