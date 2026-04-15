import React, { useEffect } from 'react'
import { useLocation } from '@docusaurus/router'
import OriginalNotFound from '@theme-original/NotFound'

const MEV_PREFIX = '/mevblocker/'
const MEV_REDIRECT = '/mevblocker'

const NotFound = (props: React.ComponentProps<typeof OriginalNotFound>) => {
  const { pathname } = useLocation()
  const shouldRedirect = pathname.startsWith(MEV_PREFIX)

  useEffect(() => {
    if (shouldRedirect) {
      window.location.replace(MEV_REDIRECT)
    }
  }, [shouldRedirect])

  if (shouldRedirect) {
    return (
      <main className="container margin-vert--xl">
        <h1>Redirecting...</h1>
        <p>
          This content has moved. Taking you to <a href={MEV_REDIRECT}>/mevblocker</a>.
        </p>
      </main>
    )
  }

  return <OriginalNotFound {...props} />
}

export default NotFound
