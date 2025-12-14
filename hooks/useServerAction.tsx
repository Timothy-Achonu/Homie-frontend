"use client";

import { useState, useCallback } from "react";
import { ResProps } from "@/lib/common";
import { notify, parseResMsg, parseStatusCode } from "@/utils";

/**
 * A fully type-safe React hook for executing Next.js server actions.
 *
 * @template TArgs - Tuple of argument types accepted by the action.
 * @template TResult - Promise-resolved return type of the action.
 * @template TError - Error type (defaults to `Error`).
 */
export function useServerAction<
  TArgs extends unknown[],
  TResult,
  TError = Error
>({
  action,
  showToast = true,
  onSuccess,
  onError,
}: {
  action: (...args: TArgs) => Promise<ResProps<TResult>>;
  showToast?: boolean;
  onSuccess?: (response: ResProps<TResult>) => void;
  onError?: () => void;
}) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [response, setResponse] = useState<ResProps<TResult> | null>(null);
  const [error, setError] = useState<{
    error: TError | null;
    message: string | null;
  }>({ error: null, message: null });

  const clearError = () => {
    setError({ error: null, message: null });
  };

  const execute = useCallback(
    async (...args: TArgs): Promise<ResProps<TResult>> => {
      setIsPending(true);
      setError({ error: null, message: null });
    
      try {
        const response = await action(...args);
        console.log({response})
        setResponse(response);
        const message = parseResMsg(response.message);
        if (parseStatusCode(response.statusCode).success) {
          onSuccess?.(response);

          if (showToast) {
            notify.success({
              message: "Request successful!",
              subtitle: message,
            });
          }
        } else {
          setError({ error: null, message: parseResMsg(response.message) });
          onError?.();
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          showToast &&
            notify.error({ message: "Request failed!", subtitle: message });
        }
        return response;
      } catch (err) {  
        console.log({err})
        setError({ error: err as TError, message: null });
        onError?.();
        throw err;   
      } finally {
        setIsPending(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showToast]
  );

  return { execute, isPending, response, error, clearError };
}
