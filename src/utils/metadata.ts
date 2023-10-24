import createImageUrlBuilder from '@sanity/image-url';
import type { Metadata } from 'next';
import type { Image } from 'sanity';

import { dataset, projectId } from '@/sanity/sanity.api';
import * as demo from '@/utils/demo.data';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlForImage = (source: Image) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto('format').fit('max');
};

/**
 * All the shared stuff that goes into <head> on `(personal)` routes, can be be imported by `page.tsx` files and used by `generateMetadata` functions.
 */
export function defineMetadata({
  baseTitle,
  description,
  image,
  title,
}: {
  baseTitle?: string;
  description?: string;
  image?: Image;
  title?: string;
}) {
  const metaTitle = [
    ...(title ? [title] : []),
    ...(baseTitle ? [baseTitle] : []),
  ].join(' | ');

  const imageUrl =
    image && urlForImage(image)?.width(1200).height(627).fit('crop').url();

  return {
    title: metaTitle || demo.title,
    themeColor: '#000',
    description,
    openGraph: imageUrl
      ? {
          images: [imageUrl],
        }
      : undefined,
  } satisfies Metadata;
}
