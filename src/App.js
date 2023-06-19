
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebaseDB from "./firebase";
import firebase from "./firebase";
import 'firebase/database';
import "./App.scss";
//import "./crud";

function App() {
  const [state, setState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });


  const { name, email, subject, message } = state;



  const handleSubmit = async(e) => {
    console.log(e);
    e.preventDefault();
    //if(e=='read') console.log("great");
    if (!name || !email || !subject || !message) {
      toast.error("Please provide value in each input field");
    } else if (!isValidEmail(email)) {
      toast.error("Please provide a valid email address");
    }else {
      console.log(name,email,subject,message);
      //firebaseDB.child("student").push(state);
      firebase.database.ref("student/" + name).set({name:name,  email:email, subject:subject, message:message,});
      setState({ name: "", email: "", subject: "", message: "" });
      toast.success("Form Submitted Successfully");
    }
  };
const isValidEmail = (email) => {
    // Email validation regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
const handleUpdate= (e) => {
    console.log(e);
    e.preventDefault();
  if (!name || !email || !subject || !message) {
     toast.error("Please provide value in each input field");
    }else{
    firebase.database.ref("student/" + name).update({email:email,subject:subject,message:message,});
    setState({ name: "", email: "", subject: "", message: "" });
      toast.success("Submitted  updated");
}
};


const handleDelete = async (e) => {
  e.preventDefault();
  if (!name || !email || !subject || !message) {
    toast.error("Please provide a value in each input field");
  } else {
    
    firebase
      .database
      .ref("student/" + name)
      .remove();
        setState({ name: "", email: "", subject: "", message: "" });
        toast.success("Data deleted successfully");
      }
      
  }

const handleRead = async (e) => {
  e.preventDefault();
  if (!name) {
    toast.error("Please provide a name");
  } else {
     firebase.database.ref("student/" + name).on("value", function (snap) {
      const data = snap.val();
      if (data) {
        setState({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        });
      } else {
        //toast.error("No data found for the provided name");
      }
    });
  }
};



  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  
 


  return (
    <section className="contact-section">
      <div className="container">
       <ToastContainer position="top-center" />
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="wrapper">
              <div className="row no-gutters">
                <div className="col-md-6">
                  <div className="contact-wrap w-100 p-lg-5 p-4">
                    <h3 className="mb-4">Send us a message</h3>
                    <form
                      id="contactForm"
                      className="contactForm"
                      //onSubmit={handleSubmit}
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group" >
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              id = "name"
                              placeholder="Name"
                              autoComplete="off" 
                               value={name}
                              onChange={handleInputChange}
                              required
                             
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                             type="email"
                              className="form-control"
                              name="email"
                              id = "email"
                              placeholder="Email"
                              autoComplete="off" 
                               value={email}
                          
                               //pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                             
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="subject"
                              id = "subject"
                              autoComplete="off" 
                              placeholder="Subject"
                               value={subject}
                              onChange={handleInputChange}
                              required
                              
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <textarea
                              type="text"
                              className="form-control"
                              name="message"
                              autoComplete="off" 
                              id = "message"
                              placeholder="Message"
                              cols="30"
                              rows="6"
                               value={message}
                              onChange={handleInputChange}
                              required
                             
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                           <input
                             id="submit"
                            type="submit"
                            value="insert"
                            onClick={handleSubmit}
                            className="btn btn-primary"

                            />
                             <input
                              id="read"
                              type="button"
                              value="read"
                              onClick= {handleRead}
                              className="btn btn-primary"
                            />
                             <input
                              id="update"
                              type="button"
                              
                              value="update"
                               onClick= {handleUpdate}
                              className="btn btn-primary"
                            />
                            <input
                              id="delete"
                              type="button"
                              value="delete"
                                onClick= {handleDelete}
                              className="btn btn-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-stretch">
                  <div className="info-wrap w-100 p-lg-5 p-4 img">
                    <h3>Contact us</h3>
                    <p className="mb-4">
                      We're open for any suggestion or just to have a chat
                    </p>
                    <div className="dbox w-100 d-flex align-items-start">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-map-marker"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Address:</span> 198 West 21th Street, Suite 721
                          New York NY 10016
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-phone"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Phone:</span>
                          <a href="tel://123456789">+1235 2355 98</a>
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-paper-plane"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Email:</span>
                          <a href="mailto:info@yoursite.com">
                            info@yoursite.com
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-globe"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Website:</span>
                          <a href="#">yoursite.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    
  );
}


export default App;


