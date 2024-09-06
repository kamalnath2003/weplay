// src/components/VideoPlayer.js
import React, { useContext, useEffect } from 'react';
import SyncContext from '../context/SyncContext';

const VideoPlayer = () => {
  const { isPlaying, videoSrc, videoRef, handleSeek } = useContext(SyncContext);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <video
      ref={videoRef}
      controls
      src={videoSrc}
      onSeeked={() => handleSeek(videoRef.current.currentTime)}
      style={{ width: '100%', height: 'auto' }}
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
