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
