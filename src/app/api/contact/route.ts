import { createHmac } from 'node:crypto'
import { supabaseRequest } from '@/lib/supabase'

export const runtime = 'nodejs'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let input: unknown
  try { input = await request.json() } catch { return Response.json({ error: 'Invalid request.' }, { status: 400 }) }
  if (!input || typeof input !== 'object') return Response.json({ error: 'Invalid request.' }, { status: 400 })
  const data = input as Record<string, unknown>
  const name = typeof data.name === 'string' ? data.name.trim() : ''
  const email = typeof data.email === 'string' ? data.email.trim() : ''
  const message = typeof data.message === 'string' ? data.message.trim() : ''
  if (!name || name.length > 100 || !emailPattern.test(email) || email.length > 254 || !message || message.length > 5000) {
    return Response.json({ error: 'Enter your name, a valid email, and a message (up to 5,000 characters).' }, { status: 400 })
  }
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL || !process.env.CONTACT_TO_EMAIL) {
    return Response.json({ error: 'Contact form is not configured yet.' }, { status: 503 })
  }

  // On Vercel, this header is set by the platform. For other hosts, configure a trusted proxy.
  const ip = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
    ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? 'unknown'
  const ipHash = createHmac('sha256', process.env.RESEND_API_KEY).update(ip).digest('hex')
  try {
    const limitResponse = await supabaseRequest('rpc/reserve_contact_message', {
      method: 'POST',
      body: JSON.stringify({ p_ip_hash: ipHash }),
    })
    const allowed: boolean = await limitResponse.json()
    if (!allowed) return Response.json({ error: 'You can send up to 3 messages per hour. Please try again later.' }, { status: 429 })

    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `Portfolio contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    })
    if (!sent.ok) {
      console.error('Resend failed', sent.status, await sent.text())
      return Response.json({ error: 'Message could not be sent. Please try again later.' }, { status: 502 })
    }
    return Response.json({ ok: true })
  } catch (error) {
    console.error('Contact failed', error)
    return Response.json({ error: 'Message could not be sent. Please try again later.' }, { status: 503 })
  }
}
