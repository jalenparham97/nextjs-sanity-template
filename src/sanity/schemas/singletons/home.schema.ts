import { IconHome } from '@tabler/icons-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const homeSchema = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: IconHome,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoImage',
      title: 'Image',
      type: 'image',
      group: 'seo',
    }),

    // Home Section
    defineField({
      name: 'homeSection',
      title: 'Home Section',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'seoTitle',
    },
    prepare({ title }) {
      return {
        subtitle: 'Home Page',
        title,
      };
    },
  },
});
