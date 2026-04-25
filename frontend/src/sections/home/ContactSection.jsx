import { useState } from 'react'
import { portfolioData } from '../../data/portfolio.js'
import { createContactMessage } from '../../services/api/contactMessages.js'
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
    <section id="contact" className="border-t-[4px] border-[#101010] bg-[#f2f0e8] py-[84px] max-[640px]:py-14">
      <div className="mx-auto flex w-full max-w-[1180px] justify-center px-6">
        <div className="w-full max-w-[860px]">
          <div className="border-[4px] border-[#101010] bg-[#fffef8] p-[clamp(24px,4vw,48px)] shadow-[8px_8px_0_rgba(16,16,16,0.16)] max-[640px]:p-[18px_14px] max-[640px]:shadow-[6px_6px_0_rgba(16,16,16,0.16)]">
            <h2 className="m-0 max-w-none font-['Manrope'] text-[clamp(2.6rem,5.5vw,4.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.06em] text-[#101010] max-[640px]:text-[clamp(2rem,11vw,3rem)]">
              {contact.label}
            </h2>
            <p className="mt-4 text-[1.08rem] font-bold leading-[1.55] text-[#3a3a3a] max-[640px]:text-[0.98rem]">
              {contact.description}
            </p>

            <form className="mt-[30px] grid gap-[18px] max-[640px]:mt-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-[14px] max-[960px]:grid-cols-1">
                <label className="grid gap-2" htmlFor="contact-name">
                  <span className="text-[0.82rem] font-black uppercase leading-[1.2] tracking-[-0.03em] text-[#2f2f2f]">
                    SENDER_NAME
                  </span>
                  <input
                    id="contact-name"
                    className="w-full border-[4px] border-[#101010] bg-white px-4 py-[0.95rem] font-bold text-[#101010] outline-none transition duration-200 placeholder:text-[#989898] focus:shadow-[6px_6px_0_rgba(16,16,16,0.12)]"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </label>

                <label className="grid gap-2" htmlFor="contact-email">
                  <span className="text-[0.82rem] font-black uppercase leading-[1.2] tracking-[-0.03em] text-[#2f2f2f]">
                    RETURN_ADDRESS
                  </span>
                  <input
                    id="contact-email"
                    className="w-full border-[4px] border-[#101010] bg-white px-4 py-[0.95rem] font-bold text-[#101010] outline-none transition duration-200 placeholder:text-[#989898] focus:shadow-[6px_6px_0_rgba(16,16,16,0.12)]"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@domain.sys"
                    required
                  />
                </label>
              </div>

              <label className="grid gap-2" htmlFor="contact-message">
                <span className="text-[0.82rem] font-black uppercase leading-[1.2] tracking-[-0.03em] text-[#2f2f2f]">
                  MESSAGE_PAYLOAD
                </span>
                <textarea
                  id="contact-message"
                  className="min-h-[168px] w-full resize-y border-[4px] border-[#101010] bg-white px-4 py-[0.95rem] font-bold text-[#101010] outline-none transition duration-200 placeholder:text-[#989898] focus:shadow-[6px_6px_0_rgba(16,16,16,0.12)]"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="7"
                  placeholder="Transmission details..."
                  required
                />
              </label>

              <button
                type="submit"
                className="w-full border-[4px] border-[#101010] bg-[#101010] px-[1.2rem] py-4 text-[clamp(1.25rem,3vw,2rem)] font-black uppercase leading-none tracking-[-0.04em] text-[#18ff48] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#101010] disabled:cursor-wait disabled:opacity-90 max-[640px]:text-[1.35rem]"
                disabled={viewState.isSubmitting}
              >
                {viewState.isSubmitting ? 'SENDING...' : contact.submitLabel}
              </button>

              {viewState.success ? (
                <p className="m-0 rounded-[18px] border border-[rgba(39,105,95,0.16)] bg-[rgba(39,105,95,0.12)] px-4 py-[0.95rem] text-[#255f54]" aria-live="polite">
                  {viewState.success}
                </p>
              ) : null}

              {viewState.error ? (
                <p className="m-0 rounded-[18px] border border-[rgba(176,74,74,0.18)] bg-[rgba(214,94,94,0.12)] px-4 py-[0.95rem] text-[#9a3a3a]" aria-live="polite">
                  {viewState.error}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
