import React, { useState } from "react";
import "./Perplexity.css";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaDownload,
  FaReact,
  FaNodeJs,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaDatabase,
  FaProjectDiagram,
} from "react-icons/fa";

const projectsData = [
  {
    title: "Project One",
    description:
      "A full-stack MERN app with authentication, CRUD operations, and RESTful API integration.",
    icon: <FaProjectDiagram />,
    details:
      "This project demonstrates authentication flows using JWT, responsive UI using React, and backend with Node/Express & MongoDB.",
  },
  {
    title: "Project Two",
    description:
      "Real-time chat application using Socket.io and React hooks with Material UI.",
    icon: <FaProjectDiagram />,
    details:
      "Features live messaging, user presence detection, and message notifications with modern React patterns.",
  },
  {
    title: "Project Three",
    description:
      "Personal blog platform built with Next.js and Markdown support, optimized for SEO.",
    icon: <FaProjectDiagram />,
    details:
      "Includes dynamic routes, server-side rendering, and a clean minimalist user interface for blog reading and posting.",
  },
  {
    title: "Project Four",
    description:
      "E-commerce platform prototype with shopping cart, payment gateway integration, and product management.",
    icon: <FaProjectDiagram />,
    details:
      "Built with React and Redux, integrates Stripe API, with optimized performance and accessibility considerations.",
  },
];

const skillsData = [
  { skill: "React", icon: <FaReact />, level: 90 },
  { skill: "Node.js", icon: <FaNodeJs />, level: 85 },
  { skill: "JavaScript", icon: <FaJs />, level: 95 },
  { skill: "HTML5", icon: <FaHtml5 />, level: 95 },
  { skill: "CSS3", icon: <FaCss3Alt />, level: 90 },
  { skill: "Databases", icon: <FaDatabase />, level: 80 },
];

export default function Portfolio() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);

  const handleProjectClick = (index) => {
    setActiveProjectIndex(index === activeProjectIndex ? null : index);
  };

  return (
    <>
      <header id="perplexity-header" className="perplexity-header">
        <nav className="perplexity-nav">
          <a href="#perplexity-header" className="perplexity-logo">
            YourName
          </a>
          <ul className="perplexity-nav-links">
            <li>
              <a href="#perplexity-about">About</a>
            </li>
            <li>
              <a href="#perplexity-projects">Projects</a>
            </li>
            <li>
              <a href="#perplexity-resume">Resume</a>
            </li>
            <li>
              <a href="#perplexity-contact">Contact</a>
            </li>
          </ul>
        </nav>
        <section className="perplexity-hero">
          <h1 className="perplexity-hero-title">
            Full-Stack Developer
          </h1>
          <p className="perplexity-hero-tagline">
            Crafting Modern Web Experiences with React & Node.js
          </p>
        </section>
      </header>

      <main>
        <section id="perplexity-about" className="perplexity-about">
          <div className="perplexity-about-content">
            <div
              className="perplexity-profile-pic"
              title="YourName - Full-Stack Developer"
              aria-label="Profile"
            >
              {/* Placeholder background with initials or icon */}
              <span className="perplexity-profile-initials">YN</span>
            </div>
            <div className="perplexity-about-text">
              <p>
                I am a passionate full-stack developer specializing in building
                scalable and responsive web applications using React, Node.js,
                and modern web technologies. With a strong foundation in
                JavaScript and UI/UX principles, I transform ideas into sleek,
                functional digital solutions.
              </p>
            </div>
          </div>
        </section>

        <section id="perplexity-projects" className="perplexity-projects">
          <h2 className="perplexity-section-title">Projects</h2>
          <div className="perplexity-projects-grid">
            {projectsData.map((project, index) => (
              <div
                key={index}
                className={`perplexity-project-card ${
                  activeProjectIndex === index ? "active" : ""
                }`}
                onClick={() => handleProjectClick(index)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleProjectClick(index);
                  }
                }}
                aria-expanded={activeProjectIndex === index}
                aria-controls={`perplexity-project-details-${index}`}
              >
                <div className="perplexity-project-icon">{project.icon}</div>
                <h3 className="perplexity-project-title">{project.title}</h3>
                <p className="perplexity-project-description">{project.description}</p>
                {activeProjectIndex === index && (
                  <div
                    id={`perplexity-project-details-${index}`}
                    className="perplexity-project-details"
                  >
                    <p>{project.details}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="perplexity-resume" className="perplexity-resume">
          <h2 className="perplexity-section-title">Skills & Resume</h2>
          <div className="perplexity-skills-container">
            {skillsData.map(({ skill, icon, level }, index) => (
              <div key={index} className="perplexity-skill-bar">
                <div className="perplexity-skill-icon">{icon}</div>
                <span className="perplexity-skill-label">{skill}</span>
                <div className="perplexity-skill-progress-bar">
                  <div
                    className="perplexity-skill-progress"
                    style={{ width: `${level}%` }}
                    aria-valuenow={level}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    role="progressbar"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            className="perplexity-resume-download"
            onClick={() => {
              // Trigger resume download logic or link
              window.open("/resume.pdf", "_blank");
            }}
            aria-label="Download Resume"
          >
            <FaDownload /> Download Resume
          </button>
        </section>

        <section id="perplexity-contact" className="perplexity-contact">
          <h2 className="perplexity-section-title">Contact Me</h2>
          <form
            className="perplexity-contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent! (This is a demo placeholder)");
              e.target.reset();
            }}
            aria-label="Contact form"
          >
            <label htmlFor="perplexity-name">Name</label>
            <input
              id="perplexity-name"
              name="name"
              type="text"
              required
              placeholder="Your Name"
            />
            <label htmlFor="perplexity-email">Email</label>
            <input
              id="perplexity-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
            />
            <label htmlFor="perplexity-message">Message</label>
            <textarea
              id="perplexity-message"
              name="message"
              rows="5"
              required
              placeholder="Your message here..."
            />
            <button type="submit" className="perplexity-button-submit">
              Send Message
            </button>
          </form>
          <div className="perplexity-social-links" aria-label="Social media links">
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="perplexity-icon-link"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="perplexity-icon-link"
            >
              <FaGithub />
            </a>
            <a
              href="mailto:your.email@example.com"
              aria-label="Email"
              className="perplexity-icon-link"
            >
              <FaEnvelope />
            </a>
          </div>
        </section>
      </main>

      <footer className="perplexity-footer">
        <p>
          &copy; {new Date().getFullYear()} YourName. All rights reserved.
        </p>
        <nav className="perplexity-footer-nav">
          <a href="#perplexity-header">Home</a>
          <a href="#perplexity-about">About</a>
          <a href="#perplexity-projects">Projects</a>
          <a href="#perplexity-contact">Contact</a>
        </nav>
      </footer>
    </>
  );
}
