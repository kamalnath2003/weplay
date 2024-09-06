// src/components/ControlPanel.js
import React, { useContext } from 'react';
import SyncContext from '../context/SyncContext';

const ControlPanel = () => {
  const { isPlaying, togglePlayPause, handleFileChange } = useContext(SyncContext);

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default ControlPanel;
