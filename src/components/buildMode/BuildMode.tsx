'use client'

import { useEffect, useId, useReducer, useRef, useState, type FormEvent } from 'react'
import { siteContent } from '@/content/site'
import { createGame, gameReducer, landing, upcomingPiece } from './game'
import type { Action, Game, Piece } from './game'
import { getScores, invalidateScores, type ScoreEntry } from './leaderboard'
import './BuildMode.css'

const keys: Partial<Record<string, Exclude<Action['type'], 'reset' | 'tick'>>> = {
  a: 'left', ArrowLeft: 'left', d: 'right', ArrowRight: 'right',
  s: 'down', ArrowDown: 'down', w: 'rotate', ArrowUp: 'rotate', ' ': 'drop',
}

const idleBoard = [
  '0000000000', '0000000000', '0000000000', '0000000000', '0000000000', '0000000000',
  '0000000000', '0000000000', '0070000006', '0777000066', '2220700446', '2221110446',
].map((row) => Array.from(row, Number))

function pieceCells(piece: Piece) {
  return piece.shape.flatMap((row, y) => row.flatMap((cell, x) =>
    cell ? [{ x: piece.x + x, y: piece.y + y }] : [],
  ))
}

function GameBoardArt({ game, started }: { game: Game; started: boolean }) {
  const cells = (started ? game.board : idleBoard).map((row) => [...row])
  let ghost: { x: number; y: number }[] = []
  if (!game.over) {
    ghost = pieceCells(landing(started ? game : { ...game, board: cells }))
    for (const { x, y } of pieceCells(game.piece)) cells[y][x] = game.piece.color
  }
  const effect = game.lastLock

  return (
    <div className="board-grid" aria-hidden="true">
      {cells.map((row, y) => row.map((color, x) => (
        <span
          key={`${y}-${x}`}
          className="board-cell"
          data-color={color || undefined}
          data-ghost={!color && ghost.some((cell) => cell.x === x && cell.y === y) || undefined}
        />
      )))}
      {effect && (
        <div key={effect.id} className="board-effects">
          {effect.impact && pieceCells(effect.impact).map(({ x, y }) => (
            <i key={`${y}-${x}`} className="drop-impact" style={{ gridColumn: x + 1, gridRow: y + 1 }} />
          ))}
          {effect.rows.map((row) => <i key={row} className="clear-row" style={{ gridRow: row + 1 }} />)}
        </div>
      )}
    </div>
  )
}

function PiecePreview({ piece }: { piece: Piece }) {
  return (
    <div className="next-piece" aria-hidden="true">
      <div style={{ gridTemplateColumns: `repeat(${piece.shape[0].length}, var(--preview-cell))` }}>
        {piece.shape.flat().map((cell, index) => (
          <i key={index} className="board-cell" data-color={cell ? piece.color : undefined} />
        ))}
      </div>
    </div>
  )
}

function Leaderboard() {
  const [scores, setScores] = useState<ScoreEntry[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let current = true
    void getScores().then((result) => {
      if (current) setScores(result)
    }).catch(() => {
      if (current) setFailed(true)
    })
    return () => { current = false }
  }, [])

  if (failed) return <p className="leaderboard-message" role="status">Leaderboard is temporarily unavailable.</p>
  if (!scores) return <p className="leaderboard-message" role="status">Loading scores…</p>
  if (!scores.length) return <p className="leaderboard-message" role="status">No scores yet. Be the first!</p>

  return (
    <ol className="score-list">
      {scores.map((entry, index) => (
        <li key={`${entry.display_name}-${index}`}>
          <span className="score-rank">{index + 1}.</span>
          <span className="score-name">{entry.display_name}</span>
          <strong>{entry.score.toLocaleString('en-US')}</strong>
        </li>
      ))}
    </ol>
  )
}

