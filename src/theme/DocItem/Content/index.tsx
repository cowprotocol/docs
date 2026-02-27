import React from 'react'
import clsx from 'clsx'
import {ThemeClassNames} from '@docusaurus/theme-common'
import {useDoc} from '@docusaurus/plugin-content-docs/client'
import Heading from '@theme/Heading'
import MDXContent from '@theme/MDXContent'
import AiActionsDropdown from '@site/src/components/AiActionsDropdown'

function useSyntheticTitle() {
  const {metadata, frontMatter, contentTitle} = useDoc()
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined'
  if (!shouldRender) {
    return null
  }
  return metadata.title
}

export default function DocItemContent({children}: {children: React.ReactNode}) {
  const syntheticTitle = useSyntheticTitle()
  const {metadata} = useDoc()

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Heading as="h1">{syntheticTitle}</Heading>
          <AiActionsDropdown editUrl={metadata.editUrl} />
        </header>
      )}
      {!syntheticTitle && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: -16 }}>
          <AiActionsDropdown editUrl={metadata.editUrl} />
        </div>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  )
}
