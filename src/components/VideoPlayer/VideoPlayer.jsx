import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./video-player.scss";

function VideoPlayer(props) {
  const { objVideo } = props;
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [qualityMenuVisible, setQualityMenuVisible] = useState(false);
  const [options, setOptions] = useState({
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    experimentalSvgIcons: true,
    disablePictureInPicture: true,
    controlBar: {
      skipButtons: {
        forward: 10,
        backward: 10,
      },
    },
    sources: [
      {
        src: "",
        type: "video/mp4",
      },
    ],
  });

  // Оновлюємо опції плеєра, коли objVideo змінюється
  useEffect(() => {
    if (objVideo?.src && objVideo.src[0]?.videoUrl) {
      setOptions((prevOptions) => ({
        ...prevOptions,
        sources: [
          {
            src: objVideo?.src[0]?.videoUrl,
            type: "video/mp4",
          },
        ],
      }));
    }
  }, [objVideo]);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
      }));

      // Додавання кнопки якості після ініціалізації плеєра
      const Button = videojs.getComponent("Button");
      const button = new Button(player);
      const myButton = player.getChild("ControlBar").addChild(button, {
        controlText: "Quality",
        className: "vjs-visible-text vjs-quality-button vjs-control-text",
      });
      myButton.controlText("");
      myButton.addClass("vjs-visible-text vjs-quality-button");
      myButton.on("click", () => setQualityMenuVisible(!qualityMenuVisible));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }

    return () => {
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [options]);

  // Додавання кнопок якості у панель керування
  useEffect(() => {
    if (playerRef.current && qualityMenuVisible) {
      const controlBar = playerRef.current.el().querySelector(".vjs-control-bar");

      if (controlBar) {
        const qualityMenu = document.createElement("div");
        qualityMenu.className = "quality-buttons";

        const videoSrc = objVideo?.src || [];
        qualityMenu.innerHTML = videoSrc.map((src) => `<button data-src="${src.videoUrl}">${src.quality}</button>`).join("");

        qualityMenu.addEventListener("click", (event) => {
          const button = event.target.closest("button");
          if (button) {
            changeQuality(button.getAttribute("data-src"));
          }
        });

        controlBar.appendChild(qualityMenu);

        return () => {
          controlBar.removeChild(qualityMenu);
        };
      }
    }
  }, [qualityMenuVisible]);

  // Зміна якості відео
  const changeQuality = (source) => {
    if (playerRef.current) {
      playerRef.current.src({ src: source, type: "video/mp4" });
      playerRef.current.pause();
      setQualityMenuVisible(false);
    }
  };

  return (
    <>
      <div className="container-player" data-vjs-player>
        <div ref={videoRef} />
      </div>
    </>
  );
}

export default VideoPlayer;
