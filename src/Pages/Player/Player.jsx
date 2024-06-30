import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { videoId } = useParams();
  const navigate = useNavigate()

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    publishedAt: "",
    kind: ""
  });

  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=AIzaSyDnoG5aQybGNu33Ll2J_Y8jim4d-ZmFPrg`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const firstItem = data.items[0]; // Correctly access the first item
          setApiData({
            name: firstItem.snippet.title.slice(0, 20),
            key: firstItem.id,
            publishedAt: firstItem.snippet.publishedAt,
            kind: firstItem.kind
          });
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [url]); // Add url as a dependency to avoid re-fetching on every render

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Back" onClick={()=>{navigate(-1)}}/>
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.publishedAt.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.kind}</p>
      </div>
    </div>
  );
};

export default Player;
