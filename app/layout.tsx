import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';
import ProfileUpdateModal from "@/components/ui/ProfileUpdateModal";
import { UserProvider } from "../hooks/UserContext";
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const metadata: Metadata = {
  title: 'Nearby Blood',
  description: 'A different platform for searching blood',
  generator: 'Radif',
};

// Create QueryClient once outside component
// const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {/* <QueryClientProvider client={queryClient}> */}
          <UserProvider>
            <ToastContainer />
            <Header />
            <ProfileUpdateModal />
            <main>{children}</main>
            <Analytics />
            <Footer />
          </UserProvider>
        {/* </QueryClientProvider> */}
      </body>
    </html>
  );
}
