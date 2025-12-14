// Default response props
export type ResProps<T = null> = {
  statusCode?: number;
  message?: string[] | string;
  data?: T;
  error?: Error;
};


export interface ServerFetcherInit extends RequestInit {
  tagsToRevalidate?: string[];
}

export type serverFetcherArgs = [
  reqInfo: RequestInfo | URL,
  init?: ServerFetcherInit | undefined
];

export type PaginationProps = {
  totalItem: number;
  totalPage: number;
  pageSize: string;
  pageNumber: string;
}

export type PaginatedResProps<T> = {
  items: T[];
  pagination: PaginationProps;
};

// Paginated fetcher
export type PaginatedQueryProps = {
  page?: number;
  limit?: number;
};


export interface SignInRes {
  firstName: string;
  lastName: string;
  email: string;
  role: string; 
  avatar: string;
  accessToken: string;
  account: Account;
  username: string | null;
  _id: string;
  
}

export type OnboardingStepType =
| 'welcome'
| 'business_info'
| 'profile_details'
| 'business_mode'
| 'completed';

export interface SignInResNew {
user: {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  defaultAccountId: string;
};
account: {
  _id: string;
  name: string;
  slug: string;
  ownerId: string;
  xpBalance: number;
  accountMode: "creator" | "admin" | "member"; // extend if needed
  onboarding: {
    isCompleted: boolean;
    currentStep: OnboardingStepType;
    completedSteps: OnboardingStepType[];
  };
  billing: {
    plan: "free" | "pro" | "enterprise"; // extend if needed
    status: "trial" | "active" | "inactive"; // extend if needed
    currency: string;
    currentPeriodEnd: string;
    isPastDue: boolean;
  };
  usage: Record<string, unknown>;
  stats: {
    totalLeads: number;
    totalCustomers: number;
    totalRevenue: number;
    mrr: number;
  };
  status: "trial" | "active" | "inactive"; // or refine if needed
  createdAt: string;
  updatedAt: string;
};
accessToken: string;
refreshToken: string;
userId?: string;
}

export interface Account {
  status: boolean;
  message: string; 
}

export interface SigninFormSchema {
  email: string;
  password: string;
  ipAddress?: string;
}