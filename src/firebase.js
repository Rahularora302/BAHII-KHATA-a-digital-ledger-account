import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyD8z63FkgPq4VXqI43Ec78unXL_9pmn8Qw",
  authDomain: "contact-form-2f649.firebaseapp.com",
  databaseURL: "https://contact-form-2f649-default-rtdb.firebaseio.com",
  projectId: "contact-form-2f649",
  storageBucket: "contact-form-2f649.appspot.com",
  messagingSenderId: "1095362488532",
  appId: "1:1095362488532:web:30e359afcf9f02baa4f341"
};

 const fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();