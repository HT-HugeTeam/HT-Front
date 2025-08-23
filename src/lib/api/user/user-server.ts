import { type UserOnboardingStatusResponse } from '@/types/api';
import { apiServer } from '../axios-server-config';

export const getOnboardingStatusServer = () => {
  return apiServer<UserOnboardingStatusResponse>({
    url: `/users/onboarding`,
    method: 'GET',
  });
};
