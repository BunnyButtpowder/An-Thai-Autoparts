import { createContext, useContext, useState, type ReactNode } from 'react'

interface MotionPreference {
  /** True when animations should be suppressed (OS preference or user toggle). */
  reduced: boolean
  /** Flip the user override and persist it to localStorage. */
  toggle: () => void
}

const MotionPreferenceCtx = createContext<MotionPreference>({
  reduced: false,
  toggle: () => {},
})

const STORAGE_KEY = 'atap-reduce-motion'

/**
 * Provides a page-wide "reduce motion" preference. On mount it reads the user's
 * saved choice, falling back to the OS-level `prefers-reduced-motion` setting.
 * The choice is exposed to GSAP-driven sections via `useMotionPreference`.
 */
/** Resolve the preference synchronously so the very first render is correct. */
function resolveInitial(): boolean {
  if (typeof window === 'undefined') return false
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) return stored === 'true'
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function MotionPreferenceProvider({ children }: { children: ReactNode }) {
  // Lazy initializer (client-only SPA) avoids a false→true flip that would let
  // motion effects run once on the wrong value before settling.
  const [reduced, setReduced] = useState<boolean>(resolveInitial)

  const toggle = () =>
    setReduced((prev) => {
      const next = !prev
      localStorage.setItem(STORAGE_KEY, String(next))
      return next
    })

  return (
    <MotionPreferenceCtx.Provider value={{ reduced, toggle }}>
      {children}
    </MotionPreferenceCtx.Provider>
  )
}

export function useMotionPreference() {
  return useContext(MotionPreferenceCtx)
}
