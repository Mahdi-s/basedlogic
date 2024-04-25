// pages/_app.tsx
import type { AppProps } from 'next/app'
import RootLayout from '@/app/layout' // replace with the actual path to your layout.tsx file

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  )
}

export default MyApp