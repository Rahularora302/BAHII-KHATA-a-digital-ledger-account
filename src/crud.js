import firebase from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import 'firebase/database';

var name, email, subject, message;

function readFom() {
  name = document.getElementById("name").value;
  email = document.getElementById("email").value;
  subject = document.getElementById("subject").value;
  message = document.getElementById("message").value;
  console.log(name,email,subject,message);
}

window.onload = function(){ 
/*document.getElementById("insert").onclick = function () {
  readFom();

  firebase
    .database
    .ref("student/" + name)
    .set({
      name:name,
      email:email,
      subject:subject,
      message:message,
    });
  alert("Data Inserted");
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("message").value = "";
};
*/
document.getElementById("read").onclick = function (e) {
  readFom();

/*e.preventDefault();
    if (!name) {
      toast.error("Please provide value in each input field");
    } else {
      readFom()
    }  
};*/

  firebase
    .database
    .ref("student/" + name)
    .on("value", function (snap) {
      document.getElementById("name").value = snap.val().name;
      document.getElementById("email").value = snap.val().email;
      document.getElementById("subject").value = snap.val().subject;
      document.getElementById("message").value = snap.val().message;
    });
};
}




/*document.getElementById("update").onclick = function () {
  readFom();

  firebase
    .database
    .ref("student/" + name)
    .update({
     
      email:email,
      subject:subject,
      message:message,
    });

  alert("Data Update");

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("message").value = "";
};







document.getElementById("delete").onclick = function () {
  readFom();

  firebase
    .database
    .ref("student/" + name)
    .remove();
  alert("Data Deleted");
   
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("message").value = "";
};*/
//};

