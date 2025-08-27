// /sanity/schemas/film.js
export default {
  name: 'film',
  title: 'Film',
  type: 'document',
  fields: [
    { name: 'title', title: 'Film Title', type: 'string', validation: Rule => Rule.required() },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    },

    // Listing meta
    { name: 'year', title: 'Year', type: 'string' },
    { name: 'duration', title: 'Duration', type: 'string' },

    // NEW — optional external link override
    {
      name: 'externalUrl',
      title: 'External link (optional)',
      type: 'url',
      description:
        'If set, clicking this film on the main Films page will open this URL in a new tab (e.g. Vimeo On Demand).',
      validation: Rule => Rule.uri({ scheme: ['http', 'https'] }),
    },

    // Thumbs
    { name: 'thumbnail', title: 'Thumbnail Image', type: 'image', options: { hotspot: true } },
    { name: 'hoverImage', title: 'Hover Image', type: 'image', options: { hotspot: true } },

    // Main video (embed URL)
    { name: 'mainVideo', title: 'Main Vimeo Embed URL', type: 'url' },

    // Optional watch/pay link
    { name: 'watchUrl', title: 'Optional “Watch/Pay” URL', type: 'url' },

    // Per-film video ratios
    {
      name: 'videoPaddingTop',
      title: 'Video padding-top (%) – desktop',
      type: 'number',
      description: 'Default 56.25 (16:9). Set 60 to match Headcases page.',
      initialValue: 56.25,
    },
    {
      name: 'videoPaddingTopMobile',
      title: 'Video padding-top (%) – mobile',
      type: 'number',
      description: 'Default 75 (taller on phones like legacy).',
      initialValue: 75,
    },

    { name: 'infoLine', title: 'Info line (bold)', type: 'string' },
    { name: 'mainCaption', title: 'Main Caption (under video)', type: 'string' },
    {
      name: 'mainCaptionStyle',
      title: 'Main Caption Style',
      type: 'string',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Italic', value: 'italic' },
          { title: 'Bold', value: 'bold' },
        ],
        layout: 'radio',
      },
      initialValue: 'bold',
    },

    { name: 'preVideo', title: 'Copy ABOVE the main video', type: 'array', of: [{ type: 'block' }] },
    { name: 'description', title: 'Copy BELOW the main video', type: 'array', of: [{ type: 'block' }] },

    {
      name: 'imageGrid',
      title: 'Image Grid',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          { name: 'alt', title: 'Alt text', type: 'string' },
          { name: 'caption', title: 'Caption (optional)', type: 'string' },
        ],
        preview: { select: { media: 'image', title: 'caption', subtitle: 'alt' } }
      }],
    },

    {
      name: 'footerImages',
      title: 'Footer Images (with captions)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          { name: 'caption', title: 'Caption', type: 'string' },
          { name: 'alt', title: 'Alt text', type: 'string' },
        ],
        preview: { select: { media: 'image', title: 'caption', subtitle: 'alt' } }
      }],
    },

    {
      name: 'sections',
      title: 'Extra Sections',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Section Title (h2)', type: 'string' },
          { name: 'videoUrl', title: 'Vimeo Embed URL', type: 'url' },
          { name: 'caption', title: 'Section Caption (below this video)', type: 'string' },
          { name: 'text', title: 'Section Text', type: 'array', of: [{ type: 'block' }] },
          { name: 'images', title: 'Optional Images (inline grid)', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
        ],
        preview: { select: { title: 'title', subtitle: 'videoUrl' } },
      }],
    },

    { name: 'backLinkLabel', title: 'Back link label', type: 'string', initialValue: '← back to films' },
    { name: 'seoTitle', title: 'SEO Title (optional)', type: 'string' },
  ],
  preview: { select: { title: 'title', subtitle: 'year', media: 'thumbnail' } },
}
