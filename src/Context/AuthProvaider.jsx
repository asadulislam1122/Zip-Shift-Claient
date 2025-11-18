import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../Fiarbase/Fairbase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
const provider = new GoogleAuthProvider();

const AuthProvaider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // google Login

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // create User

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   SignIn User
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // sognOut
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };
  // observer
  useEffect(() => {
    const unSubCribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unSubCribe();
    };
  }, []);
  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    googleLogin,
    logout,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvaider;
