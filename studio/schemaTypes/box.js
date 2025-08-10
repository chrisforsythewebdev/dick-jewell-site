export default {
    name: 'boxPage',
    title: 'The Box Page',
    type: 'document',
    fields: [
      { name: 'title', title: 'Page Title', type: 'string' },
      {
        name: 'intro',
        title: 'Intro',
        type: 'text',
        rows: 3,
        description: 'e.g. “Below are 148 photos…”',
      },
      {
        name: 'carouselImages',
        title: 'Carousel Images',
        type: 'array',
        of: [{ type: 'image', options: { hotspot: true } }],
        validation: (Rule) => Rule.min(1),
      },
      {
        name: 'afterCarouselNote',
        title: 'Text After Carousel',
        type: 'string',
        description: 'e.g. “A selection from Saturday night through Sunday.”',
      },
      {
        name: 'figures',
        title: 'Figures Below',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
              { name: 'caption', title: 'Caption', type: 'string' },
            ],
          },
        ],
      },
    ],
  }
  