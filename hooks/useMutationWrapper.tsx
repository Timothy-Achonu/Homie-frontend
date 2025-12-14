"use client";

import { useCallback, useState } from "react";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ResProps } from "@/lib/common";
import { notify, parseResMsg, parseStatusCode } from "@/utils";

type EmptyObject = Record<string, never>;

export function useMutationWrapper<TArgs = void, TResult = unknown, TError = Error>({
  mutationFn,
  showToast = {success: true, error: true},
  onSuccess,
  onError,
  options, 
}: {
  mutationFn: (variables: TArgs) => Promise<ResProps<TResult>> ;
  showToast?: {success: boolean; error: boolean};
  onSuccess?: (response: ResProps<TResult>) => void;
  onError?: (response?: ResProps<TResult>) => void;
  options?: Omit<UseMutationOptions<ResProps<TResult>, TError, TArgs, unknown>, "mutationFn">;
}) {
  const [response, setResponse] = useState<ResProps<TResult> | null>(null);
  const [error, setError] = useState<{ error: TError | null; message: string | null }>({
    error: null,
    message: null,
  });

  const clearError = useCallback(() => {
    setError({ error: null, message: null });
  }, []);

  const mutation = useMutation<ResProps<TResult>, TError, TArgs, unknown>({
    mutationFn,
    ...options,
    onSuccess: (res, variables, ctx) => {
      setResponse(res); 
      console.log({res})
      const message = parseResMsg(res.message);

      if (parseStatusCode(res.statusCode).success) {
        onSuccess?.(res);
        if (showToast.success) {
          notify.success({ message: "Request successful!", subtitle: message });
        }
      } else {
        setError({ error: null as unknown as TError, message });
        onError?.(res); 
        if (showToast.error) {
          notify.error({ message: "Request failed!", subtitle: message });
        }
      }
      options?.onSuccess?.(res, variables as TArgs, ctx as EmptyObject, mutation as unknown as never);
    },
    onError: (err, variables, ctx) => {
      if (showToast.error) {
        notify.error({ message: "Request failed!" }); 
      }
      setError({ error: err, message: null });
      onError?.();
      options?.onError?.(err, variables as TArgs, ctx, mutation as unknown as never);
    },
  });

  const mutate = useCallback(
    async (variables: TArgs) => {
      clearError();
      return mutation.mutateAsync(variables);
    },
    [mutation, clearError]
  );

  return {
    mutate,
    isPending: mutation.isPending,
    response,
    error,
    clearError,
  };
}


