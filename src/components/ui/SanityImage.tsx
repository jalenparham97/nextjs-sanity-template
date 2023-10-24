'use client';

import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Image from 'next/image';
import Link from 'next/link';

import { urlForImage } from '@/sanity/sanity.helpers';

type Props = {
  src: SanityImageSource;
  linkSrc?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  clickable?: boolean;
};

export function SanityImage({
  src,
  linkSrc,
  alt = '',
  className,
  width,
  height,
  clickable,
}: Props) {
  return (
    <>
      {src && !clickable && (
        <Image
          src={urlForImage(src).url()}
          alt={alt}
          className={className}
          width={width}
          height={height}
        />
      )}
      {src && clickable && (
        <Link
          href={linkSrc || urlForImage(src).url()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={urlForImage(src).url()}
            alt={alt}
            className={className}
            width={width}
            height={height}
          />
        </Link>
      )}
    </>
  );
}
