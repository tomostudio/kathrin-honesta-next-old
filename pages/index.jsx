import MainLayout from '@/components/layout/mainLayout'

import { SmoothScrollProvider } from '@/context/SmoothScroll.context'

export default function Home() {
  return (
    <MainLayout pageTitle="Home">
      <SmoothScrollProvider>
        <div style={{ hegiht: '200vh' }} data-scroll-container>
          <p>TES</p>
          <p>TES</p>
          <p>TES</p>
          <p>TES</p>
          <p>TES</p>
          <p>TES</p>
          <p>TES</p>
          <p>TES</p>
          <p>TES</p>
          <p>TES</p>
          <p>TES</p>
          <p>TES</p>
          <p>TES</p>
          <p>TES</p>
        </div>
      </SmoothScrollProvider>
    </MainLayout>
  )
}
