import '@/styles/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { DM_Serif_Display } from 'next/font/google';
import { draftMode } from 'next/headers';

import PreviewProvider from '@/components/preview/PreviewProvider';
import { Footer } from '@/components/ui/Footer';
import { Navbar } from '@/components/ui/Navbar';
import { env } from '@/env';

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-dm-serif',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const preview = draftMode().isEnabled
    ? { token: env.SANITY_API_READ_TOKEN! }
    : undefined;

  const isPreview = preview !== undefined;

  const layout = (
    <html lang="en" className={`${dmSerifDisplay.variable}`}>
      <body>
        <main>
          <Navbar isPreview={isPreview} />
          <div className="overflow-x-hidden">{children}</div>
          <Footer />
        </main>
        <Analytics />
      </body>
    </html>
  );

  if (preview) {
    return <PreviewProvider token={preview.token}>{layout}</PreviewProvider>;
  }

  return layout;
}
