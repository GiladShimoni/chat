import React, { useState } from "react";
import "./SideChatBlock.css"

function SideChatBlock(props) {

  /** function to handle an event where the block is clicked */
  const handleClick = () => {
    props.setClicked(true);
    props.setClickedUser(props.friend)
  }

  /**if this is the starting screen where no new message was sent */
  if (props.newMessage.msg == "") {
    return (
      <div className="row d-flex flex-row all-div-wrapper container card shadow" onClick={handleClick}>
        <div className="col-3 container-fluid image-wrap d-flex card"><img src={props.db.getImg(props.friend)} className="friend-img rounded-circle card" /></div>
        <div className="col container-fluid card text-truncate d-flex flex-column middle-content">
          <div className="row container-fluid d-block name card text-truncate" >{props.friend}</div>
          <div className="row last-msg-wrapper card text-truncate d-block"><div className="last-msg">{props.msgApi.getLastMessage(props.username, props.friend)}</div></div></div>
        <div className="col-3 container-fluid d-flex flex-column card time-wrapper card prop"><div className="time">{props.msgApi.getLastMessageTime(props.username, props.friend)}</div>
        </div>
      </div>
    );
  }

  /**a new message was sent */
  return (
    <div className="row d-flex flex-row all-div-wrapper container card shadow" onClick={handleClick}>
      <div className="col-3 container-fluid image-wrap d-flex card"><img src={props.db.getImg(props.friend)} className="friend-img rounded-circle card" /></div>
      <div className="col container-fluid card text-truncate d-flex flex-column middle-content">
        <div className="row container-fluid name card text-truncate d-flex" >{props.friend}</div>
        <div className="row last-msg-wrapper card text-truncate d-flex"><div className="last-msg">{props.msgApi.getLastMessage(props.username, props.friend)}</div></div></div>
      <div className="col-3 container-fluid d-flex flex-column card time-wrapper card prop"><div className="time">{props.msgApi.getLastMessageTime(props.username, props.friend)}</div>
      </div>
    </div>
  )
}
export default SideChatBlock;