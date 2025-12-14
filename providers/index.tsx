"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux"; 
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";
import ToastContainer from "../providers/toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouteProvider } from "@/providers/router-provider";

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Set to false by default
      refetchOnMount: false,
    },
  },
});

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} /> 
            <ToastContainer />
            <RouteProvider>
              {children}
            </RouteProvider>
          </QueryClientProvider>
        </PersistGate>
      </SessionProvider>
    </Provider>
  );
};

export default Providers;
