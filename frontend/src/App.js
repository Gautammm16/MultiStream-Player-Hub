import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [links, setLinks] = useState(['']);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/streams');
        if (response.data.length > 0) {
          setLinks(response.data.map(stream => stream.url).slice(0, 4)); // Limit to 4 links
        }
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };

    fetchLinks();
  }, []);

  const handleInputChange = (e, index) => {
    const newLinks = [...links];
    newLinks[index] = e.target.value;
    setLinks(newLinks);
  };

  const handleAddLink = () => {
    if (links.length < 4) {
      setLinks([...links, '']);
    }
  };

  const handleSaveLinks = async () => {
    try {
      await axios.delete('http://localhost:5000/streams');
      await Promise.all(links.map(link => axios.post('http://localhost:5000/streams', { url: link })));
      alert('Links saved successfully');
    } catch (error) {
      console.error('Error saving links:', error);
    }
  };

  const extractYouTubeVideoID = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const renderVideo = (link) => {
    const youtubeID = extractYouTubeVideoID(link);
    if (youtubeID) {
      return <iframe key={link} src={`https://www.youtube.com/embed/${youtubeID}?autoplay=1&mute=1`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>;
    } else if (link.includes('twitch.tv')) {
      const channel = link.split('/').pop();
      return <iframe key={link} src={`https://player.twitch.tv/?channel=${channel}&parent=localhost`} frameBorder="0" allowFullScreen={true} scrolling="no"></iframe>;
    } else {
      return <p key={link}>Unsupported video link</p>;
    }
  };

  return (
    <div className="App">
      <h3>Multi Video Stream</h3>
      {links.map((link, index) => (
        <div key={index}>
          <input
            type="text"
            value={link}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="Enter video link"
          />
        </div>
      ))}
      {links.length < 4 && <button onClick={handleAddLink}>Add Another Link</button>}
      <button onClick={handleSaveLinks}>Save Links</button>
      <div className={`video-container video-count-${links.length}`}>
        {links.map((link) => renderVideo(link))}
      </div>
    </div>
  );
}

export default App;
