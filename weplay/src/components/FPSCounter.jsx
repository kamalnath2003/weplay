// src/components/FPSCounter.js
import React, { useEffect } from 'react';
import Stats from 'stats.js';

const FPSCounter = () => {
  useEffect(() => {
    const stats = new Stats();
    stats.showPanel(0); // 0: FPS, 1: ms, 2: memory
    document.body.appendChild(stats.dom);

    const animate = () => {
      stats.begin();
      // monitored code goes here
      stats.end();
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      document.body.removeChild(stats.dom);
    };
  }, []);

  return null;
};

export default FPSCounter;
