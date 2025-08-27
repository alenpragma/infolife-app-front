"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const HomeProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}><div className="bg-background1">
      {children}</div></QueryClientProvider>
  );
};
export default HomeProvider;
