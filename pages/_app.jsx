import '@/styles/global.scss'
import { AppWrapper } from '@/context/store'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <AppWrapper>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </AppWrapper>
  )
}

export default MyApp
