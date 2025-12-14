"use server";

import { HttpStatus } from "@/utils";
import { auth } from "@/auth";
import type { Session } from "next-auth";
import { redirect } from "next/navigation";
import { ApplicationRoutes } from "@/routes";
import { revalidateTag } from "next/cache";
import { 
  ResProps,
  serverFetcherArgs,
  ServerFetcherInit,
  PaginatedResProps, 
} from "./models";

export const serverFetcher = async <T>(...args: serverFetcherArgs) => {
  const [info, init = {}] = args;
  const { tagsToRevalidate, ...restInit } = init || {};
  const session = (await auth()) as Session | null;
  const defaultRevalidateTime = 3600;
  const finalInit: RequestInit = {
    ...restInit,
    headers: session
      ? {
          Authorization: `Bearer ${session?.user?.accessToken}`,
          ...init.headers,
        }
      : (init as RequestInit).headers,
    // cache: init.cache || "force-cache", //Error from Next.js: "⚠ Specified "cache: force-cache" and "revalidate: 0", only one should be specified.
    next: {
      revalidate:
        (init as RequestInit).next?.revalidate ?? defaultRevalidateTime,
      ...(init as RequestInit).next,
    },
  };
  console.log({ info, finalInit, passedRevalidate: (init as RequestInit).next?.revalidate });
  try {
    const res = await fetch(info, { ...finalInit }); //Next.js fetch does not cache by default.
    const response = (await res.json()) as ResProps<T>;
    if ( tagsToRevalidate?.length) { 
      for (const tag of tagsToRevalidate) {
        revalidateTag('max', tag); 
      }  
    }
    console.log({response, res, check:1})
    if (response.statusCode && response.statusCode > 499) {
      throw new Error(JSON.stringify(response)); 
    }
 
    // if (response.statusCode === HttpStatus.UNAUTHORIZED) {
    //   redirect(
    //     `${ApplicationRoutes.NOT_AUTHORIZED}?redirect_reason=unauthorized`
    //   );
    // }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const serverPost = async <T>(...args: serverFetcherArgs) => {
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

export const fetcherWithParamsOnserver = async <
  T,
  P extends Record<string, unknown>
>(
  route: string,
  params: P,
  init?: ServerFetcherInit | undefined
) => {
  const queryURL = new URL(route);

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      queryURL.searchParams.set(key, String(params[key]));
    }
  }

  const url = queryURL.toString();
  console.log({ url });

  return serverFetcher<PaginatedResProps<T>>(url, init);
};
