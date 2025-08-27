import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'kinkyGerlinkyVhs',
  title: 'Kinky Gerlinky — VHS (21 Episodes)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: '21 x VHS',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      initialValue: { current: 'vhs' },
      options: { slugify: () => 'vhs' },
      readOnly: true,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'seriesUrl',
      title: 'Whole Series Vimeo URL',
      type: 'url',
    }),
    defineField({
      name: 'episodes',
      title: 'Episodes (21)',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          fields: [
            { name: 'title', type: 'string', validation: (r) => r.required() },
            { name: 'date', type: 'string', title: 'Date & Venue' },
            {
              name: 'thumb',
              type: 'image',
              title: 'Cover Thumb',
              fields: [{ name: 'alt', type: 'string' }],
            },
            { name: 'vimeoUrl', type: 'url', title: 'Episode Vimeo URL' },
            {
              name: 'details',
              type: 'array',
              title: 'Episode Details (each line = one <p>)',
              of: [{ type: 'block' }],
            },
            {
              name: 'stills',
              type: 'array',
              title: 'Episode Stills',
              of: [
                {
                  type: 'image',
                  fields: [{ name: 'alt', type: 'string' }],
                  options: { hotspot: true },
                },
              ],
            },
          ],
        }),
      ],
    }),
  ],
})
