import React from "react";
import video from './Components/video.mp4';
import './regis.module.css';
function BgVideo(){
  return (
    <div className="bgContainer">
      <div className="overlay"></div>
        <video src={video} autoPlay loop muted/>     
    </div>
  )
}

export default BgVideo;