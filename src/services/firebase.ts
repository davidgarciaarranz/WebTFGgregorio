import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA1_cNvASpjyXaMuu3KrsBGNFxbm-GJWpM",
    authDomain: "proyectoweb-26d01.firebaseapp.com",
    projectId: "proyectoweb-26d01",
    storageBucket: "proyectoweb-26d01.firebasestorage.app",
    messagingSenderId: "296478580297",
    appId: "1:296478580297:web:5fd95cd915734ea6a42998"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
