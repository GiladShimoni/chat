import "./LastMessagePreview.css"
function LastMessagePreview(props) {

  /*conditions to check which icon should be rendered according to message type*/
  if (props.icon == "video") {
    var icon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-reels-fill type-icon" viewBox="0 0 16 16">
      <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
      <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7z" />
    </svg>
  }

  if (props.icon == "image") {
    var icon = <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-camera-fill type-icon" viewBox="0 0 16 16">
      <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
      <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
    </svg>
  }

  if (props.icon == "audio") {
    var icon = <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-music-note-beamed type-icon" viewBox="0 0 16 16">
      <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z" />
      <path fillRule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z" />
      <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z" />
    </svg>
  }

  if(props.icon == "text") {
    return (
      <div className="row d-flex flex-row card container-fluid content-info-div">
      <div className="col text-design d-block text-truncate card">{props.type}</div>
    </div>
    )
  };
  return (
    <div className="row d-flex flex-row card container-fluid content-info-div">
      <div className="col-2 icon-column card">{icon}</div>
      <div className="col text-design text-truncate card">{props.type}</div>
    </div>
  )
};

export default LastMessagePreview;