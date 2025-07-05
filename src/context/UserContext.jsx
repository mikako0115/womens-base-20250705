import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  // ユーザープロフィール
  const [profile, setProfile] = useState({
    name: 'AI駆動開発勉強会 women\'s bese',
    email: 'womens-base@example.com',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
    joinDate: '2025年7月5日',
    language: 'ja-JP',
    region: 'JP'
  });

  // ウォッチリスト（後で見る）
  const [watchList, setWatchList] = useState([]);

  // 視聴履歴
  const [watchHistory, setWatchHistory] = useState([]);

  // My List
  const [myList, setMyList] = useState([]);

  // 評価履歴
  const [ratings, setRatings] = useState([]);

  // 設定
  const [settings, setSettings] = useState({
    autoplay: true,
    quality: 'auto',
    notifications: true,
    maturity: 'all',
    subtitle: true,
    audioLanguage: 'ja'
  });

  // ローカルストレージからデータを読み込み
  useEffect(() => {
    const savedProfile = localStorage.getItem('netflix-profile');
    const savedWatchList = localStorage.getItem('netflix-watchlist');
    const savedWatchHistory = localStorage.getItem('netflix-history');
    const savedMyList = localStorage.getItem('netflix-mylist');
    const savedRatings = localStorage.getItem('netflix-ratings');
    const savedSettings = localStorage.getItem('netflix-settings');

    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error('プロフィールデータの読み込みに失敗しました:', error);
      }
    }

    if (savedWatchList) {
      try {
        setWatchList(JSON.parse(savedWatchList));
      } catch (error) {
        console.error('ウォッチリストデータの読み込みに失敗しました:', error);
      }
    }

    if (savedWatchHistory) {
      try {
        setWatchHistory(JSON.parse(savedWatchHistory));
      } catch (error) {
        console.error('視聴履歴データの読み込みに失敗しました:', error);
      }
    }

    if (savedMyList) {
      try {
        setMyList(JSON.parse(savedMyList));
      } catch (error) {
        console.error('My Listデータの読み込みに失敗しました:', error);
      }
    }

    if (savedRatings) {
      try {
        setRatings(JSON.parse(savedRatings));
      } catch (error) {
        console.error('評価データの読み込みに失敗しました:', error);
      }
    }

    if (savedSettings) {
      try {
        setSettings(prev => ({ ...prev, ...JSON.parse(savedSettings) }));
      } catch (error) {
        console.error('設定データの読み込みに失敗しました:', error);
      }
    }
  }, []);

  // データが変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('netflix-profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('netflix-watchlist', JSON.stringify(watchList));
  }, [watchList]);

  useEffect(() => {
    localStorage.setItem('netflix-history', JSON.stringify(watchHistory));
  }, [watchHistory]);

  useEffect(() => {
    localStorage.setItem('netflix-mylist', JSON.stringify(myList));
  }, [myList]);

  useEffect(() => {
    localStorage.setItem('netflix-ratings', JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    localStorage.setItem('netflix-settings', JSON.stringify(settings));
  }, [settings]);

  // プロフィール更新
  const updateProfile = (newProfile) => {
    setProfile(prev => ({ ...prev, ...newProfile }));
  };

  // ウォッチリスト管理
  const addToWatchList = (movie) => {
    setWatchList(prev => {
      const exists = prev.find(item => item.id === movie.id && item.mediaType === movie.mediaType);
      if (!exists) {
        return [...prev, {
          id: movie.id,
          title: movie.title || movie.name,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          overview: movie.overview,
          vote_average: movie.vote_average,
          release_date: movie.release_date || movie.first_air_date,
          mediaType: movie.mediaType || (movie.title ? 'movie' : 'tv'),
          addedAt: new Date().toISOString()
        }];
      }
      return prev;
    });
  };

  const removeFromWatchList = (movieId, mediaType) => {
    setWatchList(prev => 
      prev.filter(item => !(item.id === movieId && item.mediaType === mediaType))
    );
  };

  const isInWatchList = (movieId, mediaType) => {
    return watchList.some(item => item.id === movieId && item.mediaType === mediaType);
  };

  // 視聴履歴管理
  const addToWatchHistory = (movie) => {
    setWatchHistory(prev => {
      // 既存のアイテムを削除してから最前面に追加
      const filtered = prev.filter(item => !(item.id === movie.id && item.mediaType === movie.mediaType));
      return [{
        id: movie.id,
        title: movie.title || movie.name,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        overview: movie.overview,
        vote_average: movie.vote_average,
        release_date: movie.release_date || movie.first_air_date,
        mediaType: movie.mediaType || (movie.title ? 'movie' : 'tv'),
        watchedAt: new Date().toISOString()
      }, ...filtered].slice(0, 50); // 最大50件まで
    });
  };

  // My List管理
  const addToMyList = (movie) => {
    setMyList(prev => {
      const exists = prev.find(item => item.id === movie.id && item.mediaType === movie.mediaType);
      if (!exists) {
        return [...prev, {
          id: movie.id,
          title: movie.title || movie.name,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          overview: movie.overview,
          vote_average: movie.vote_average,
          release_date: movie.release_date || movie.first_air_date,
          mediaType: movie.mediaType || (movie.title ? 'movie' : 'tv'),
          addedAt: new Date().toISOString()
        }];
      }
      return prev;
    });
  };

  const removeFromMyList = (movieId, mediaType) => {
    setMyList(prev => 
      prev.filter(item => !(item.id === movieId && item.mediaType === mediaType))
    );
  };

  const isInMyList = (movieId, mediaType) => {
    return myList.some(item => item.id === movieId && item.mediaType === mediaType);
  };

  const toggleMyList = (movie) => {
    const mediaType = movie.mediaType || (movie.title ? 'movie' : 'tv');
    if (isInMyList(movie.id, mediaType)) {
      removeFromMyList(movie.id, mediaType);
    } else {
      addToMyList({ ...movie, mediaType });
    }
  };

  // 評価管理
  const addRating = (movieId, mediaType, rating, title) => {
    setRatings(prev => {
      const filtered = prev.filter(item => !(item.id === movieId && item.mediaType === mediaType));
      return [...filtered, {
        id: movieId,
        mediaType,
        rating,
        title,
        ratedAt: new Date().toISOString()
      }];
    });
  };

  const getRating = (movieId, mediaType) => {
    const rating = ratings.find(item => item.id === movieId && item.mediaType === mediaType);
    return rating ? rating.rating : 0;
  };

  // 設定更新
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const value = {
    profile,
    updateProfile,
    watchList,
    addToWatchList,
    removeFromWatchList,
    isInWatchList,
    watchHistory,
    addToWatchHistory,
    myList,
    addToMyList,
    removeFromMyList,
    isInMyList,
    toggleMyList,
    ratings,
    addRating,
    getRating,
    settings,
    updateSettings
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 