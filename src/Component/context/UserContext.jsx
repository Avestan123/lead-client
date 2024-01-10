// UserContext.js

import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const getUserDataFromLocalStorage = () => {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName')
    return userId ? { userId, userRole, userName } : null;
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(getUserDataFromLocalStorage());

  const setUserDataToLocalStorage = (userId, userRole, userName) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userName',userName);
  };

  const clearUserDataFromLocalStorage = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
  };

  const setUserIdAndRole = (userId, userRole,userName) => {
    setUserDataToLocalStorage(userId, userRole,userName);
    setUserData({ userId, userRole , userName});
  };

  const clearUserIdAndRole = () => {
    clearUserDataFromLocalStorage();
    setUserData(null);
  };
  return (
    <UserContext.Provider value={{  userData, setUserIdAndRole, clearUserIdAndRole  }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
