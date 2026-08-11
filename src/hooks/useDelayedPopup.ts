import { useState, useEffect, useCallback } from 'react'

/**
 * Opens a popup after `delayMs` of the user being on the page, but only once per
 * browser session. Dismissal is remembered in `sessionStorage`, so the popup
 * stays hidden for the rest of the visit yet reappears normally on a fresh
 * session (i.e. after the user closes the tab/browser and returns later).
 */
export default function useDelayedPopup(storageKey: string, delayMs = 5000) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Already dismissed during this session — never auto-show again.
    if (sessionStorage.getItem(storageKey) === 'dismissed') return

    const timer = window.setTimeout(() => setIsOpen(true), delayMs)
    return () => window.clearTimeout(timer)
  }, [storageKey, delayMs])

  const close = useCallback(() => {
    sessionStorage.setItem(storageKey, 'dismissed')
    setIsOpen(false)
  }, [storageKey])

  return { isOpen, close }
}
