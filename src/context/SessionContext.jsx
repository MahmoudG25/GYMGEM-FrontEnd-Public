import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessions, setSessions] = useState(() => {
    const savedSessions = localStorage.getItem('sessions');
    return savedSessions ? JSON.parse(savedSessions) : [];
  });

  useEffect(() => {
    localStorage.setItem('sessions', JSON.stringify(sessions));
  }, [sessions]);

  const addSession = (session) => {
    const newSession = { ...session, id: uuidv4(), status: 'Scheduled' };
    setSessions((prev) => [newSession, ...prev]);
  };

  const completeSession = (id) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'Completed' } : s))
    );
  };

  const cancelSession = (id) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'Cancelled' } : s))
    );
  };

  return (
    <SessionContext.Provider value={{ sessions, addSession, completeSession, cancelSession }}>
      {children}
    </SessionContext.Provider>
  );
};
