export type OnboardingStepKey =
  | 'WELCOME'
  | 'BUSINESS_INFO'
  | 'PROFILE_DETAILS'
  | 'BUSINESS_MODE'
  | 'COMPLETED';

  export type OnboardingStepType =
  | 'welcome'
  | 'business_info'
  | 'profile_details'
  | 'business_mode'
  | 'completed';


  export type OnboardingStepRecord = Record<
  OnboardingStepKey,
  OnboardingStepType
>;
