import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DJ Claw Radio 🎧',
  description: 'AI-Powered 24/7 Music Stream',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
