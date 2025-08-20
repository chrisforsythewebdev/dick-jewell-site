export const allFilmsQuery = `
  *[_type == "film"] | order(year desc) {
    _id,
    title,
    slug,
    year,
    duration,
    "thumbnail": thumbnail.asset->url,
    "hoverImage": hoverImage.asset->url
  }
`
export const photoPageQuery = `
  *[_type == "photoPage"][0] {
    title,
    "carouselImages": carouselImages[].asset->url,
    photos[] {
      title,
      "image": image.asset->url,
      "hoverImage": hoverImage.asset->url
    }
  }
`

export const booksPageQuery = `
  *[_type == "booksPage"][0]{
    title,
    catalogue{
      title,
      "image": image.asset->url,
      link,
      caption
    },
    intro,
    "bookCarousel": bookCarousel[]{
      "image": image.asset->url,
      caption
    },
    afterCarouselCaption,
    regions[]{
      title,
      items[]{
        "image": image.asset->url,
        hostedButtonId,
        label
      }
    },
    "paypalClientId": paypal.clientId,
    "paypalCurrency": coalesce(paypal.currency, "GBP")
  }
`

export const boxPageQuery = `
  *[_type == "boxPage"][0]{
    title,
    intro,
    "carouselImages": carouselImages[].asset->url,
    afterCarouselNote,
    figures[]{
      caption,
      "image": image.asset->url
    }
  }
`

// PRINT LIST PAGE
export const allPrintsQuery = `
*[_type == "print"]{
  _id,
  title,
  slug,
  year,
  process,
  layout,
  align,
  "thumbnail": coalesce(
    images[isPrimary == true][0].image.asset->url,
    images[0].image.asset->url
  )
} | order(year asc, title asc)
`;

// PRINT DETAIL PAGE
export const printBySlugQuery = `
  *[_type == "print" && slug.current == $slug][0]{
    _id,
    title,
    year,
    process,
    dimensions,
    description,
    "images": images[]{
      "url": image.asset->url,
      caption
    }
  }
`

// FOUND PHOTOS PAGE
export const foundPhotosQuery = `
  *[_type == "foundPhotos"][0]{
    title,
    intro,

    "mainCarouselImages": mainCarouselImages[].asset->url,

    threeRow[]{
      "image": image.asset->url,
      alt,
      caption1,
      caption2,
      link
    },

    fullWidthFigure{
      "image": image.asset->url,
      alt,
      caption
    },

    subheading1,
    subintro1,

    "secondCarouselImages": secondCarouselImages[].asset->url,

    videoRow{
      leftVimeo,
      leftCaption,
      "middleImage": middleImage.asset->url,
      middleAlt,
      middleCaption,
      rightVimeo,
      rightCaption
    },

    singleVideo{ src, caption },

    subheading2,

    largeMedia[]{
      "image": image.asset->url,
      alt,
      caption
    }
  }
`



