import React, { useState, useEffect } from 'react';
import { Code, Database, Globe, Server, Smartphone, Terminal, Github, Linkedin, Mail, Phone, MapPin, Download, ExternalLink, ChevronRight, Menu, X, Check } from 'lucide-react';
import './Claude.css';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform with user authentication, product management, shopping cart, payment integration, and admin dashboard.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      features: ['User Authentication', 'Payment Gateway', 'Admin Panel', 'Real-time Updates']
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for managing multiple social media accounts with real-time metrics, post scheduling, and engagement tracking.',
      tech: ['Vue.js', 'Express', 'PostgreSQL', 'Redis'],
      features: ['Real-time Analytics', 'Post Scheduling', 'Multi-platform Support', 'Data Visualization']
    },
    {
      title: 'Task Management System',
      description: 'Collaborative project management tool with kanban boards, team chat, file sharing, and progress tracking features.',
      tech: ['React', 'Firebase', 'Material-UI', 'WebSocket'],
      features: ['Real-time Collaboration', 'Drag & Drop', 'File Uploads', 'Team Chat']
    },
    {
      title: 'AI Content Generator',
      description: 'Machine learning powered content creation tool that generates blog posts, social media content, and marketing copy using natural language processing.',
      tech: ['Python', 'TensorFlow', 'Flask', 'React'],
      features: ['NLP Integration', 'Multiple Templates', 'SEO Optimization', 'Export Options']
    },
    {
      title: 'Fitness Tracking App',
      description: 'Mobile-first fitness application with workout plans, nutrition tracking, progress visualization, and community features.',
      tech: ['React Native', 'Node.js', 'MongoDB', 'AWS'],
      features: ['Workout Plans', 'Nutrition Tracker', 'Progress Charts', 'Social Features']
    }
  ];

  const skills = [
    { name: 'React / Next.js', level: 95, icon: <Code /> },
    { name: 'Node.js / Express', level: 90, icon: <Server /> },
    { name: 'MongoDB / PostgreSQL', level: 85, icon: <Database /> },
    { name: 'TypeScript', level: 88, icon: <Terminal /> },
    { name: 'REST APIs / GraphQL', level: 92, icon: <Globe /> },
    { name: 'Mobile Development', level: 80, icon: <Smartphone /> }
  ];

  return (
    <div className="portfolio">
      <nav className={`navbar ${activeSection !== 'home' ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <Code className="logo-icon" />
              <span>Alex Morgan</span>
            </div>
            
            <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>

            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <li><a onClick={() => scrollToSection('home')} className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
              <li><a onClick={() => scrollToSection('about')} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
              <li><a onClick={() => scrollToSection('projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
              <li><a onClick={() => scrollToSection('skills')} className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
              <li><a onClick={() => scrollToSection('contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-background">
          <div className="grid-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Hi, I'm <span className="gradient-text">Alex Morgan</span>
              </h1>
              <h2 className="hero-subtitle">Full-Stack Developer</h2>
              <p className="hero-description">
                I craft elegant, scalable web applications with modern technologies. 
                Specializing in React, Node.js, and cloud architectures to bring ideas to life.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                  View Projects <ChevronRight />
                </button>
                <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
                  Get In Touch
                </button>
              </div>
              <div className="social-links">
                <a href="#" className="social-link"><Github /></a>
                <a href="#" className="social-link"><Linkedin /></a>
                <a href="#" className="social-link"><Mail /></a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="code-block">
                <div className="code-header">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="code-content">
                  <code>
                    <span className="keyword">const</span> developer = {'{\n'}
                    {'  '}name: <span className="string">'Alex Morgan'</span>,{'\n'}
                    {'  '}role: <span className="string">'Full-Stack Dev'</span>,{'\n'}
                    {'  '}skills: [<span className="string">'React'</span>, <span className="string">'Node'</span>, <span className="string">'AWS'</span>],{'\n'}
                    {'  '}passion: <span className="string">'Building'</span>{'\n'}
                    {'};'}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-image">
              <div className="profile-card">
                <div className="profile-avatar">
                  <Code size={80} />
                </div>
                <div className="profile-rings"></div>
              </div>
            </div>
            <div className="about-text">
              <h3>Building Digital Experiences</h3>
              <p>
                With over 6 years of experience in full-stack development, I've worked with startups 
                and enterprises to build scalable, user-centric applications. My journey started with 
                a fascination for solving complex problems through code, and it has evolved into a 
                career of creating impactful digital solutions.
              </p>
              <p>
                I specialize in modern JavaScript frameworks, cloud architecture, and database design. 
                My approach combines clean code practices with agile methodologies to deliver products 
                that not only meet requirements but exceed expectations.
              </p>
              <div className="about-highlights">
                <div className="highlight-item">
                  <h4>50+</h4>
                  <p>Projects Completed</p>
                </div>
                <div className="highlight-item">
                  <h4>15+</h4>
                  <p>Happy Clients</p>
                </div>
                <div className="highlight-item">
                  <h4>6+</h4>
                  <p>Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">A selection of my recent work</p>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-icon">
                  <Globe size={40} />
                </div>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-badge">{tech}</span>
                  ))}
                </div>
                <div className="project-features">
                  {project.features.map((feature, i) => (
                    <div key={i} className="feature-item">
                      <Check size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="project-links">
                  <button className="project-link">
                    <Github size={18} />
                    Code
                  </button>
                  <button className="project-link">
                    <ExternalLink size={18} />
                    Live Demo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">Tools and technologies I work with</p>
          
          <div className="skills-content">
            <div className="skills-list">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-header">
                    <div className="skill-info">
                      <span className="skill-icon">{skill.icon}</span>
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="tech-stack">
              <h3>Technology Stack</h3>
              <div className="tech-categories">
                <div className="tech-category">
                  <h4>Frontend</h4>
                  <div className="tech-items">
                    <span>React</span>
                    <span>Next.js</span>
                    <span>Vue.js</span>
                    <span>TypeScript</span>
                    <span>Tailwind CSS</span>
                    <span>Redux</span>
                  </div>
                </div>
                <div className="tech-category">
                  <h4>Backend</h4>
                  <div className="tech-items">
                    <span>Node.js</span>
                    <span>Express</span>
                    <span>Python</span>
                    <span>Django</span>
                    <span>GraphQL</span>
                    <span>REST APIs</span>
                  </div>
                </div>
                <div className="tech-category">
                  <h4>Database</h4>
                  <div className="tech-items">
                    <span>MongoDB</span>
                    <span>PostgreSQL</span>
                    <span>MySQL</span>
                    <span>Redis</span>
                    <span>Firebase</span>
                  </div>
                </div>
                <div className="tech-category">
                  <h4>DevOps & Tools</h4>
                  <div className="tech-items">
                    <span>AWS</span>
                    <span>Docker</span>
                    <span>Git</span>
                    <span>CI/CD</span>
                    <span>Nginx</span>
                    <span>Linux</span>
                  </div>
                </div>
              </div>
              
              <button className="btn btn-primary resume-btn">
                <Download size={20} />
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's work together on your next project</p>
          
          <div className="contact-content">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>Feel free to reach out through any of these channels. I'm always open to discussing new projects and opportunities.</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <Mail />
                  <div>
                    <h4>Email</h4>
                    <p>alex.morgan@devmail.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <Phone />
                  <div>
                    <h4>Phone</h4>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="contact-item">
                  <MapPin />
                  <div>
                    <h4>Location</h4>
                    <p>San Francisco, CA</p>
                  </div>
                </div>
              </div>

              <div className="social-links-contact">
                <a href="#" className="social-btn"><Github /> GitHub</a>
                <a href="#" className="social-btn"><Linkedin /> LinkedIn</a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project..."
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className={`btn btn-primary ${formSubmitted ? 'success' : ''}`}>
                {formSubmitted ? (
                  <>
                    <Check /> Message Sent!
                  </>
                ) : (
                  <>
                    Send Message <ChevronRight />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-left">
              <div className="footer-logo">
                <Code className="logo-icon" />
                <span>Alex Morgan</span>
              </div>
              <p>Building the web, one line of code at a time.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Navigation</h4>
                <a onClick={() => scrollToSection('home')}>Home</a>
                <a onClick={() => scrollToSection('about')}>About</a>
                <a onClick={() => scrollToSection('projects')}>Projects</a>
                <a onClick={() => scrollToSection('skills')}>Skills</a>
              </div>
              <div className="footer-column">
                <h4>Connect</h4>
                <a href="#">GitHub</a>
                <a href="#">LinkedIn</a>
                <a href="#">Twitter</a>
                <a href="#">Email</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Alex Morgan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}