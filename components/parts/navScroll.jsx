import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { useAppContext } from '@/context/store'
import scrollToTop from '@/components/utils/scrollToTop'

const NavScroll = ({
  topTitle,
  topLink,
  backTop = false,
  prev = null,
  next = null,
}) => {
  const [scrollEnd, setScrollEnd] = useState(false)
  const context = useAppContext()

  // Window Height
  const windowHeight = () =>
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.getElementsByTagName('body')[0].clientHeight

  // Detect Scroll
  const detectScroll = () => {
    const currentScroll = window.scrollY
    const totalHeight = document.body.clientHeight

    if (
      totalHeight > 0 &&
      currentScroll > totalHeight - windowHeight() * 1.1 &&
      totalHeight > windowHeight() * 1.1
    ) {
      setScrollEnd(true)
    } else {
      setScrollEnd(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', detectScroll, false)
    return () => {
      window.removeEventListener('scroll', detectScroll, false)
    }
  }, [])

  return (
    <section className="navScroll">
      <div className="top">
        <Link
          href={`/${topLink}`}
          onMouseEnter={() => context.cursorChangeHandler('hovered')}
          onMouseLeave={() => context.cursorChangeHandler('')}
        >
          {topTitle}
        </Link>
      </div>
      {backTop ? (
        <div className={scrollEnd ? 'bottom scrollEnd' : 'bottom'}>
          <div>Scroll</div>
          <div className={prev || next ? 'detail' : null}>
            {prev ? (
              <Link
                href={`/projects/${prev}`}
                onMouseEnter={() => context.cursorChangeHandler('hovered')}
                onMouseLeave={() => context.cursorChangeHandler('')}
              >
                Previous Project
              </Link>
            ) : (
              <div />
            )}
            <button
              onClick={() => scrollToTop()}
              onMouseEnter={() => context.cursorChangeHandler('hovered')}
              onMouseLeave={() => context.cursorChangeHandler('')}
            >
              Back to Top
            </button>
            {next ? (
              <Link
                href={`/projects/${next}`}
                onMouseEnter={() => context.cursorChangeHandler('hovered')}
                onMouseLeave={() => context.cursorChangeHandler('')}
              >
                Next Project
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default NavScroll
