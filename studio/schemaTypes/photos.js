// /schemas/photoPage.js
export default {
    name: 'photoPage',
    title: 'Photos Page',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Page Title',
        type: 'string',
      },
      {
        name: 'carouselImages',
        title: 'Carousel Images',
        type: 'array',
        of: [{ type: 'image' }],
        options: {
          hotspot: true,
        },
      },
      {
        name: 'photos',
        title: 'Photos',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Title',
                type: 'string',
              },
              {
                name: 'image',
                title: 'Main Image',
                type: 'image',
                options: { hotspot: true },
              },
              {
                name: 'hoverImage',
                title: 'Hover Image (optional)',
                type: 'image',
                options: { hotspot: true },
              },
            ],
          },
        ],
      },
    ],
  }
  