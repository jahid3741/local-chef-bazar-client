import { createContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

import auth from "../firebase/firebase.config";

import axiosPublic from "../../Api/AxiosPublic/AxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // register
  const createUser = (email, password) => {
    setLoading(true);

    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login
  const signInUser = (email, password) => {
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout
  const logOut = () => {
    setLoading(true);

    return signOut(auth);
  };

  // update user profile
  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  // firebase observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        const userInfo = {
          email: currentUser.email,
        };

        axiosPublic
          .post("/jwt", userInfo, {
            withCredentials: true,
          })
          .then(() => {
            setLoading(false);
          });
      } else {
        axiosPublic
          .post(
            "/logout",
            {},
            {
              withCredentials: true,
            },
          )
          .then(() => {
            setLoading(false);
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // auth info
  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
