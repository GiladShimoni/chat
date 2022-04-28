import React, { Component, useState } from "react";
import SideChatBlock from "../SideChatBlock/SideChatBlock";
import "./SideChats.css"

function SideChats(props) {

  const [lastMessage, setLastMessage] = useState("");
  const [latMessageTime, setLastMessageTime] = useState("");

  /**function that renders the usere's friends chats */
  const chatList = (props.friends.map((frnd, key) => {
    return (<SideChatBlock  username={props.username} friend={frnd} key={key} setClicked={props.setClicked} setClickedUser={props.setClickedUser} db={props.db} newMessage={props.newMessage} msgApi={props.msgApi} lastMessage={lastMessage} latMessageTime={latMessageTime} />)
  }));
  return (
    <div className="row flex-row d-flex align-content-start wrapper-div scrollbar card">
      {chatList}
    </div>
  );

}
export default SideChats;