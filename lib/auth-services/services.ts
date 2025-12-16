import { SigninFormSchema, SignInRes, ResProps } from "../common/models";
import { getBaseUrl } from "../common/getBaseUrl";



type FetcherArgs = [reqInfo: RequestInfo | URL, init?: RequestInit | undefined];
const fetcher = async <T>(...args: FetcherArgs) => {
  const [info, init = {}] = args;

  try {
    const res = await fetch(info, init);
    const data = await res.json();

    const response: ResProps<T> = { ...data, statusCode: res.status };

    return response;
  } catch (err) {
    return { error: err } as ResProps<T>;
  }
};

 const post = <T>(...args: FetcherArgs) => {
  const [info, init] = args;

  return fetcher<T>(info, {
    method: "POST",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  }) as Promise<ResProps<T>>;
};

export const googleSignIn = async (data: {
  idToken: string;
  affId?: string;
}) => {
  const URL = `${getBaseUrl()}/auth/google`;
  const reqBody = { body: JSON.stringify({ ...data }) };

  return post<SignInRes>(URL, reqBody);
};

export const signUserIn = async (data: SigninFormSchema) => {
  const URL = `${getBaseUrl()}/auth/login`;
  const reqBody = { body: JSON.stringify({ ...data }) };

  return post<SignInRes>(URL, reqBody);
};
