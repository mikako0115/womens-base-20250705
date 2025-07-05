import { useState, useEffect } from 'react';
import { 
  getMovieDetails, 
  getTVDetails, 
  getMovieCredits, 
  getTVCredits,
  getMovieRecommendations,
  getTVRecommendations
  } from '../../api/tmdb';
import { useUser } from '../../context/UserContext';
import MovieRow from './MovieRow';

const MovieDetails = ({ movieId, mediaType = 'movie', onClose, onMovieClick, onPlayVideo }) => {
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isInMyList, toggleMyList, addToWatchHistory } = useUser();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        
        // 詳細情報とキャスト情報を並行取得
        const [detailsData, creditsData] = await Promise.all([
          mediaType === 'movie' ? getMovieDetails(movieId) : getTVDetails(movieId),
          mediaType === 'movie' ? getMovieCredits(movieId) : getTVCredits(movieId)
        ]);

        setDetails(detailsData);
        setCredits(creditsData);

        // 推薦作品を取得
        const recommendationsData = mediaType === 'movie' 
          ? await getMovieRecommendations(movieId)
          : await getTVRecommendations(movieId);
        
        setRecommendations(recommendationsData);
      } catch (error) {
        console.error('映画詳細の取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId, mediaType]);

  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}時間${minutes}分`;
  };

  const formatGenres = (genres) => {
    return genres?.map(genre => genre.name).join('、') || '';
  };

  const handleMyListClick = () => {
    if (details) {
      toggleMyList({ ...details, mediaType });
    }
  };

  const handlePlayClick = () => {
    if (details) {
      // 視聴履歴に追加
      addToWatchHistory({ ...details, mediaType });
      // 動画プレイヤーを開く
      if (onPlayVideo) {
        onPlayVideo();
      }
    }
  };

  if (loading) {
    return (
      <div className="movie-details-modal">
        <div className="details-loading">
          <div>読み込み中...</div>
        </div>
      </div>
    );
  }

  if (!details) {
    return null;
  }

  const backdropImage = details.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
    : null;

  const posterImage = details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  const title = details.title || details.name;
  const releaseYear = details.release_date?.slice(0, 4) || details.first_air_date?.slice(0, 4);
  const runtime = details.runtime || details.episode_run_time?.[0];
  const isInList = isInMyList(details.id, mediaType);

  return (
    <div className="movie-details-modal" onClick={onClose}>
      <div className="movie-details-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        {/* ヒーローセクション */}
        <div 
          className="details-hero"
          style={{
            backgroundImage: backdropImage ? `url(${backdropImage})` : 'none',
            backgroundColor: backdropImage ? 'transparent' : 'var(--netflix-dark-gray)'
          }}
        >
          <div className="details-hero-overlay"></div>
          <div className="details-hero-content">
            <div className="details-poster">
              <img src={posterImage} alt={title} />
            </div>
            <div className="details-info">
              <h1 className="details-title">{title}</h1>
              
              <div className="details-meta">
                <span className="details-year">{releaseYear}</span>
                {details.vote_average > 0 && (
                  <span className="details-rating">
                    ⭐ {details.vote_average.toFixed(1)}
                  </span>
                )}
                {runtime && (
                  <span className="details-runtime">{formatRuntime(runtime)}</span>
                )}
                <span className="details-type">
                  {mediaType === 'movie' ? '映画' : 'TV番組'}
                </span>
              </div>

              {details.genres?.length > 0 && (
                <div className="details-genres">
                  {formatGenres(details.genres)}
                </div>
              )}

              <div className="details-actions">
                <button className="action-button play-button" onClick={handlePlayClick}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  再生
                </button>
                <button 
                  className={`action-button mylist-button ${isInList ? 'in-list' : ''}`}
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
                <button className="action-button secondary-button">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/>
                  </svg>
                  後で見る
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 詳細情報 */}
        <div className="details-body">
          {details.overview && (
            <div className="details-overview">
              <h3>概要</h3>
              <p>{details.overview}</p>
            </div>
          )}

          {/* キャスト */}
          {credits?.cast?.length > 0 && (
            <div className="details-cast">
              <h3>キャスト</h3>
              <div className="cast-list">
                {credits.cast.slice(0, 10).map((actor) => (
                  <div key={actor.id} className="cast-member">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : 'https://via.placeholder.com/185x278?text=No+Image'
                      }
                      alt={actor.name}
                      className="cast-photo"
                    />
                    <div className="cast-info">
                      <div className="cast-name">{actor.name}</div>
                      <div className="cast-character">{actor.character}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 推薦作品 */}
          {recommendations.length > 0 && (
            <div className="details-recommendations">
              <MovieRow 
                title="類似作品" 
                fetchUrl={() => Promise.resolve(recommendations)} 
                onMovieClick={onMovieClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 