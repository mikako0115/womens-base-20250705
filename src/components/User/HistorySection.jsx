import { useUser } from '../../context/UserContext';

const HistorySection = ({ onMovieClick }) => {
  const { watchHistory } = useUser();

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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const watchDate = new Date(dateString);
    const diffMs = now - watchDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays}日前`;
    } else if (diffHours > 0) {
      return `${diffHours}時間前`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}分前`;
    } else {
      return '今すぐ';
    }
  };

  return (
    <div className="history-section">
      <div className="section-header">
        <h2>視聴履歴 ({watchHistory.length}件)</h2>
        {watchHistory.length > 0 && (
          <div className="history-info">
            <p>最近視聴した作品が表示されます（最大50件）</p>
          </div>
        )}
      </div>

      {watchHistory.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🕒</div>
          <h3>視聴履歴がありません</h3>
          <p>映画やTV番組を視聴すると、ここに履歴が表示されます。</p>
          <p>気になる作品を見つけて、視聴を開始しましょう。</p>
        </div>
      ) : (
        <div className="history-list">
          {watchHistory.map((item, index) => (
            <div 
              key={`${item.id}-${item.mediaType}-${index}`}
              className="history-item"
              onClick={() => handleItemClick(item)}
            >
              <div className="history-poster">
                <img
                  src={
                    item.poster_path 
                      ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                      : 'https://via.placeholder.com/200x300?text=No+Image'
                  }
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
                  }}
                />
                <div className="play-overlay">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>

              <div className="history-info">
                <div className="history-main">
                  <h3 className="history-title">{item.title}</h3>
                  <div className="history-meta">
                    <span className="history-year">
                      {item.release_date?.slice(0, 4)}
                    </span>
                    {item.vote_average > 0 && (
                      <span className="history-rating">
                        ⭐ {item.vote_average.toFixed(1)}
                      </span>
                    )}
                    <span className="history-type">
                      {item.mediaType === 'movie' ? '映画' : 'TV番組'}
                    </span>
                  </div>
                  {item.overview && (
                    <p className="history-overview">
                      {item.overview.length > 150 
                        ? `${item.overview.substring(0, 150)}...` 
                        : item.overview
                      }
                    </p>
                  )}
                </div>
                
                <div className="history-date">
                  <div className="watch-time-ago">
                    {getTimeAgo(item.watchedAt)}
                  </div>
                  <div className="watch-date">
                    {formatDate(item.watchedAt)}
                  </div>
                </div>
              </div>

              <div className="history-actions">
                <button 
                  className="continue-watching-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick(item);
                  }}
                >
                  続きを見る
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistorySection; 