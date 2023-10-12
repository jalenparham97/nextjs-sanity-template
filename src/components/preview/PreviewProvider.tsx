'use client';

import { LiveQueryProvider } from 'next-sanity/preview';
import { useMemo } from 'react';

import { getClient } from '@/sanity/sanity.client';

export default function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) {
  const client = useMemo(() => getClient({ token }), [token]);
  return (
    <LiveQueryProvider
      client={client}
      // Uncomment below to see debug reports
      // logger={console}
    >
      {children}
    </LiveQueryProvider>
  );
}
