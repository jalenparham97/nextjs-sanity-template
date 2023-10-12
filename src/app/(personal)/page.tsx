import { toPlainText } from '@portabletext/react';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { HomePage } from '@/components/pages/home/HomePage';
import HomePagePreview from '@/components/pages/home/HomePagePreview';
import { env } from '@/env';
import { getClient } from '@/sanity/sanity.client';
import { homePageQuery, settingsQuery } from '@/sanity/sanity.queries';
import { HomePagePayload, SettingsPayload } from '@/types';
import { defineMetadata } from '@/utils/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const preview = draftMode().isEnabled
    ? { token: env.SANITY_API_READ_TOKEN! }
    : undefined;
  const client = getClient(preview);

  const [settings, page] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
    client.fetch<HomePagePayload | null>(homePageQuery),
  ]);

  return defineMetadata({
    description: page?.overview ? toPlainText(page.overview) : '',
    image: settings?.ogImage,
    title: page?.title,
  });
}

export default async function IndexRoute() {
  const preview = draftMode().isEnabled
    ? { token: env.SANITY_API_READ_TOKEN! }
    : undefined;
  const client = getClient(preview);
  const data = await client.fetch<HomePagePayload | null>(homePageQuery);

  if (!data && !preview) {
    notFound();
  }

  return preview ? <HomePagePreview data={data} /> : <HomePage data={data} />;
}
