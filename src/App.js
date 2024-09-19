import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import './App.css';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Load movies from localStorage on first render
  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('movies'));
    if (savedMovies) {
      setMovies(savedMovies);
      setFilteredMovies(savedMovies);
    }
  }, []);

  // Save movies to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
    setFilteredMovies([...movies, newMovie]);
  };

  const filterMovies = ({ title, rating }) => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase()) &&
      (!rating || movie.rating >= rating)
    );
    setFilteredMovies(filtered);
  };

  return (
    <div className="App">
      <h1>Movie App</h1>
      <Filter onFilter={filterMovies} />
      <MovieList movies={filteredMovies} />
      <button onClick={() => addMovie({
        title: "New Movie",
        description: "This is a new movie",
        posterURL: "https://via.placeholder.com/150",
        rating: 5
      })}>Add Movie</button>
    </div>
  );
};

export default App;