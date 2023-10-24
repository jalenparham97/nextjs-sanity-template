import Link from 'next/link';

import type { HomePagePayload } from '@/types';

export interface HomePageProps {
  pageData: HomePagePayload | null;
}

export function HomePage({ pageData }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const page = pageData;

  return <div className="space-y-20">{page?.homeSection}</div>;
}
