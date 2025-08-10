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

