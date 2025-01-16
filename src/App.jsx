import { useEffect, useState } from "react";
import axios from "axios";
import VideoPanel from "./components/VideoPanel/VideoPanel";
import "./App.scss";
function App() {
  // get video
  const [videoSources, setVideoSources] = useState([]);

  useEffect(() => {
    const fetchVideoSources = async () => {
      try {
        const response = await axios.get("http://localhost:5173/src/json/video.json");
        // console.log(response.data);
        setVideoSources(response.data);
      } catch (error) {
        console.error("Error fetching video sources:", error);
      }
    };

    fetchVideoSources();
  }, []);

  return (
    <div className="container">
      <VideoPanel videoSources={videoSources} />
    </div>
  );
}

export default App;
