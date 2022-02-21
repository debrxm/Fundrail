import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCvdkB8gSs7LMgY3b0-s23lEwpS_g_1YBM",

//   authDomain: "food-sity.firebaseapp.com",

//   projectId: "food-sity",

//   storageBucket: "food-sity.appspot.com",

//   messagingSenderId: "501383297092",

//   appId: "1:501383297092:web:c7b4d1ed7232048068e411",

//   measurementId: "G-XCCXD8WBF2"

// };
// TESTING
const firebaseConfig = {
  apiKey: "AIzaSyBcyvzENTQ4ivHN44v1BfC-YE8HniT0Sag",

  authDomain: "store-test2021.firebaseapp.com",

  databaseURL: "https://store-test2021-default-rtdb.firebaseio.com",

  projectId: "store-test2021",

  storageBucket: "store-test2021.appspot.com",

  messagingSenderId: "28238260207",

  appId: "1:28238260207:web:0e452fd601905021a0f81a",

  measurementId: "G-H2P79HRSX9",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
