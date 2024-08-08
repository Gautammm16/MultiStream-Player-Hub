import React from 'react';

const VideoPlayer = ({ url }) => {
  const getEmbedUrl = (url) => {
    if (url.includes('youtube.com')) {
      const videoId = url.split('v=')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('twitch.tv')) {
      const videoId = url.split('.tv/')[1];
      return `https://player.twitch.tv/?channel=${videoId}&parent=localhost`;
    }
    return url;
  };

  return (
    <iframe
      title="video"
      width="100%"
      height="100%"
      src={getEmbedUrl(url)}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default VideoPlayer;
