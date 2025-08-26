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
      description: 'Upload PINK-KINK.jpg (banner)'
    }),
    defineField({
      name: 'links',
      title: 'Subnav Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', validation: r => r.required() }),
          defineField({
            name: 'type',
            title: 'Link Type',
            type: 'string',
            options: { list: ['dvd', 'static', 'external'] },
            initialValue: 'dvd'
          }),
          defineField({ name: 'dvdRef', type: 'reference', to: [{ type: 'kinkyGerlinkyDvd' }] }),
          defineField({ name: 'staticRef', type: 'reference', to: [{ type: 'kinkyGerlinkyStatic' }] }),
          defineField({ name: 'url', type: 'url' }),
          defineField({ name: 'target', type: 'string', options: { list: ['_self', '_blank'] }, initialValue: '_self' })
        ]
      }]
    })
  ]
})
