import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, set, ref, get, child, remove } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyALlCpQPwixJWqR4uYQfDBy-1sdl3flbso",
    authDomain: "student-panel-f7c45.firebaseapp.com",
    databaseURL: "https://student-panel-f7c45-default-rtdb.firebaseio.com",
    projectId: "student-panel-f7c45",
    storageBucket: "student-panel-f7c45.appspot.com",
    messagingSenderId: "968123448145",
    appId: "1:968123448145:web:9a73e60eff774d995b3170"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase()
const firestore = getFirestore(app);
const auth = getAuth(app);

export { db, set, get, remove, child, ref, firestore, auth };
