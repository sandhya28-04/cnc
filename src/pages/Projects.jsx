import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Badge, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Import images
import structureImage from '../assets/images/structure.jpg';
import itImage from '../assets/images/it-image.jpeg';

function Projects({ department }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    { id: 1, title: 'Highway Construction Project', description: 'Designed and supervised the construction of a 50km highway, incorporating advanced traffic management systems.', category: 'Civil Engineering', dept: 'civil', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80', duration: '24 months', location: 'Kathmandu, Nepal', completion: 100, budget: '$2.5M', status: 'Completed' },
    { id: 2, title: 'Bridge Rehabilitation', description: 'Assessed and rehabilitated an aging bridge structure using modern composite materials.', category: 'Civil Engineering', dept: 'civil', image: structureImage, duration: '15 months', location: 'Chitwan, Nepal', completion: 100, budget: '$950K', status: 'Completed' },
    { id: 7, title: 'Smart Building IoT Integration', description: 'Implemented IoT sensors and BIM software for real-time monitoring of construction progress and safety.', category: 'IT & Digital', dept: 'it', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80', duration: '18 months', location: 'Pokhara, Nepal', completion: 100, budget: '$1.8M', status: 'Completed' },
    { id: 8, title: 'Digital Twin for Urban Planning', description: 'Developed a comprehensive digital twin model for urban infrastructure planning using advanced simulation software.', category: 'IT & Digital', dept: 'it', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1920&q=80', duration: '20 months', location: 'Lalitpur, Nepal', completion: 85, budget: '$3.2M', status: 'In Progress' },
  ];

  const filteredProjects = department === 'all' || !department
    ? projects
    : projects.filter(p => p.dept === department);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const getHeroBg = () => {
    if (department === 'civil') return structureImage;
    if (department === 'it') return itImage;
    return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80';
  };

  return (
    <div className="projects-container py-5">
      <section className="projects-hero text-center text-white mb-5" style={{
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${getHeroBg()}) center/cover`,
        padding: '100px 0',
        borderRadius: '15px'
      }}>
        <Container>
          <h1 className="display-4 fw-bold">Our Projects</h1>
          <p className="lead">Explore our diverse portfolio of infrastructure and digital projects.</p>
        </Container>
      </section>

      <Container>
        <Row className="g-4">
          {filteredProjects.map((project) => (
            <Col lg={6} key={project.id}>
              <Card className="h-100 border-0 shadow-sm overflow-hidden">
                <div style={{ height: '300px', overflow: 'hidden' }}>
                  <Card.Img variant="top" src={project.image} style={{ height: '100%', objectFit: 'cover' }} />
                </div>
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between mb-2">
                    <Badge bg="primary">{project.category}</Badge>
                    <Badge bg={project.status === 'Completed' ? 'success' : 'warning'}>{project.status}</Badge>
                  </div>
                  <Card.Title className="fw-bold h4">{project.title}</Card.Title>
                  <Card.Text className="text-muted">{project.description}</Card.Text>

                  <div className="mt-3">
                    <div className="d-flex justify-content-between mb-1">
                      <small className="fw-bold">Completion</small>
                      <small>{project.completion}%</small>
                    </div>
                    <ProgressBar now={project.completion} variant="primary" style={{ height: '10px' }} />
                  </div>

                  <Button onClick={() => handleViewDetails(project)} variant="primary" className="mt-4 w-100">View Project Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        {selectedProject && (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="fw-bold">{selectedProject.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
              <img src={selectedProject.image} className="img-fluid w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} alt={selectedProject.title} />
              <div className="p-4">
                <Row className="mb-4 text-center">
                  <Col><strong>Budget:</strong><br />{selectedProject.budget}</Col>
                  <Col><strong>Timeline:</strong><br />{selectedProject.duration}</Col>
                  <Col><strong>Location:</strong><br />{selectedProject.location}</Col>
                </Row>
                <h5>About the Project</h5>
                <p className="text-muted">{selectedProject.description}</p>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Projects;
