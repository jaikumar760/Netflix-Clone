
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyApXmAFzuIKWH0jZ1HRcCiQ5AsbMj7dqak",
  authDomain: "netflix-clone-f8ef9.firebaseapp.com",
  projectId: "netflix-clone-f8ef9",
  storageBucket: "netflix-clone-f8ef9.appspot.com",
  messagingSenderId: "368573686725",
  appId: "1:368573686725:web:d3ddd3c5533d6d8944a1ac",
  measurementId: "G-TPCZX9LF1R"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  
  await addDoc(collection(db, "users"), {
    uid: user.uid,
    name,
    authProvider: "local",
    email
  });
};


const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};


const logout = () => {
  return signOut(auth);
};

export { auth, db, login, signup, logout };
