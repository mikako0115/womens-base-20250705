import { useState } from 'react';
import { useUser } from '../../context/UserContext';

const ProfileSection = () => {
  const { profile, updateProfile, myList, watchList, watchHistory, ratings } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
    language: profile.language,
    region: profile.region
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({
      name: profile.name,
      email: profile.email,
      language: profile.language,
      region: profile.region
    });
  };

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: profile.name,
      email: profile.email,
      language: profile.language,
      region: profile.region
    });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const stats = [
    { label: 'My List', count: myList.length, icon: '📋' },
    { label: 'ウォッチリスト', count: watchList.length, icon: '📝' },
    { label: '視聴済み', count: watchHistory.length, icon: '🎬' },
    { label: '評価済み', count: ratings.length, icon: '⭐' }
  ];

  return (
    <div className="profile-section">
      <div className="profile-main">
        <div className="profile-avatar-section">
          <div className="avatar-container">
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="profile-avatar"
            />
            <button className="change-avatar-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="profile-info">
          {isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <label>名前</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>メールアドレス</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>言語設定</label>
                <select
                  value={editForm.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className="form-select"
                >
                  <option value="ja-JP">日本語</option>
                  <option value="en-US">English</option>
                  <option value="ko-KR">한국어</option>
                  <option value="zh-CN">中文</option>
                </select>
              </div>
              <div className="form-group">
                <label>地域設定</label>
                <select
                  value={editForm.region}
                  onChange={(e) => handleInputChange('region', e.target.value)}
                  className="form-select"
                >
                  <option value="JP">日本</option>
                  <option value="US">アメリカ</option>
                  <option value="KR">韓国</option>
                  <option value="CN">中国</option>
                </select>
              </div>
              <div className="form-actions">
                <button className="btn-save" onClick={handleSave}>
                  保存
                </button>
                <button className="btn-cancel" onClick={handleCancel}>
                  キャンセル
                </button>
              </div>
            </div>
          ) : (
            <div className="view-mode">
              <div className="profile-field">
                <label>名前</label>
                <span>{profile.name}</span>
              </div>
              <div className="profile-field">
                <label>メールアドレス</label>
                <span>{profile.email}</span>
              </div>
              <div className="profile-field">
                <label>利用開始日</label>
                <span>{profile.joinDate}</span>
              </div>
              <div className="profile-field">
                <label>言語設定</label>
                <span>
                  {profile.language === 'ja-JP' && '日本語'}
                  {profile.language === 'en-US' && 'English'}
                  {profile.language === 'ko-KR' && '한국어'}
                  {profile.language === 'zh-CN' && '中文'}
                </span>
              </div>
              <div className="profile-field">
                <label>地域設定</label>
                <span>
                  {profile.region === 'JP' && '日本'}
                  {profile.region === 'US' && 'アメリカ'}
                  {profile.region === 'KR' && '韓国'}
                  {profile.region === 'CN' && '中国'}
                </span>
              </div>
              <button className="btn-edit" onClick={handleEdit}>
                プロフィール編集
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="profile-stats">
        <h3>アクティビティ</h3>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <div className="stat-count">{stat.count}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection; 