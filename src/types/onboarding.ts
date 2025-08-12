// 사용자 타입
export type UserType = 'owner' | 'customer';

// 온보딩 데이터 인터페이스
export interface OnboardingData {
  userType: UserType;
  nickname: string;
  agreements: {
    privacy: boolean; // 개인정보 처리방침 (필수)
    terms: boolean; // 서비스 이용약관 (필수)
    marketing: boolean; // 마케팅 수신 동의 (선택)
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
  privacy: {
    title: '개인정보 처리방침',
    required: true,
    description: '서비스 이용을 위해 개인정보 수집·이용에 동의해주세요.',
  },
  terms: {
    title: '서비스 이용약관',
    required: true,
    description: '서비스 이용 규정에 동의해주세요.',
  },
  marketing: {
    title: '마케팅 수신 동의',
    required: false,
    description: '이벤트, 혜택 정보 수신에 동의하시나요? (선택)',
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
    return agreements.privacy && agreements.terms;
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
