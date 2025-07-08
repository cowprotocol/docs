import React from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly'
import BitteChat from '../components/BitteChat'

// The children prop contains the entire Docusaurus app
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BrowserOnly>{() => <BitteChat />}</BrowserOnly>
    </>
  )
}
