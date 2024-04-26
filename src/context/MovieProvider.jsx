import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const MovieContext = createContext();//1.aşama

export const useMovieContext = () => {//3. aşama
  return useContext(MovieContext);
};

const API_KEY = process.env.REACT_APP_TMDB_KEY;// api key env dosyasından
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;// movie dataları için api key

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);// boş hali gelen data array olduğundan boş data
  const [loading, setLoading] = useState(false);// moviler gelene kadar verilecek olan loodingin state i

  const getMovies = (URL) => {// get işlemini yaptığım asenkron kod// url 'i dinamik hale getirdik search işleminden sonra 
    setLoading(true);// looding en başta true
    axios
      .get(URL)
      .then((res) => setMovies(res.data.results))// daatamız res. datanın içinde result ta
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));// looding false en sonda 
  };

  useEffect(() => {// asenkron kodumuzu tetiklemek için oluşturduk.
    getMovies(FEATURED_API);
  }, []);

  //   console.log(movies);
  return (
    <MovieContext.Provider value={{ movies, loading, getMovies }}>
      {children}
    </MovieContext.Provider>//2. aşama
  );
};

export default MovieProvider;
