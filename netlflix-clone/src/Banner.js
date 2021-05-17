import React, {useState, useEffect} from 'react'
import axios from "axios"
import requests from './requests';
import "./Banner.css"; 

function Banner() {

    const [movie,setMovie] = useState([]);

    // A snippet of code which runs based on a specific condition
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            console.log(request); 
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length -1)]);// [] randdom select movie
            return request;
        }
        fetchData();
    }, []);

    console.log(movie);

    function truncate(str, max) { // to put the limit of n letters of description
        return str?.length > max ? str.substr(0, max-1) + '…' : str;
      }
 
    return (
        <header className = "banner"
            style={{
                backgroundSize: "cover", // use all size from the container
                // movie?. means if movie is ever for any reason undefined it will crash
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original${movie?.backdrop_path}" 
                )`,
                backgroundPosition: "center center",
            }}
        >
            <div className = "banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className = "banner__buttons">
                    <button className= "banner__button">Play</button>
                    <button className= "banner__button">My List</button>
                </div>
                <h1 className="banner__description">
                    {truncate(movie?.overview,150)}
                </h1>
            </div>
            <div className="banner__fadeBottom"></div>   
        </header>
    )
}

export default Banner
