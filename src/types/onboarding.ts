// 사용자 타입
export type UserType = 'owner' | 'customer';

// 온보딩 데이터 인터페이스
export interface OnboardingData {
  userType: UserType;
  nickname: string;
  agreements: {
    terms: boolean; // 쇼츠테이블 이용약관 (필수)
    privacy: boolean; // 개인정보 수집 및 이용동의 (필수)
    location: boolean; // 위치기반 서비스 이용동의 (선택)
  };
}

// 온보딩 단계
export type OnboardingStep = 'user-type' | 'nickname' | 'agreements';

// 각 단계 컴포넌트 Props
export interface StepProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack?: () => void;
  currentData?: Partial<OnboardingData>;
}

// 사용자 타입별 정보
export const USER_TYPE_INFO = {
  owner: {
    title: '사장님',
  },
  customer: {
    title: '고객님',
  },
} as const;

// 약관 정보
export const AGREEMENT_INFO = {
  terms: {
    title: '쇼츠테이블 서비스 이용약관',
    required: true,
    description: '서비스 이용을 위해 이용약관에 동의해주세요.',
  },
  privacy: {
    title: '개인정보 수집 및 이용동의',
    required: true,
    description: '서비스 이용을 위해 개인정보 수집·이용에 동의해주세요.',
  },
  location: {
    title: '위치기반 서비스 이용동의',
    required: false,
    description: '위치 정보를 활용한 맞춤 서비스 제공에 동의하시나요?',
  },
} as const;

// 유효성 검사 함수들
export const validators = {
  nickname: (value: string): boolean => {
    const trimmed = value.trim();
    const isLengthValid = trimmed.length >= 2 && trimmed.length <= 10;
    const isFormatValid = /^[가-힣a-zA-Z0-9_]+$/.test(trimmed);
    return isLengthValid && isFormatValid;
  },

  requiredAgreements: (agreements: OnboardingData['agreements']): boolean => {
    return agreements.terms && agreements.privacy;
  },
};

// 단계별 완료 조건 검사
export const isStepComplete = (
  step: OnboardingStep,
  data: Partial<OnboardingData>,
): boolean => {
  switch (step) {
    case 'user-type':
      return !!data.userType;

    case 'nickname':
      return !!(data.nickname && validators.nickname(data.nickname));

    case 'agreements':
      return !!(
        data.agreements && validators.requiredAgreements(data.agreements)
      );

    default:
      return false;
  }
};
