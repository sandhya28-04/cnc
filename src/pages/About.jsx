import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function About({ department }) {
  const benefits = [
    { id: 1, dept: 'all', title: 'Cross-disciplinary Delivery', description: 'Integrated civil engineering and IT solutions for comprehensive project support.', icon: '🔄' },
    { id: 2, dept: 'civil', title: 'Practical Designs', description: 'Focus on constructability and real-world application with buildable engineering solutions.', icon: '🏗️' },
    { id: 3, dept: 'civil', title: 'Construction Expertise', description: 'Decades of experience in structural design, project management, and quality control.', icon: '⚒️' },
    { id: 4, dept: 'it', title: 'Digital Solutions', description: 'Software and IoT solutions that reduce rework and improve project efficiency.', icon: '⚡' },
    { id: 5, dept: 'it', title: 'Technology Innovation', description: 'BIM implementation, data analytics, and smart construction monitoring systems.', icon: '🤖' },
    { id: 6, dept: 'all', title: 'Clear Communication', description: 'Proactive approach to communication and risk management for project success.', icon: '💬' }
  ];

  const filteredBenefits = !department || department === 'all'
    ? benefits
    : benefits.filter(benefit => benefit.dept === 'all' || benefit.dept === department);

  return (
    <div id="about" className="about-page py-5">
      <section className="about-hero bg-primary text-white py-5 mb-5 text-center" style={{
        background: 'linear-gradient(rgba(15, 98, 254, 0.9), rgba(15, 98, 254, 0.9)), url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80) center/cover',
        borderRadius: '15px'
      }}>
        <Container>
          <h1 className="display-3 fw-bold mb-4">About CNC Consultant</h1>
          <p className="lead fs-4">Empowering the construction industry through integrated engineering and digital solutions.</p>
        </Container>
      </section>

      <Container>
        {/* Vision & Mission */}
        <Row className="g-4 mb-5">
          <Col lg={6}>
            <Card className="h-100 border-0 shadow-sm text-center" style={{ backgroundColor: '#1e293b', color: 'white' }}>
              <Card.Body className="p-5">
                <div className="display-4 mb-3">🎯</div>
                <h2 className="fw-bold mb-3">Our Vision</h2>
                <p>To make construction smarter and more efficient through integrated engineering and technology solutions.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="h-100 border-0 shadow-sm text-center" style={{ backgroundColor: '#1e293b', color: 'white' }}>
              <Card.Body className="p-5">
                <div className="display-4 mb-3">🚀</div>
                <h2 className="fw-bold mb-3">Our Mission</h2>
                <p>To deliver exceptional civil engineering and IT solutions that help clients achieve project goals safely and efficiently.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Team Section */}
        <div className="mb-5">
          <h2 className="text-center fw-bold mb-4">Meet Our Team</h2>
          <Row className="g-4">
            <Col md={6}>
              <Card className="h-100 border-0 shadow-sm bg-light p-4 text-center">
                <h4 className="fw-bold text-primary">Civil Engineering Team</h4>
                <p>Chartered engineers with decades of experience in structural design and supervision.</p>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 border-0 shadow-sm bg-light p-4 text-center">
                <h4 className="fw-bold text-primary">IT & Digital Team</h4>
                <p>BIM specialists and developers driving digital transformation in Nepal.</p>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="text-center fw-bold mb-4">Why Choose Us?</h2>
          <Row className="g-4">
            {filteredBenefits.map((benefit, idx) => (
              <Col md={6} lg={4} key={idx}>
                <Card className="h-100 border-0 shadow-sm p-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="fs-2">{benefit.icon}</div>
                    <div>
                      <h5 className="fw-bold mb-1">{benefit.title}</h5>
                      <p className="text-muted small mb-0">{benefit.description}</p>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default About;
