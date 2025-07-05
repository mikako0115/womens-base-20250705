import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// トレンド（all, movie, tv, person）
export const getTrending = async (mediaType = 'all', timeWindow = 'day') => {
  // mediaType: 'all' | 'movie' | 'tv' | 'person'
  // timeWindow: 'day' | 'week'
  const response = await axios.get(`${BASE_URL}/trending/${mediaType}/${timeWindow}`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP'
    }
  });
  return response.data.results;
};

// 人気映画一覧
export const getPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      page: 1
    }
  });
  return response.data.results;
};

// 人気TVシリーズ一覧
export const getPopularTV = async () => {
  const response = await axios.get(`${BASE_URL}/tv/popular`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      page: 1
    }
  });
  return response.data.results;
};

// 最高評価の映画
export const getTopRatedMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      page: 1
    }
  });
  return response.data.results;
};

// 最新映画
export const getUpcomingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      page: 1
    }
  });
  return response.data.results;
};

// 現在上映中の映画
export const getNowPlayingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      page: 1
    }
  });
  return response.data.results;
};

// 最高評価のTV番組
export const getTopRatedTV = async () => {
  const response = await axios.get(`${BASE_URL}/tv/top_rated`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      page: 1
    }
  });
  return response.data.results;
};

// 放送中のTV番組
export const getOnTheAirTV = async () => {
  const response = await axios.get(`${BASE_URL}/tv/on_the_air`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      page: 1
    }
  });
  return response.data.results;
};

// 映画詳細を取得
export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP'
    }
  });
  return response.data;
};

// TV番組詳細を取得
export const getTVDetails = async (tvId) => {
  const response = await axios.get(`${BASE_URL}/tv/${tvId}`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP'
    }
  });
  return response.data;
};

// 映画のキャスト情報を取得
export const getMovieCredits = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP'
    }
  });
  return response.data;
};

// TV番組のキャスト情報を取得
export const getTVCredits = async (tvId) => {
  const response = await axios.get(`${BASE_URL}/tv/${tvId}/credits`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP'
    }
  });
  return response.data;
};

// 映画の推薦作品を取得
export const getMovieRecommendations = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/recommendations`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      page: 1
    }
  });
  return response.data.results;
};

// TV番組の推薦作品を取得
export const getTVRecommendations = async (tvId) => {
  const response = await axios.get(`${BASE_URL}/tv/${tvId}/recommendations`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      page: 1
    }
  });
  return response.data.results;
};

// 類似映画を取得
export const getSimilarMovies = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/similar`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      page: 1
    }
  });
  return response.data.results;
};

// 類似TV番組を取得
export const getSimilarTV = async (tvId) => {
  const response = await axios.get(`${BASE_URL}/tv/${tvId}/similar`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      page: 1
    }
  });
  return response.data.results;
};
