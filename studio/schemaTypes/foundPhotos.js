export default {
    name: 'foundPhotos',
    title: 'Found Photos Page',
    type: 'document',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'intro', type: 'text' },
  
      { name: 'mainCarouselImages', title: 'Main Carousel', type: 'array', of: [{ type: 'image' }] },
  
      {
        name: 'threeRow',
        title: 'Row of Three',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            { name: 'image', type: 'image' },
            { name: 'alt', type: 'string' },
            { name: 'caption1', type: 'string' },
            { name: 'caption2', type: 'string' },
            { name: 'link', type: 'url' },
          ]
        }]
      },
  
      {
        name: 'fullWidthFigure',
        title: 'Full-width Figure',
        type: 'object',
        fields: [
          { name: 'image', type: 'image' },
          { name: 'alt', type: 'string' },
          { name: 'caption', type: 'string' },
        ]
      },
  
      { name: 'subheading1', type: 'string' },
      { name: 'subintro1', type: 'string' },
  
      { name: 'secondCarouselImages', title: 'Second Carousel', type: 'array', of: [{ type: 'image' }] },
  
      {
        name: 'videoRow',
        type: 'object',
        fields: [
          { name: 'leftVimeo', type: 'url' },
          { name: 'leftCaption', type: 'text' },
          { name: 'middleImage', type: 'image' },
          { name: 'middleAlt', type: 'string' },
          { name: 'middleCaption', type: 'text' },
          { name: 'rightVimeo', type: 'url' },
          { name: 'rightCaption', type: 'text' },
        ]
      },
  
      {
        name: 'singleVideo',
        type: 'object',
        fields: [
          { name: 'src', type: 'url' },
          { name: 'caption', type: 'text' },
        ]
      },
  
      { name: 'subheading2', type: 'string' },
  
      {
        name: 'largeMedia',
        title: 'Large Media Blocks',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            { name: 'image', type: 'image' },
            { name: 'alt', type: 'string' },
            { name: 'caption', type: 'text' },
          ]
        }]
      },
    ],
  }
  