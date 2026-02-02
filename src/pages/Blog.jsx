import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Blog({ department }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    { id: 1, dept: 'civil', title: 'Bringing BIM to Site: Practical Steps', date: 'Nov 1, 2025', author: 'Rajesh Sharma', readTime: '5 min read', excerpt: 'BIM is not just for designers — simple steps to use BIM models on site for clash checks and progress monitoring.', image: 'https://images.unsplash.com/photo-1503387837-b154d5074bd2?auto=format&fit=crop&w=1000&q=80', category: 'Civil Engineering' },
    { id: 2, dept: 'it', title: '3 Ways IoT Improves Construction Safety', date: 'Oct 10, 2025', author: 'Priya Patel', readTime: '4 min read', excerpt: 'From worker tracking to structural health monitoring, IoT provides data to make safer decisions.', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80', category: 'IT & Digital' },
    { id: 4, dept: 'it', title: 'Digital Twin Technology in Urban Planning', date: 'Aug 20, 2025', author: 'Sita Thapa', readTime: '7 min read', excerpt: 'How digital twins are revolutionizing urban infrastructure planning and management in Nepal.', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1920&q=80', category: 'IT & Digital' },
  ];

  const filteredPosts = department === 'all' || !department
    ? posts
    : posts.filter(p => p.dept === department);

  const handleReadMore = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  return (
    <div className="blog-container py-5">
      <section className="blog-hero py-5 text-center text-white mb-5" style={{
        backgroundColor: '#1a237e',
        borderRadius: '15px'
      }}>
        <Container>
          <h1 className="display-4 fw-bold">Our Blog</h1>
          <p className="lead">Stay updated with the latest in engineering and construction tech.</p>
        </Container>
      </section>

      <Container>
        <Row className="g-4">
          {filteredPosts.map((post) => (
            <Col md={6} lg={4} key={post.id}>
              <Card className="h-100 border-0 shadow-sm overflow-hidden">
                <Card.Img variant="top" src={post.image} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body className="p-4">
                  <div className="mb-2">
                    <Badge bg="info">{post.category}</Badge>
                    <small className="ms-3 text-muted">{post.date}</small>
                  </div>
                  <Card.Title className="fw-bold h5">{post.title}</Card.Title>
                  <Card.Text className="text-muted small">{post.excerpt}</Card.Text>
                  <div className="mt-4 d-flex justify-content-between align-items-center">
                    <small className="fw-bold">By {post.author}</small>
                    <Button variant="link" onClick={() => handleReadMore(post)} className="p-0 text-decoration-none fw-bold">Read More →</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        {selectedPost && (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="fw-bold">{selectedPost.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={selectedPost.image} className="img-fluid rounded mb-4 w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} alt="" />
              <p className="lead">{selectedPost.excerpt}</p>
              <div className="mt-4 p-3 bg-light rounded text-muted">
                Author: {selectedPost.author} | {selectedPost.readTime}
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Blog;
