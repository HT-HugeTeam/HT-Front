import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../stores/auth-store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

// 기본 axios 인스턴스 생성
const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// 토큰 검사를 하지 않을 경로들
const NO_AUTH_REQUIRED_PATHS = ['/auth/kakao-login'];

instance.interceptors.request.use(
  async config => {
    const requestPath = config.url ?? '';

    // 인증이 필요하지 않은 경로는 토큰 체크 스킵
    const isNoAuthRequired = NO_AUTH_REQUIRED_PATHS.some(path =>
      requestPath.includes(path),
    );

    if (isNoAuthRequired) {
      return config;
    }
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken !== null && accessToken !== undefined) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error as Error),
);

// Response 인터셉터 - 에러 처리
instance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

// Client Axios Instance
export const apiClient = <T>(config: AxiosRequestConfig): Promise<T> => {
  return instance.request(config).then(response => response.data as T);
};

export default instance;
