export interface UserOnboardingData {
  nickname: string;
  role: 'USER';
  termsOfServiceAccepted: boolean;
  privacyPolicyAccepted: boolean;
  locationServiceAccepted: boolean;
}
