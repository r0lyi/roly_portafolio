import { useState } from 'react'
import HomeContactField from '../../components/home/HomeContactField.jsx'
import HomeSectionShell from '../../components/home/HomeSectionShell.jsx'
import { portfolioData } from '../../data/portfolio.js'
import { createContactMessage } from '../../services/api/contactMessages.js'
import {
  homePanelClass,
  homeButtonPrimaryClass,
  homeStatusMessageClass,
} from '../../styles/homeBrutalistClasses.js'
import { getApiErrorMessage } from '../../utils/getApiErrorMessage.js'

const initialFormData = {
  name: '',
  email: '',
  message: '',
}

function ContactSection() {
  const { contact } = portfolioData
  const [formData, setFormData] = useState(initialFormData)
  const [viewState, setViewState] = useState({
    isSubmitting: false,
    error: '',
    success: '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setViewState({
        isSubmitting: false,
        error: 'Nombre, email y mensaje son obligatorios.',
        success: '',
      })
      return
    }

    setViewState({
      isSubmitting: true,
      error: '',
      success: '',
    })

    try {
      await createContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        message: formData.message.trim(),
      })

      setFormData(initialFormData)
      setViewState({
        isSubmitting: false,
        error: '',
        success: 'Canal abierto. Mensaje enviado correctamente.',
      })
    } catch (error) {
      setViewState({
        isSubmitting: false,
        error: getApiErrorMessage(error, 'No se pudo enviar el mensaje.'),
        success: '',
      })
    }
  }

  return (
    <HomeSectionShell
      id="contact"
      backgroundClassName="bg-[#f2f0e8]"
      contentClassName="flex justify-center"
    >
      <div className="w-full max-w-[860px]">
        <div className={`${homePanelClass} p-[18px_14px] sm:p-[clamp(24px,4vw,48px)]`}>
          <h2 className="m-0 max-w-none font-['Manrope'] text-[clamp(2.6rem,5.5vw,4.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.06em] text-[#101010] max-[640px]:text-[clamp(2rem,11vw,3rem)]">
            {contact.label}
          </h2>
          <p className="mt-4 text-[1.08rem] font-bold leading-[1.55] text-[#3a3a3a] max-[640px]:text-[0.98rem]">
            {contact.description}
          </p>

          <form className="mt-6 grid gap-[18px] sm:mt-[30px]" onSubmit={handleSubmit}>
            <div className="grid gap-[14px] md:grid-cols-2">
              <HomeContactField
                id="contact-name"
                label="SENDER_NAME"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                autoComplete="name"
              />

              <HomeContactField
                id="contact-email"
                label="RETURN_ADDRESS"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@domain.sys"
                autoComplete="email"
              />
            </div>

            <HomeContactField
              id="contact-message"
              label="MESSAGE_PAYLOAD"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Transmission details..."
              multiline
            />

            <button
              type="submit"
              className={`${homeButtonPrimaryClass} w-full py-4 text-[clamp(1.05rem,2.4vw,1.35rem)] leading-none tracking-[0.01em] shadow-[8px_8px_0_#101010] max-[640px]:text-[1rem] max-[640px]:shadow-[6px_6px_0_#101010]`}
              disabled={viewState.isSubmitting}
            >
              {viewState.isSubmitting ? 'SENDING...' : contact.submitLabel}
            </button>

            {viewState.success ? (
              <p className={homeStatusMessageClass('success')} aria-live="polite">
                {viewState.success}
              </p>
            ) : null}

            {viewState.error ? (
              <p className={homeStatusMessageClass('error')} aria-live="polite">
                {viewState.error}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </HomeSectionShell>
  )
}

export default ContactSection
