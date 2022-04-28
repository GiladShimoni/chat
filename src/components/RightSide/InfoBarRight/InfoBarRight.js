import React from "react";
import "./InfoBarRight.css";

function InfoBarRight(props) {
  return (
    <div className="row d-flex flex-row card all-div shadow-lg">
      <div className="col-2 container-fluid img-card d-flex card"><img src={props.profilePic} className="friend-img rounded-circle card" /></div>
      <div className="col d-flex card user-card text-truncate">{props.clickedUser}</div>
    </div>
  );
}
export default InfoBarRight;