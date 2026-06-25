import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMotionPreference } from '../context/MotionPreferenceContext'

gsap.registerPlugin(ScrollTrigger)

/**
 * Single, reduce-motion-aware entry point for GSAP section animations.
 *
 * The `build` callback receives the `gsap` instance and runs inside a
 * `gsap.context()` scoped to the returned ref, so all tweens and ScrollTriggers
 * are cleaned up on unmount. When the user (or their OS) prefers reduced motion
 * the callback never runs, leaving every element in its final, visible state —
 * no `opacity:0` is ever applied, so there is no flash-of-hidden-content.
 */
export default function useReveal<T extends HTMLElement = HTMLElement>(
  build: (g: typeof gsap, root: T) => void,
) {
  const ref = useRef<T>(null)
  const { reduced } = useMotionPreference()

  useEffect(() => {
    if (reduced || !ref.current) return
    const root = ref.current
    // `root` is passed explicitly because gsap.context() scopes selector
    // strings to the ref's *descendants* — a ScrollTrigger whose trigger is the
    // ref element itself must reference the node, not its class selector.
    const ctx = gsap.context(() => build(gsap, root), ref)
    return () => ctx.revert()
    // `build` is intentionally not a dependency: callers pass a fresh closure
    // each render, and re-running on `reduced` change is the desired behavior.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  return ref
}
