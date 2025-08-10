export default {
    name: 'booksPage',
    title: 'Books Page',
    type: 'document',
    fields: [
      { name: 'title', title: 'Page Title', type: 'string' },
  
      // Catalogue section grouped into one object
      {
        name: 'catalogue',
        title: 'Catalogue',
        type: 'object',
        fields: [
          { name: 'title', title: 'Catalogue Title', type: 'string' },
          { name: 'image', title: 'Catalogue Image', type: 'image', options: { hotspot: true } },
          { name: 'link', title: 'Catalogue Purchase Link', type: 'url' },
          { name: 'caption', title: 'Catalogue Caption', type: 'text' },
        ],
      },
  
      // Intro line for the book on sale
      { name: 'intro', title: 'Intro (e.g., book on sale)', type: 'string' },
  
      // Carousel (inline object type with image + caption)
      {
        name: 'bookCarousel',
        title: 'Book Carousel',
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
  
      // Caption below carousel
      { name: 'afterCarouselCaption', title: 'After-carousel Caption', type: 'text' },
  
      // Regions + items (all inline)
      {
        name: 'regions',
        title: 'Shop Regions',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'title', title: 'Region Title', type: 'string' },
              {
                name: 'items',
                title: 'Items',
                type: 'array',
                of: [
                  {
                    type: 'object',
                    fields: [
                      { name: 'image', title: 'Product Image', type: 'image', options: { hotspot: true } },
                      { name: 'hostedButtonId', title: 'PayPal Hosted Button ID', type: 'string' },
                      { name: 'label', title: 'Label (optional)', type: 'string' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
  
      // PayPal config grouped into one object
      {
        name: 'paypal',
        title: 'PayPal',
        type: 'object',
        fields: [
          { name: 'clientId', title: 'Client ID', type: 'string' },
          { name: 'currency', title: 'Currency', type: 'string', initialValue: 'GBP' },
        ],
      },
    ],
  }
  