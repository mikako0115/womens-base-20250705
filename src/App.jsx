import { useState, useEffect } from 'react'
import './App.css'
import { UserProvider } from './context/UserContext'
import Header from './components/Layout/Header'
import HeroSection from './components/Movie/HeroSection'
import MovieRow from './components/Movie/MovieRow'
import MovieDetails from './components/Movie/MovieDetails'
import VideoPlayer from './components/Movie/VideoPlayer'
import CategoryFilter from './components/Movie/CategoryFilter'
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
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleMovieClick = (movieId, mediaType) => {
    setSelectedMovie(movieId);
    setSelectedMediaType(mediaType);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const handlePlayVideo = () => {
    setShowVideoPlayer(true);
  };

  const handleCloseVideo = () => {
    setShowVideoPlayer(false);
  };

  const handleMyPageClick = () => {
    setShowMyPage(true);
  };

  const handleBackToHome = () => {
    setShowMyPage(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(query.trim().length > 0);
    // 実際の検索ロジックはここに実装
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsSearching(false);
    setSearchQuery('');
  };

  return (
    <UserProvider>
      <div className="app">
        <Header 
          onMyPageClick={handleMyPageClick}
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
        />
        
        {showMyPage ? (
          <MyPage 
            onMovieClick={handleMovieClick}
            onBack={handleBackToHome}
          />
        ) : (
          <main className="main-content">
            <HeroSection onMovieClick={handleMovieClick} />
            
            {/* カテゴリフィルター */}
            <CategoryFilter 
              onCategoryChange={handleCategoryChange}
              selectedCategory={selectedCategory}
            />
            
            {/* 検索結果表示 */}
            {isSearching && (
              <div className="search-results">
                <h2>「{searchQuery}」の検索結果</h2>
                <MovieRow 
                  title="検索結果" 
                  fetchUrl={() => getTrending('all', 'day')} // 実際の検索APIに置き換え
                  onMovieClick={handleMovieClick}
                />
              </div>
            )}
            
            {/* 通常のコンテンツ表示 */}
            {!isSearching && (
              <div className="movie-rows">
                {selectedCategory === 'all' && (
                  <>
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
                  </>
                )}
                
                {selectedCategory === 'movies' && (
                  <>
                    <MovieRow 
                      title="人気の映画" 
                      fetchUrl={getPopularMovies} 
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
                      title="現在上映中" 
                      fetchUrl={getNowPlayingMovies} 
                      onMovieClick={handleMovieClick}
                    />
                  </>
                )}
                
                {selectedCategory === 'tv' && (
                  <>
                    <MovieRow 
                      title="人気のTV番組" 
                      fetchUrl={getPopularTV} 
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
                  </>
                )}
                
                {selectedCategory === 'trending' && (
                  <>
                    <MovieRow 
                      title="今日のトレンド" 
                      fetchUrl={() => getTrending('all', 'day')} 
                      onMovieClick={handleMovieClick}
                    />
                    <MovieRow 
                      title="今週のトレンド" 
                      fetchUrl={() => getTrending('all', 'week')} 
                      onMovieClick={handleMovieClick}
                    />
                  </>
                )}
              </div>
            )}
          </main>
        )}

        {/* 映画詳細モーダル */}
        {selectedMovie && (
          <MovieDetails
            movieId={selectedMovie}
            mediaType={selectedMediaType}
            onClose={handleCloseDetails}
            onMovieClick={handleMovieClick}
            onPlayVideo={handlePlayVideo}
          />
        )}

        {/* 動画プレイヤー */}
        {showVideoPlayer && (
          <VideoPlayer
            videoUrl="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
            posterUrl="https://via.placeholder.com/1280x720/000000/FFFFFF?text=Netflix+Clone"
            title="サンプル動画"
            onClose={handleCloseVideo}
          />
        )}
      </div>
    </UserProvider>
  )
}

export default App
