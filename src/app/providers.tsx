'use client';

<<<<<<< HEAD
import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useRef(() => new QueryClient()).current();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
=======
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

>>>>>>> fb7085d5e758d21b7b906019aedd77576f170a22
export default Providers;
