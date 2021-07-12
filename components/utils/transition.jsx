import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register Plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export const transition = ({ content, text, image, type }) => {
  ScrollTrigger.matchMedia({
    '(min-width: 768px)': () => {
      if (type === 'projects') {
        if (content.current && text.current && image.current) {
          // Fade out text pertama
          gsap.fromTo(
            content.current.children[0].children[0],
            { opacity: 1 },
            {
              opacity: 0,
              scrollTrigger: {
                trigger: content.current.children[0],
                scroller: '[data-scroll-container]',
                start: 'top 0%',
                end: 'bottom 80%',
                scrub: true,
              },
            },
          )

          //fade in text terakhir
          const tlText = gsap.timeline({
            scrollTrigger: {
              trigger:
                content.current.children[content.current.children.length - 1]
                  .children[0],
              scroller: '[data-scroll-container]',
              start: 'top 40%',
              end: 'bottom 100%',
              scrub: true,
            },
          })
          tlText
            .from(
              content.current.children[content.current.children.length - 1]
                .children[0],
              {
                opacity: 0,
              },
            )
            .to(
              content.current.children[content.current.children.length - 1]
                .children[0],
              {
                opacity: 1,
              },
            )

          // looping data
          gsap.utils.toArray(image.current).forEach((section, id) => {
            if (id === 0) {
              // fade text title pertama
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: content.current.children[0],
                  scroller: '[data-scroll-container]',
                  start: 'top 20%',
                  end: 'bottom 10%',
                  scrub: true,
                },
              })
              tl.from(text.current.children[0], {
                opacity: 0,
              })
                .to(text.current.children[0], {
                  opacity: 1,
                })
                .to(text.current.children[0], {
                  opacity: 0,
                })
            } else {
              if (content.current.children[id] && text.current.children[id]) {
                // fade text title
                const tlText = gsap.timeline({
                  scrollTrigger: {
                    trigger: content.current.children[id],
                    scroller: '[data-scroll-container]',
                    start: 'top 40%',
                    end: 'bottom 0%',
                    scrub: true,
                  },
                })
                tlText
                  .from(text.current.children[id], {
                    opacity: 0,
                  })
                  .to(text.current.children[id], {
                    opacity: 1,
                  })
                  .to(text.current.children[id], {
                    opacity: 0,
                  })
              }
            }

            if (section) {
              // fade image
              const tlImage = gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  scroller: '[data-scroll-container]',
                  start: 'top 80%',
                  end: 'bottom 30%',
                  scrub: true,
                },
              })
              tlImage
                .from(section.children[0], {
                  opacity: 0,
                })
                .to(section.children[0], {
                  opacity: 1,
                })
                .to(section.children[0], {
                  opacity: 0,
                })
            }
          })
        }
      } else if (type === 'all') {
        if (content.current) {
          // looping data
          gsap.utils.toArray(content.current).forEach((section, id) => {
            if (section) {
              // fade
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  scroller: '[data-scroll-container]',
                  start: 'top 80%',
                  end: 'bottom 35%',
                  scrub: true,
                },
              })
              tl.from(section, {
                opacity: 0,
              })
                .to(section, {
                  opacity: 1,
                })
                .to(section, {
                  opacity: 0,
                })
            }
          })
        }
      }
    },
    // mobile
    '(max-width: 767px)': () => {
      ScrollTrigger.getAll().forEach((t) => {
        t.kill()
      })

      if (type === 'projects') {
        if (content.current && text.current && image.current) {
          content.current.children[0].children[0].removeAttribute('style')
          for (let i = 0; i < text.current.children.length; i++) {
            text.current.children[i].removeAttribute('style')
          }
          for (let i = 0; i < image.current.length; i++) {
            if (image.current[i]) {
              image.current[i].children[0].removeAttribute('style')
            }
          }
        }
      } else if (type === 'all') {
        if (content.current) {
          for (let i = 0; i < content.current.length; i++) {
            if (content.current[i]) {
              content.current[i].removeAttribute('style')
            }
          }
        }
      }
    },
  })
}
