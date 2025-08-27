// /sanity/schemas/kgModelsBallPage.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'kgModelsBallPage',
  title: 'Kinky Gerlinky — Models Ball (singleton)',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
      description: 'e.g. “Kinky Gerlinky Models Ball — 22nd April 1991”',
    }),
    defineField({
      name: 'watchUrl',
      type: 'url',
      title: 'Vimeo watch/pay link',
      description: 'Public pay-per-view link'
    }),
    defineField({
      name: 'embedUrl',
      type: 'url',
      title: 'Vimeo embed URL',
      description: 'Full iframe URL, e.g. https://player.vimeo.com/video/172565492?...'
    }),
    defineField({
      name: 'description',
      type: 'array',
      title: 'Description',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'images',
      title: 'Image Grid',
      type: 'array',
      of: [{
        name: 'gridImage',
        type: 'object',
        fields: [
          { name: 'image', type: 'image', title: 'Image', options: {hotspot: true} },
          { name: 'alt', type: 'string', title: 'Alt text' },
          { name: 'caption', type: 'string', title: 'Caption' },
        ],
        preview: {
          select: {media: 'image', title: 'caption', subtitle: 'alt'}
        }
      }]
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'subtitle' } }
})
