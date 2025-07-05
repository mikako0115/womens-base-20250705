import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';

const MovieRow = ({ title, fetchUrl, onMovieClick }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isInMyList, toggleMyList } = useUser();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await fetchUrl();
        setMovies(movieData);
      } catch (error) {
        console.error(`${title}の映画取得に失敗しました:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [fetchUrl, title]);

  const handleMovieClick = (movie) => {
    if (onMovieClick) {
      // 映画かTV番組かを判定
      const mediaType = movie.title ? 'movie' : 'tv';
      onMovieClick(movie.id, mediaType);
    }
  };

  const handleMyListClick = (movie, event) => {
    event.stopPropagation();
    const mediaType = movie.title ? 'movie' : 'tv';
    toggleMyList({ ...movie, mediaType });
  };

  if (loading) {
    return (
      <div className="movie-row">
        <h2 className="row-title">{title}</h2>
        <div className="movies-container">
          <div>読み込み中...</div>
        </div>
      </div>
    );
  }

  if (!movies.length) {
    return null;
  }

  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="movies-container">
        <div className="movies-list">
          {movies.map((movie) => {
            const mediaType = movie.title ? 'movie' : 'tv';
            const isInList = isInMyList(movie.id, mediaType);
            
            return (
              <div 
                key={movie.id} 
                className="movie-card"
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  className="movie-poster"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                  }}
                />
                <button 
                  className={`movie-mylist-btn ${isInList ? 'in-list' : ''}`}
                  onClick={(e) => handleMyListClick(movie, e)}
                  title={isInList ? 'My Listから削除' : 'My Listに追加'}
                >
                  {isInList ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  )}
                </button>
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title || movie.name}</h3>
                  <p className="movie-rating">⭐ {movie.vote_average?.toFixed(1)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieRow; 