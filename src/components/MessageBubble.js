import "./MessageBubble.css";
function MessageBubble(props) {

    /** if a new message was sent*/
    if (props.msg != "") {
        if(props.username == props.data.sender) {
        /** conditions that check the type of the new sent message */
        if (props.type === "text") {
            return (
                <div className="row d-flex">
                    <div className="col d-flex flex-column">
                        <div className="row msg" >
                            {props.msg}
                        </div>
                        <div className="row msg-time">{props.data.time}</div>
                    </div>
                </div>
            );
        }
        if (props.type === "audio") {
            return (
                <div className="row d-flex">
                <div className="col d-flex flex-column">
                    <div className="row msg" id="msg-image">
                    <audio controls src={props.msg} type="audio"/>
                    </div>
                    <div className="row msg-time">{props.data.time}</div>
                </div>
            </div>);
        }

        if (props.type === "image") {
            return (
                <div className="row d-flex">
                    <div className="col d-flex flex-column">
                        <div className="row msg" id="msg-image">
                            <img src={props.msg} alt="Responsive image" />
                        </div>
                        <div className="row msg-time">{props.data.time}</div>
                    </div>
                </div>);
        }
        if (props.type === "video") {
            return (
                <div className="row d-flex">
                    <div className="col d-flex flex-column">
                        <div className="row msg" id="msg-image">
                            <video width="320" height="240" controls>
                                <source src={props.msg} type="video/mp4" />
                            </video>
                        </div>
                        <div className="row msg-time">{props.data.time}</div>
                    </div>
                </div>);
        }
    }
    if(props.username === props.data.reciever) {
        if (props.type === "text") {
            return (
                <div className="row d-flex">
                    <div className="col d-flex flex-column">
                        <div className="row other-msg" >
                            {props.msg}
                        </div>
                        <div className="row msg-time" id="other-msg-time">{props.data.time}</div>
                    </div>
                </div>
            );
        }
        if (props.type === "audio") {
            return (
                <div className="row d-flex">
                <div className="col d-flex flex-column">
                    <div className="row other-msg" id="msg-image">
                    <audio controls src={props.msg} type="audio"/>
                    </div>
                    <div className="row msg-time" id="other-msg-time">{props.data.time}</div>
                </div>
            </div>);
        }

        if (props.type === "image") {
            return (
                <div className="row d-flex">
                    <div className="col d-flex flex-column">
                        <div className="row old-msg" id="msg-image">
                            <img src={props.msg} alt="Responsive image" />
                        </div>
                        <div className="row msg-time" id="other-msg-time">{props.data.time}</div>
                    </div>
                </div>);
        }
        if (props.type === "video") {
            return (
                <div className="row d-flex">
                    <div className="col d-flex flex-column">
                        <div className="row old-msg" id="msg-image">
                            <video width="320" height="240" controls>
                                <source src={props.msg} type="video/mp4" />
                            </video>
                        </div>
                        <div className="row msg-time" id="other-msg-time">{props.data.time}</div>
                    </div>
                </div>);
        }
    }
    }
    /** if no new message was sent yet */
    else {
        return <div className="message"></div>
    }
}
export default MessageBubble;
