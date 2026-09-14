import { useState, useEffect, useCallback } from 'react'

/**
 * Opens a popup the first time the element matching `targetSelector` scrolls
 * into view, but only once per browser session. Dismissal is remembered in
 * `sessionStorage`, so the popup stays hidden for the rest of the visit yet
 * reappears normally on a fresh session (after the tab/browser is closed and
 * reopened later).
 */
export default function useScrollTriggeredPopup(storageKey: string, targetSelector: string) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Already dismissed during this session — never auto-show again.
    if (sessionStorage.getItem(storageKey) === 'dismissed') return

    const target = document.querySelector(targetSelector)
    if (!target) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsOpen(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(target)

    return () => observer.disconnect()
  }, [storageKey, targetSelector])

  const close = useCallback(() => {
    sessionStorage.setItem(storageKey, 'dismissed')
    setIsOpen(false)
  }, [storageKey])

  return { isOpen, close }
}
