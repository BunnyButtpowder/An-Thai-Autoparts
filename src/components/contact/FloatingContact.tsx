import { useEffect, useState, type ReactNode } from 'react'
import { contactLocations, contactSocials } from '../../data/contact'
import { socialIcons, phoneIcon } from './socialIcons'
import ChevronDown from '../icons/ChevronDown'

interface FloatingAction {
  key: string
  label: string
  href: string
  icon: ReactNode
  /** `primary` = solid red hotline CTA; `secondary` = frosted-white glass channel. */
  variant: 'primary' | 'secondary'
  /** Adds an attention-drawing pulse ring — reserved for the hotline. */
  pulse?: boolean
  /** External links open in a new tab; `tel:` links do not. */
  external?: boolean
}

const hotline = contactLocations[0]
const facebook = contactSocials.find((s) => s.label === 'Facebook')
const zalo = contactSocials.find((s) => s.label === 'Zalo')

/** Ordered top → bottom, with the hotline anchored nearest the corner. */
const actions: FloatingAction[] = [
  facebook && { key: 'Facebook', label: 'Facebook', href: facebook.href, icon: socialIcons.Facebook, variant: 'secondary', external: true },
  zalo && { key: 'Zalo', label: 'Zalo', href: zalo.href, icon: socialIcons.Zalo, variant: 'secondary', external: true },
  hotline && { key: 'Hotline', label: hotline.phone, href: hotline.phoneHref, icon: phoneIcon, variant: 'primary', pulse: true },
].filter(Boolean) as FloatingAction[]

/**
 * Shared circular button face. The footprint, hover-lift, and motion stay
 * identical across every button; `variant` only swaps the surface treatment —
 * a solid-red primary CTA vs. frosted-white glass secondaries.
 */
function faceClass(variant: 'primary' | 'secondary') {
  const base =
    'floating-contact-button relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 [&_svg]:h-6! [&_svg]:w-6!'
  const surface =
    variant === 'primary'
      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 group-hover:bg-primary-hover group-hover:shadow-primary/40'
      : 'bg-white/90 text-primary border border-border ring-1 ring-black/5 shadow-md shadow-black/5 backdrop-blur-sm group-hover:shadow-lg group-hover:shadow-black/10'
  return `${base} ${surface}`
}

/** Label pill — slides out from behind the button on hover. Shared by every action. */
const labelPillClass =
  'floating-contact-label pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-foreground/90 px-3.5 py-2 text-sm font-semibold text-primary-foreground opacity-0 translate-x-3 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100'

export default function FloatingContact() {
  // Deferred mount so the stack fades/rises in rather than snapping on load.
  const [mounted, setMounted] = useState(false)
  // Reveal the scroll-to-top control only once the user has scrolled down a bit.
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div
      className="floating-contact fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3.5"
      aria-label="Liên hệ nhanh"
    >
      {actions.map((action, i) => (
        <a
          key={action.key}
          href={action.href}
          aria-label={action.label}
          {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          style={{ transitionDelay: mounted ? `${i * 90}ms` : '0ms' }}
          className={`floating-contact-link group relative flex items-center justify-end transition-all duration-500 ease-out cursor-pointer ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <span className={labelPillClass}>{action.label}</span>

          <span className={faceClass(action.variant)}>
            {action.pulse && (
              <span className="floating-contact-pulse absolute inset-0 rounded-full bg-primary opacity-60" />
            )}
            {/* Force every glyph fill to currentColor so the white-baked Zalo mark
                adopts the button's red on the glass surface (harmless for the
                currentColor Facebook/phone marks). */}
            <span className="floating-contact-glyph relative [&_svg]:fill-current [&_svg_*]:fill-current">
              {action.icon}
            </span>
          </span>
        </a>
      ))}

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Lên đầu trang"
        className={`floating-contact-top group relative flex items-center justify-end transition-all duration-300 ease-out cursor-pointer ${
          showTop
            ? 'translate-y-0 scale-100 opacity-100 pointer-events-auto'
            : 'translate-y-2 scale-90 opacity-0 pointer-events-none'
        }`}
      >
        <span className={labelPillClass}>Lên đầu trang</span>

        <span className={faceClass('secondary')}>
          <span className="floating-contact-glyph relative">
            <ChevronDown className="h-6 w-6 rotate-180" />
          </span>
        </span>
      </button>
    </div>
  )
}
