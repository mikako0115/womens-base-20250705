import { useState } from 'react'
import './App.css'
import { UserProvider } from './context/UserContext'
import Header from './components/Layout/Header'
import HeroSection from './components/Movie/HeroSection'
import MovieRow from './components/Movie/MovieRow'
import MovieDetails from './components/Movie/MovieDetails'
import MyPage from './components/User/MyPage'
import { 
  getTrending, 
  getPopularMovies, 
  getPopularTV, 
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getTopRatedTV,
  getOnTheAirTV
} from './api/tmdb'

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMediaType, setSelectedMediaType] = useState('movie');
  const [showMyPage, setShowMyPage] = useState(false);

  const handleMovieClick = (movieId, mediaType) => {
    setSelectedMovie(movieId);
    setSelectedMediaType(mediaType);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const handleMyPageClick = () => {
    setShowMyPage(true);
  };

  const handleBackToHome = () => {
    setShowMyPage(false);
  };

  return (
    <UserProvider>
      <div className="app">
        <Header onMyPageClick={handleMyPageClick} />
        
        {showMyPage ? (
          <MyPage 
            onMovieClick={handleMovieClick}
            onBack={handleBackToHome}
          />
        ) : (
          <main className="main-content">
            <HeroSection onMovieClick={handleMovieClick} />
            <div className="movie-rows">
              <MovieRow 
                title="今日のトレンド" 
                fetchUrl={() => getTrending('all', 'day')} 
                onMovieClick={handleMovieClick}
              />
              <MovieRow 
                title="人気の映画" 
                fetchUrl={getPopularMovies} 
                onMovieClick={handleMovieClick}
              />
              <MovieRow 
                title="人気のTV番組" 
                fetchUrl={getPopularTV} 
                onMovieClick={handleMovieClick}
              />
              <MovieRow 
                title="現在上映中" 
                fetchUrl={getNowPlayingMovies} 
                onMovieClick={handleMovieClick}
              />
              <MovieRow 
                title="高評価の映画" 
                fetchUrl={getTopRatedMovies} 
                onMovieClick={handleMovieClick}
              />
              <MovieRow 
                title="最新映画" 
                fetchUrl={getUpcomingMovies} 
                onMovieClick={handleMovieClick}
              />
              <MovieRow 
                title="高評価のTV番組" 
                fetchUrl={getTopRatedTV} 
                onMovieClick={handleMovieClick}
              />
              <MovieRow 
                title="放送中のTV番組" 
                fetchUrl={getOnTheAirTV} 
                onMovieClick={handleMovieClick}
              />
              <MovieRow 
                title="今週のトレンド" 
                fetchUrl={() => getTrending('all', 'week')} 
                onMovieClick={handleMovieClick}
              />
            </div>
          </main>
        )}

        {/* 映画詳細モーダル */}
        {selectedMovie && (
          <MovieDetails
            movieId={selectedMovie}
            mediaType={selectedMediaType}
            onClose={handleCloseDetails}
            onMovieClick={handleMovieClick}
          />
        )}
      </div>
    </UserProvider>
  )
}

export default App
