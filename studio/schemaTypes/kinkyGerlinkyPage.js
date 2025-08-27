// Landing page (old frameset.html content)
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'kinkyGerlinkyPage',
  title: 'Kinky Gerlinky – Landing',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Kinky Gerlinky' }),
    defineField({ name: 'intro', type: 'text', rows: 3 }),

    // The big grid of tiles/links you want on the landing page
    defineField({
      name: 'tiles',
      title: 'Tiles',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', type: 'string' }),
          defineField({ name: 'alt', type: 'string' }),
          defineField({ name: 'image', type: 'image' }),
          defineField({ name: 'captionHtml', type: 'text', rows: 3 }),
          defineField({
            name: 'linkType',
            type: 'string',
            options: { list: ['dvd', 'static', 'external'] },
            initialValue: 'dvd'
          }),
          defineField({ name: 'externalUrl', type: 'url' })
        ]
      }]
    }),

    // Left gallery column (Winston, Sheila Tequila, etc.)
    defineField({
      name: 'leftGallery',
      title: 'Left Gallery (figures)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'image', type: 'image' }),
          defineField({ name: 'caption', type: 'string' }),
          defineField({ name: 'alt', type: 'string' })
        ],
        preview: { select: { title: 'caption', media: 'image' } }
      }]
    }),

    // Right screenings column (header, images + paras, list of places)
    defineField({
      name: 'screenings',
      title: 'Screenings Column',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', initialValue: "Latest screenings of 'Kinky Gerlinky'" }),
        defineField({
          name: 'blocks',
          title: 'Blocks (image + text pairs)',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'image', type: 'image' }),
              defineField({ name: 'textHtml', type: 'text', rows: 4 })
            ],
            preview: { select: { title: 'textHtml', media: 'image' } }
          }]
        }),
        defineField({
          name: 'extraList',
          title: 'Extra List (one per line)',
          type: 'array',
          of: [{ type: 'string' }]
        }),
        defineField({
          name: 'closingHtml',
          title: 'Closing HTML',
          type: 'text',
          rows: 3
        })
      ]
    })
  ]
})
