import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'kinkyGerlinkyReviews',
  title: 'Kinky Gerlinky — Reviews (singleton)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Reviews',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      initialValue: { current: 'reviews' },
      options: { slugify: () => 'reviews' },
      readOnly: true,
      validation: r => r.required(),
    }),
    defineField({
      name: 'items',
      title: 'Review Images',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] },
          { name: 'caption', type: 'string' },
        ],
        preview: { select: { title: 'caption', media: 'image' } },
      }],
      validation: r => r.min(1),
    }),
    defineField({
      name: 'arrows',
      title: 'Button Arrows (optional)',
      type: 'object',
      fields: [
        { name: 'next', type: 'image', title: 'Next (forehand.gif)' },
        { name: 'back', type: 'image', title: 'Back (backhand.gif)' },
      ],
    }),
  ],
})
