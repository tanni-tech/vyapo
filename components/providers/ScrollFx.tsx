'use client'

import { useEffect } from 'react'

/**
 * Sets the `sda` class on <html> when the browser supports CSS
 * scroll-driven animations, and keeps their `animation-play-state`
 * synced with `--sda` (running/paused) while any `.sfx` element is
 * visible in the viewport.
 *
 * Runs in document-ready mode so it picks up client-side rendered
 * content as it streams in (React 18 streaming + next/dynamic).
 */
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

    const seen = new Set<Element>()
    const targets = new Set<Element>()

    const update = () => {
      root.style.setProperty('--sda', targets.size > 0 ? 'running' : 'paused')
    }

    const io = new IntersectionObserver(
      (entries) => {
        let changed = false
        for (const e of entries) {
          const el = e.target
          seen.add(el)
          if (e.isIntersecting) targets.add(el)
          else targets.delete(el)
          changed = true
        }
        if (changed) update()
      },
      { threshold: 0 }
    )

    const attach = (el: Element) => {
      io.observe(el)
    }

    document.querySelectorAll('.sfx').forEach(attach)
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return
          const node = n as HTMLElement
          if (node.classList?.contains('sfx')) {
            if (!seen.has(node)) attach(node)
          }
          node.querySelectorAll?.('.sfx').forEach((el) => {
            if (!seen.has(el)) attach(el)
          })
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    update()
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
