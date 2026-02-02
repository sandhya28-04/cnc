import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setExpanded(false);

  return (
    <Navbar 
      expand="lg" 
      sticky="top" 
      expanded={expanded} 
      onToggle={setExpanded}
      className={`custom-navbar ${scrolled ? 'navbar-scrolled' : ''} ${expanded ? 'navbar-expanded' : ''}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-extrabold d-flex align-items-center" onClick={closeMenu}>
          <div className="logo-box me-2">
            <span className="logo-text">CNC</span>
          </div>
          <span className="brand-name">Consultant</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon-custom">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {[
              { path: '/', label: 'Home' },
              { path: '/about', label: 'About Us' },
              { path: '/services', label: 'Services' },
              { path: '/projects', label: 'Projects' },
              { path: '/blog', label: 'Blog' },
              { path: '/contact', label: 'Contact Us' }
            ].map((link) => (
              <Nav.Link 
                key={link.path}
                as={Link} 
                to={link.path} 
                onClick={closeMenu}
                className={`nav-link-custom ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Nav.Link>
            ))}
            <Nav.Link 
              as={Link} 
              to="/contact" 
              onClick={closeMenu}
              className="btn-consultation ms-lg-3 mt-3 mt-lg-0"
            >
              Get Quote
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
