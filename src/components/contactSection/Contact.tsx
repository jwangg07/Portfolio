'use client'

import Arrow from '@/components/shared/Arrow'
import { useState, type FormEvent } from 'react'
import { siteContent } from '@/content/site'
import SocialIcon from '@/components/shared/SocialIcon'

export default function Contact() {
  const { heading, description } = siteContent.contact
  const [sending, setSending] = useState(false)
  const [feedback, setFeedback] = useState<{ message: string; error: boolean } | null>(null)

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setSending(true)
    setFeedback(null)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok) {
        setFeedback({ message: result.error || 'Message could not be sent. Please try again later.', error: true })
        return
      }
      setFeedback({ message: 'Message sent. Thanks for reaching out!', error: false })
      form.reset()
    } catch {
      setFeedback({ message: 'Message could not be sent. Please try again later.', error: true })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="page-width contact-section" aria-labelledby="contact-title">
      <div className="contact-copy">
        <h2 className="section-title" id="contact-title">{heading}<span aria-hidden="true">.</span></h2>
        <p>{description}</p>
        <ul className="contact-links" aria-label="Other ways to reach Jerry">
          {siteContent.footer.socialLinks.map(({ label, href, display }) => (
            <li key={label}>
              <a href={href} target={label === 'Email' ? undefined : '_blank'} rel={label === 'Email' ? undefined : 'noopener noreferrer'}>
                <SocialIcon name={label} className="contact-icon" />
                <span>{display}</span>
                <Arrow direction="up-right" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={sendMessage} className="contact-form">
        <div className="contact-fields">
          <label>Name<input required name="name" maxLength={100} autoComplete="name" /></label>
          <label>Email<input required type="email" name="email" maxLength={254} autoComplete="email" /></label>
        </div>
        <label>Message<textarea required name="message" maxLength={5000} rows={5} /></label>
        <button disabled={sending} className="button button-primary">
          {sending ? 'Sending…' : 'Send message'} <Arrow direction="up-right" />
        </button>
        <p className="form-feedback" data-error={feedback?.error} role="status">{feedback?.message}</p>
      </form>
    </section>
  )
}
