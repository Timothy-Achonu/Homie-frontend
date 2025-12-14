import { HttpStatus } from "@/utils";
import { getSession, signOut } from "next-auth/react";
import { ApplicationRoutes } from "@/routes";
import { ResProps, PaginatedResProps, PaginatedQueryProps } from "./models"; 
import type { Session } from "next-auth"  
  
type clientFetcherArgs = [ 
  reqInfo: RequestInfo | URL, 
  init?: RequestInit | undefined 
];

// Global Client fetcher fn
export const fetcher = async <T>(...args: clientFetcherArgs) => {
  const [info, init = {}] = args;

  const session = await getSession(); 

  if (session) { 
    init.headers = {
      Authorization: `Bearer ${(session.user as Session['user'])?.accessToken}`,
      ...init.headers,
    };
  }

  try {       
    const res = await fetch(info, init);
    const data = await res.json();

    const response: ResProps<T> = { ...data, status: res.status };

    if (response.statusCode === HttpStatus.UNAUTHORIZED) {
      await signOut({
        callbackUrl: `${ApplicationRoutes.NOT_AUTHORIZED}?redirect_reason=unauthorized`,
        redirect: true,
      });
    }

    return response;
  } catch (err) {
    return { error: err } as ResProps<T>;
  }
};


   

// Global default post fetch fn
export const post = <T>(...args: clientFetcherArgs) => {
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
         
// For patch requests
export const patch = <T>(...args: clientFetcherArgs) => {
  const [info, init] = args;

  return fetcher<T>(info, {
    method: "PATCH",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  }) as Promise<ResProps<T>>;
};

// Delete requests handler fn
export const deleteReq = <T>(...args: clientFetcherArgs) => {
  const [info, init] = args;

  return fetcher<T>(info, {
    method: "DELETE",
    ...init,
    headers: {
      ...init?.headers,
    },
  }) as Promise<ResProps<T>>;
};



export const paginatedFetcher = <T>(
  route: string,
  pageProps: PaginatedQueryProps
) => {
  const queryURL = new URL(route);

  // Attach paginated props
  const { page = 1, limit = 11 } = pageProps;

  queryURL.searchParams.set("pageNumber", String(page + 1));
  queryURL.searchParams.set("pageSize", String(limit));
  // queryURL.searchParams.set("search", search);

  const url = queryURL.toString();

  return fetcher<PaginatedResProps<T>>(url);
};

export const fetcherWithParams = <T, P extends Record<string, unknown>>(
  route: string,
  params: P
) => {
  const queryURL = new URL(route);

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      queryURL.searchParams.set(key, String(params[key]));
    }
  }

  const url = queryURL.toString();  

  return fetcher<PaginatedResProps<T>>(url);
};

