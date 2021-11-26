import React, { useState, createContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setCurrentUser(user);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = (email, password, confirmPassword) => {
    setIsLoading(true);
    if (password !== confirmPassword) {
      setIsLoading(false);
      setError("Error: Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setIsLoading(false);
        setCurrentUser(user);
      }).catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  }

  const onLogout = () => {
    setCurrentUser(null);
    signOut(auth);
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!currentUser,
        user: currentUser,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}