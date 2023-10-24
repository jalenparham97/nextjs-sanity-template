import { groq } from 'next-sanity';

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    _id,
    seoTitle,
    seoDescription,
    seoImage,
    homeSection,
  }
`;
