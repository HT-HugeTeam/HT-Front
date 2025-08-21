import { apiClient } from '../api/config';
import { ApiResponse, LoginResponse } from '../api/types';

export const authService = {
  // ... 기존 코드

  async kakaoLogin(code: string): Promise<LoginResponse> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      { code },
    );

    // 토큰 저장

    return response.data.data;
  },
};
