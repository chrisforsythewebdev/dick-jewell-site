export default {
    name: 'montageDetail',
    title: 'Montage Detail',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', validation: (Rule) => Rule.required() },
      {
        name: 'slug',
        type: 'slug',
        options: { source: 'title', maxLength: 96 },
        validation: (Rule) => Rule.required(),
      },
  
      { name: 'backLabel', type: 'string', initialValue: '← Back to Montages' },
      { name: 'backHref', type: 'string', initialValue: '/montages' },
  
      {
        name: 'figures',
        title: 'Figures',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            { name: 'image', type: 'image', options: { hotspot: true } },
            { name: 'alt', type: 'string' },
            {
              name: 'caption',
              type: 'text',
              description:
                'Supports line breaks. Example: "<strong>Title</strong> 1983–1987" or multi-line details.',
            },
          ],
          preview: {
            select: { media: 'image', title: 'alt', subtitle: 'caption' },
          },
        }],
        validation: (Rule) => Rule.min(1).error('Add at least one figure'),
      },
  
      { name: 'description', type: 'text', description: 'Optional text block under figures. Use new lines for breaks.' },
      { name: 'seoTitle', type: 'string', description: 'Optional <title> override' },
    ],
  }
  