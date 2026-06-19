import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PhoneIcon from '../icons/PhoneIcon'
import MailIcon from '../icons/MailIcon'
import MapPinIcon from '../icons/MapPinIcon'
import { contactLocations, buildMapEmbedSrc } from '../../data/contact'

gsap.registerPlugin(ScrollTrigger)

export default function ContactLocations() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeLocation = (contactLocations[activeIndex] ?? contactLocations[0])!

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.contact-locations-heading-wrapper', {
        scrollTrigger: { trigger: '.contact-locations-container', start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.6,
        y: 24,
        opacity: 0,
        ease: 'power2.out',
      })
      gsap.from('.contact-locations-list', {
        scrollTrigger: { trigger: '.contact-locations-grid', start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.6,
        y: 28,
        opacity: 0,
        ease: 'power2.out',
      })
      gsap.from('.contact-map-panel', {
        scrollTrigger: { trigger: '.contact-locations-grid', start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.7,
        y: 28,
        opacity: 0,
        delay: 0.1,
        ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="contact-locations-section py-16 lg:py-24 bg-background " id="he-thong-lien-he">
      <div className="contact-locations-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="contact-locations-heading-wrapper text-center max-w-2xl mx-auto mb-10 lg:mb-14">
          <p className="contact-locations-label inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-primary text-xs sm:text-sm font-semibold uppercase tracking-widest mb-6">
            <span className="contact-locations-label-dot h-1.5 w-1.5 rounded-full bg-primary" />
            Hệ thống liên hệ
          </p>
          <h2 className="contact-locations-title text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight uppercase tracking-tight">
            Liên hệ với <span className="contact-locations-title-accent text-primary">An Thái</span>
          </h2>
          <span className="contact-locations-underline mt-5 block h-1 w-20 mx-auto rounded-full bg-primary" />
        </div>

        <div className="contact-locations-grid grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* Left column — location cards */}
          <div className="contact-locations-list lg:col-span-2 flex flex-col gap-5 lg:h-[640px] lg:overflow-y-auto lg:pr-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40">
            {contactLocations.map((location, index) => {
              const isActive = index === activeIndex
              const detailClass = isActive ? 'text-primary-foreground/90' : 'text-muted-foreground'
              return (
                <div
                  key={location.name}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  tabIndex={0}
                  aria-label={`Xem bản đồ ${location.name}`}
                  className={`contact-location-card shrink-0 rounded-2xl p-6 cursor-pointer transition-all duration-300 outline-none ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-muted text-foreground hover:bg-muted/70'
                  }`}
                >
                  <h3 className="contact-location-name text-lg font-bold mb-3 leading-snug">{location.name}</h3>
                  <ul className="contact-location-details space-y-2 text-sm">
                    <li className="contact-location-detail flex items-start gap-2.5">
                      <PhoneIcon className={`contact-location-icon w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                      <a
                        href={location.phoneHref}
                        onClick={(e) => e.stopPropagation()}
                        className={`contact-location-phone hover:underline ${detailClass}`}
                      >
                        {location.phone}
                      </a>
                    </li>
                    <li className="contact-location-detail flex items-start gap-2.5">
                      <MailIcon className={`contact-location-icon w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                      <a
                        href={`mailto:${location.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`contact-location-email hover:underline break-all ${detailClass}`}
                      >
                        {location.email}
                      </a>
                    </li>
                    <li className="contact-location-detail flex items-start gap-2.5">
                      <MapPinIcon className={`contact-location-icon w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                      <span className={`contact-location-address leading-relaxed ${detailClass}`}>{location.address}</span>
                    </li>
                  </ul>
                </div>
              )
            })}
          </div>

          {/* Right column — map */}
          <div className="contact-map-panel lg:col-span-3">
            <div className="contact-map-sticky lg:sticky lg:top-28">
              <div className="contact-map-frame relative overflow-hidden rounded-2xl border border-border shadow-sm bg-muted">
                <div className="contact-map-caption absolute top-0 left-0 right-0 z-10 flex items-center gap-2 bg-primary/95 px-5 py-3 text-primary-foreground">
                  <MapPinIcon className="contact-map-caption-icon w-5 h-5 shrink-0" />
                  <span className="contact-map-caption-text text-sm sm:text-base font-semibold leading-snug">
                    {activeLocation.name}
                  </span>
                </div>
                <iframe
                  key={activeLocation.name}
                  className="contact-map-iframe w-full h-[420px] sm:h-[520px] lg:h-[640px] block"
                  src={buildMapEmbedSrc(activeLocation.mapQuery)}
                  title={`Bản đồ ${activeLocation.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
