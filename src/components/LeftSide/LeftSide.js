import React, { Component, useState } from "react";
import InfoBarLeft from "./InfoBarLeft/InfoBarLeft";
import SearchBar from "./SearchBar/SearchBar";
import SideChats from "./SideChats/SideChats"
import "./LeftSide.css"


function LeftSide(props) {
  const [chatList, setChatList] = useState(props.friends);
  const [searchQuery, setSearchQuery] = useState("");
  const [chat, setChat] = useState("");

  /**search function for SearchBar */
  const doSearch = function (query) {
    setChatList(props.friends.filter((usr) => usr.includes(query)));
  };

  return (
    <div className="card container-fluid d-flex flex-column back-div">
      <InfoBarLeft username={props.username} db={props.db} setChat={setChat} user={props.user} />
      <SearchBar doSearch={doSearch} />
      <SideChats searchQuery={searchQuery} db={props.db} chat={chat} username={props.username} friends={chatList} setClicked={props.setClicked} setClickedUser={props.setClickedUser} newMessage={props.newMessage} msgApi={props.msgApi} />
    </div>
  )
};
export default LeftSide;