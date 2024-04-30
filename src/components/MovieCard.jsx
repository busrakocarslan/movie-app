import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useMovieContext } from "../context/MovieProvider";

const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const MovieCard = (movie) => {
  const { title, poster_path, overview, vote_average, id } = movie;
  const { currentUser } = useAuthContext(); // vote-average bilgilerini currentuser varsa göstereceğimizden contextten tüketiyoruz burada.
  const { favorites, handleFavorite } = useMovieContext();
  const navigate = useNavigate();
  const isFavorite = (movieId) => {
    return favorites.some((favorite) => favorite.id === movieId);
  };
  const storedLiked=JSON.parse(sessionStorage.getItem(`liked-${id}`))
  const [liked, setLiked] = useState(storedLiked || false);

  console.log(favorites);

  const getVoteClass = (vote) => {
    // vote-average bilgilerine göre değişecek olan styleler  nested ternary karışık olabilir diye if-else
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };
  const toggleLike = () => {  
    const newStoredLiked=!liked  
    setLiked(newStoredLiked);
    sessionStorage.setItem(`liked-${id}`, JSON.stringify(newStoredLiked))
    handleFavorite({
      id,
      title,
      poster_path,
      overview,
      vote_average,
    });
  };

  return (
    <>
      <div className="movie" id="container">
        <div className="flex justify-start gap-5 items-center">
          <img
            onClick={() => navigate("/details/" + id)}
            loading="lazy"
            src={poster_path ? IMG_API + poster_path : defaultImage}
            alt="movie-card"
          />
          <p>
            {" "}
            {currentUser && (
              <FaHeart
                onClick={toggleLike}
                id={id}
                className={`${
                  liked ? "text-red-500" : "text-yellow-500"
                } m-auto text-2xl cursor-pointer`}
              />
            )}
          </p>
        </div>

        <div className="flex align-baseline justify-between p-1 text-white">
          <h5>{title}</h5>
          {currentUser && ( // else olmadığından ternary değil &&  getvoteclass methodunu avarajın puanına göre ekliyor ${string dönecek burası}
            <span className={`tag ${getVoteClass(vote_average)}`}>
              {vote_average.toFixed(1)}
            </span>
          )}
        </div>
        <div className="movie-over">
          <h2>Overview</h2>
          <p>{overview} </p>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
