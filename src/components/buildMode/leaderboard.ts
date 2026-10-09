export type ScoreEntry = { display_name: string; score: number }

const cacheKey = 'portfolio:leaderboard:v1'
const cacheLifetime = 5 * 60 * 1000
let cached: { scores: ScoreEntry[]; expiresAt: number } | undefined
let pending: Promise<ScoreEntry[]> | undefined
let generation = 0

function isScores(value: unknown): value is ScoreEntry[] {
  return Array.isArray(value) && value.length <= 10 && value.every((entry) =>
    entry && typeof entry.display_name === 'string' &&
    Number.isSafeInteger(entry.score) && entry.score >= 0)
}

export function invalidateScores() {
  generation++
  cached = undefined
  pending = undefined
  try { sessionStorage.removeItem(cacheKey) } catch { /* Storage may be disabled. */ }
}

export async function getScores(): Promise<ScoreEntry[]> {
  if (!cached) {
    try {
      const stored = JSON.parse(sessionStorage.getItem(cacheKey) ?? 'null')
      if (stored && isScores(stored.scores) && typeof stored.expiresAt === 'number') {
        cached = stored
      }
    } catch { /* A missing or invalid cache falls back to the network. */ }
  }
  if (cached && cached.expiresAt > Date.now()) return cached.scores
  // Share a request if the component mounts more than once while it is loading.
  if (pending) return pending
  const requestGeneration = generation
  const request = (async () => {
    const response = await fetch('/api/leaderboard', { cache: 'no-store' })
    if (!response.ok) throw new Error('Leaderboard unavailable')
    const result = await response.json()
    if (!isScores(result.scores)) throw new Error('Invalid leaderboard')
    if (generation === requestGeneration) {
      cached = { scores: result.scores, expiresAt: Date.now() + cacheLifetime }
      try { sessionStorage.setItem(cacheKey, JSON.stringify(cached)) } catch { /* Keep the memory cache. */ }
    }
    return result.scores
  })()
  pending = request
  try { return await request } finally { if (pending === request) pending = undefined }
}
