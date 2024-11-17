'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const EditorArea = dynamic(() => import('@/components/editor-area'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
})

export default function Editor() {
  return (
    <main>
      <EditorArea />
    </main>
  )
}