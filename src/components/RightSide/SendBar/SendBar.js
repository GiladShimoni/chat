import React, { useState } from "react";
import MessageBubble from "../../MessageBubble";
import "./SendBar.css";
import addMsg from "../../Messages";
import { render } from "react-dom";
import { useRef } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import CloseButton from "react-bootstrap/CloseButton"



export default function SendBar(props) {

  /** all useState elements */
  const [data, setData] = useState({ time: "", sender: props.username, reciever: "", msg: "", type: "" });

  //file
  const [showFile, setShowFile] = useState(false);
  const handleCloseFile = () => setShowFile(false);
  const handleShowFile = () => setShowFile(true);

  //video
  const [showVideo, setShowVideo] = useState(false);
  const handleCloseVideo = () => setShowVideo(false);
  const handleShowVideo = () => setShowVideo(true);

  // recording
  const [showMic, setShowMic] = useState(false);
  const [stream, setStream] = useState({ access: false, recorder: null, error: "" });
  const [recording, setRecording] = useState({ active: false, available: false, url: "" });
  const chunks = useRef([]);

  /********************************************************************************/
  /** DATE */
  var now = new Date();
  var minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  var currentTime = now.getHours() + ':' + minutes;


  /*****************************   RECORDING   **************************************/

  /** this function submits (as a message) the recording */
  const submitVoice = (e) => {
    setShowMic(false);
    props.setMsg(recording.url);
    props.msgApi.addMsg({time: currentTime, sender: props.username, reciever: props.clickedUser, type: "audio", msg: recording.url });
    props.setNewMessage({ time: data.time, sender: data.sender, reciever: data.reciever, msg: data.msg, type: data.type });
    sendMessage(e);
  }

  /** closes the mic modal */
  const handleCloseMic = () => {
    setShowMic(false);
  };

  /** opens the mic modal */
  const handleShowMic = () => {
    setShowMic(true);
  };

  /** asks the user for microphone access */
  function getAccess() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((mic) => {
        let mediaRecorder;

        try {
          mediaRecorder = new MediaRecorder(mic, {
            mimeType: "audio/webm"
          });
        } catch (err) {
        }

        const track = mediaRecorder.stream.getTracks()[0];
        track.onended = () => console.log("ended");

        mediaRecorder.onstart = function () {
          setRecording({
            active: true,
            available: false,
            url: ""
          });
        };

        mediaRecorder.ondataavailable = function (e) {
          chunks.current.push(e.data);
        };

        mediaRecorder.onstop = async function () {

          const url = URL.createObjectURL(chunks.current[0]);
          chunks.current = [];

          setRecording({
            active: false,
            available: true,
            url
          });
        };

        setStream({
          ...stream,
          access: true,
          recorder: mediaRecorder
        });
      })
      .catch((error) => {
        setStream({ ...stream, error });
      });
  };

  const onCloseMic = e => {
    setShowMic(false);
  }

  /**********************   GENERAL MESSAGE SEND   ************************** */

  /** sends a message */
  const sendMessage = (e) => {
    props.setMsg(data.msg);
    props.msgApi.addMsg(data);
    props.setNewMessage({ time: data.time, sender: data.sender, reciever: data.reciever, msg: data.msg, type: "text" });
    setData({ ...data, msg: "" });
  };

  /** sends a message when ENTER is pressed */
  const handleKeypress = e => {
    if (e.code === "Enter") {
      sendMessage(e);
    }
  }

  /*****************************   IMAGE   **************************************/


  /** sends the image as a message */
  const sendImage = (e) => {
    handleCloseFile(false);
    sendMessage(e);
  }

  /** uploads image after pick */
  const uploadImg = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.onload = r => {
      setData({ ...data, time: currentTime, sender: props.username, reciever: props.clickedUser, type: "image", msg: r.target.result });
    };
    reader.readAsDataURL(files[0]);
    props.setMsg(data.msg);
    props.msgApi.addMsg(data);
    props.setNewMessage({ time: data.time, sender: data.sender, reciever: data.reciever, msg: data.msg, type: data.type });
    setData({ ...data, msg: "" });
  }

  const onCloseImage = e => {
    setShowFile(false);
  }

  /*****************************   VIDEO   **************************************/

  /** sends video to chat */
  const sendVideo = (e) => {
    handleCloseVideo(false);
    sendMessage(e);
  }

  /** uploads video after pick */
  const uploadVideo = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.onload = r => {
      setData({ ...data, time: currentTime, sender: props.username, reciever: props.clickedUser, type: "video", msg: r.target.result });
    };
    reader.readAsDataURL(files[0]);
    props.setMsg(data.msg);
    props.msgApi.addMsg(data);
    props.setNewMessage({ time: data.time, sender: data.sender, reciever: data.reciever, msg: data.msg, type: data.type });
    setData({ ...data, msg: "" });
  }

  
  const onCloseVideo = e => {
    setShowVideo(false);
  }


  /*****************************   LINKS POPOVER   ******************************/

  const popover = (
    <Popover id="popover-basic" className="popover-style">
      <Popover.Body className="popover-body">
        {/** IMAGE */}
        <div className="div-attach  card rounded-circle" onClick={handleShowFile}><svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" className="bi bi-file-earmark-image-fill attach-icon" viewBox="0 0 16 16">
          <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707v5.586l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889 2.644-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zm-1.498 4a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
          <path d="M10.564 8.27 14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577 2.56 1.536 2.426-3.395z" />
        </svg>
        </div>

        {/** VIDEO */}
        <div className="div-attach  card rounded-circle" onClick={handleShowVideo}><svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" className="bi bi-file-earmark-play-fill attach-icon" viewBox="0 0 16 16">
          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6 6.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V6.884z" />
        </svg></div>
      </Popover.Body>
    </Popover>
  );

  /*****************************   RENDERING   ******************************/

  return (
    <div className="row d-flex flex-row flex-wrap whole-bar card shadow-lg">
      <div className="card d-flex mic-div"><button className="card mic-icon-wrapper d-flex" onClick={handleShowMic}>
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-mic-fill mic-icon" viewBox="0 0 16 16">
          <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
        </svg></button>

        {/** RECORDING */}
        <Modal show={showVideo} onHide={handleCloseVideo} backdrop="static" keyboard={false}>
        <Modal.Body className="modal-body">

       <div className="d-flex enter-name-div"> <input type="file" accept="video/*" className="enter-image-input" onChange={e => uploadVideo(e)} /></div>
        <div className="d-flex"> <Button type="submit" className=" add-btn" onClick={sendVideo}>send</Button></div>
        </Modal.Body>
      </Modal>


        <Modal show={showMic} onHide={handleCloseMic} backdrop="static" keyboard={false}>
          <Modal.Body className="modal-body">
          <div className="row add-friend">
          <div className="col-5">Record Audio</div>
          <div className="col d-flex close-btn-div"><CloseButton className="close-btn"  onClick={onCloseMic}/></div>
          </div>
            {stream.access ? (
              <div className="audio-container" id="popover-height">
                <div className="add-btn d-flex" style={{marginLeft: "27%"}}><button id="audio-buttons" className={recording.active ? "active" : null} onClick={() => !recording.active && stream.recorder.start()} >
                  Start Recording
                </button>
                </div>
                <button id="audio-buttons" onClick={() => { stream.recorder.stop(); }} className="add-btn">Stop Recording</button>
                {recording.available && <audio controls src={recording.url} type="audio"/>}
                <button id="audio-buttons" type="button" onClick={submitVoice} className="add-btn">submit</button>
              </div>
            ) : (
              <button className="add-btn" onClick={getAccess}>Give Mic Access</button>
            )}
          </Modal.Body>
        </Modal></div>

      {/** div for send box itself (with all icons and input box) + TEXT*/}
      <div className="col card send-wrapper d-flex flex-row">
        <div className="col-2 send-input-wrapper card"><input onKeyPress={(e) => {handleKeypress(e) }} type="text" placeholder="Type Something..." className="send-input" onChange={e => setData({ ...data, time: currentTime, reciever: props.clickedUser, msg: e.target.value, type: "text" })} value={data.msg} /> </div>
        <OverlayTrigger rootClose="true" trigger="click" placement="top" overlay={popover}><div className="card d-flex link-div">
          <button className="card link-icon-wrapper d-flex"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-paperclip link-icon" viewBox="0 0 16 16">
            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
          </svg></button></div></OverlayTrigger>

        {/** VIDEO */}
        <Modal show={showVideo} onHide={handleCloseVideo} backdrop="static" keyboard={false}>
        <Modal.Body className="modal-body">
        <div className="row add-friend">
      <div className="col-5">Upload Video</div>
      <div className="col d-flex close-btn-div"><CloseButton className="close-btn"  onClick={onCloseVideo}/></div>
      </div>
       <div className="d-flex enter-name-div"> <input type="file" accept="video/*" className="enter-image-input" onChange={e => uploadVideo(e)} /></div>
        <div className="d-flex"> <Button type="submit" className=" add-btn" onClick={sendVideo}>send</Button></div>
        </Modal.Body>
      </Modal>

        {/** IMAGE */}
        <Modal show={showFile} onHide={handleCloseFile} backdrop="static" keyboard={false}>
          <Modal.Body className="modal-body">
          <div className="row add-friend">
        <div className="col-5">Upload Image</div>
        <div className="col d-flex close-btn-div"><CloseButton className="close-btn"  onClick={onCloseImage}/></div>
        </div>
         <div className="d-flex enter-name-div"> <input type="file" accept="Image/*" className="enter-image-input" onChange={e => uploadImg(e)} /></div>
          <div className="d-flex"> <Button type="submit" className=" add-btn" onClick={sendImage}>send</Button></div>
        </Modal.Body>
        </Modal>
        <div className="card d-flex send-icon-div"><button type="submit" onClick={sendMessage} className="card d-flex send-icon-div"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-send-fill send-icon" viewBox="0 0 16 16">
          <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
        </svg></button>
        </div>
      </div>
    </div>
  );
}

