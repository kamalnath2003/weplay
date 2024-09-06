// src/context/SyncContext.js
import React, { createContext, useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const SyncContext = createContext();

const socket = io('http://localhost:3001'); // Adjust the server URL accordingly

export const SyncProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    socket.on('playPause', ({ time, playing }) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time;
        if (playing) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
      setIsPlaying(playing);
    });

    socket.on('seek', (time) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time;
      }
    });

    socket.on('fileSelected', (src) => {
      setVideoSrc(src);
    });

    return () => {
      socket.off('playPause');
      socket.off('seek');
      socket.off('fileSelected');
    };
  }, []);

  const togglePlayPause = () => {
    const currentTime = videoRef.current?.currentTime || 0;
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
    socket.emit('playPause', { time: currentTime, playing: newPlayingState });
  };

  const handleSeek = (time) => {
    socket.emit('seek', time);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setVideoSrc(fileURL);
      socket.emit('fileSelected', fileURL);
    }
  };

  return (
    <SyncContext.Provider
      value={{
        isPlaying,
        videoSrc,
        videoRef,
        togglePlayPause,
        handleSeek,
        handleFileChange,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
};

export default SyncContext;
