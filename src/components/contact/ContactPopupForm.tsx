import { useEffect, useRef, useState } from 'react'
import CloseIcon from '../icons/CloseIcon'
import { provinces } from '../../data/provinces'

interface ContactPopupFormProps {
  isOpen: boolean
  onClose: () => void
}

interface FormValues {
  fullName: string
  phone: string
  email: string
  province: string
}

const EMPTY_FORM: FormValues = { fullName: '', phone: '', email: '', province: '' }

export default function ContactPopupForm({ isOpen, onClose }: ContactPopupFormProps) {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)
  const firstFieldRef = useRef<HTMLInputElement>(null)

  // Lock body scroll, close on Escape, and focus the first field while open.
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 50)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
      window.clearTimeout(focusTimer)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  function updateField(field: keyof FormValues) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setValues((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // No backend yet — record the lead locally and show the thank-you state.
    console.log('[An Thái] Đăng ký tư vấn:', values)
    setSubmitted(true)
  }

  return (
    <div
      className="contact-popup-overlay fixed inset-0 z-100 flex items-center justify-center bg-steel/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="contact-popup-card relative w-full max-w-2xl overflow-hidden rounded-2xl bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-popup-title"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="contact-popup-close absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15 cursor-pointer"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {/* Branded header band */}
        <div className="contact-popup-header relative overflow-hidden bg-steel px-6 pb-8 pt-7 sm:px-8">
          <div className="contact-popup-header-grid blueprint-grid-dark pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
          <div
            className="contact-popup-header-glow pointer-events-none absolute -top-20 -right-16 z-0 h-56 w-56 rounded-full bg-primary/30 blur-[90px]"
            aria-hidden="true"
          />
          <div className="contact-popup-header-content relative z-1">
            <h2 id="contact-popup-title" className="contact-popup-title text-2xl font-bold uppercase leading-tight text-white sm:text-3xl">
              Nhận tư vấn từ An Thái
            </h2>
            <p className="contact-popup-subtitle mt-2 text-sm leading-relaxed text-white/70">
              Để lại thông tin, đội ngũ của chúng tôi sẽ liên hệ tư vấn về sản phẩm và dịch vụ phù hợp
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="contact-popup-success px-6 py-10 text-center sm:px-8">
            <div className="contact-popup-success-badge mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="contact-popup-success-title text-xl font-bold text-foreground">Cảm ơn bạn!</h3>
            <p className="contact-popup-success-text mt-2 text-sm leading-relaxed text-muted-foreground">
              Chúng tôi đã nhận được thông tin và sẽ liên hệ với bạn trong thời gian sớm nhất.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="contact-popup-success-close mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover cursor-pointer"
            >
              Đóng
            </button>
          </div>
        ) : (
          <form className="contact-popup-form px-6 py-6 sm:px-8" onSubmit={handleSubmit}>
            <div className="contact-popup-field mb-4">
              <label htmlFor="contact-popup-fullname" className="contact-popup-label mb-1.5 block text-sm font-semibold text-foreground">
                Họ và tên <span className="text-primary">*</span>
              </label>
              <input
                ref={firstFieldRef}
                id="contact-popup-fullname"
                type="text"
                required
                value={values.fullName}
                onChange={updateField('fullName')}
                placeholder="Nguyễn Văn A"
                className="contact-popup-input w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>

            <div className="contact-popup-field mb-4">
              <label htmlFor="contact-popup-phone" className="contact-popup-label mb-1.5 block text-sm font-semibold text-foreground">
                Số điện thoại <span className="text-primary">*</span>
              </label>
              <input
                id="contact-popup-phone"
                type="tel"
                required
                inputMode="tel"
                pattern="[0-9\s+().-]{8,}"
                value={values.phone}
                onChange={updateField('phone')}
                placeholder="0901 234 567"
                className="contact-popup-input w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>

            <div className="contact-popup-field mb-4">
              <label htmlFor="contact-popup-email" className="contact-popup-label mb-1.5 block text-sm font-semibold text-foreground">
                Email <span className="text-primary">*</span>
              </label>
              <input
                id="contact-popup-email"
                type="email"
                required
                value={values.email}
                onChange={updateField('email')}
                placeholder="email@example.com"
                className="contact-popup-input w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>

            <div className="contact-popup-field mb-6">
              <label htmlFor="contact-popup-province" className="contact-popup-label mb-1.5 block text-sm font-semibold text-foreground">
                Tỉnh / Thành phố <span className="text-primary">*</span>
              </label>
              <select
                id="contact-popup-province"
                required
                value={values.province}
                onChange={updateField('province')}
                className="contact-popup-select w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30 cursor-pointer"
              >
                <option value="" disabled>
                  Chọn nơi ở của bạn
                </option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="contact-popup-submit w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover cursor-pointer"
            >
              Gửi thông tin
            </button>
            <p className="contact-popup-privacy mt-3 text-center text-xs text-muted-foreground">
              Thông tin của bạn được bảo mật và chỉ dùng cho mục đích tư vấn.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
