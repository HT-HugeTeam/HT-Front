import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// Request 인터셉터 - 토큰 자동 추가
apiClient.interceptors.request.use(
  config => {
    // 로직 추가 예정 -> header에다가 token 아마 ?
    return config;
  },
  error => Promise.reject(error as Error),
);

// Response 인터셉터 - 에러 처리
apiClient.interceptors.response.use(
  response => response,
  error => {
    // if (error.response?.status === 401) {
    //   // 토큰 만료 시 처리
    //   Cookies.remove('accessToken');
    //   window.location.href = '/login';
    // }
    return Promise.reject(error as Error);
  },
);
