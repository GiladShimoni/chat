import React, { useRef } from "react";
import ChatScreen from "./ChatScreen/ChatScreen"
import SendBar from "./SendBar/SendBar";
import InfoBarRight from "./InfoBarRight/InfoBarRight"
import "./RightSide.css"
import { useState } from "react";

function RightSide(props) {
  const [msg, setMsg] = useState("");
  
  /**divided to occurence: a message was sent or not - display screen accordingly */
  return msg == "" ? (
    <div className="col-8 container d-flex flex-column back-screen">
      <InfoBarRight talkto={props.db.getDB()[props.index].friends} clickedUser={props.clickedUser} profilePic={props.db.getImg(props.clickedUser)} />
      <ChatScreen msg={msg} setMsg={setMsg} db={props.db} msgApi={props.msgApi} username={props.username} clickedUser={props.clickedUser} />
      <SendBar msgApi={props.msgApi} msg={msg} setMsg={setMsg} username={props.username} clickedUser={props.clickedUser} setNewMessage={props.setNewMessage} newMessage={props.newMessage} />
    </div>
  ) : (
    <div className="col-8 container d-flex flex-column back-screen">
      <InfoBarRight talkto={props.db.getDB()[props.index].friends} clickedUser={props.clickedUser} profilePic={props.db.getImg(props.clickedUser)} />
      <ChatScreen msg={msg} setMsg={setMsg} db={props.db} msgApi={props.msgApi} username={props.username} clickedUser={props.clickedUser} />
      <SendBar msgApi={props.msgApi} msg={msg} setMsg={setMsg} username={props.username} clickedUser={props.clickedUser} setNewMessage={props.setNewMessage} newMessage={props.newMessage} />
    </div>
  );
}
export default RightSide;