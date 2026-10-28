'use client'

import { useEffect } from 'react'

export function ScrollFx() {
  useEffect(() => {
    const root = document.documentElement

    const hasSda =
      typeof CSS !== 'undefined' &&
      CSS.supports('animation-timeline: scroll()')

    root.classList.toggle('sda', hasSda)

    if (!hasSda) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            ;(e.target as HTMLElement).classList.toggle('in-view', e.isIntersecting)
          }
        },
        { threshold: 0.12 }
      )
      document
        .querySelectorAll('.sfx')
        .forEach((el) => io.observe(el))
      return () => io.disconnect()
    }

    const targets: Element[] = []
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target
          if (e.isIntersecting) {
            targets.push(el)
            io.unobserve(el)
          } else if (!e.isIntersecting) {
            const i = targets.indexOf(el)
            if (i !== -1) targets.splice(i, 1)
            io.unobserve(el)
          }
        }
        root.style.setProperty(
          '--sda',
          targets.length > 0 ? 'running' : 'paused'
        )
      },
      { threshold: 0 }
    )
    document
      .querySelectorAll('.sfx')
      .forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
