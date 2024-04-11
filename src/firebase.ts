import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyALlCpQPwixJWqR4uYQfDBy-1sdl3flbso",
    authDomain: "student-panel-f7c45.firebaseapp.com",
    projectId: "student-panel-f7c45",
    storageBucket: "student-panel-f7c45.appspot.com",
    messagingSenderId: "968123448145",
    appId: "1:968123448145:web:9a73e60eff774d995b3170"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
