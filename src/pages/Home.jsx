import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, ButtonGroup, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useDepartment } from '../contexts/DepartmentContext';

// Import images
import structureImage from '../assets/images/structure.jpg';
import itImage from '../assets/images/it-image.jpeg';

// Import sub-components
import About from './About';
import Services from './Services';
import Projects from './Projects';
import Blog from './Blog';
import Contact from './Contact';

function Home({ department, onDepartmentChange }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const services = [
    { id: 1, dept: 'civil', title: 'Structural Design & Analysis', description: 'Comprehensive structural engineering design, analysis, and optimization for buildings and infrastructure.', icon: '🏗️' },
    { id: 2, dept: 'civil', title: 'Site Assessment & Surveying', description: 'Detailed site evaluation, topographic surveying, and geotechnical investigations.', icon: '📐' },
    { id: 3, dept: 'civil', title: 'Project Management & Supervision', description: 'Full project lifecycle management, construction supervision, and quality assurance.', icon: '📋' },
    { id: 4, dept: 'civil', title: 'Compliance & Regulatory Services', description: 'Ensuring all projects meet local building codes, environmental regulations, and safety standards.', icon: '⚖️' },
    { id: 5, dept: 'civil', title: 'Construction Quality Control', description: 'On-site quality monitoring, material testing, and construction methodology optimization.', icon: '🔍' },
    { id: 6, dept: 'it', title: 'BIM Consulting & Implementation', description: 'Building Information Modeling strategy, software selection, and team training.', icon: '🏢' },
    { id: 7, dept: 'it', title: 'Construction Software Integration', description: 'Seamless integration of project management, estimation, and scheduling software.', icon: '🔗' },
    { id: 8, dept: 'it', title: 'IoT & Sensor Systems', description: 'Smart construction monitoring with IoT sensors for real-time data collection and analysis.', icon: '📡' },
    { id: 9, dept: 'it', title: 'Digital Twin Development', description: 'Creating virtual replicas of construction projects for simulation and optimization.', icon: '🤖' },
    { id: 10, dept: 'it', title: 'Data Analytics & Reporting', description: 'Advanced analytics for construction data, performance metrics, and predictive insights.', icon: '📊' },
    { id: 11, dept: 'all', title: 'Integrated Solutions', description: 'We combine civil knowledge with IT capabilities to deliver smart solutions.', icon: '🔄' }
  ];

  const filteredServices = department === 'all' || !department
    ? services
    : services.filter(s => s.dept === 'all' || s.dept === department);

  const [counters, setCounters] = useState({ projects: 0, clients: 0, engineers: 0, experience: 0 });
  const achievementsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [structureImage, itImage];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        animateCounters();
      }
    }, { threshold: 0.1 });
    if (achievementsRef.current) observer.observe(achievementsRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (department === 'all' || !department) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [department, slides.length]);

  const animateCounters = () => {
    const targets = { projects: 500, clients: 250, engineers: 50, experience: 25 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounters({
        projects: Math.floor(targets.projects * progress),
        clients: Math.floor(targets.clients * progress),
        engineers: Math.floor(targets.engineers * progress),
        experience: Math.floor(targets.experience * progress)
      });
      if (step >= steps) { clearInterval(timer); setCounters(targets); }
    }, interval);
  };

  const getHeroBg = () => {
    if (department === 'civil') return structureImage;
    if (department === 'it') return itImage;
    return slides[currentSlide];
  };

  return (
    <div className="home-container">
      {/* Hero Section - Restored to original centered style */}
      <section
        className="hero-section py-5 text-center text-white d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${getHeroBg()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '80vh',
          transition: 'all 0.5s ease'
        }}
      >
        <Container>
          <div className="hero-content py-5">
            <h1 className="display-2 fw-bold mb-4">Practical Engineering & Innovative IT Solutions</h1>

            <div className="d-flex justify-content-center mb-4">
              <ButtonGroup className="bg-white p-1 rounded-pill shadow">
                {['all', 'civil', 'it'].map((dept) => (
                  <Button
                    key={dept}
                    variant={department === dept ? 'primary' : 'light'}
                    onClick={() => onDepartmentChange(dept)}
                    className="px-4 py-2 rounded-pill border-0 fw-bold"
                  >
                    {dept === 'all' ? 'All' : dept === 'civil' ? 'Civil' : 'IT'}
                  </Button>
                ))}
              </ButtonGroup>
            </div>

            <p className="lead fs-3 mb-5 max-w-800 mx-auto">
              Empowering the Construction Industry through integrated engineering and technology.
            </p>

            <Button as={Link} to="/contact" size="lg" variant="primary" className="px-5 py-3 rounded-pill fw-bold shadow">
              Get Started
            </Button>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section id="services" className="py-5 bg-light">
        <Container>
          <h2 className="text-center display-4 fw-bold mb-5">Our Services</h2>
          <Row className="g-4">
            {filteredServices.slice(0, 6).map((service) => (
              <Col md={6} lg={4} key={service.id}>
                <Card className="h-100 border-0 shadow-sm hover-up">
                  <Card.Body className="p-4 text-center">
                    <div className="display-4 mb-3">{service.icon}</div>
                    <Card.Title className="fw-bold h4">{service.title}</Card.Title>
                    <Card.Text className="text-muted">{service.description}</Card.Text>
                    <Button as={Link} to="/services" variant="outline-primary" className="mt-3 rounded-pill">View Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Achievements Section */}
      <section className="py-5 bg-dark text-white" ref={achievementsRef}>
        <Container>
          <h2 className="text-center display-4 fw-bold mb-5">Our Achievements</h2>
          <Row className="text-center g-4">
            <Col md={3}>
              <div className="p-3">
                <div className="display-4 fw-bold text-primary mb-2">{counters.projects}+</div>
                <div className="text-uppercase fw-bold opacity-75">Projects Completed</div>
              </div>
            </Col>
            <Col md={3}>
              <div className="p-3">
                <div className="display-4 fw-bold text-primary mb-2">{counters.clients}+</div>
                <div className="text-uppercase fw-bold opacity-75">Happy Clients</div>
              </div>
            </Col>
            <Col md={3}>
              <div className="p-3">
                <div className="display-4 fw-bold text-primary mb-2">{counters.engineers}+</div>
                <div className="text-uppercase fw-bold opacity-75">Expert Engineers</div>
              </div>
            </Col>
            <Col md={3}>
              <div className="p-3">
                <div className="display-4 fw-bold text-primary mb-2">{counters.experience}+</div>
                <div className="text-uppercase fw-bold opacity-75">Years Experience</div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Conditional Sub-sections - Restored original structure */}
      {isHomePage && (
        <>
          <About />
          <Services department={department} />
          <Projects department={department} />
          <Blog department={department} />
          <Contact />
        </>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .hover-up { transition: transform 0.3s ease; }
        .hover-up:hover { transform: translateY(-10px); }
        .max-w-800 { max-width: 800px; }
      `}} />
    </div>
  );
}

export default Home;
