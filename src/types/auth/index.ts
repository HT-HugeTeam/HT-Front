export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}
