import { getClientBaseUrl, network, SignInRes } from "@/lib/common";
import {
  OTPVerifySchema,
  ResetPasswordSchema,
  SignupFormSchema,
  SignUpRes,
} from "../models";

// Sign user up
export const signupUser = async (data: SignupFormSchema) => {
  const URL = `${getClientBaseUrl()}/auth/register`;
  const reqBody = { body: JSON.stringify({ ...data }) };

  return network.clientPost<SignUpRes>(URL, reqBody);
}; 





export const verifyOTP = async (data: OTPVerifySchema) => {
  const URL = `${getClientBaseUrl()}/auth/verify-email`;
  const reqBody = { body: JSON.stringify({ ...data }) };

  return network.clientPost<SignInRes>(URL, reqBody);
};

export const reqEmailVerification = async (email: string) => {
  const URL = `${getClientBaseUrl()}/auth/request-email-token`;
  const reqBody = { body: JSON.stringify({ email }) }; 

  return network.clientPost(URL, reqBody);
};

export const reqPasswordReset = async (email: string) => {
  const URL = `${getClientBaseUrl()}/auth/password-reset?email=${email}`;

  return network.clientPost(URL);
};




export const resetPassword = async (data: ResetPasswordSchema) => {
  const URL = `${getClientBaseUrl()}/auth/update-password`;
  const reqBody = { body: JSON.stringify(data) };

  return network.clientPatch(URL, reqBody);
};