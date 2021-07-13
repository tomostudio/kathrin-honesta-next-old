import React, { useEffect } from 'react'
import Head from 'next/head'
import { LazyMotion, domAnimation, m } from 'framer-motion'

// Layout
import Navigation from '../parts/navigation'
import CustomCursor from '../parts/cursor'

// Function
import checkCursor from '../utils/checkCursor'
import topResize from '../utils/topResize'

const MainLayout = ({ pageTitle, children }) => {
  const PageTitle = pageTitle
    ? `${pageTitle} ⟡ Kathrin Honesta Portfolio Website`
    : 'Kathrin Honesta Portfolio Website'

  const duration = 0.5
  const variant = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        duration: duration,
        delay: duration,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  }

  useEffect(() => {
    checkCursor()

    topResize()
    window.addEventListener('resize', checkCursor, false)

    return () => {
      window.removeEventListener('resize', checkCursor, false)
    }
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <m.main
        variants={variant}
        initial="initial"
        animate="enter"
        exit="exit"
        id="container"
      >
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1,viewport-fit=cover"
          />
        </Head>
        <Navigation />
        <CustomCursor />
        {children}
      </m.main>
    </LazyMotion>
  )
}

export default MainLayout
