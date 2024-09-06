// src/App.js
import React from 'react';
import { SyncProvider } from './context/SyncContext';
import VideoPlayer from './components/VideoPlayer';
import ControlPanel from './components/ControlPanel';

const App = () => {
  return (
    <SyncProvider>
      <div>
        <VideoPlayer />
        <ControlPanel />
      </div>
    </SyncProvider>
  );
};

export default App;
