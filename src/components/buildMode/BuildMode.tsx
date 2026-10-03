'use client'

import { useEffect, useId, useReducer, useRef, useState } from 'react'
import { siteContent } from '@/content/site'
import { createGame, gameReducer, landing, WIDTH } from './game'
import type { Action, Piece } from './game'

const colors = ['bg-[#151619]', 'bg-[#4dd1dc]', 'bg-[#ff9060]', 'bg-[#a3ec68]', 'bg-[#a3ec68]', 'bg-[#ed799c]', 'bg-[#7693ff]', 'bg-[#bd92ef]']
const keys: Record<string, Action['type']> = { a: 'left', ArrowLeft: 'left', d: 'right', ArrowRight: 'right', s: 'down', ArrowDown: 'down', w: 'rotate', ArrowUp: 'rotate', ' ': 'drop' }

function visitPieceCells(piece: Piece, visit: (x: number, y: number) => void) {
  piece.shape.forEach((row, deltaY) => {
    row.forEach((cell, deltaX) => {
      if (cell) visit(piece.x + deltaX, piece.y + deltaY)
    })
  })
}

export default function BuildMode() {
  const content = siteContent.buildMode
  const [game, dispatch] = useReducer(gameReducer, undefined, () => createGame())
  const [focused, setFocused] = useState(false)
  const [started, setStarted] = useState(false)
  const [visible, setVisible] = useState(true)
  const boardRef = useRef<HTMLDivElement>(null)
  const instructions = useId()
  const active = focused && visible && !game.over
  const level = 1 + Math.floor(game.lines / 10)

  useEffect(() => {
    const updateVisibility = () => setVisible(document.visibilityState === 'visible')
    const hide = () => setVisible(false)
    document.addEventListener('visibilitychange', updateVisibility)
    window.addEventListener('blur', hide)
    window.addEventListener('focus', updateVisibility)
    return () => {
      document.removeEventListener('visibilitychange', updateVisibility)
      window.removeEventListener('blur', hide)
      window.removeEventListener('focus', updateVisibility)
    }
  }, [])

  useEffect(() => {
    if (!active) return
    const interval = Math.max(120, 750 - (level - 1) * 65)
    const timer = window.setInterval(() => dispatch({ type: 'tick' }), interval)
    return () => window.clearInterval(timer)
  }, [active, level])

  const cells = game.board.map((row) => [...row])
  const ghost = new Set<number>()
  if (!game.over) {
    visitPieceCells(landing(game), (x, y) => ghost.add(y * WIDTH + x))
    visitPieceCells(game.piece, (x, y) => { cells[y][x] = game.piece.color })
  }

  const handleRestart = () => {
    dispatch({ type: 'reset', seed: Date.now() })
    boardRef.current?.focus({ preventScroll: true })
  }
  const status = game.over ? content.states.gameOver : started ? content.states.paused : content.states.ready

  return (
    <div className="mt-6 w-full justify-self-center border border-[#a3ec68] bg-[#191a1e] p-[13px] shadow-[4px_4px_0_#a3ec68] md:mt-0 md:max-w-[405px] md:justify-self-end md:p-[15px] md:shadow-[6px_6px_0_#a3ec68] lg:p-[21px_22px_19px]">
      <div className="mb-3 flex justify-between font-['DM_Mono'] text-[9px] tracking-[.14em] text-[#e8e8e5]">
        <span>{content.title}</span>
        <span className="text-[#91939c]">{content.levelLabel} {String(level).padStart(2, '0')}</span>
      </div>
      <div
        ref={boardRef}
        tabIndex={0}
        role="application"
        aria-label={content.ariaLabel}
        aria-describedby={instructions}
        onFocus={() => { setFocused(true); setStarted(true) }}
        onBlur={() => setFocused(false)}
        onPointerDown={() => boardRef.current?.focus({ preventScroll: true })}
        onKeyDown={(event) => {
          if (event.altKey || event.ctrlKey || event.metaKey) return
          if (event.key === 'Escape') { event.currentTarget.blur(); return }
          const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
          const type = keys[key]
          if (!type) return
          event.preventDefault()
          if (!active || (event.repeat && (type === 'drop' || type === 'rotate'))) return
          dispatch({ type } as Action)
        }}
        className="relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#4dd1dc] focus-visible:ring-offset-4 focus-visible:ring-offset-[#191a1e]"
      >
        <div className="grid grid-cols-10 gap-px" aria-hidden="true">
          {cells.flat().map((color, index) => (
            <span
              key={index}
              className={`aspect-square border ${color ? 'border-white/15' : ghost.has(index) ? 'border-[#a3ec68]/50' : 'border-[#24252a]'} ${colors[color]}`}
            />
          ))}
        </div>
        {!active && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#101112]/75 px-4 text-center text-[#e8e8e5]">
            <span className="font-['Press_Start_2P'] text-[11px] leading-6">{status}</span>
            <span className="font-['DM_Mono'] text-[10px]">
              {game.over ? `${game.lines} ${content.linesLabel} · ${game.score} ${content.pointsLabel}` : content.playPrompt}
            </span>
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between font-['DM_Mono'] text-[9px] text-[#91939c]">
        <span>{content.scoreLabel} {game.score}</span>
        <span>{content.lineCountLabel} {game.lines}</span>
        <button type="button" className="cursor-pointer border border-current px-2 py-1 text-[#e8e8e5] hover:text-[#4dd1dc]" onClick={handleRestart}>
          {content.restartLabel}
        </button>
      </div>
      <p id={instructions} className="mt-3 text-center font-['DM_Mono'] text-[9px] leading-5 text-[#91939c]">
        {content.instructions.map((line, index) => (
          <span key={line}>{line}{index < content.instructions.length - 1 && <br />}</span>
        ))}
      </p>
      <div className="mt-2 flex justify-center gap-2 md:hidden" aria-label={content.touchControlsLabel}>
        {content.touchControls.map(({ action, label, ariaLabel }) => (
          <button
            key={action}
            type="button"
            aria-label={ariaLabel}
            className="min-h-10 min-w-10 cursor-pointer border border-current px-2 font-['DM_Mono'] text-xs text-[#e8e8e5]"
            onClick={() => { boardRef.current?.focus({ preventScroll: true }); dispatch({ type: action }) }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
