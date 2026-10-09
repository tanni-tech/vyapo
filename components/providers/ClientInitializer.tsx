'use client'

import { useEffect } from 'react'
import { audio } from '@/lib/audio'

export function ClientInitializer() {
  useEffect(() => {
    // Load audio files from /public/audio/ — no-ops if not present yet
    audio.load()

    // Global click-to-tick for all interactive elements
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [role="button"], input, select, textarea')
      if (interactive) {
        audio.play('tick')
      }
    }
    document.addEventListener('click', handleClick, { passive: true })

    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
