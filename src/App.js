import { useState, useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

// 63e3ef67

const API_URL = 'http://www.omdbapi.com?apikey=63e3ef67';

// const movie1 = {
//   "Title": "Spiderman",
//   "Year": "2010",
//   "imdbID": "tt1785572",
//   "Type": "movie",
//   "Poster": "N/A"
// }
const App = () => {

  const [movies, setMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {

    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('Superman');
  }, []);


  return (
    <div className="app">
      <h1>MovieFlix</h1>
      <div className="search">
        <input
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </div>

      {
        movies?.length > 0
          ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No Movies Found</h2>
            </div>
          )
      }
    </div>
  );
}

export default App;
