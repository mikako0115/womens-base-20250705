import { useState, useEffect } from 'react';
import { getTrending } from '../../api/tmdb';
import { useUser } from '../../context/UserContext';

const HeroSection = ({ onMovieClick }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isInMyList, toggleMyList } = useUser();

  useEffect(() => {
    const fetchHeroMovie = async () => {
      try {
        const trendingMovies = await getTrending('movie', 'day');
        // ランダムに1つの映画を選択
        const randomMovie = trendingMovies[Math.floor(Math.random() * trendingMovies.length)];
        setMovie(randomMovie);
      } catch (error) {
        console.error('ヒーロー映画の取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroMovie();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const handleDetailsClick = () => {
    if (movie && onMovieClick) {
      const mediaType = movie.title ? 'movie' : 'tv';
      onMovieClick(movie.id, mediaType);
    }
  };

  const handleMyListClick = () => {
    if (movie) {
      const mediaType = movie.title ? 'movie' : 'tv';
      toggleMyList({ ...movie, mediaType });
    }
  };

  if (loading) {
    return (
      <div className="hero-section" style={{ backgroundColor: 'var(--netflix-black)' }}>
        <div className="hero-content">
          <div>読み込み中...</div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const backgroundImage = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const mediaType = movie.title ? 'movie' : 'tv';
  const isInList = isInMyList(movie.id, mediaType);

  return (
    <div 
      className="hero-section"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">{movie.title || movie.name}</h1>
        <p className="hero-overview">
          {truncateText(movie.overview, 150)}
        </p>
        <div className="hero-buttons">
          <button className="hero-button play-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            再生
          </button>
                      <button className="hero-button info-button" onClick={handleDetailsClick}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              詳細情報
            </button>
            <button 
              className={`hero-button mylist-button ${isInList ? 'in-list' : ''}`}
              onClick={handleMyListClick}
            >
              {isInList ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              )}
              My List
            </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 