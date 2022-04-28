import React from "react";
import "./InfoBarLeft.css";
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";


function InfoBarLeft({ username, db, user, setChat}) {

  const [nameError, setNameError] = useState("");
  const [show, setShow] = useState(false);
  const [newChat, setNewChat] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const addChat = (e) => {
    var newUser = db.getUserByDisplayName(newChat);
    if(newUser !== undefined && newChat !== username ){
      db.addFriend(username, newUser.displayname);
      setChat(newChat);
      setShow(false);
    }
    else {
      setNameError("No User Found!");
    }
  }

  const onCloseButton = e => {
    setShow(false);
  }

  return (
    <div className="row d-flex flex-row card info-div shadow-lg">
      <div className="col-2 container-fluid user-img-card d-flex card"><img src={db.getImg(user.displayname)} className="rounded-circle card" id="user-image" /></div>
      <div className="col d-flex card user-name">{user.displayname}</div>
      <Button className="col-2 d-flex card add-card btn-dark" onClick={handleShow}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-plus-fill add-icon d-flex" viewBox="0 0 16 16">
          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
        </svg>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="modal-body">
        <div className="row add-friend">
        <div className="col-4">Add Friend</div>
        <div className="col d-flex close-btn-div"><CloseButton className="close-btn"  onClick={onCloseButton}/></div>
        </div>
        <div className="input-label">Enter Name</div>
          <div className="d-flex enter-name-div"><input className="enter-name-input" type="text" onChange={e => setNewChat(e.target.value)} /></div>
          <label className="ErrorMsg d-flex" id="error-msg">{nameError}</label>
          <div className="d-flex"> <Button className=" add-btn text-nowrap add-btn" onClick={e => addChat(e)}>Add</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default InfoBarLeft;