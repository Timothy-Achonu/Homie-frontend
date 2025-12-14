import { ResProps, getBaseUrl } from "@/lib/common";
import { SigninFormSchema, SignInRes } from "./models";

//I'm doing this to fix a circular importation bug:
//network -> fetcher.sever -> authOptions -> app/auth -> services -> network.

/*
network needs fetcher.server
fetcher.server needs authOptions (this part: `const session = (await getServerSession(authOptions)) as Session | null;` inside serverFetcher)
authOptions need network (loginWithGoogle and SignUserIn)

So I want to create the fetch requests authOptions need without using network)
*/

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

export const post = <T>(...args: FetcherArgs) => {
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
  console.log({ URL });
  const reqBody = { body: JSON.stringify({ ...data }) };

  return post<SignInRes>(URL, reqBody);
};

export const signUserIn = async (data: SigninFormSchema) => {
  const URL = `${getBaseUrl()}/auth/login`;
  console.log({ URL });
  const reqBody = { body: JSON.stringify({ ...data }) };

  return post<SignInRes>(URL, reqBody);
};
