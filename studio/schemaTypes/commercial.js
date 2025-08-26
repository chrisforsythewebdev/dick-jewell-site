import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'commercialPage',
  title: 'Commercial Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Commercial' }),
    defineField({
      name: 'intro',
      title: 'Intro (optional)',
      type: 'text',
      rows: 3,
      description: 'Appears under the page title',
    }),

    // Main grid items (each links to a video doc by slug)
    defineField({
      name: 'items',
      title: 'Grid Items',
      type: 'array',
      of: [
        defineField({
          name: 'gridItem',
          type: 'object',
          fields: [
            defineField({
              name: 'video',
              title: 'Linked Video',
              type: 'reference',
              to: [{ type: 'commercialVideo' }],
              description: 'Select the video detail page this item should link to.',
            }),
            defineField({
              name: 'thumb',
              title: 'Thumbnail',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'hoverThumb',
              title: 'Hover Thumbnail (optional)',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({ name: 'alt', type: 'string' }),
            defineField({
              name: 'captionHtml',
              title: 'Caption (HTML allowed)',
              type: 'text',
              rows: 2,
              description: 'Shown under the item. You can use <br> for line breaks.',
            }),
          ],
          preview: {
            select: { title: 'video.title', media: 'thumb' },
            prepare: ({ title, media }) => ({ title: title || 'Grid Item', media }),
          },
        }),
      ],
    }),

    // Single images with captions (e.g. 200 Tongues Drink Dispenser)
    defineField({
      name: 'singleImages',
      title: 'Single Images with Captions',
      type: 'array',
      of: [
        defineField({
          name: 'singleImage',
          type: 'object',
          fields: [
            defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'alt', type: 'string' }),
            defineField({ name: 'caption', type: 'string' }),
          ],
          preview: { select: { title: 'caption', media: 'image' } },
        }),
      ],
    }),

    // Mini gallery sections (wraps with your existing .mini-gallery styles)
    defineField({
      name: 'miniGalleries',
      title: 'Mini Galleries',
      type: 'array',
      of: [
        defineField({
          name: 'gallery',
          type: 'object',
          fields: [
            defineField({
              name: 'wrapTopRow',
              title: 'Use top-row wrapper (optional)',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [
                defineField({
                  name: 'galleryImage',
                  type: 'object',
                  fields: [
                    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
                    defineField({ name: 'alt', type: 'string' }),
                  ],
                  preview: { select: { media: 'image', title: 'alt' } },
                }),
              ],
            }),
            defineField({
              name: 'groupCaption',
              title: 'Group Caption (below images)',
              type: 'string',
            }),
          ],
          preview: { select: { title: 'groupCaption' }, prepare: ({ title }) => ({ title: title || 'Mini Gallery' }) },
        }),
      ],
    }),
  ],
})
