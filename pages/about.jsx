import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import BlockContent from '@sanity/block-content-to-react'
import { useRouter } from 'next/router'

// Layout
import NavScroll from '@/components/parts/navScroll'
import MainLayout from '@/components/layout/mainLayout'
import SEO from '@/components/parts/seo'
import client from '@/components/utils/client'

// Css
import styles from '@/styles/modules/about.module.scss'

// Function
import { useAppContext } from '@/context/store'
import urlFor from '@/components/utils/urlFor'
import { SmoothScrollProvider } from '@/context/SmoothScroll.context'

const AboutPage = ({ about, seo }) => {
  const router = useRouter()
  const context = useAppContext()
  const contentRef = useRef(new Array())

  return (
    <MainLayout pageTitle="About">
      <NavScroll topTitle="Close" topLink="" />
      <SEO
        seo={{
          title: 'About',
          webTitle: seo[0].webTitle,
          pagelink: router.pathname,
          description: seo[0].seo.seo_description
            ? seo[0].seo.seo_description
            : '',
          image: seo[0].seo.seo_image ? urlFor(seo[0].seo.seo_image).url() : '', 
          image_alt: seo[0].seo.seo_image.name ? seo[0].seo.seo_image.name : '', 
        }}
      />
      <SmoothScrollProvider content={contentRef} type="all">
        <section id={styles.about} className="content" data-scroll-container>
          <div />
          <div ref={(el) => contentRef.current.push(el)}>
            <BlockContent blocks={about[0].title} />
          </div>
          <div
            className={styles.clients}
            ref={(el) => contentRef.current.push(el)}
          >
            <div>
              <span>Selected Clients</span>
            </div>
            <div>
              {about[0].selected_clients.map((data, id) => (
                <div key={id}>
                  <Image
                    src={urlFor(data.image).url()}
                    alt={data.name}
                    layout="fill"
                    loading="eager"
                    objectFit="contain"
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            className={styles.press}
            ref={(el) => contentRef.current.push(el)}
          >
            <div>
              <span>Press</span>
            </div>
            <div>
              {about[0].press.map((data, id) => (
                <a
                  href={data.link}
                  key={id}
                  rel="noreferrer"
                  target="_blank"
                  onMouseEnter={() => context.cursorChangeHandler('hovered')}
                  onMouseLeave={() => context.cursorChangeHandler('')}
                >
                  {data.name}
                </a>
              ))}
            </div>
          </div>
          <div
            className={styles.contact}
            ref={(el) => contentRef.current.push(el)}
          >
            <div>
              <span>Contact</span>
            </div>
            <div>
              {about[0].contact.map((data, id) => (
                <a
                  href={data.link}
                  key={id}
                  rel="noreferrer"
                  target="_blank"
                  onMouseEnter={() => context.cursorChangeHandler('hovered')}
                  onMouseLeave={() => context.cursorChangeHandler('')}
                >
                  {data.name}
                </a>
              ))}
            </div>
          </div>
          <div className={styles.footer}>
            <span>{about[0].footer}</span>
          </div>
        </section>
      </SmoothScrollProvider>
    </MainLayout>
  )
}

export async function getStaticProps() {
  const about = await client.fetch(`
    *[_type == "about"]
  `)
  const seo = await client.fetch(`
  *[_type == "general"]
  `)
  return {
    props: {
      about,
      seo,
    },
  }
}

export default AboutPage
