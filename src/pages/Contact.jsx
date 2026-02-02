import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

const API_BASE_URL = "http://localhost/construction/frontend/react-app/backend";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'general',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const emailAddress = "info@cnc-consultant.example";
  const phoneNumber = "+9779864148519";
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=Inquiry from Website`;

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    else if (!nameRegex.test(formData.name)) newErrors.name = "Names should only contain letters.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email.";

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone) newErrors.phone = "Phone is required.";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Must be a 10-digit number.";

    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (!!errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(`${API_BASE_URL}/contact.php`, formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', department: 'general', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="contact-root">
      {/* Hero Section - Restored Original structure */}
      <section className="py-5 bg-primary text-white text-center" style={{
        background: 'linear-gradient(rgba(15,98,254,0.8), rgba(15,98,254,0.8)), url(https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80) center/cover',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Container fluid>
          <Col lg={8} className="mx-auto">
            <h1 className="display-3 fw-bold mb-4">Get In Touch</h1>
            <p className="lead fs-4">Ready to transform your construction projects? Let's discuss your next innovation.</p>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button href={`tel:${phoneNumber}`} variant="light" size="lg" className="rounded-pill px-4 fw-bold text-primary">Call Now</Button>
              <Button href={gmailLink} target="_blank" variant="outline-light" size="lg" className="rounded-pill px-4 fw-bold">Email Us</Button>
            </div>
          </Col>
        </Container>
      </section>

      {/* Statistics Section - Restored Original structure */}
      <section className="py-5">
        <Container fluid>
          <Row className="g-4 text-center">
            {[
              { val: '24/7', lab: 'Support Available', icon: '📞' },
              { val: '2hrs', lab: 'Average Response', icon: '⚡' },
              { val: '100%', lab: 'Client Satisfaction', icon: '🎯' },
              { val: 'Global', lab: 'Reach', icon: '🌍' }
            ].map((stat, i) => (
              <Col md={3} key={i}>
                <div className="p-4 rounded-4 bg-light shadow-sm hover-up transition-all">
                  <div className="display-4 text-primary mb-2">{stat.icon}</div>
                  <h3 className="fw-bold">{stat.val}</h3>
                  <p className="text-muted mb-0">{stat.lab}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Form Section - Restored Original structure */}
      <section className="bg-light py-5">
        <Container fluid>
          <Row className="g-5">
            <Col lg={6}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body className="p-5">
                  <h3 className="fw-bold text-primary mb-4">Send us a Message</h3>
                  {submitted && <Alert variant="success">Message sent successfully!</Alert>}
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}><Form.Group className="mb-3"><Form.Label className="fw-bold small">Name</Form.Label><Form.Control name="name" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} className="py-2" /></Form.Group></Col>
                      <Col md={6}><Form.Group className="mb-3"><Form.Label className="fw-bold small">Email</Form.Label><Form.Control name="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} className="py-2" /></Form.Group></Col>
                    </Row>
                    <Row>
                      <Col md={6}><Form.Group className="mb-3"><Form.Label className="fw-bold small">Phone</Form.Label><Form.Control name="phone" value={formData.phone} onChange={handleChange} isInvalid={!!errors.phone} className="py-2" /></Form.Group></Col>
                      <Col md={6}><Form.Group className="mb-3"><Form.Label className="fw-bold small">Department</Form.Label><Form.Select name="department" value={formData.department} onChange={handleChange} className="py-2"><option value="general">General</option><option value="civil">Civil</option><option value="it">IT</option></Form.Select></Form.Group></Col>
                    </Row>
                    <Form.Group className="mb-4"><Form.Label className="fw-bold small">Message</Form.Label><Form.Control as="textarea" rows={4} name="message" value={formData.message} onChange={handleChange} isInvalid={!!errors.message} className="py-2" /></Form.Group>
                    <Button type="submit" variant="primary" className="w-100 py-3 rounded-pill fw-bold shadow-sm">Send Message</Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <div className="p-5 h-100 d-flex flex-column justify-content-center">
                <h3 className="fw-bold text-primary mb-4">Contact Information</h3>
                <div className="mb-4">
                  <h6 className="fw-bold mb-1">📍 Address</h6>
                  <p className="text-muted">Banauli, Saptari, Nepal</p>
                </div>
                <div className="mb-4">
                  <h6 className="fw-bold mb-1">📞 Phone</h6>
                  <p className="text-muted"><a href={`tel:${phoneNumber}`} className="text-decoration-none">{phoneNumber}</a></p>
                </div>
                <div className="mb-4">
                  <h6 className="fw-bold mb-1">✉️ Email</h6>
                  <p className="text-muted"><a href={gmailLink} className="text-decoration-none">{emailAddress}</a></p>
                </div>
                <div className="p-4 bg-primary text-white rounded-4 shadow-sm">
                  <h6 className="fw-bold mb-3">Business Hours</h6>
                  <p className="small mb-1">Mon-Fri: 9:00 AM - 6:00 PM</p>
                  <p className="small mb-0">Sun: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hover-up { transition: transform 0.3s; }
        .hover-up:hover { transform: translateY(-5px); }
        .transition-all { transition: all 0.3s; }
      `}} />
    </div>
  );
}

export default Contact;