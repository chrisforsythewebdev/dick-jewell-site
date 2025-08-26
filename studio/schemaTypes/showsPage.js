export default {
    name: 'showsPage',
    title: 'Shows Page',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', initialValue: 'some of my shows' },
  
      {
        name: 'sections',
        title: 'Show Sections',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'heading', type: 'string', title: 'Heading (e.g., LONDON 2010)' },
              { name: 'anchorId', type: 'string', description: 'Optional id attribute for in-page anchors' },
  
              // If you only need a single static image (no arrows)
              {
                name: 'singleImage',
                type: 'object',
                fields: [
                  { name: 'image', type: 'image' },
                  { name: 'alt', type: 'string' },
                ],
              },
  
              // For carousels (images and/or video)
              {
                name: 'slides',
                title: 'Slides',
                type: 'array',
                of: [
                  {
                    name: 'imageSlide',
                    title: 'Image Slide',
                    type: 'object',
                    fields: [
                      { name: 'type', type: 'string', initialValue: 'image', readOnly: true },
                      { name: 'image', type: 'image' },
                      { name: 'alt', type: 'string' },
                      { name: 'linkHref', type: 'string', description: 'Optional link wrapping this slide' },
                      { name: 'linkTarget', type: 'string', options: { list: ['_blank'] }, description: 'Set to _blank for new tab' },
                    ],
                  },
                // inside slides[].of[] => videoSlide
                {
                    name: 'videoSlide',
                    title: 'Video Slide',
                    type: 'object',
                    fields: [
                    { name: 'type', type: 'string', initialValue: 'video', readOnly: true },
                    { name: 'mp4', type: 'file', title: 'MP4 file', options: { accept: 'video/mp4' } }, // ⬅️ file, not url
                    { name: 'poster', type: 'image', title: 'Poster image (optional)' },
                    { name: 'captionHtml', type: 'text', description: 'Optional caption (HTML allowed, \\n → <br>)' },
                    { name: 'linkHref', type: 'string' },
                    { name: 'linkTarget', type: 'string', options: { list: ['_blank'] } },
                    ],
                }      
                ],
              },
  
              // Show/hide arrows; defaults to true if omitted
              { name: 'withControls', type: 'boolean', initialValue: true },
  
              // Paragraph under the section (supports \\n for <br>)
              { name: 'caption', type: 'text', title: 'Caption/Paragraph below' },
              { name: 'captionClass', type: 'string', description: 'Optional class for caption (default: caption)' },
            ],
            preview: {
              select: { title: 'heading', subtitle: 'caption' },
            },
          },
        ],
      },
    ],
  }
  