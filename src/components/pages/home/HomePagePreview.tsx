'use client';

import { useLiveQuery } from 'next-sanity/preview';

import { homePageQuery } from '@/sanity/sanity.queries';
import type { HomePagePayload } from '@/types';

import { HomePage, type HomePageProps } from './HomePage';

export default function HomePagePreview({ data: initialData }: HomePageProps) {
  const [data] = useLiveQuery<HomePagePayload | null>(
    initialData,
    homePageQuery
  );

  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    );
  }

  return <HomePage data={data} />;
}
