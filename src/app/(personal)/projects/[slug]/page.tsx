import { toPlainText } from '@portabletext/react';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { ProjectPage } from '@/components/pages/project/ProjectPage';
import ProjectPreview from '@/components/pages/project/ProjectPreview';
import { env } from '@/env';
import { getClient } from '@/sanity/sanity.client';
import {
  homePageTitleQuery,
  projectBySlugQuery,
  projectPaths,
} from '@/sanity/sanity.queries';
import { ProjectPayload } from '@/types';
import { defineMetadata } from '@/utils/metadata';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const preview = draftMode().isEnabled
    ? { token: env.SANITY_API_READ_TOKEN! }
    : undefined;
  const client = getClient(preview);

  const [homePageTitle, project] = await Promise.all([
    client.fetch<string | null>(homePageTitleQuery),
    client.fetch<ProjectPayload | null>(projectBySlugQuery, {
      slug,
    }),
  ]);

  return defineMetadata({
    baseTitle: homePageTitle ?? undefined,
    description: project?.overview ? toPlainText(project.overview) : '',
    image: project?.coverImage,
    title: project?.title,
  });
}

export async function generateStaticParams() {
  const client = getClient();
  const slugs = await client.fetch<string[]>(projectPaths);
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectSlugRoute({ params }: Props) {
  const { slug } = params;
  const preview = draftMode().isEnabled
    ? { token: env.SANITY_API_READ_TOKEN! }
    : undefined;
  const client = getClient(preview);
  const data = await client.fetch<ProjectPayload | null>(projectBySlugQuery, {
    slug,
  });

  if (!data && !preview) {
    notFound();
  }

  return preview ? <ProjectPreview data={data} /> : <ProjectPage data={data} />;
}
