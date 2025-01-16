import { useEffect } from "react";
import useVideoStore from "./store";
import VideoPanel from "./components/VideoPanel/VideoPanel";
import "./App.scss";

function App() {
  const { videoSources, fetchVideoSources } = useVideoStore();

  useEffect(() => {
    fetchVideoSources();
  }, [fetchVideoSources]);

  return (
    <div className="container">
      <VideoPanel videoSources={videoSources} />
    </div>
  );
}

export default App;
