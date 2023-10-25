import React, { useEffect, useState } from 'react';

export default function MovieRecommendations() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const apiKey = '307f41ff9baf86695b6283a584047609';
  const genreId = 28;

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json.results);
        setFilteredData(json.results);
      });
  }, [apiKey, genreId]);

  useEffect(() => {
    const filteredMovies = data.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredMovies);
  }, [searchQuery, data]);

  return (
    <div className="movie-recommendations">
      <h1>Movie Recommendations</h1>
      <input
        type="search"
        className="Search"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="movie-list">
        {filteredData.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
