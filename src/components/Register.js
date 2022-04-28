import React, {useState, useEffect } from "react";
import "./Register.css";



import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Chat from "./Chat";

function Register({db, msgApi}) {

  const [displayChat, setDisplayChat] = useState(false);
  const [ errors, setErrors ] = useState({nameError: "", displayNameError: "", passwordError:"", confirmError:""});
  const [details, setDetails] =  useState({username: "", displayname: "",password: "" , conformation: "", img : ""});
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


//return boolean if form is leagal
  const validatedForm = event => {
    var localValdatition = true;
    var newErrors = {nameError: "", displayNameError: "", passwordError:"", confirmError:""};
    setErrors(newErrors);
    //error null name
      if(details.username === ""){
        newErrors = ({...newErrors,nameError: "Username is requierd" });
        localValdatition = false;
      }
      else{
        if(db. getUserByName(details.username) !== undefined){
          newErrors = ({...newErrors, nameError: "Name is Taken, please choose a diffrent one"});
          localValdatition = false;
        }
      }

      //error null dispalyName
      if(details.displayname === ""){
        newErrors = ({...newErrors, displayNameError: "nickName is requierd"});
        localValdatition = false;
      }
      else{
        if(db.getUserByDisplayName(details.displayname) !== undefined){
          newErrors = ({...newErrors, displayNameError: "NickName is Taken, please choose a diffrent one"});
          localValdatition = false;
        }
      }

      //error password
      if(details.password === ""){
        newErrors = ({...newErrors,passwordError: "Password is requierd" });
        localValdatition = false;
      }

      if(details.password.search(/[A-Z]/) == -1 && details.password.search(/[a-z]/) == -1) {
        newErrors = ({...newErrors,passwordError: "Password must contain characters"});
        localValdatition = false;
      }

      if(details.password.search(/[0-9]/) == -1) {
        newErrors = ({...newErrors,passwordError: "Password must contain numbers"});
        localValdatition = false;
      }

      //cofirm Password Error
      if(details.password !== details.conformation){
        newErrors = ({...newErrors,confirmError: "Passwords don't match"});
        localValdatition = false;
      }
      
      
      setErrors(newErrors);
      return localValdatition;

  }

  const uploadImgHandler = (e) =>{
    let files = e.target.files;
    let reader = new FileReader();
    reader.onload = r => { 
      setDetails({...details, img: r.target.result} );
     };
    reader.readAsDataURL(files[0]);
}
    
  const submitHandler = event =>{
        if(validatedForm()){
                var res =  db.addNewUser(details);
                sessionStorage.setItem('user', details.username );
                setDisplayChat(true);
        }  
    }
    if(displayChat) {
      return <Chat db={db} msgApi={msgApi}/>
    }

    return(
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
      Click Here To Register
    </Button></div>
    
    <Modal show={show} onHide={handleClose}>
      <Modal.Body className="modal-body"> 
      <Form>
      <div className="welcome-div">CREATE YOUR ACCOUNT</div>
      <Form.Group as={Row} className="mb-3 d-flex" style={{justifyContent: "center"}}>
          <Form.Label className="input-label">Username</Form.Label> 
          <Form.Control required aria-describedby="inputGroupPrepend" className="form-input d-flex" type="text" onChange ={e => setDetails({...details, username: e.target.value })} value={details.username} />
          <Form.Label className="ErrorMsg" style={{textAlign: "center"}}>{errors.nameError}</Form.Label>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 d-flex" style={{justifyContent: "center"}}>
          <Form.Label className="input-label" style={{paddingTop: "2%"}}>Displayname</Form.Label> 
          <Form.Control required aria-describedby="inputGroupPrepend" className="form-input d-flex" type="text" onChange ={e => setDetails({...details, displayname: e.target.value })} value={details.displayname} />
          <Form.Label className="ErrorMsg" style={{textAlign: "center"}}>{errors.displayNameError}</Form.Label>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" style={{justifyContent: "center"}}>
           <Form.Label sm={3} className="input-label" style={{paddingTop: "2%"}}>Password</Form.Label> 
            <Form.Control required type="password" className="form-input d-flex" onChange ={e => setDetails({...details, password: e.target.value })} value={details.password}/>
          <Form.Label className="ErrorMsg" style={{textAlign: "center"}}>{errors.passwordError}</Form.Label>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" style={{justifyContent: "center"}}>
          <Form.Label sm={3} className="input-label" style={{paddingTop: "2%"}}>confirm Password</Form.Label> 
           <Form.Control required type="password" className="form-input d-flex" ocd onChange ={e => setDetails({...details,conformation : e.target.value })} value={details.conformation}/>
         <Form.Label className="ErrorMsg" style={{textAlign: "center"}}>{errors.confirmError}</Form.Label>
         </Form.Group>
         <Form.Group as={Row} className="mb-3" style={{justifyContent: "center"}}>
         <Form.Label sm={3} className="input-label" style={{paddingTop: "2%"}}>Profile Photo</Form.Label> 
         <Form.Control required type="file" className="form-input d-flex" accept="Image/*" onChange ={e => uploadImgHandler(e)}/>
        </Form.Group>
        <div className="login-btn">
        <Button className="end-btn d-flex" onClick={submitHandler}>SUBMIT</Button>
        </div>

        <div className="row not-reg-div d-flex" >
        <div className="col not-reg">Already Registered?</div>
        <div className="col sign-up-btn"><a href="http://localhost:3000/">LOG IN</a></div>
        </div>
      </Form></Modal.Body>
    </Modal>
    </div>

);
}

export default Register;