import { supabaseRequest } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function GET() {
  try {
    const response = await supabaseRequest('tetris_scores?select=display_name,score&order=score.desc,updated_at.asc&limit=10')
    return Response.json({ scores: await response.json() }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return Response.json({ error: 'Leaderboard is unavailable.' }, { status: 503 })
  }
}

export async function POST(request: Request) {
  let input: unknown
  try { input = await request.json() } catch { return Response.json({ error: 'Invalid request.' }, { status: 400 }) }
  if (!input || typeof input !== 'object') return Response.json({ error: 'Invalid request.' }, { status: 400 })
  const data = input as Record<string, unknown>
  const name = typeof data.name === 'string' ? data.name.trim() : ''
  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : ''
  const score = data.score
  if (!name || name.length > 40 || !emailPattern.test(email) || email.length > 254 || typeof score !== 'number' || !Number.isSafeInteger(score) || score < 0 || score > 1_000_000_000) {
    return Response.json({ error: 'Enter a name and valid email to share your score.' }, { status: 400 })
  }
  try {
    await supabaseRequest('rpc/save_tetris_score', {
      method: 'POST',
      body: JSON.stringify({ p_email: email, p_display_name: name, p_score: score }),
    })
    return Response.json({ ok: true })
  } catch {
    return Response.json({ error: 'Score could not be saved.' }, { status: 503 })
  }
}
