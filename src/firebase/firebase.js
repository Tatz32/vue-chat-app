// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjrxhDTELhvIqb2NB6HpS7VZHxYaohgtU",
  authDomain: "vue-chat-4aa9e.firebaseapp.com",
  projectId: "vue-chat-4aa9e",
  storageBucket: "vue-chat-4aa9e.appspot.com",
  messagingSenderId: "218951491430",
  appId: "1:218951491430:web:e828704c233818eaf9b2a7"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {db};
