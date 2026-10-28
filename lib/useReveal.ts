'use client'

import { useEffect, useRef, useState } from 'react'

type RevealOptions = {
  threshold?: number
  rootMargin?: string
  delay?: number
  /**
   * direction: which fallback transition class to use. When the browser
   * supports CSS scroll-driven animations the hook returns `sfx` classes
   * instead and all JS state is ignored (the CSS handles it both ways).
   */
  direction?: 'up' | 'left' | 'right' | 'scale'
}

/**
 * Bidirectional scroll reveal: the element animates in as it enters the
 * viewport AND back out as it leaves, so scrolling up and down replays it.
 *
 * - Native path: if `CSS.supports('animation-timeline: view()')`, the
 *   returned className carries `sfx sfx-<dir>` and the CSS in globals.css
 *   drives the animation via a view() timeline. No JS.
 * - Fallback path: an IntersectionObserver toggles `.visible`, which the
 *   matching `.reveal`/`.reveal-left`/… transition classes animate.
 */
export function useReveal(opts: RevealOptions = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -40px 0px',
    delay = 0,
    direction = 'up',
  } = opts
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [sda, setSda] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()')) {
      setSda(true)
      return
    }

    // Reduced motion: skip the hidden state entirely so content is
    // always visible (mirrors the CSS override in globals.css).
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    let timeout: ReturnType<typeof setTimeout>
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            timeout = setTimeout(() => setVisible(true), delay)
          } else {
            setVisible(true)
          }
        } else {
          if (timeout) clearTimeout(timeout)
          setVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (timeout) clearTimeout(timeout)
    }
  }, [threshold, rootMargin, delay])

  const dirSuffix = direction === 'up' ? '' : `-${direction}`
  const className = sda
    ? `sfx${dirSuffix}${delay > 0 ? ` sfx-delay-${Math.min(4, Math.ceil(delay / 100))}` : ''}`
    : `reveal${dirSuffix}${delay > 0 ? ` reveal-delay-${Math.min(4, Math.ceil(delay / 100))}` : ''}${visible ? ' visible' : ''}`

  return { ref, className, visible }
}
