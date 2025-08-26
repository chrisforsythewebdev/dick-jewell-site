// sanity/schema_types/kinkyGerlinkyStatic.js
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'kinkyGerlinkyStatic',
  title: 'Kinky Gerlinky – Static Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required()
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ]
    })
  ]
})
