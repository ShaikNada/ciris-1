import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2-rdnLqJ99n6qFTIMdYlkP-RVKyTQl80",
    authDomain: "ciris-be0d7.firebaseapp.com",
    projectId: "ciris-be0d7",
    storageBucket: "ciris-be0d7.firebasestorage.app",
    messagingSenderId: "766060558959",
    appId: "1:766060558959:web:022e6420e5e2113c9eab9a",
    measurementId: "G-VMCFX3STK2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
