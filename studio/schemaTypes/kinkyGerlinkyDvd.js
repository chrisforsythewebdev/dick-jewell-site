// sanity/schema_types/kinkyGerlinkyDvd.js
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'kinkyGerlinkyDvd',
  title: 'Kinky Gerlinky – DVD / VHS Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required()
    }),

    defineField({ name: 'description', type: 'text' }),

    // Optional Vimeo embed
    defineField({ name: 'vimeoUrl', type: 'url', description: 'Paste Vimeo player link' }),

    // DVD cover or hero image
    defineField({ name: 'heroImage', type: 'image' }),

    // VHS stills grid
    defineField({
      name: 'stills',
      type: 'array',
      of: [{ type: 'image' }]
    }),

    // Press release image
    defineField({ name: 'pressImage', type: 'image' }),
    defineField({ name: 'pressCaption', type: 'string' })
  ]
})
