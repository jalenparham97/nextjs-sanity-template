import createImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import config from './sanity.config';

export const urlBuilder = createImageUrlBuilder(config);

export const urlForImage = (source: SanityImageSource) =>
  urlBuilder.image(source).auto('format').fit('max');
