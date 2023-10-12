import '@/styles/globals.css';

import type { PortableTextBlock } from '@portabletext/types';
import { draftMode } from 'next/headers';

import { Footer } from '@/components/global/Footer';
import { Navbar } from '@/components/global/Navbar';
import { PreviewBanner } from '@/components/preview/PreviewBanner';
import PreviewProvider from '@/components/preview/PreviewProvider';
import { env } from '@/env';
import { getClient } from '@/sanity/sanity.client';
import { settingsQuery } from '@/sanity/sanity.queries';
import { SettingsPayload } from '@/types';

const fallbackSettings: SettingsPayload = {
  menuItems: [],
  footer: [],
};

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const preview = draftMode().isEnabled
    ? { token: env.SANITY_API_READ_TOKEN! }
    : undefined;
  const client = getClient(preview);
  const settings =
    (await client.fetch<SettingsPayload | null>(settingsQuery)) ??
    fallbackSettings;

  const layout = (
    <div className="flex min-h-screen flex-col bg-white text-black">
      {preview && <PreviewBanner />}
      <Navbar menuItems={settings.menuItems} />
      <div className="mt-20 flex-grow px-4 md:px-16 lg:px-32">{children}</div>
      <Footer footer={settings.footer as PortableTextBlock[]} />
    </div>
  );

  if (preview) {
    return <PreviewProvider token={preview.token}>{layout}</PreviewProvider>;
  }

  return layout;
}
