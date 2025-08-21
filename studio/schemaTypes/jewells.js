export default {
    name: 'jewellsPage',
    title: 'Jewells Page',
    type: 'document',
    fields: [
    { name: 'title', type: 'string', initialValue: 'Jewells' },
    
    
    {
    name: 'introRows',
    title: 'Intro Rows',
    type: 'array',
    of: [
    {
    type: 'object',
    fields: [
    { name: 'image', type: 'image', options: { hotspot: true } },
    { name: 'alt', type: 'string', title: 'Alt text' },
    { name: 'caption', type: 'string', description: 'Optional small caption above text (e.g., “London Jewells 1978”)' },
    { name: 'text', type: 'text' },
    { name: 'reverse', type: 'boolean', description: 'When true, render text left / image right' },
    ],
    preview: {
    select: { media: 'image', title: 'caption', subtitle: 'text' },
    },
    },
    ],
    },
    
    
    { name: 'afterRowsParagraph', title: 'Paragraph after rows', type: 'text' },
    
    
    { name: 'sectionHeading', type: 'string' },
    
    
    { name: 'videoUrl', title: 'Vimeo Player URL', type: 'url' },
    ],
    }