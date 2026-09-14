import { useEffect, useState } from 'react'
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

  // Close on Escape while the corner form is open (no scroll lock — it is a
  // non-blocking panel that sits alongside the page, not a modal).
  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

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
      className={`contact-popup fixed bottom-4 right-4 left-4 z-100 w-auto sm:left-auto sm:w-full sm:max-w-sm transition-all duration-500 ease-out ${
        isOpen
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-6 opacity-0'
      }`}
      role="dialog"
      aria-modal="false"
      aria-hidden={!isOpen}
      aria-labelledby="contact-popup-title"
    >
      <div className="contact-popup-card relative overflow-hidden rounded-2xl bg-background shadow-2xl ring-1 ring-black/10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="contact-popup-close absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15 cursor-pointer"
        >
          <CloseIcon className="w-4 h-4" />
        </button>

        {/* Branded header band */}
        <div className="contact-popup-header relative overflow-hidden bg-steel px-5 pb-5 pt-5">
          <div className="contact-popup-header-grid blueprint-grid-dark pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
          <div
            className="contact-popup-header-glow pointer-events-none absolute -top-16 -right-12 z-0 h-40 w-40 rounded-full bg-primary/30 blur-[80px]"
            aria-hidden="true"
          />
          <div className="contact-popup-header-content relative z-1 pr-8">
            <h2 id="contact-popup-title" className="contact-popup-title text-xl font-bold uppercase leading-tight text-white">
              Nhận tư vấn từ An Thái
            </h2>
            <p className="contact-popup-subtitle mt-1.5 text-sm leading-relaxed text-white/70">
              Để lại thông tin, đội ngũ của chúng tôi sẽ liên hệ tư vấn sản phẩm phù hợp.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="contact-popup-success px-5 py-8 text-center">
            <div className="contact-popup-success-badge mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="contact-popup-success-title text-xl font-bold text-foreground">Cảm ơn bạn!</h3>
            <p className="contact-popup-success-text mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Chúng tôi đã nhận được thông tin và sẽ liên hệ với bạn trong thời gian sớm nhất.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="contact-popup-success-close mt-5 inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 cursor-pointer"
            >
              Đóng
            </button>
          </div>
        ) : (
          <form className="contact-popup-form px-5 py-5" onSubmit={handleSubmit}>
            <div className="contact-popup-field mb-3">
              <label htmlFor="contact-popup-fullname" className="contact-popup-label mb-1 block text-sm font-semibold text-foreground">
                Họ và tên <span className="text-primary">*</span>
              </label>
              <input
                id="contact-popup-fullname"
                type="text"
                required
                value={values.fullName}
                onChange={updateField('fullName')}
                placeholder="Nguyễn Văn A"
                className="contact-popup-input w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>

            <div className="contact-popup-field mb-3">
              <label htmlFor="contact-popup-phone" className="contact-popup-label mb-1 block text-sm font-semibold text-foreground">
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
                className="contact-popup-input w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>

            <div className="contact-popup-field mb-3">
              <label htmlFor="contact-popup-email" className="contact-popup-label mb-1 block text-sm font-semibold text-foreground">
                Email <span className="text-primary">*</span>
              </label>
              <input
                id="contact-popup-email"
                type="email"
                required
                value={values.email}
                onChange={updateField('email')}
                placeholder="email@example.com"
                className="contact-popup-input w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>

            <div className="contact-popup-field mb-5">
              <label htmlFor="contact-popup-province" className="contact-popup-label mb-1 block text-sm font-semibold text-foreground">
                Tỉnh / Thành phố <span className="text-primary">*</span>
              </label>
              <select
                id="contact-popup-province"
                required
                value={values.province}
                onChange={updateField('province')}
                className="contact-popup-select w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30 cursor-pointer"
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
              className="contact-popup-submit w-full rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 cursor-pointer"
            >
              Gửi thông tin
            </button>
            <p className="contact-popup-privacy mt-2.5 text-center text-xs text-muted-foreground">
              Thông tin của bạn được bảo mật và chỉ dùng cho mục đích tư vấn.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
