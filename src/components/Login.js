import React, { useState } from "react";
import "./Login.css";
import $ from 'jquery';


import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Modal from 'react-bootstrap/Modal';
import Chat from "./Chat";
import Register from "./Register";


function Login({ db, msgApi }) {

  /*************************   useState     ***************************/

  // LOG IN
  const [errorsLogIn, seterrorsLogIn] = useState({ nameError: "", passwordError: "" });
  const [detailsLogIn, setDetailsLogIn] = useState({ username: "", password: "" });

  //REGISTER
  const [errorsReg, seterrorsReg] = useState({ nameError: "", displayNameError: "", passwordError: "", confirmError: "" });
  const [detailsReg, setDetailsReg] = useState({ username: "", displayname: "", password: "", conformation: "", img: "" });
  const [validated, setValidated] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  //FORM
  const [showForm, setShowForm] = useState(false);
  const [show, setShow] = useState(false);

  const [isRegister, setIsRegister] = useState(false);

  const loginClickHandler = () => {
    setShowForm(true);
  }

  //chat
  const [showChat, setShowChat] = useState(false);

/*********************************   REGISTER    ***************************** */
  //return boolean if form is leagal
  const validatedForm = event => {
    var localValdatition = true;
    var newErrors = {nameError: "", displayNameError: "", passwordError:"", confirmError:""};
    seterrorsReg(newErrors);
    //error null name
      if(detailsReg.username === ""){
        newErrors = ({...newErrors,nameError: "Username is requierd" });
        localValdatition = false;
      }

      //error null dispalyName
      if(detailsReg.displayname === ""){
        newErrors = ({...newErrors, displayNameError: "Display name is requierd"});
        localValdatition = false;
      }

      //error password
      if(detailsReg.password === ""){
        newErrors = ({...newErrors,passwordError: "Password is requierd" });
        localValdatition = false;
      }

      //cofirm Password Error
      if(detailsReg.password !== detailsReg.conformation){
        newErrors = ({...newErrors,confirmError: "Passwords don't match"});
        localValdatition = false;
      }
      
      seterrorsReg(newErrors);
      return localValdatition;

  }


  const uploadImgHandler = (e) =>{
    let files = e.target.files;
    let reader = new FileReader();
    reader.onload = r => {  
      setDetailsReg({...detailsReg, img: r.target.result} );
     };
    reader.readAsDataURL(files[0]);
}
      
  const submitHandlerRegister = event =>{
    if(validatedForm()){
        var res =  db.addUser(detailsReg);
        if(res.status == "FAIL"){
            seterrorsReg({...errorsReg, nameError: "Name is Taken, please choose a diffrent one"});
        }
        else {
          sessionStorage.setItem('user', detailsReg.username );
        }
    }
  }

  const clickToRegister = e => {
    setShowRegister(true);
  }

  if (showRegister) {
    return <Register db = {db} msgApi={msgApi}/>;
  }

/*********************************   LOG IN    ***************************** */

  const submitHandlerLogIn = e => {
    var res = db.getUser(detailsLogIn);
    if (res.status == "FAIL") {
      if (res.error == "PASSWORD") {
        seterrorsLogIn({ nameError: "", passwordError: "incorect password" });
      }
      else {
        seterrorsLogIn({ passwordError: "", nameError: "Username dosen't exist, not a member? Sign up!" });
      }
    }
    else {
      sessionStorage.setItem('user', detailsLogIn.username);
      //NewUser
      sessionStorage.setItem('isNewUser', 'false');
      setShowChat(true);
    }
  }

  if(showChat) {
    return <Chat db={db} msgApi={msgApi}/>
  }

  /*********************************   FORM    ***************************** */

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /***************************************************************** */

  return (
    <div className="background-div d-flex card" >
      <div className="zoom-in-zoom-out" ><img src="star.png" style={{ width: "25%", height: "60%" }} /></div>
      <div className="zoom-in-zoom-out" style={{ top: "10%" }}><img src="star.png" style={{ width: "25%", height: "70%" }} /></div>
      <div className="zoom-in-zoom-out" style={{ left: "80%" }}><img src="star.png" style={{ width: "25%", height: "50%" }} /></div>
      <div className="zoom-in-zoom-out" style={{ left: "70%", top: "5%" }}><img src="star.png" style={{ width: "25%", height: "50%" }} /></div>
      <div className="zoom-in-zoom-out" style={{ left: "50%", top: "1%" }}><img src="star.png" style={{ width: "25%", height: "50%" }} /></div>
      <div className="zoom-in-zoom-out" style={{ left: "35%", top: "-14%" }}><img src="star.png" style={{ width: "25%", height: "50%" }} /></div>
      <div className="zoom-in-zoom-out" style={{ left: "26%", top: "10%" }}><img src="star.png" style={{ width: "25%", height: "50%" }} /></div>
      <div className="zoom-in-zoom-out" style={{ left: "55%", top: "24%" }}><img src="star.png" style={{ width: "25%", height: "50%" }} /></div>
      <div className="zoom-in-zoom-out" style={{ left: "78%", top: "25%" }}><img src="star.png" style={{ width: "25%", height: "50%" }} /></div>
      <div className="zoom-in-zoom-out" style={{ left: "60%", top: "-8%" }}><img src="star.png" style={{ width: "25%", height: "50%" }} /></div>
      <div className="zoom-in-zoom-out" style={{ left: "13%", top: "-10%" }}><img src="star.png" style={{ width: "25%", height: "50%" }} /></div>
      <div className="zoom-in-zoom-out" style={{ left: "30%", top: "30%" }}><img src="star.png" style={{ width: "25%", height: "50%" }} /></div>
      <div className="zoom-in-zoom-out" style={{ left: "10%", top: "20%" }}><img src="star.png" style={{ width: "25%", height: "60%" }} /></div>
      <div className="zoom-in-zoom-out" style={{ left: "-7%", top: "-5%" }}><img src="star.png" style={{ width: "25%", height: "50%" }} /></div>
      <div className="zoom-in-zoom-out" style={{ left: "82%", top: "-5%" }}><img src="star.png" style={{ width: "25%", height: "50%" }} /></div>
      <div className="d-flex" style={{ background: "rgb(0,0,0,0.7)", justifyContent: "center", height: "7.5%" }}><Button className="btn btn-dark" onClick={handleShow} style={{ background: "rgb(128,128,128,0.8)", border: "none", borderRadius: "1rem", alignSelf: "center", hover: "none" }}>
        Click Here To Log In
      </Button></div>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="modal-body"> 
        <Form>
        <div className="welcome-div">WELCOME</div>
        <Form.Group as={Row} className="mb-3 d-flex" style={{justifyContent: "center"}}>
            <Form.Label className="input-label">Username</Form.Label> 
            <Form.Control required aria-describedby="inputGroupPrepend" className="form-input d-flex" type="text" onChange ={e => setDetailsLogIn({...detailsLogIn, username: e.target.value })} value={detailsLogIn.username} />
            <Form.Label className="ErrorMsg" style={{textAlign: "center"}}>{errorsLogIn.nameError}</Form.Label>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{justifyContent: "center", paddingBottom: "5%"}}>
             <Form.Label sm={3} className="input-label" style={{paddingTop: "2%"}}>Password</Form.Label> 
              <Form.Control required type="password" className="form-input d-flex" onChange ={e => setDetailsLogIn({...detailsLogIn, password: e.target.value })} value={detailsLogIn.password}/>
            <Form.Label className="ErrorMsg" style={{textAlign: "center"}}>{errorsLogIn.passwordError}</Form.Label>
            </Form.Group>
            <div className="login-btn">
            <Button className="end-btn d-flex" onClick={submitHandlerLogIn}>Login</Button>
            </div>
          <div className="row not-reg-div d-flex" >
          <div className="col not-reg">Not Registered?</div>
          <div className="col sign-up-btn"><a href="/#" onClick={clickToRegister}>SIGN UP</a></div>
          </div>
        </Form></Modal.Body>
      </Modal>
    </div>

  );
}

export default Login;