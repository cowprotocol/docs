import React, { useState, useEffect } from 'react'

// Polyfill for Node.js globals in browser
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.global = window.global || window
  // @ts-ignore
  window.process = window.process || { env: {}, browser: true }
}

export default function BitteChat() {
  const [BitteWidgetChat, setBitteWidgetChat] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadWidget = async () => {
      try {
        const module = await import('@bitte-ai/chat')

        if (isMounted) {
          const Component = module.BitteWidgetChat || module.default

          if (Component) {
            setBitteWidgetChat(() => Component)
          } else {
            console.warn('BitteWidgetChat component not found')
          }
        }
      } catch (err) {
        console.warn('Failed to load BitteWidgetChat:', err)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadWidget()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading || !BitteWidgetChat) {
    return null
  }

  return (
    <BitteWidgetChat
      agentId="near-cow-agent-git-docs-bitteprotocol.vercel.app"
      options={{
        agentName: 'CoW Swap Assistant',
        agentImage: '/favicon-dark-mode.png',
      }}
      apiUrl="/api/bitte/chat"
      historyApiUrl="/api/bitte/history"
      wallet={{
        evm: {
          address: undefined,
          sendTransaction: async () => {
            console.warn('sendTransaction not implemented yet')
            return null
          },
          switchChain: async () => {
            console.warn('switchChain not implemented yet')
          },
        },
      }}
      widget={{
        widgetWelcomePrompts: {
          questions: ['What is CoW Swap?', 'How does CoW Protocol work?', 'What are the benefits of using CoW Swap?'],
          actions: ['Swap tokens', 'Check price', 'View orders'],
        },
      }}
    />
  )
}
