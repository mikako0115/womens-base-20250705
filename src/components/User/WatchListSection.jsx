import { useUser } from '../../context/UserContext';

const WatchListSection = ({ onMovieClick, showMyList = false }) => {
  const { 
    watchList, 
    removeFromWatchList, 
    myList, 
    removeFromMyList 
  } = useUser();

  const items = showMyList ? myList : watchList;
  const title = showMyList ? 'My List' : 'ウォッチリスト';
  const emptyMessage = showMyList 
    ? 'My Listに追加した作品がありません。' 
    : 'ウォッチリストに追加した作品がありません。';

  const handleRemove = (itemId, mediaType, event) => {
    event.stopPropagation();
    if (showMyList) {
      removeFromMyList(itemId, mediaType);
    } else {
      removeFromWatchList(itemId, mediaType);
    }
  };

  const handleItemClick = (item) => {
    if (onMovieClick) {
      onMovieClick(item.id, item.mediaType);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="watchlist-section">
      <div className="section-header">
        <h2>{title} ({items.length}件)</h2>
        {items.length > 0 && (
          <div className="sort-options">
            <label>並び順:</label>
            <select className="sort-select">
              <option value="newest">追加日時（新しい順）</option>
              <option value="oldest">追加日時（古い順）</option>
              <option value="rating">評価順</option>
              <option value="title">タイトル順</option>
            </select>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            {showMyList ? '📋' : '📝'}
          </div>
          <h3>まだ何もありません</h3>
          <p>{emptyMessage}</p>
          <p>映画やTV番組を見つけて追加してみましょう。</p>
        </div>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div 
              key={`${item.id}-${item.mediaType}`}
              className="item-card"
              onClick={() => handleItemClick(item)}
            >
              <div className="item-poster-container">
                <img
                  src={
                    item.poster_path 
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Image'
                  }
                  alt={item.title}
                  className="item-poster"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                  }}
                />
                <button 
                  className="remove-item-btn"
                  onClick={(e) => handleRemove(item.id, item.mediaType, e)}
                  title={showMyList ? 'My Listから削除' : 'ウォッチリストから削除'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
                <div className="item-overlay">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="play-icon">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              
              <div className="item-info">
                <h3 className="item-title">{item.title}</h3>
                <div className="item-meta">
                  <span className="item-year">
                    {item.release_date?.slice(0, 4)}
                  </span>
                  {item.vote_average > 0 && (
                    <span className="item-rating">
                      ⭐ {item.vote_average.toFixed(1)}
                    </span>
                  )}
                  <span className="item-type">
                    {item.mediaType === 'movie' ? '映画' : 'TV番組'}
                  </span>
                </div>
                <div className="item-added-date">
                  追加日: {formatDate(item.addedAt)}
                </div>
                {item.overview && (
                  <p className="item-overview">
                    {item.overview.length > 120 
                      ? `${item.overview.substring(0, 120)}...` 
                      : item.overview
                    }
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchListSection; 