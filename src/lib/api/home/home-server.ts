import type { HomeResponse } from '../../../types/api';

import { apiServer } from '../axios-server-config';

/**
 * 인증된 사용자의 홈 화면 데이터를 조회합니다
 * @summary 홈 화면 데이터 조회
 */
export const getHomeDataServer = () => {
  return apiServer<HomeResponse>({ url: `/home`, method: 'GET' });
};
export type GetHomeDataResult = NonNullable<
  Awaited<ReturnType<typeof getHomeDataServer>>
>;
