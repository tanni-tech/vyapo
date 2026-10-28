'use client'

import { useEffect, useRef } from 'react'

type ParallaxOptions = {
  strength?: number
  perspective?: number
}

/**
 * Mouse-tilt parallax. Sets `--tx` / `--ty` custom properties on the
 * element as the pointer moves; the `.tilt` class in globals.css applies
 * `rotateX(var(--ty)) rotateY(var(--tx))` and every `[data-depth]` child
 * translates by that rotation multiplied by its `--d` coefficient, so
 * closer layers travel further (real parallax). A subtle idle float CSS
 * animation on `.depth-stack` keeps the object alive when the pointer is off.
 *
 * Usage:
 *   const tiltRef = useParallax<HTMLDivElement>({ strength: 12 })
 *   <div ref={tiltRef} className="depth-stage">
 *     <div className="depth-stack tilt">
 *       <div data-depth="1"   style={{'--d':1,    '--px':'-14px','--py':'10px'}}>card A</div>
 *       <div data-depth="1.6" style={{'--d':1.6,  '--px':'12px','--py':'-8px'}}>card B</div>
 *     </div>
 *   </div>
 *
 * No dependencies. Pure CSS + a mousemove listener.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(opts: ParallaxOptions = {}) {
  const { strength = 10, perspective = 900 } = opts
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf = 0
    let tx = 0
    let ty = 0

    const apply = () => {
      raf = 0
      el.style.setProperty('--tx', `${tx}deg`)
      el.style.setProperty('--ty', `${ty}deg`)
    }

    const onMove = (e: { clientX: number; clientY: number }) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      tx = x * strength
      ty = -y * strength
      if (!raf) raf = requestAnimationFrame(apply)
    }

    const onLeave = () => {
      tx = 0
      ty = 0
      if (!raf) raf = requestAnimationFrame(apply)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    el.style.perspective = `${perspective}px`
    el.style.setProperty('--perspective', `${perspective}px`)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [strength, perspective])

  return ref
}
