import { useEffect, useState, type ReactNode } from 'react'
import { contactLocations, contactSocials } from '../../data/contact'
import { socialIcons, phoneIcon } from './socialIcons'

interface FloatingAction {
  key: string
  label: string
  href: string
  icon: ReactNode
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
  facebook && { key: 'Facebook', label: 'Facebook', href: facebook.href, icon: socialIcons.Facebook, external: true },
  zalo && { key: 'Zalo', label: 'Zalo', href: zalo.href, icon: socialIcons.Zalo, external: true },
  hotline && { key: 'Hotline', label: hotline.phone, href: hotline.phoneHref, icon: phoneIcon, pulse: true },
].filter(Boolean) as FloatingAction[]

export default function FloatingContact() {
  // Deferred mount so the stack fades/rises in rather than snapping on load.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

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
          {/* Label pill — slides out from behind the button on hover. */}
          <span className="floating-contact-label pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-foreground/90 px-3.5 py-2 text-sm font-semibold text-primary-foreground opacity-0 translate-x-3 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            {action.label}
          </span>

          <span className="floating-contact-button relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-hover group-hover:shadow-primary/50 [&_svg]:h-7! [&_svg]:w-7!">
            {action.pulse && (
              <span className="floating-contact-pulse absolute inset-0 rounded-full bg-primary opacity-70 animate-ping" />
            )}
            <span className="floating-contact-glyph relative">{action.icon}</span>
          </span>
        </a>
      ))}
    </div>
  )
}
