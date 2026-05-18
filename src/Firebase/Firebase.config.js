import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBU-5hkdgf_azGgOxp7ouaamdxtFrjNA3Q",
  authDomain: "local-chef-bazar-21992.firebaseapp.com",
  projectId: "local-chef-bazar-21992",
  storageBucket: "local-chef-bazar-21992.firebasestorage.app",
  messagingSenderId: "736803921413",
  appId: "1:736803921413:web:1e60529254b34c024a466c",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
