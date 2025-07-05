import { useState } from 'react';
import { useUser } from '../../context/UserContext';

const SettingsSection = () => {
  const { settings, updateSettings } = useUser();
  const [hasChanges, setHasChanges] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  const handleSettingChange = (key, value) => {
    setTempSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    updateSettings(tempSettings);
    setHasChanges(false);
  };

  const handleReset = () => {
    setTempSettings(settings);
    setHasChanges(false);
  };

  const settingsGroups = [
    {
      title: '再生設定',
      icon: '▶️',
      settings: [
        {
          key: 'autoplay',
          label: '自動再生',
          description: '次のエピソードを自動的に再生する',
          type: 'toggle'
        },
        {
          key: 'quality',
          label: '画質設定',
          description: '動画の画質を選択',
          type: 'select',
          options: [
            { value: 'auto', label: '自動' },
            { value: 'low', label: '低画質' },
            { value: 'medium', label: '標準画質' },
            { value: 'high', label: '高画質' },
            { value: 'ultra', label: '最高画質' }
          ]
        },
        {
          key: 'subtitle',
          label: '字幕',
          description: '字幕を表示する',
          type: 'toggle'
        },
        {
          key: 'audioLanguage',
          label: '音声言語',
          description: 'デフォルトの音声言語',
          type: 'select',
          options: [
            { value: 'ja', label: '日本語' },
            { value: 'en', label: '英語' },
            { value: 'ko', label: '韓国語' },
            { value: 'zh', label: '中国語' }
          ]
        }
      ]
    },
    {
      title: '通知設定',
      icon: '🔔',
      settings: [
        {
          key: 'notifications',
          label: '通知を受け取る',
          description: '新しいコンテンツやおすすめの通知',
          type: 'toggle'
        }
      ]
    },
    {
      title: 'コンテンツ設定',
      icon: '🔒',
      settings: [
        {
          key: 'maturity',
          label: '成人向けコンテンツ',
          description: '表示するコンテンツの年齢制限',
          type: 'select',
          options: [
            { value: 'all', label: 'すべて表示' },
            { value: 'teen', label: '13歳以上' },
            { value: 'mature', label: '17歳以上' },
            { value: 'adult', label: '18歳以上のみ' }
          ]
        }
      ]
    }
  ];

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2>設定</h2>
        {hasChanges && (
          <div className="settings-actions">
            <button className="btn-save" onClick={handleSave}>
              変更を保存
            </button>
            <button className="btn-cancel" onClick={handleReset}>
              リセット
            </button>
          </div>
        )}
      </div>

      <div className="settings-groups">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="settings-group">
            <h3 className="group-title">
              <span className="group-icon">{group.icon}</span>
              {group.title}
            </h3>
            
            <div className="settings-list">
              {group.settings.map((setting, settingIndex) => (
                <div key={settingIndex} className="setting-item">
                  <div className="setting-info">
                    <label className="setting-label">{setting.label}</label>
                    <p className="setting-description">{setting.description}</p>
                  </div>
                  
                  <div className="setting-control">
                    {setting.type === 'toggle' && (
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={tempSettings[setting.key]}
                          onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    )}
                    
                    {setting.type === 'select' && (
                      <select
                        value={tempSettings[setting.key]}
                        onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                        className="setting-select"
                      >
                        {setting.options.map((option, optionIndex) => (
                          <option key={optionIndex} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="settings-footer">
        <div className="danger-zone">
          <h3>データ管理</h3>
          <div className="danger-actions">
            <button className="btn-danger" onClick={() => {
              if (window.confirm('視聴履歴をすべて削除しますか？この操作は取り消せません。')) {
                // 履歴削除の処理
                console.log('視聴履歴を削除');
              }
            }}>
              視聴履歴を削除
            </button>
            <button className="btn-danger" onClick={() => {
              if (window.confirm('すべてのデータを削除しますか？この操作は取り消せません。')) {
                // 全データ削除の処理
                localStorage.clear();
                window.location.reload();
              }
            }}>
              すべてのデータを削除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection; 