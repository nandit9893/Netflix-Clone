import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom'; // Import Link

const TitleCards = ({ title }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const url = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=AIzaSyCPwuN5bV8e8iC_FqbxIu88LxGR7bl4XZo';

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setApiData(data.items); // Ensure the data is an array of items
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };

    fetchData();
    cardsRef.current.addEventListener('wheel', handleWheel);

  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((item, index) => (
          <Link to={`/player/${item.id}`} className="card" key={index}>
            <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
            <p>{item.snippet.title.slice(0, 20)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TitleCards;


//AIzaSyDnoG5aQybGNu33Ll2J_Y8jim4d-ZmFPrg

// import React, { useEffect, useRef, useState } from 'react';
// import './TitleCards.css';

// const TitleCards = ({ title }) => {
//     const [movies, setMovies] = useState([]);
//     const cardsRef = useRef();

//     const url = 'https://netflix-data.p.rapidapi.com/title/trailers/?id=80057281';
//     const options = {
//         headers: {
//             'x-rapidapi-key': 'cc62738415msh774b02b7331b0fbp19fd4ajsn97397bc8b5f8',
//             'x-rapidapi-host': 'netflix-data.p.rapidapi.com'
//         }
//     };

//     useEffect(() => {
//         const fetchMovies = async () => {
//             try {
//                 const response = await fetch(url, options);
//                 const data = await response.json();
//                 setMovies(data);
//             } catch (error) {
//                 console.error('Error fetching movies:', error);
//             }
//         };

//         fetchMovies();
//     }, []);

//     const handleWheel = (event) => {
//         event.preventDefault();
//         cardsRef.current.scrollLeft += event.deltaY;
//     };

//     useEffect(() => {
//         cardsRef.current.addEventListener('wheel', handleWheel);
//         return () => {
//             cardsRef.current.removeEventListener('wheel', handleWheel);
//         };
//     }, []);

//     return (
//         <div className="title-cards">
//             <h2>{title ? title : "Popular on Netflix"}</h2>
//             <div className="card-list" ref={cardsRef}>
//                 {movies.map((movie, index) => (
//                     <div className="card" key={index}>
//                         <img src={movie.details.interestingMoment._342x192.webp.value.url} alt={movie.details.title} />
//                         <p>{movie.details.title}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default TitleCards;




//after youtube
    //  const options = {
    //      headers: {
    //       'x-rapidapi-key': 'cc62738415msh774b02b7331b0fbp19fd4ajsn97397bc8b5f8',
    //       'x-rapidapi-host': 'netflix-data.p.rapidapi.com'
    //      }
    //  };
