import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'commercialVideo',
  title: 'Commercial Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title (H1)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (optional)',
      type: 'string',
    }),
    defineField({
      name: 'vimeoUrl',
      title: 'Vimeo Embed URL',
      type: 'url',
      description:
        'Paste the Vimeo player URL, e.g. https://player.vimeo.com/video/1089791408?badge=0&autopause=0&player_id=0&app_id=58479',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionHtml',
      title: 'Description (HTML allowed)',
      type: 'text',
      rows: 6,
      description: 'Optional rich caption under the video. You can paste basic HTML.',
    }),
    defineField({
      name: 'backLabel',
      title: 'Back Link Label',
      type: 'string',
      initialValue: 'Back to commercial',
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
