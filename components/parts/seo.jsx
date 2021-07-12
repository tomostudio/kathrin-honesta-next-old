import React from 'react'
import { NextSeo } from 'next-seo'

const SEO = ({ seo }) => {
  const { title, description, pagelink, image, image_alt, webTitle } = seo
  const pagetitle =
    title && webTitle
      ? `${title} ⟡ ${webTitle}`
      : `Kathrin Honesta Portfolio Website`
  // const canonicalLink = `https://radstudio.id${pagelink ? `${pagelink.startsWith('/') ? '' : '/'}${pagelink}` : ''
  //     }`;

  return (
    <>
      <NextSeo
        title={pagetitle}
        description={description}
        // canonical={canonicalLink}
        openGraph={{
          // url: canonicalLink,
          title: pagetitle,
          description: description,
          images: [
            {
              url: image,
              alt: image_alt,
            },
          ],
          site_name: 'RAD studio',
        }}
        twitter={{
          site: 'RAD studio',
          cardType: 'summary_large_image',
        }}
      />
    </>
  )
}

export default SEO
