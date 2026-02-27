import React from 'react'
import OriginalDocItemLayout from '@theme-original/DocItem/Layout'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import AiActionsDropdown from '@site/src/components/AiActionsDropdown'

export default function DocItemLayout(props: React.ComponentProps<typeof OriginalDocItemLayout>) {
  const { metadata } = useDoc()

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: -8 }}>
        <AiActionsDropdown editUrl={metadata.editUrl} />
      </div>
      <OriginalDocItemLayout {...props} />
    </>
  )
}
