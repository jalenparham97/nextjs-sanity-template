'use client';

import { PortableText } from '@portabletext/react';
import { getImageDimensions } from '@sanity/asset-utils';
import Image from 'next/image';
import { TypedObject } from 'sanity';

import { urlForImage } from '@/sanity/sanity.helpers';

const PortableTextImageComponent = ({ value, isInline }) => {
  const { width, height } = getImageDimensions(value);
  return (
    <Image
      src={urlForImage(value).url()}
      alt={value.alt || ''}
      loading="lazy"
      width={width}
      height={height}
    />
  );
};

const portableTextComponents = {
  types: {
    image: PortableTextImageComponent,
    // Any other custom types you have in your content
    // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  },
};

interface Props {
  value: TypedObject | TypedObject[];
}

export function SanityBlockRenderer({ value }: Props) {
  return <PortableText value={value} components={portableTextComponents} />;
}
