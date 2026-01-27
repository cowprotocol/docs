import React, { useEffect, useState } from 'react'
import Head from '@docusaurus/Head'

import styles from './MevBlockerInterstitial.module.css'

const REDIRECT_URL = 'https://docs.mevblocker.io/'
const ANNOUNCEMENT_URL = 'https://www.smg.org/memo/mevblocker'
const DELAY_SECONDS = 10

const MevBlockerInterstitial = () => {
  const [remaining, setRemaining] = useState(DELAY_SECONDS)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          window.location.replace(REDIRECT_URL)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    const timeoutId = window.setTimeout(() => {
      window.location.replace(REDIRECT_URL)
    }, DELAY_SECONDS * 1000)

    return () => {
      window.clearInterval(intervalId)
      window.clearTimeout(timeoutId)
    }
  }, [])

  const secondLabel = remaining === 1 ? 'second' : 'seconds'

  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content={`${DELAY_SECONDS}; url=${REDIRECT_URL}`} />
        <link rel="canonical" href={REDIRECT_URL} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <title>MEV Blocker Update</title>
      </Head>
      <main className={styles.page}>
        <section className={styles.card} role="main">
          <span className={styles.tag}>MEV Blocker Update</span>
          <h1 className={styles.title}>MEV Blocker has been acquired.</h1>
          <p className={styles.announcement}>
            Read the announcement on{' '}
            <a
              className={styles.announcementLink}
              href={ANNOUNCEMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              smg.org
            </a>
            .
          </p>
          <p className={styles.text}>We are redirecting you to the new home.</p>
          <p className={styles.countdown} aria-live="polite">
            Redirecting you in {remaining} {secondLabel}.
          </p>
          <a className={styles.button} href={REDIRECT_URL}>
            Go to docs.mevblocker.io now
          </a>
          <p className={styles.fallback}>
            If you are not redirected{' '}
            <a className={styles.fallbackLink} href={REDIRECT_URL}>
              click here
            </a>
            .
          </p>
        </section>
      </main>
    </>
  )
}

export default MevBlockerInterstitial
