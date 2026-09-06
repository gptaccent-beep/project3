"use client"

import { useEffect } from "react"

/**
 * Loads the dependency-free BOUZID motion engine (public/motion.js) once per page
 * and re-boots it after client-side navigation so newly mounted sections get
 * their scroll reveals, magnetic buttons and counters wired up.
 *
 * Zero npm dependencies: no GSAP, no Framer Motion, no Lenis.
 */
export default function Motion() {
  useEffect(() => {
    const w = window as unknown as { BouzidMotion?: { boot: () => void } }

    if (w.BouzidMotion) {
      w.BouzidMotion.boot()
      return
    }

    if (document.querySelector('script[data-bouzid-motion]')) return

    const script = document.createElement("script")
    script.src = "/motion.js"
    script.defer = true
    script.dataset.bouzidMotion = "true"
    document.body.appendChild(script)
  }, [])

  return null
}
