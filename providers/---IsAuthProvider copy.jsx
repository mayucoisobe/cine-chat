import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

export const IsAuthContext = createContext(undefined);

export const IsAuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  auth.onAuthStateChanged((user) => {
    // console.log(user);
    if (user) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    console.log(isAuth);
  });
  return (
    <>
      <IsAuthContext.Provider value={{ isAuth, setIsAuth }}>
        {children}
      </IsAuthContext.Provider>
    </>
  );
};
