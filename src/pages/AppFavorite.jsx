import React from 'react'
import { useMovieContext } from '../context/MovieProvider'
import { useParams } from 'react-router-dom'


const AppFavorite = () => {
  const { id } = useParams()

    const {favorites}=useMovieContext()
    const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

    // const favoriteMovies= movies.filter(movie=>favorites.some(favorite=>favorite.id===movie.id))
    // console.log(favoriteMovies)
    return (
      <div className='w-[9vvw] pe-10 p-5'>
        {favorites?.length ? (
          <div className='favorites flex flex-wrap gap-5'>
            {favorites.map((movie) => (
              <div key={movie.id} className='border-2 rounded-md max-w-[250px] overflow-hidden text-white'>
                <img src={movie.poster_path ? baseImageUrl +movie.poster_path : defaultImage} alt={movie.title} />
                
               <span>{movie.vote_average.toFixed(1)}</span>
                
              </div>
            ))}
          </div>
        ) : (
          <div className='favorite_warning dark:text-red-500'> There is no favorite movie.</div>
        )}
      </div>
    );
}

export default AppFavorite
