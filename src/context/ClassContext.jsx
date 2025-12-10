import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
  const [classes, setClasses] = useState(() => {
    const savedClasses = localStorage.getItem('classes');
    return savedClasses ? JSON.parse(savedClasses) : [];
  });

  useEffect(() => {
    localStorage.setItem('classes', JSON.stringify(classes));
  }, [classes]);

  const addClass = (gymClass) => {
    const newClass = { ...gymClass, id: uuidv4(), status: 'Scheduled' };
    setClasses((prev) => [newClass, ...prev]);
  };

  const deleteClass = (id) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
  };

  const updateClass = (id, updatedData) => {
    setClasses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    );
  };

  return (
    <ClassContext.Provider value={{ classes, addClass, deleteClass, updateClass }}>
      {children}
    </ClassContext.Provider>
  );
};
