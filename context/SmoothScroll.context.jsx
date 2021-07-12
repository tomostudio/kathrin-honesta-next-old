import React, { createContext, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { transition } from '@/components/utils/transition'

// Register Plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export const SmoothScrollContext = createContext({
  scroll: null,
})

export const SmoothScrollProvider = ({
  children,
  content,
  text,
  image,
  type,
}) => {
  const [scroll, setScroll] = useState(null)

  useEffect(() => {
    if (!scroll) {
      ;(async () => {
        try {
          const LocomotiveScroll = (await import('locomotive-scroll')).default

          setScroll(
            new LocomotiveScroll({
              el:
                document.querySelector('[data-scroll-container]') ?? undefined,
              smooth: true,
              smartphone: {
                smooth: true,
              },
              tablet: {
                smooth: true,
              },
              lerp: 0.07,
            }),
          )
        } catch (error) {
          throw Error(`[SmoothScrollProvider]: ${error}`)
        }
      })()
    }

    setTimeout(() => {
      if (scroll) {
        scroll.on('scroll', ScrollTrigger.update)

        ScrollTrigger.scrollerProxy('[data-scroll-container]', {
          scrollTop(value) {
            return arguments.length
              ? scroll.scrollTo(value, 0, 0)
              : scroll.scroll.instance.scroll.y
          }, // we don't have to define a scrollLeft because we're only scrolling vertically.
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            }
          },
          // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
          pinType: document.querySelector('[data-scroll-container]').style
            .transform
            ? 'transform'
            : 'fixed',
        })
        // ScrollTrigger.refresh()
        scroll.update()

        setTimeout(() => {
          if (type === 'all') {
            // Fungsi transisi
            transition({
              content: content,
              type: type,
            })
          } else if (type === 'projects') {
            // Fungsi transisi
            transition({
              content: content,
              text: text,
              image: image,
              type: type,
            })
          }
        }, 150)
      }
    }, 150)
    window.addEventListener(
      'resize',
      () => {
        if (window.innerWidth >= 768) {
          // Enable inview in desktop
          ScrollTrigger.getAll().forEach((ST) => ST.enable())
        } else {
          // Disable inview in mobile
          ScrollTrigger.getAll().forEach((ST) => ST.disable())
        }
      },
      false,
    )

    return () => {
      scroll && scroll.destroy()
    }
  }, [scroll]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SmoothScrollContext.Provider value={{ scroll }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

SmoothScrollContext.displayName = 'SmoothScrollContext'
SmoothScrollProvider.displayName = 'SmoothScrollProvider'
