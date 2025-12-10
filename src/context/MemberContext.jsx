import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const MemberContext = createContext();

export const MemberProvider = ({ children }) => {
  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem('members');
    return savedMembers ? JSON.parse(savedMembers) : [];
  });

  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members));
  }, [members]);

  const addMember = (member) => {
    const newMember = { ...member, id: uuidv4(), joinDate: new Date().toISOString() };
    setMembers((prevMembers) => [newMember, ...prevMembers]);
  };

  const deleteMember = (id) => {
    setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
  };

  const updateMember = (id, updatedData) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) => (member.id === id ? { ...member, ...updatedData } : member))
    );
  };

  return (
    <MemberContext.Provider value={{ members, addMember, deleteMember, updateMember }}>
      {children}
    </MemberContext.Provider>
  );
};
