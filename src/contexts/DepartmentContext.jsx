import React, { createContext, useContext, useState, useEffect } from 'react';

const DepartmentContext = createContext();

export const useDepartment = () => {
  const context = useContext(DepartmentContext);
  if (!context) {
    throw new Error('useDepartment must be used within a DepartmentProvider');
  }
  return context;
};

export const DepartmentProvider = ({ children }) => {
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
    <DepartmentContext.Provider value={{ department, handleDepartmentChange }}>
      {children}
    </DepartmentContext.Provider>
  );
};
