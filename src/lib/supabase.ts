export async function supabaseRequest(path: string, init: RequestInit = {}) {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  if (!url || !key) throw new Error('Supabase is not configured')

  const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      'Content-Type': 'application/json',
      ...init.headers,
    },
    cache: 'no-store',
  })
  if (!response.ok) {
    console.error('Supabase request failed', response.status, await response.text())
    throw new Error('Database request failed')
  }
  return response
}
