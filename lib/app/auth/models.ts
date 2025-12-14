import { StaticImageData } from "next/image";

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  avatar: StaticImageData;
  quote: string;
};



export interface SignUpRes {
    user: {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
      defaultAccountId: string;
    };
    account: {
      name: string;
      slug: string;
      ownerId: string;
      billing: {
        plan: string;        // e.g. "free"
        status: string;      // e.g. "trial"
        currency: string;    // e.g. "NGN"
        isPastDue: boolean;
      };
      usage: Record<string, unknown>;
      status: string;        // e.g. "trial"
      _id: string;
      createdAt: string;
      updatedAt: string;
    };
}





export interface SignupFormSchema {
  fullName: string;
  email: string;
  password: string;
  affId?: string;
  ref?: string | null;
}


// Form Validator schema for signing in
export interface SigninFormSchema {
  email: string;
  password: string; 
  ipAddress?: string;
}


export interface Account {
  status: boolean;
  message: string;
}


export interface OTPVerifySchema {
  userId: string;
  code: string;
}

export interface ResetPasswordSchema {
  email: string;
  password: string;
  token: string;
}