import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

// Import images
import structureImage from '../assets/images/structure.jpg';
import itImage from '../assets/images/it-image.jpeg';

function Services({ department }) {
  const { id } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [structureImage, itImage];

  useEffect(() => {
    if (department === 'all' || !department) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [department, slides.length]);

  const services = [
    { id: 1, dept: 'civil', title: 'Structural Design & Analysis', description: 'Comprehensive structural engineering design, analysis, and optimization for buildings and infrastructure.', icon: '🏗️', details: 'Our structural design and analysis services ensure safety, cost-effectiveness, and compliance with building codes.' },
    { id: 2, dept: 'civil', title: 'Site Assessment & Surveying', description: 'Detailed site evaluation, topographic surveying, and geotechnical investigations.', icon: '📐', details: 'We provide comprehensive site mapping and soil analysis for informed project planning.' },
    { id: 3, dept: 'civil', title: 'Project Management & Supervision', description: 'Full project lifecycle management, construction supervision, and quality assurance.', icon: '📋', details: 'Expert oversight to ensure projects are delivered on time, within budget, and to required standards.' },
    { id: 4, dept: 'civil', title: 'Compliance & Regulatory', description: 'Ensuring all projects meet local building codes, environmental regulations, and safety standards.', icon: '⚖️', details: 'We handle all necessary documentation and approvals for smooth project execution.' },
    { id: 5, dept: 'civil', title: 'Quality Control', description: 'On-site quality monitoring, material testing, and construction methodology optimization.', icon: '🔍', details: 'Rigorous testing and inspection to guarantee structural integrity and build quality.' },
    { id: 6, dept: 'it', title: 'BIM Consulting', description: 'Building Information Modeling strategy, software selection, and team training.', icon: '🏢', details: 'Helping teams adopt BIM for improved collaboration and digital project delivery.' },
    { id: 7, dept: 'it', title: 'Software Integration', description: 'Seamless integration of project management, estimation, and scheduling software.', icon: '🔗', details: 'Custom integration of software tools to streamline construction workflows.' },
    { id: 8, dept: 'it', title: 'IoT & Sensor Systems', description: 'Smart construction monitoring with IoT sensors for real-time data collection and analysis.', icon: '📡', details: 'Leveraging data from site sensors to improve safety and operational efficiency.' },
    { id: 9, dept: 'it', title: 'Digital Twin Development', description: 'Creating virtual replicas of construction projects for simulation and optimization.', icon: '🤖', details: 'Virtual modeling to predict performance and optimize lifecycle management.' },
    { id: 10, dept: 'it', title: 'Data Analytics', description: 'Advanced analytics for construction data, performance metrics, and predictive insights.', icon: '📊', details: 'Turning raw data into actionable insights for better decision-making.' },
    { id: 11, dept: 'all', title: 'Integrated Solutions', description: 'We combine civil knowledge with IT capabilities to deliver smart solutions.', icon: '🔄', details: 'Our unique offering bridges the gap between traditional engineering and modern technology.' }
  ];

  const filteredServices = department === 'all' || !department
    ? services
    : services.filter(s => s.dept === 'all' || s.dept === department);

  const getHeroBg = () => {
    if (department === 'civil') return structureImage;
    if (department === 'it') return itImage;
    return slides[currentSlide];
  };

  if (id) {
    const service = services.find(s => s.id === parseInt(id));
    if (!service) {
      return <Container className="py-5 text-center"><h1>Service Not Found</h1></Container>;
    }

    return (
      <div className="service-detail py-5">
        <Container>
          <div className="text-center mb-5">
            <div className="display-1 mb-3">{service.icon}</div>
            <h1 className="fw-bold">{service.title}</h1>
          </div>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="border-0 shadow-sm p-5">
                <h3>Overview</h3>
                <p className="lead">{service.description}</p>
                <hr />
                <p>{service.details}</p>
                <Button as={Link} to="/contact" className="mt-4">Inquire About This Service</Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="services-page py-5">
      <section className="services-hero text-center text-white mb-5" style={{
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${getHeroBg()}) center/cover`,
        padding: '100px 0',
        borderRadius: '15px'
      }}>
        <Container>
          <h1 className="display-4 fw-bold">Our Services</h1>
          <p className="lead">Expert engineering and digital solutions tailored for your projects.</p>
        </Container>
      </section>

      <Container>
        <Row className="g-4">
          {filteredServices.map((service) => (
            <Col md={6} lg={4} key={service.id}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="display-4 mb-3 text-primary">{service.icon}</div>
                  <Card.Title className="fw-bold h4">{service.title}</Card.Title>
                  <Card.Text className="text-muted">{service.description}</Card.Text>
                  <Button as={Link} to={`/services/${service.id}`} variant="link" className="text-decoration-none">View Details →</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Services;
