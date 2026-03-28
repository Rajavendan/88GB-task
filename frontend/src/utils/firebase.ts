import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAf2ZMpwOoRi3cuBOeFLPB9X97IN4iByCE",
  authDomain: "currency-converter-60305.firebaseapp.com",
  projectId: "currency-converter-60305",
  storageBucket: "currency-converter-60305.firebasestorage.app",
  messagingSenderId: "355992132169",
  appId: "1:355992132169:web:39bc990cb58b755df3fd98",
  measurementId: "G-00VWB6RRH1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