export default function BuildMode() {
  const content = siteContent.buildMode
  const [game, dispatch] = useReducer(gameReducer, undefined, () => createGame())
  const [started, setStarted] = useState(false)
  const [running, setRunning] = useState(false)
  const [leaderboardOpen, setLeaderboardOpen] = useState(false)
  const [scoreVersion, setScoreVersion] = useState(0)
  const [scoreFeedback, setScoreFeedback] = useState('')
  const [savingScore, setSavingScore] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const boardRef = useRef<HTMLDivElement>(null)
  const pauseRef = useRef<HTMLButtonElement>(null)
  const instructions = useId()
  const active = running && !game.over
  const level = 1 + Math.floor(game.lines / 10)

  useEffect(() => {
    if (!active) return
    const pause = () => setRunning(false)
    const updateVisibility = () => { if (document.hidden) pause() }
    const interval = Math.max(120, 750 - (level - 1) * 65)
    const timer = window.setInterval(() => dispatch({ type: 'tick' }), interval)
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) pause()
    })
    if (boardRef.current) observer.observe(boardRef.current)
    document.addEventListener('visibilitychange', updateVisibility)
    window.addEventListener('blur', pause)
    return () => {
      window.clearInterval(timer)
      observer.disconnect()
      document.removeEventListener('visibilitychange', updateVisibility)
      window.removeEventListener('blur', pause)
    }
  }, [active, level])

  function play(restart = false) {
    if (restart) {
      dispatch({ type: 'reset', seed: Date.now() })
      setSubmitted(false)
      setScoreFeedback('')
    }
    setStarted(true)
    setRunning(true)
    boardRef.current?.focus({ preventScroll: true })
  }

  async function submitScore(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!game.over || submitted || savingScore) return
    const data = Object.fromEntries(new FormData(event.currentTarget))
    setSavingScore(true)
    setScoreFeedback('')
    try {
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, score: game.score }),
      })
      const result = await response.json()
      if (!response.ok) {
        setScoreFeedback(result.error || 'Score could not be saved. Try again.')
        return
      }
      setSubmitted(true)
      setScoreFeedback('Score saved. Only your highest score appears.')
      invalidateScores()
      setScoreVersion((version) => version + 1)
    } catch {
      setScoreFeedback('Score could not be saved. Try again.')
    } finally {
      setSavingScore(false)
    }
  }

  const status = game.over ? 'Game over' : active ? 'Playing' : started ? 'Paused' : 'Ready'

  return (
    <section
      id="build-mode"
      className="game-cabinet"
      tabIndex={-1}
      aria-labelledby="build-mode-title"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget) || event.relatedTarget?.closest('.game-leaderboard')) {
          setRunning(false)
        }
      }}
    >
      <header className="game-header">
        <h2 id="build-mode-title">
          <span className="cabinet-icon" aria-hidden="true"><i /><i /><i /><i /></span>
          {content.title}
        </h2>
        <span className="game-status" data-playing={active} role="status"><i aria-hidden="true" />{status}</span>
      </header>

      <div className="game-console">
        <div className="game-board-frame">
          <div
            className="game-board"
            ref={boardRef}
            tabIndex={active ? 0 : -1}
            role="application"
            aria-label={content.ariaLabel}
            aria-describedby={instructions}
            onPointerDown={() => { if (active) boardRef.current?.focus({ preventScroll: true }) }}
            onKeyDown={(event) => {
              if (!active || event.altKey || event.ctrlKey || event.metaKey) return
              if (event.key === 'Escape' || event.key.toLowerCase() === 'p') {
                event.preventDefault()
                setRunning(false)
                pauseRef.current?.focus({ preventScroll: true })
                return
              }
              const type = keys[event.key.length === 1 ? event.key.toLowerCase() : event.key]
              if (!type) return
              event.preventDefault()
              if (!event.repeat || (type !== 'drop' && type !== 'rotate')) dispatch({ type })
            }}
          >
            <GameBoardArt game={game} started={started} />
          </div>
          <div className="game-overlay" hidden={active}>
            <div className="game-overlay-content">
              <p>{game.over ? 'Game over' : started ? 'Paused' : 'Ready to stack?'}</p>
              {game.over && <p className="game-final-score">{game.score.toLocaleString('en-US')} points</p>}
              <button type="button" className="game-start" disabled={savingScore} onClick={() => play(game.over)}>
                <span className="play-icon" aria-hidden="true" />
                {game.over ? 'Play again' : started ? 'Resume' : 'Play game'}
              </button>
              {started && !game.over && (
                <button type="button" className="game-restart" onClick={() => play(true)}>Restart</button>
              )}
            </div>
          </div>
        </div>
        <div className="game-sidebar">
          <div className="game-stat">
            <span>Next</span>
            <PiecePreview piece={upcomingPiece(game)} />
          </div>
          <dl className="game-stats">
            <div className="game-stat"><dt>Score</dt><dd>{game.score.toLocaleString('en-US')}</dd></div>
            <div className="game-stat"><dt>Lines</dt><dd>{String(game.lines).padStart(2, '0')}</dd></div>
            <div className="game-stat"><dt>Level</dt><dd>{String(level).padStart(2, '0')}</dd></div>
          </dl>
          {started && !game.over && (
            <button ref={pauseRef} type="button" className="game-pause" onClick={() => active ? setRunning(false) : play()}>
              {active ? 'Pause' : 'Resume'}
            </button>
          )}
        </div>
      </div>

      <div id={instructions} className="game-help">
        <div className="key-legend" aria-hidden="true">
          <span><kbd>←</kbd><kbd>→</kbd> Move</span>
          <span><kbd>↑</kbd> Rotate</span>
          <span><kbd>↓</kbd> Soft drop</span>
          <span><kbd>Space</kbd> Drop</span>
          <span><kbd>Esc</kbd> Pause</span>
        </div>
        <span className="sr-only">Left and right arrows or A and D to move. Up arrow or W to rotate. Down arrow or S to soft drop. Space to hard drop. Escape or P to pause.</span>
        <div className="touch-controls" role="group" aria-label="Touch game controls">
          {content.touchControls.map(({ action, label, ariaLabel }) => (
            <button
              key={action}
              type="button"
              aria-label={ariaLabel}
              disabled={!active}
              onClick={() => {
                boardRef.current?.focus({ preventScroll: true })
                dispatch({ type: action })
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {game.over && (
        <form onSubmit={submitScore} className="score-form">
          <strong>Share your score</strong>
          <p>Your name appears on the leaderboard. Your email keeps your best score together and stays private.</p>
          <label>Name<input required name="name" maxLength={40} autoComplete="name" disabled={submitted} /></label>
          <label>Email<input required name="email" type="email" maxLength={254} autoComplete="email" disabled={submitted} /></label>
          <button className="game-start" disabled={savingScore || submitted}>{savingScore ? 'Saving…' : submitted ? 'Saved' : 'Submit score'}</button>
          <p role="status">{scoreFeedback}</p>
        </form>
      )}

      <details className="game-leaderboard" onToggle={(event) => setLeaderboardOpen(event.currentTarget.open)}>
        <summary>Leaderboard <span aria-hidden="true">↓</span></summary>
        {leaderboardOpen && <Leaderboard key={scoreVersion} />}
      </details>
    </section>
  )
}
