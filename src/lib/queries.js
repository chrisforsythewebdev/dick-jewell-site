// List page – oldest first 
export const filmsListQuery = /* groq */ `
  *[_type == "film"] | order(year asc){
    _id,
    title,
    year,
    duration,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url,
    "hoverImage": hoverImage.asset->url
  }
`;

// Detail page by slug – everything the renderer needs
export const filmBySlugQuery = /* groq */ `
  *[_type == "film" && slug.current == $slug][0]{
    title,
    seoTitle,
    year,
    duration,
    watchUrl,
    mainVideo,
    videoPaddingTop,
    videoPaddingTopMobile,
    infoLine,
    mainCaption,
    mainCaptionStyle,
    preVideo,
    description,
    "imageGrid": imageGrid[]{
      "url": image.asset->url,
      "alt": coalesce(alt, ""),
      "caption": caption
    },
    "footerImages": footerImages[]{
      "url": image.asset->url,
      "alt": coalesce(alt, ""),
      "caption": caption
    },
    sections[]{
      title,
      videoUrl,
      caption,
      text,
      "images": images[].asset->url
    },
    backLinkLabel
  }
`;

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

export const jewellsPageQuery = `
*[_type == "jewellsPage"][0]{
title,
introRows[]{
"image": image.asset->url,
alt,
caption,
text,
reverse
},
afterRowsParagraph,
sectionHeading,
videoUrl
}
`

export const montagesPageQuery = `
  *[_type == "montagesPage"][0]{
    title,
    intro,
    items[]{
      href,
      "image": image.asset->url,
      alt,
      title,
      subtitle,
      wide
    }
  }
`

export const montageWorkSlugsQuery = `
  *[_type == "montageWork" && defined(slug.current)][].slug.current
`

export const montageWorkBySlugQuery = `
  *[_type == "montageWork" && slug.current == $slug][0]{
    title,
    backLabel,
    backHref,
    figures[]{
      "image": image.asset->url,
      alt,
      caption
    },
    description,
    seoTitle
  }
`

export const showsPageQuery = /* groq */ `
  *[_type == "showsPage"][0]{
    title,
    sections[]{
      heading,
      anchorId,
      // single static image block (no controls)
      singleImage{
        "image": image.asset->url,
        alt
      },

      // mixed slides
      "slides": slides[]{
        // normalize both slide types into a flat shape the component expects
        _type,
        // image slide
        "type": select(
          defined(image) => "image",
          defined(mp4) => "video",
          _type
        ),
        "image": image.asset->url,
        alt,
        linkHref,
        linkTarget,
        // video slide
        "mp4": mp4.asset->url,         
        "poster": poster.asset->url,
        captionHtml
      },

      withControls,
      caption,
      captionClass
    }
  }
`

export const commercialPageQuery = /* groq */ `
*[_type == "commercialPage"][0]{
  title,
  intro,
  items[]{
    _key,
    // link target
    "slug": video->slug.current,
    "title": video->title,
    alt,
    captionHtml,
    // images
    "thumb": thumb{ "assetUrl": asset->url },
    "hoverThumb": hoverThumb{ "assetUrl": asset->url }
  },
  singleImages[]{
    _key,
    "image": image{ "assetUrl": asset->url },
    alt,
    caption
  },
  miniGalleries[]{
    _key,
    wrapTopRow,
    groupCaption,
    images[]{
      _key,
      "assetUrl": image.asset->url,
      alt
    }
  }
}
`

export const commercialVideoBySlugQuery = /* groq */ `
*[_type == "commercialVideo" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  seoTitle,
  vimeoUrl,
  descriptionHtml,
  backLabel
}
`

// Header (banner + sublinks)
export const kinkyGerlinkyHeaderQuery = /* groq */ `
*[_type == "kinkyGerlinkySettings"][0]{
  "bannerUrl": banner.asset->url,
  "links": links[]{
    label,
    target,
    "href": select(
      type == "dvd" => "/kinky-gerlinky/dvds/" + dvdRef->slug.current,
      type == "static" => "/kinky-gerlinky/" + staticRef->slug.current,
      type == "external" => url,
      null
    )
  }
}
`

// Landing page content
export const kinkyGerlinkyPageQuery = /* groq */ `
*[_type == "kinkyGerlinkyPage"][0]{
  title,
  intro,
  // left column
  "leftGallery": leftGallery[]{
    "image": image.asset->url,
    alt,
    caption
  },
  // right column
  screenings{
    heading,
    "blocks": blocks[]{
      "image": image.asset->url,
      alt,
      textHtml
    },
    extraList,
    closingHtml
  }
}
`

export const KG_BUY_DVD = /* groq */ `
  *[_type == "kinkyGerlinkyBuyDvd"][0]{
    title,
    "slug": slug.current,
    info,
    "cover": { "url": cover.asset->url, "alt": coalesce(cover.alt, "") },
    watchUrl,
    "stills": stills[]{ "url": asset->url, "alt": coalesce(alt, "") },
    "press": pressRelease{
      "url": image.asset->url,
      "alt": coalesce(image.alt, ""),
      "caption": caption
    }
  }
`

export const KG_VHS = /* groq */ `
  *[_type == "kinkyGerlinkyVhs"][0]{
    title,
    "slug": slug.current,
    intro,
    seriesUrl,
    episodes[]{
      title,
      date,
      "thumb": { "url": thumb.asset->url, "alt": thumb.alt },
      vimeoUrl,
      details,
      "stills": stills[]{ "url": asset->url, "alt": alt }
    }
  }
`
export const KG_REVIEWS = /* groq */ `
  *[_type == "kinkyGerlinkyReviews"][0]{
    title,
    "slug": slug.current,
    "items": items[]{
      "url": image.asset->url,
      "alt": coalesce(image.alt, ""),
      caption
    },
    "arrows": {
      "next": arrows.next.asset->url,
      "back": arrows.back.asset->url
    }
  }
`
export const KG_TRAILER = /* groq */ `
  *[_type == "kinkyGerlinkyTrailer"][0]{
    title,
    "slug": slug.current,
    embedUrl
  }
`

export const KG_MODELS_BALL = /* groq */ `
  *[_type == "kgModelsBallPage"][0]{
    title,
    subtitle,
    watchUrl,
    embedUrl,
    description,
    "images": images[]{
      "url": image.asset->url,
      "alt": coalesce(alt, ""),
      caption
    }
  }
`

