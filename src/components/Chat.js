import React, { useState } from "react";
import "./Chat.css";
import Messages from "./Messages";
import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";
import StartEmptyScreen from "./RightSide/StartEmptyScreen/StartEmptyScreen";


function Chat({ msgApi, db}) {
  /** finds the user's place in the dataBase */
  function findUser() {
    for (var i = 0; i < db.getDB().length; i++) {
      if (db.getDB()[i].username === sessionStorage.getItem('user')) {
        return i;
      }
    }
  }

  /** returns the current usere's friends list */
  function findUserFriends() {
    for (var i = 0; i < db.getDB().length; i++) {
      if (db.getDB()[i].username === sessionStorage.getItem('user')) {
        return db.getDB()[i].friends;
      }
    }
  }

  /** returns the user's block of data saved in the dataBase */
  function userData() {
    //NewUser
    if (sessionStorage.getItem('isNewUser') === 'true') {
      return {
        username: sessionStorage.getItem('user'),
        password: sessionStorage.getItem('password'),
        displayname: sessionStorage.getItem('displayname'),
        img: sessionStorage.getItem('img'),
        friends: []
      }
    }
    for (var i = 0; i < db.getDB().length; i++) {
      if (db.getDB()[i].username === sessionStorage.getItem('user')) {
        return db.getDB()[i];
      }
    }
  }

  var user = userData();
  db.addUser(user);
  var friends = findUserFriends();


  const [clicked, setClicked] = useState(false);
  const [clickedUser, setClickedUser] = useState("");
  const [newMessage, setNewMessage] = useState({ time: "", sender: "", reciever: "", msg: "", type: "" });

  /** if no chat was picked yet -- render empty screen on right side */
  if (!clicked) {
    return (
        <div className="container-fluid d-flex flex-column main-div shadow-lg background">
          <div className="container-fluid d-flex flex-column">
            <div className="card main-card shadow-lg">
              <div className="row main-row shadow-lg">
              <LeftSide username={sessionStorage.getItem('user')} db={db} friends={friends} user={user} setClicked={setClicked} setClickedUser={setClickedUser} clickedUser={clickedUser} newMessage={newMessage} msgApi={msgApi} />
              <StartEmptyScreen />
              </div>
            </div>
          </div>
        </div>
    );
  }
  /** render the picked chat's screen */
  return (
      <div className="container-fluid d-flex flex-column main-div shadow-lg background">
        <div className="card main-card shadow-lg">
          <div className="row main-row shadow-lg">
            <LeftSide username={sessionStorage.getItem('user')} db={db} friends={friends} user={user} setClicked={setClicked} setClickedUser={setClickedUser} clickedUser={clickedUser} newMessage={newMessage} msgApi={msgApi} />
            <RightSide db={db} index={findUser()} msgApi={msgApi} username={sessionStorage.getItem('user')} clickedUser={clickedUser} setNewMessage={setNewMessage} newMessage={newMessage} />
          </div>
        </div>
      </div>
  );
}


export default Chat;