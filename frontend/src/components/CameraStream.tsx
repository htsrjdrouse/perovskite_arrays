import { useRef, useCallback } from 'react';

export const CameraStream = () => {
  const imgRef = useRef<HTMLImageElement>(null);

  const handleError = useCallback(() => {
    console.error('Stream failed to load');
  }, []);

  return (
    <div className="stream-container">
      <img 
        ref={imgRef}
        src="/stream" 
        alt="Microscope Stream" 
        className="camera-stream"
        onError={handleError}
      />
      <div className="stream-overlay">
        <span className="live-indicator"></span>
        <span className="stream-status">LIVE</span>
      </div>
    </div>
  );
};
