import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7r6Q9PpwDpk2NFZIWLINWMwcE2ML__c4",
  authDomain: "nearby-blood-b9c06.firebaseapp.com",
  projectId: "nearby-blood-b9c06",
  storageBucket: "nearby-blood-b9c06.firebasestorage.app",
  messagingSenderId: "935344141861",
  appId: "1:935344141861:web:ff8987255859996e1971cc",
  measurementId: "G-DNVNEEKCYY"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const analytics = getAnalytics(app);
