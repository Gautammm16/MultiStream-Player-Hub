import React from 'react';
import VideoPlayer from './VideoPlayer';

const VideoGrid = ({ urls }) => {
  const getGridClass = (length) => {
    switch (length) {
      case 1:
        return 'grid-one';
      case 2:
        return 'grid-two';
      case 3:
        return 'grid-three';
      case 4:
        return 'grid-four';
      default:
        return '';
    }
  };

  return (
    <div className={`video-grid ${getGridClass(urls.length)}`}>
      {urls.slice(0, 4).map((url, index) => (
        <VideoPlayer key={index} url={url.url} />
      ))}
    </div>
  );
};

export default VideoGrid;
