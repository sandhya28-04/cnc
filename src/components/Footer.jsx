import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-5 mt-5 footer-root">
      <Container>
        <Row className="gy-4">
          <Col lg={3} md={6}>
            <h5 className="text-primary fw-bold mb-4">CNC Consultant</h5>
            <p className="mb-2 opacity-75">Civil & IT Engineering Solutions</p>
            <div className="mb-2 small opacity-75">
              <strong>Location:</strong><br />
              Banauli, Saptari<br />
              Nepal
            </div>
          </Col>

          <Col lg={3} md={6}>
            <h5 className="text-primary fw-bold mb-4">Contact</h5>
            <div className="mb-3">
              <strong className="d-block small text-primary text-uppercase fw-bold mb-1">Phone:</strong>
              <a href="tel:+979864148519" className="text-light text-decoration-none opacity-75 hover-opacity-100">+97 9864148519</a>
            </div>
            <div className="mb-3">
              <strong className="d-block small text-primary text-uppercase fw-bold mb-1">Email:</strong>
              <a href="mailto:info@cnc-consultant.example" className="text-light text-decoration-none opacity-75 hover-opacity-100">info@cnc-consultant.example</a>
            </div>
            <div className="mb-0">
              <strong className="d-block small text-primary text-uppercase fw-bold mb-1">Viber:</strong>
              <a href="tel:+979864148519" className="text-light text-decoration-none opacity-75 hover-opacity-100">+97 9864148519</a>
            </div>
          </Col>

          <Col lg={3} md={6}>
            <h5 className="text-primary fw-bold mb-4">Quick Links</h5>
            <ul className="list-unstyled footer-nav">
              {['Home', 'About Us', 'Services', 'Projects', 'Blog', 'Contact Us'].map((label) => (
                <li key={label} className="mb-2">
                  <Link
                    to={label === 'Home' ? '/' : `/${label.toLowerCase().replace(' us', '').replace(' ', '')}`}
                    className="text-light text-decoration-none opacity-75 hover-translate"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h5 className="text-primary fw-bold mb-4">FAQs</h5>
            <div className="faq-item mb-3">
              <strong className="d-block small fw-bold text-white mb-1">Q: What services do you offer?</strong>
              <p className="small mb-0 opacity-75">A: Civil engineering and IT digital services.</p>
            </div>
            <div className="faq-item mb-3">
              <strong className="d-block small fw-bold text-white mb-1">Q: How can I contact you?</strong>
              <p className="small mb-0 opacity-75">A: Use the contact form or call us directly.</p>
            </div>
            <div className="faq-item">
              <strong className="d-block small fw-bold text-white mb-1">Q: Do you provide consultations?</strong>
              <p className="small mb-0 opacity-75">A: Yes, we offer free initial consultations.</p>
            </div>
          </Col>
        </Row>

        <hr className="my-5 opacity-25" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="mb-0 small opacity-50">&copy; {year} CNC Consultant — Civil & IT. All rights reserved.</p>
          <div className="d-flex gap-4 small opacity-50">
            <a href="#privacy" className="text-light text-decoration-none">Privacy Policy</a>
            <a href="#terms" className="text-light text-decoration-none">Terms of Service</a>
          </div>
        </div>
      </Container>

      <style dangerouslySetInnerHTML={{
        __html: `
        .footer-root { background: #0f172a !important; font-family: var(--font-main); }
        .hover-opacity-100:hover { opacity: 1 !important; color: var(--primary-color) !important; }
        .footer-nav a { transition: all 0.3s ease; display: inline-block; }
        .hover-translate:hover { transform: translateX(5px); opacity: 1 !important; color: var(--primary-color) !important; }
        .faq-item { border-left: 2px solid rgba(15, 98, 254, 0.3); padding-left: 12px; }
      `}} />
    </footer>
  );
}

export default Footer;
