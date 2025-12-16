'use server'

import { SigninFormSchema, SignInRes, ResProps, serverFetcherArgs } from "../common/models";
import { getBaseUrl } from "../common/getBaseUrl";



 const serverFetcher = async <T>(...args: serverFetcherArgs) => {
  const [info, init = {}] = args;
  const {  ...restInit } = init || {};
  const finalInit: RequestInit = {
    ...restInit,
    headers:  (init as RequestInit).headers,

  };
  try {
    const res = await fetch(info, { ...finalInit }); 
    const response = (await res.json()) as ResProps<T>;
   
    if (response.statusCode && response.statusCode > 499) {
      throw new Error(JSON.stringify(response)); 
    }
 
   
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

 const serverPost = async <T>(...args: serverFetcherArgs) => {
  const [info, init] = args;
  return serverFetcher<T>(info, {
    method: "POST",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  }) as Promise<ResProps<T>>;
};

export const googleSignInAction = async (data: {
  idToken: string;
  affId?: string;
}) => {
  const URL = `${getBaseUrl()}/auth/google`;
  const reqBody = { body: JSON.stringify({ ...data }) };

  return serverPost<SignInRes>(URL, reqBody);
};

export const signUserInAction = async (data: SigninFormSchema) => {
  const URL = `${getBaseUrl()}/auth/login`;
  const reqBody = { body: JSON.stringify({ ...data }) };

  return serverPost<SignInRes>(URL, reqBody);
};  
