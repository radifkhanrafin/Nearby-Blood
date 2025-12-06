"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { UserProvider } from "../hooks/UserContext";
import { ToastContainer } from 'react-toastify';
import { Analytics } from '@vercel/analytics/next';
import ProfileUpdateModal from "@/components/ProfileUpdateModal";
import Header from '@/components/Header';
import Footer from '@/components/ui/Footer';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ToastContainer />
        <Header />
        <ProfileUpdateModal />

        {children}

        <Analytics />
        <Footer />
      </UserProvider>
    </QueryClientProvider>
  );
}
