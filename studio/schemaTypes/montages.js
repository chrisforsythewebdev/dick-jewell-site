export default {
    name: 'montagesPage',
    title: 'Montages Page',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', initialValue: 'Montages' },
      { name: 'intro', type: 'string', title: 'Intro line' },
      {
        name: 'items',
        title: 'Montage Items',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'href',
                type: 'string',
                description:
                  'Link to the detail route (e.g., /montages/non-verbal-communication)',
              },
              { name: 'image', type: 'image', options: { hotspot: true } },
              { name: 'alt', type: 'string' },
              { name: 'title', type: 'string', description: 'Heading below the image' },
              { name: 'subtitle', type: 'string', description: 'Small description line below the heading' },
              { name: 'wide', type: 'boolean', description: 'Apply the .wide class to this tile' },
            ],
            preview: {
              select: { media: 'image', title: 'title', subtitle: 'subtitle' },
            },
          },
        ],
      },
    ],
  }
  