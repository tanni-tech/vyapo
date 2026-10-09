'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playTick } from '@/lib/audio'

gsap.registerPlugin(ScrollTrigger)

export function ClientInitializer() {
  useEffect(() => {
    // Global click-to-tick for all interactive elements
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [role="button"], input, select, textarea')
      if (interactive) playTick()
    }
    document.addEventListener('click', handleClick, { passive: true })

    ScrollTrigger.refresh()

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return null
}
