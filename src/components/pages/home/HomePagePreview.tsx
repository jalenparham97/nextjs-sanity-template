'use client';

import { useLiveQuery } from 'next-sanity/preview';

import { homePageQuery } from '@/sanity/sanity.queries';
import type { HomePagePayload } from '@/types';

import { HomePage, type HomePageProps } from './HomePage';

export default function HomePagePreview({
  pageData: initialData,
}: HomePageProps) {
  const [pageData] = useLiveQuery<HomePagePayload | null>(
    initialData,
    homePageQuery
  );

  if (!pageData) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    );
  }

  return <HomePage pageData={pageData} />;
}
