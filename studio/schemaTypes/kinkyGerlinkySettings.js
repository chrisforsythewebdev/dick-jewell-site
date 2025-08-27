// sanity/schema_types/kinkyGerlinkySettings.js
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'kinkyGerlinkySettings',
  title: 'Kinky Gerlinky – Settings (Header)',
  type: 'document',
  fields: [
    defineField({
      name: 'banner',
      title: 'Banner Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload PINK-KINK.jpg (banner)',
    }),

    defineField({
      name: 'links',
      title: 'Subnav Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'kgSubnavLink',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              validation: (r) => r.required(),
            }),

            defineField({
              name: 'type',
              title: 'Link Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Static page', value: 'static' },
                  { title: 'DVD detail', value: 'dvd' },
                  { title: 'External URL', value: 'external' },
                ],
              },
              initialValue: 'dvd',
              validation: (r) => r.required(),
            }),



            // Static reference (can be "buy dvd" singleton or any static page)
            defineField({
              name: 'staticRef',
              title: 'Static page document',
              type: 'reference',
              to: [
                { type: 'kinkyGerlinkyBuyDvd' },
                { type: 'kinkyGerlinkyVhs' },
                { type: 'kinkyGerlinkyReviews' },
                { type: 'kinkyGerlinkyTrailer' },
              ],
              hidden: ({ parent }) => parent?.type !== 'static',
              validation: (r) =>
                r.custom((val, ctx) =>
                  ctx.parent?.type === 'static' && !val ? 'Select a static page' : true
                ),
            }),

            // External link
            defineField({
              name: 'url',
              title: 'External URL',
              type: 'url',
              hidden: ({ parent }) => parent?.type !== 'external',
              validation: (r) =>
                r.uri({ allowRelative: false, scheme: ['http', 'https'] })
                  .custom((val, ctx) =>
                    ctx.parent?.type === 'external' && !val ? 'Enter a URL' : true
                  ),
            }),

            defineField({
              name: 'target',
              title: 'Target',
              type: 'string',
              options: { list: ['_self', '_blank'] },
              initialValue: '_self',
            }),
          ],
        },
      ],
    }),
  ],
})
