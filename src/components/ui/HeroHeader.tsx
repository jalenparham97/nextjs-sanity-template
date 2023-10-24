'use client';

import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Image from 'next/image';

import { urlForImage } from '@/sanity/sanity.helpers';
import { cn } from '@/utils/tailwind-helpers';

interface Props {
  bgImageSrc: SanityImageSource;
  heroImgSrc?: SanityImageSource;
  title?: string;
  subTitle?: string;
  action?: React.ReactNode;
  viewHeight?: string;
}

export function HeroHeader({
  bgImageSrc = '',
  heroImgSrc = '',
  title,
  subTitle,
  action,
  viewHeight = '60vh',
}: Props) {
  return (
    <header
      style={{
        backgroundImage: `linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.35),
          rgba(0, 0, 0, 0.35)
        ), url(${urlForImage(bgImageSrc).url()})`,
        height: viewHeight,
      }}
      className={cn(
        `flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-5`
      )}
    >
      <div
        className={cn(
          'w-full text-center text-white',
          heroImgSrc && 'sm:-mt-[150px]'
        )}
      >
        {heroImgSrc && (
          <div className="w-full">
            <Image
              src={urlForImage(heroImgSrc).url()}
              width="450"
              height="250"
              alt=""
              className="mx-auto h-[200px] w-[350px] lg:h-[250px] lg:w-[450px]"
            />
          </div>
        )}
        <h1 className="mx-auto mb-4 text-2xl font-extrabold !leading-snug text-white md:w-3/4 md:text-3xl lg:text-4xl">
          {title}
        </h1>
        <h2 className="mx-auto mt-6 text-center text-xl font-bold !leading-normal tracking-wider text-white md:w-2/3 md:text-2xl lg:text-3xl">
          {subTitle}
        </h2>
      </div>
      {action && <div className="mt-8">{action}</div>}
    </header>
  );
}
