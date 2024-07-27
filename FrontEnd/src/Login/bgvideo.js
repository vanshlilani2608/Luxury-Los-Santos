// BgVideo.js
import React from "react";
import video from '../Components/video.mp4'; // Ensure the path is correct
import '../styles.css';

function BgVideo() {
  return (
    <div className="bg-container">
      <video src={video} autoPlay loop muted className="video"/>     
    </div>
  )
}

export default BgVideo;
