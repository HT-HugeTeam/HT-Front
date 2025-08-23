import { apiClient } from '../../lib/api/axios-client-config';
import { type ApiResponse, type LoginResponse } from '../../types/auth';

export const authService = {
  // 게스트 로그인 추가

  // 로그아웃 추가

  async kakaoLogin(code: string): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient<ApiResponse<LoginResponse>>({
      url: '/auth/kakao-login',
      method: 'POST',
      data: {
        authorizationCode: code,
      },
    });

    return response;
  },
};
