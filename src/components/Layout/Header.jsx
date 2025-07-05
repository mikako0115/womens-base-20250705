import { useState, useEffect } from 'react';
import SearchBar from '../Movie/SearchBar';

const Header = ({ onMyPageClick, onSearch, onCategoryChange, selectedCategory }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  const handleSearch = (query) => {
    onSearch(query);
  };

  return (
    <header className={`netflix-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="header-left">
          <a href="/" className="netflix-logo">
            NETFLIX
          </a>
          {!showSearch && (
            <nav>
              <ul className="nav-links">
                <li><a href="/">ホーム</a></li>
                <li><a href="/tv">TV番組</a></li>
                <li><a href="/movies">映画</a></li>
                <li><a href="/popular">人気</a></li>
                <li><a href="/trending">トレンド</a></li>
              </ul>
            </nav>
          )}
        </div>
        
        <div className="header-center">
          {showSearch && (
            <SearchBar onSearch={handleSearch} />
          )}
        </div>
        
        <div className="header-right">
          <button 
            className={`search-toggle ${showSearch ? 'active' : ''}`}
            onClick={handleSearchToggle}
            aria-label="検索"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
          <div className="profile-menu" onClick={onMyPageClick}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
              alt="プロフィール" 
              className="profile-avatar"
            />
            <span className="profile-tooltip">マイページ</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 