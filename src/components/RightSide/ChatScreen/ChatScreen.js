import React, { useState } from "react";
import MessageBubble from "../../MessageBubble";
import "./ChatScreen.css";

function ChatScreen(props) {

  /**function the returns the message list of the connected user */
    const msgList = props.msgApi.getMsg().map((msg, key) => {
    if ((msg.sender === props.username && msg.reciever === props.clickedUser )||
    msg.sender === props.clickedUser && msg.reciever === props.username) {
      return (<MessageBubble msg={msg.msg} type={msg.type} data={msg} key={key} newMessage={props.msg} username={props.username}/>)
    }
  });

  /** */
  if (props.msg != "") {
    return (
      <div className="row d-flex flex-row align-content-start flex-wrap card main-screen scrollbar shadow-lg">
      {msgList}
      </div>
    );
  }
  else {
    return (
      <div className="row d-flex flex-row align-content-start flex-wrap card main-screen scrollbar shadow-lg">
        {msgList}
      </div>
    )
  }
}
export default ChatScreen;