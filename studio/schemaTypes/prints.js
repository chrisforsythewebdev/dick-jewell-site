// studio/schemaTypes/print.js
export default {
  name: 'print',
  title: 'Print',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: r => r.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: r => r.required() },

    // keep year as string if you want
    { name: 'year', title: 'Year', type: 'string' },

    // “process line” under the title, e.g. “Photolithograph 1978”
    { name: 'process', title: 'Process / Line under title', type: 'string' },

    // images
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: r => r.required() },
          { name: 'caption', title: 'Caption (HTML allowed: <br/>)', type: 'string' },
          { name: 'isPrimary', title: 'Primary (grid thumbnail)', type: 'boolean' },
          {
            name: 'desktopHeightPx',
            title: 'Desktop fixed height (px)',
            type: 'number',
            description: 'Set e.g. 700 to mimic legacy tall heroes (Marilyn/Mixed Messaging/Niagra/A Change Of Face). On mobile it will auto-size.',
            validation: Rule => Rule.min(100).max(2000).warning('Only set when you need a fixed-height desktop hero.')
          },
        ]
      }],
      validation: r => r.min(1)
    },

    // OPTIONAL: control how each tile spans in the grid to match your HTML
    {
      name: 'layout',
      title: 'Grid Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Normal (1 col)', value: 'normal' },
          { title: 'Medium (span 2)', value: 'medium' },
          { title: 'Wide (full row)', value: 'wide' },
        ]
      },
      initialValue: 'normal',
    },
    {
      name: 'align',
      title: 'Image Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Default/center', value: 'center' },
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ]
      },
      initialValue: 'center',
    },

    // detail page extras
    { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },

    // Where to place the description relative to images (to match legacy pages)
    {
      name: 'descriptionPosition',
      title: 'Where to show Description',
      type: 'string',
      options: {
        list: [
          { title: 'Below all images', value: 'belowAll' },
          { title: 'After first image', value: 'afterFirst' },
        ]
      },
      initialValue: 'belowAll',
    },

    // Global fallback for a simple meta line (e.g. Idol Worship)
    { name: 'dimensions', title: 'Dimensions (optional)', type: 'string' }, // e.g. “82 × 81 cm”

    // Optional SEO override
    { name: 'seoTitle', title: 'SEO Title (optional)', type: 'string' },
  ],
  preview: {
    select: { title: 'title', media: 'images.0.image', subtitle: 'year' }
  }
}
