import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'kinkyGerlinkyTrailer',
  title: 'Kinky Gerlinky — Trailer (singleton)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Kinky Gerlinky (Trailer)',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      initialValue: { current: 'trailer' },
      options: { slugify: () => 'trailer' },
      readOnly: true,
      validation: r => r.required(),
    }),
    defineField({
      name: 'embedUrl',
      title: 'Vimeo Embed URL',
      description: 'e.g. https://player.vimeo.com/video/172565720?autoplay=1&muted=1&title=0&byline=0&portrait=0',
      type: 'url',
      validation: r => r.required(),
    }),
  ],
})
