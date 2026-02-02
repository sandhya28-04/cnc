import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Context
import { DepartmentProvider } from './contexts/DepartmentContext';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

function App() {
  const [department, setDepartment] = useState('all');

  useEffect(() => {
    // Load department preference from localStorage
    const savedDept = localStorage.getItem('currentDept') || 'all';
    setDepartment(savedDept);
  }, []);

  const handleDepartmentChange = (dept) => {
    setDepartment(dept);
    localStorage.setItem('currentDept', dept);
  };

  return (
    <DepartmentProvider>
      <Router>
        <ScrollToTop />
        <div>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home department={department} onDepartmentChange={handleDepartmentChange} />} />
              <Route path="/about" element={<About department={department} />} />
              <Route path="/services" element={<Services department={department} />} />
              <Route path="/services/:id" element={<Services department={department} />} />
              <Route path="/projects" element={<Projects department={department} onDepartmentChange={handleDepartmentChange} />} />
              <Route path="/blog" element={<Blog department={department} />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </DepartmentProvider>
  );
}

export default App;
