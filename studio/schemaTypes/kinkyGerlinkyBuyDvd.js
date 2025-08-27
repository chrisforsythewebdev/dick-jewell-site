// sanity/schema_types/kinkyGerlinkyBuyDvd.js
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'kinkyGerlinkyBuyDvd',              
  title: 'Kinky Gerlinky — Buy DVD (singleton)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Buy DVD',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      initialValue: { current: 'buy-dvd' },
      options: {
        source: 'title',
        slugify: () => 'buy-dvd',
      },
      readOnly: true,
      validation: (r) => r.required(),
    }),

    // the 2–3 paragraphs above the cover
    defineField({
      name: 'info',
      title: 'Info (paragraphs)',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    // cover + watch link block
    defineField({
      name: 'cover',
      title: 'DVD Cover',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({
      name: 'watchUrl',
      title: '“Watch the film” URL',
      type: 'url',
      validation: (r) =>
        r.uri({ allowRelative: false, scheme: ['http', 'https'] }),
    }),

    // 9-still grid
    defineField({
      name: 'stills',
      title: 'VHS Stills (9)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
        },
      ],
      validation: (r) => r.min(1),
    }),

    // Press release image + caption
    defineField({
      name: 'pressRelease',
      title: 'Press Release',
      type: 'object',
      fields: [
        {
          name: 'image',
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string' }],
        },
        { name: 'caption', type: 'string' },
      ],
    }),
  ],
})
