import './globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Providers from './provider';

export const metadata = {
  title: 'Nearby Blood',
  description: 'A different platform for searching blood',
  generator: 'Radif'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
