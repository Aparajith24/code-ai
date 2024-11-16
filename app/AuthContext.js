"use client"
import { createContext, useContext,useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
    updateProfile,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider
} from "firebase/auth";
import { auth } from "@/app/firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
    } catch (error) {
      throw error;
    }
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const githubSignIn = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  }
  
  const logout = () => {
    setUser({ email: null, uid: null }); 
    return signOut(auth);
  };

  return (
    <UserContext.Provider value={{ user, logout, login, register, googleSignIn, githubSignIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
