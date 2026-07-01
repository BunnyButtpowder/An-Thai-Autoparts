import { useEffect } from 'react'

/**
 * Drives the overscroll-overlap effect for every `.js-overscroll-section` on the page.
 *
 * The sticky section (`.js-overscroll-section__sticky-content`) scrolls normally until
 * its bottom edge reaches the bottom of the viewport — fully revealing it — then pins
 * while the scroll section (`.js-overscroll-section__scroll-content`) slides up and
 * overlaps it.
 *
 * Pure CSS `position: sticky; bottom: 0` cannot do this: a sticky element taller than
 * the viewport never pins by its bottom edge. The reliable technique is top-sticking
 * with a negative `top` equal to `viewportHeight - stickyHeight`, so the element pins
 * with its bottom aligned to the viewport bottom. That offset depends on the section's
 * (dynamic) height, so we compute it here and keep it in sync on resize/content changes.
 */
export default function useOverscrollOverlap() {
  useEffect(() => {
    const stickies = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.js-overscroll-section .js-overscroll-section__sticky-content',
      ),
    )
    if (stickies.length === 0) return

    function update() {
      for (const sticky of stickies) {
        // Taller than the viewport: pin showing the bottom (negative top).
        // Shorter than the viewport: pin at the top so it stays fully visible.
        const overshoot = sticky.offsetHeight - window.innerHeight
        sticky.style.top = overshoot > 0 ? `${-overshoot}px` : '0px'
      }
    }

    update()
    window.addEventListener('resize', update)
    // Re-measure when section heights settle (fonts/images loading, content reflow).
    const observer = new ResizeObserver(update)
    stickies.forEach((sticky) => observer.observe(sticky))

    return () => {
      window.removeEventListener('resize', update)
      observer.disconnect()
    }
  }, [])
}
