// studio/schemaTypes/print.js
export default {
    name: 'print',
    title: 'Print',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string', validation: r => r.required() },
      { name: 'slug',  title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: r => r.required() },
  
      // keep year as string if you want, but we’ll also compute a yearNum in the query
      { name: 'year',  title: 'Year', type: 'string' },
  
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
            { name: 'caption', title: 'Caption', type: 'string' },
            { name: 'isPrimary', title: 'Primary (grid thumbnail)', type: 'boolean' },
          ]
        }],
        validation: r => r.min(1)
      },
  
      // OPTIONAL: control how each tile spans in the grid to match your HTML
      {
        name: 'layout',
        title: 'Grid Layout',
        type: 'string',
        options: { list: [
          { title: 'Normal (1 col)', value: 'normal' },
          { title: 'Medium (span 2)', value: 'medium' },
          { title: 'Wide (full row)', value: 'wide' },
        ]},
        initialValue: 'normal',
      },
      {
        name: 'align',
        title: 'Image Alignment',
        type: 'string',
        options: { list: [
          { title: 'Default/center', value: 'center' },
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ]},
        initialValue: 'center',
      },
  
      // detail page extras
      { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
      // if you like, add dimensions per image caption, or a global field:
      { name: 'dimensions', title: 'Dimensions (optional)', type: 'string' }, // e.g. “82 × 81 cm”
    ],
    preview: {
      select: { title: 'title', media: 'images.0.image', subtitle: 'year' }
    }
  }
  