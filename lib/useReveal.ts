'use client'

import { useEffect, useRef, useState } from 'react'

type RevealOptions = {
  threshold?: number
  rootMargin?: string
  once?: boolean
  delay?: number
}

export function useReveal(opts: RevealOptions = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px', once = true, delay = 0 } = opts
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If delay > 0, we still observe but wait before showing
    let timeout: ReturnType<typeof setTimeout>

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            timeout = setTimeout(() => setVisible(true), delay)
          } else {
            setVisible(true)
          }
          if (once) observer.unobserve(el)
        } else if (!once) {
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
  }, [threshold, rootMargin, once, delay])

  return { ref, visible }
}
