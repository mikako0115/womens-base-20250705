import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import ProfileSection from './ProfileSection';
import WatchListSection from './WatchListSection';
import HistorySection from './HistorySection';
import SettingsSection from './SettingsSection';

const MyPage = ({ onMovieClick, onBack }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const { profile } = useUser();

  const tabs = [
    { id: 'profile', label: 'プロフィール', icon: '👤' },
    { id: 'watchlist', label: 'ウォッチリスト', icon: '📝' },
    { id: 'history', label: '視聴履歴', icon: '🕒' },
    { id: 'mylist', label: 'My List', icon: '📋' },
    { id: 'settings', label: '設定', icon: '⚙️' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection />;
      case 'watchlist':
        return <WatchListSection onMovieClick={onMovieClick} />;
      case 'history':
        return <HistorySection onMovieClick={onMovieClick} />;
      case 'mylist':
        return <WatchListSection onMovieClick={onMovieClick} showMyList={true} />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="mypage">
      <div className="mypage-header">
        <button className="back-button" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          戻る
        </button>
        <div className="mypage-user-info">
          <img 
            src={profile.avatar} 
            alt={profile.name} 
            className="user-avatar-large"
          />
          <div className="user-details">
            <h1 className="user-name">{profile.name}</h1>
            <p className="user-email">{profile.email}</p>
            <p className="user-join-date">{profile.joinDate}から利用開始</p>
          </div>
        </div>
      </div>

      <div className="mypage-content">
        <nav className="mypage-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="mypage-section">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MyPage; 