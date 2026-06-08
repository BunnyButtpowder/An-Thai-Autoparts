import { useEffect, useRef } from 'react'

export default function useHeaderShadow() {
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function onScroll() {
      headerRef.current?.classList.toggle('shadow-md', window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return headerRef
}
