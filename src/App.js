
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebaseDB from "./firebase";
import firebase from "./firebase";
import 'firebase/database';
import "./App.scss";
import { ref } from "firebase/database";


function App() {
  const [state, setState] = useState({
    name: "",
   // email: "",
    ContactNumber:"",
    message: "",
    PendingShipments: "",
    OrdersDispatched: "",
    AmountRecieved: "",
    Balance:"",
  });


  const { name, ContactNumber, message,PendingShipments,OrdersDispatched,AmountRecieved,Balance} = state;



  const handleSubmit = async(e) => {
    console.log(e);
    e.preventDefault();
    //if(e=='read') console.log("great");
    if (!name || !ContactNumber ||!Balance  ||!PendingShipments||!OrdersDispatched ||!AmountRecieved) {
      toast.error("Please provide value in each input field");
    } /*else if (!isValidEmail(email)) {
      toast.error("Please provide a valid email address");
    }*/else {
      
      const safeName = name.replace(".", "_");
      firebase.database.ref("student/" + safeName).set({name:name,  ContactNumber:ContactNumber, Balance:Balance, message:message,PendingShipments:PendingShipments, OrdersDispatched: OrdersDispatched,AmountRecieved:AmountRecieved});
      setState({ name: "", ContactNumber: "", Balance: "", message: "" ,PendingShipments:"",OrdersDispatched: "",AmountRecieved:""});
      toast.success("Form Submitted Successfully");
    }
  };
/*const isValidEmail = (email) => {
    // Email validation regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };*/
const handleUpdate= (e) => {
    console.log(e);
    e.preventDefault();
 if (!name || !ContactNumber ||!Balance  ||!PendingShipments||!OrdersDispatched ||!AmountRecieved) {
     toast.error("Please provide value in each input field");
    }else{
        const safeName = name.replace(".", "_");
    firebase.database.ref("student/" + safeName).update({ContactNumber:ContactNumber,message:message,PendingShipments:PendingShipments, OrdersDispatched: OrdersDispatched,AmountRecieved:AmountRecieved, Balance:Balance});
    setState({ name: "", ContactNumber: "", Balance: "", message: "" ,PendingShipments:"",OrdersDispatched: "",AmountRecieved:""});
      toast.success("Submitted  updated");
}
};


const handleDelete = async (e) => {
  e.preventDefault();
  if (!name || !ContactNumber || !Balance  ||!PendingShipments||!OrdersDispatched ||!AmountRecieved) {
    toast.error("Please provide a value in each input field");
  } else {
      const safeName = name.replace(".", "_");
    firebase
      .database
      .ref("student/" + safeName)
      .remove();
        setState({ name: "", ContactNumber: "", Balance: "", message: "" ,PendingShipments:"",OrdersDispatched: "",AmountRecieved:""});
        toast.success("Data deleted successfully");
      }
      
  }

const handleRead = async (e) => {
  e.preventDefault();
  if (!name) {
    toast.error("Please provide a name");
  } else {
      const safeName = name.replace(".", "_");
     firebase.database.ref("student/" + safeName).on("value", function (snap) {
      const data = snap.val();
      if (data) {
        setState({
          name: data.name,
          //email: data.email,
          ContactNumber:data.ContactNumber,
          Balance: data.Balance,
          message: data.message,
          PendingShipments: data.PendingShipments,
          OrdersDispatched: data.OrdersDispatched,
          AmountRecieved:data.AmountRecieved
        });
      } /*else  {
        toast.error("No data found for the provided name");
      }*/
   
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
                    <h3 className="mb-4" >Order Status :</h3>
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
                              placeholder="Client's Name"
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
                              type="tel"
                              className="form-control"
                              name="ContactNumber"
                              id = "ContactNumber"
                              autoComplete="off" 
                              placeholder="Contact Number"
                               value={ContactNumber}
                              onChange={handleInputChange}
                              
                              
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="OrdersDispatched"
                              id = "OrdersDispatched"
                              autoComplete="off" 
                              placeholder="Orders Dispatched"
                               value={OrdersDispatched}
                              onChange={handleInputChange}
                              
                              
                            />
                          </div>
                        </div>
                         <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="PendingShipments"
                              id = "PendingShipments"
                              autoComplete="off" 
                              placeholder="Pending Shipments"
                               value={PendingShipments}
                              onChange={handleInputChange}
                          
                            />
                          </div>
                          </div>
                          <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control"
                              name="AmountRecieved"
                              id = "AmountRecieved"
                              autoComplete="off" 
                              placeholder="Amount Recieved"
                               value={AmountRecieved}
                              onChange={handleInputChange}
                          
                            />
                          </div>
                        </div>
                          <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control"
                              name="Balance"
                              id = "Balance"
                              autoComplete="off" 
                              placeholder="Balance"
                               value={Balance}
                              onChange={handleInputChange}
                          
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
                              rows="4"
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
                    <h3>needleton's</h3>
                    <h1>BAHII - KHATA</h1>
        
                    <div className="dbox w-100 d-flex align-items-start">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-map-marker"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Address :
                          GH-14,Paschim Vihar,New Delhi</span>
                         
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
                          <a href="tel://123456789">+1235 2385 98</a>
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-paper-plane"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Email : </span>
                          <a href="mailto:info@yoursite.com">
                            needleton123@gmail.com
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
                          <span>Website : </span>
                         <a href="#">needleton.com</a>
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


