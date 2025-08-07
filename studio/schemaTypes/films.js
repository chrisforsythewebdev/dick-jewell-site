export default {
  name: 'film',
  title: 'Film',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Film Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'hoverImage',
      title: 'Hover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'mainVideo',
      title: 'Main Vimeo URL',
      type: 'url',
    },
    {
      name: 'mainCaption',
      title: 'Main Caption',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Intro Text',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'sections',
      title: 'Subsections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Subsection Title', type: 'string' },
            { name: 'videoUrl', title: 'Vimeo URL', type: 'url' },
            { name: 'text', title: 'Paragraph Text', type: 'array', of: [{ type: 'block' }] },
          ],
        },
      ],
    },
  ],
}
