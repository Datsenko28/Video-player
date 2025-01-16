import React, { useState } from "react";
import "./video-panel.scss";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import useVideoStore from "../../store";

const VideoPanel = () => {
  const { videoSources } = useVideoStore();
  const [isExpanded, setIsExpanded] = useState(true);
  const [objVideo, setObjVideo] = useState(null);

  const toggleList = () => {
    setIsExpanded(!isExpanded);
  };

  const checkVideoId = (id) => {
    const selectedId = Number(id);
    const filteredVideo = videoSources.filter((obj) => Number(obj.id) === selectedId);
    if (filteredVideo.length > 0) {
      setObjVideo(filteredVideo[0]);
    }
  };

  return (
    <>
      <div className="container-payer-and-videoList">
        <VideoPlayer objVideo={objVideo} />

        <div className="video-panel">
          <div className="video-header">
            <div className="video-circle" data-procent={"25%"}></div>
            <div>
              <h2>Aprenda a programar</h2>

              <div className="ts">
                <span>{videoSources.length}</span>
                <span>/22 min</span>
              </div>
            </div>

            <button className={`toggle-button ${isExpanded ? "expanded" : ""}`} onClick={toggleList}></button>
          </div>
          {isExpanded && (
            <ul className="video-list">
              {videoSources.map((video) => (
                <li key={video.id} onClick={() => checkVideoId(video.id)} className="video-item">
                  <div className="video-info">
                    <img src={video.img} alt={video.title} className="video-thumbnail" />

                    <div className="ts">
                      <span>{video.title}</span>
                      <span>{video.uploadTime}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="container-video-panel"></div>
      <div>
        <div className="descriptions">
          <h3>{objVideo ? objVideo.title : "Виберіть відео для перегляду"}</h3>
          <li className="descriptions">
            <span className="description">{objVideo && objVideo.description}</span>
          </li>
        </div>
      </div>
    </>
  );
};

export default VideoPanel;
