'use client'

import { useEffect, useId, useReducer, useRef, useState } from 'react'
import { createGame, gameReducer, landing, WIDTH } from './game'
import type { Action, Piece } from './game'

const colors = ['bg-[#151619]', 'bg-[#4dd1dc]', 'bg-[#ff9060]', 'bg-[#a3ec68]', 'bg-[#a3ec68]', 'bg-[#ed799c]', 'bg-[#7693ff]', 'bg-[#bd92ef]']
const keys: Record<string, Action['type']> = { a: 'left', ArrowLeft: 'left', d: 'right', ArrowRight: 'right', s: 'down', ArrowDown: 'down', w: 'rotate', ArrowUp: 'rotate', ' ': 'drop' }

export default function BuildMode({ panel, text, muted }: { panel: string; text: string; muted: string }) {
  const [game, dispatch] = useReducer(gameReducer, undefined, () => createGame())
  const [focused, setFocused] = useState(false)
  const [started, setStarted] = useState(false)
  const [visible, setVisible] = useState(true)
  const boardRef = useRef<HTMLDivElement>(null)
  const instructions = useId()
  const active = focused && visible && !game.over
  const level = 1 + Math.floor(game.lines / 10)

  useEffect(() => {
    const hide = () => setVisible(document.visibilityState === 'visible')
    const blur = () => setVisible(false)
    const focus = () => setVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', hide)
    window.addEventListener('blur', blur)
    window.addEventListener('focus', focus)
    return () => {
      document.removeEventListener('visibilitychange', hide)
      window.removeEventListener('blur', blur)
      window.removeEventListener('focus', focus)
    }
  }, [])

  useEffect(() => {
    if (!active) return
    const timer = window.setInterval(() => dispatch({ type: 'tick' }), Math.max(120, 750 - (level - 1) * 65))
    return () => window.clearInterval(timer)
  }, [active, level])

  const cells = game.board.map(row => [...row])
  const ghost = new Set<number>()
  const eachCell = (piece: Piece, visit: (x: number, y: number) => void) => piece.shape.forEach((row, dy) => row.forEach((cell, dx) => { if (cell) visit(piece.x + dx, piece.y + dy) }))
  if (!game.over) {
    eachCell(landing(game), (x, y) => ghost.add(y * WIDTH + x))
    eachCell(game.piece, (x, y) => { cells[y][x] = game.piece.color })
  }

  return <div className={`mt-6 w-full justify-self-center border border-[#a3ec68] p-[13px] shadow-[4px_4px_0_#a3ec68] md:mt-0 md:max-w-[405px] md:justify-self-end md:p-[15px] md:shadow-[6px_6px_0_#a3ec68] lg:p-[21px_22px_19px] ${panel}`}>
    <div className={`mb-3 flex justify-between font-['DM_Mono'] text-[9px] tracking-[.14em] ${text}`}><span>BUILD MODE</span><span className={muted}>LVL {String(level).padStart(2, '0')}</span></div>
    <div ref={boardRef} tabIndex={0} role="application" aria-label="Build Mode falling block game" aria-describedby={instructions}
      onFocus={() => { setFocused(true); setStarted(true) }} onBlur={() => setFocused(false)}
      onPointerDown={() => boardRef.current?.focus({ preventScroll: true })}
      onKeyDown={event => {
        if (event.altKey || event.ctrlKey || event.metaKey) return
        if (event.key === 'Escape') { event.currentTarget.blur(); return }
        const type = keys[event.key.length === 1 ? event.key.toLowerCase() : event.key]
        if (!type) return
        event.preventDefault()
        if (!active || (event.repeat && (type === 'drop' || type === 'rotate'))) return
        dispatch({ type } as Action)
      }}
      className="relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#4dd1dc] focus-visible:ring-offset-4 focus-visible:ring-offset-[#191a1e]">
      <div className="grid aspect-square grid-cols-10 grid-rows-[repeat(16,minmax(0,1fr))] gap-px" aria-hidden="true">
        {cells.flat().map((color, index) => <span key={index} className={`border ${color ? 'border-white/15' : ghost.has(index) ? 'border-[#a3ec68]/50' : 'border-[#24252a]'} ${colors[color]}`} />)}
      </div>
      {!active && <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#101112]/75 px-4 text-center text-[#e8e8e5]">
        <span className="font-['Press_Start_2P'] text-[11px] leading-6">{game.over ? 'GAME OVER' : started ? 'PAUSED' : 'READY TO BUILD?'}</span>
        <span className="font-['DM_Mono'] text-[10px]">{game.over ? `${game.lines} lines · ${game.score} points` : 'Click or Tab here to play'}</span>
      </div>}
    </div>
    <div className={`mt-3 flex items-center justify-between font-['DM_Mono'] text-[9px] ${muted}`}><span>SCORE {game.score}</span><span>LINES {game.lines}</span><button type="button" className={`cursor-pointer border border-current px-2 py-1 hover:text-[#4dd1dc] ${text}`} onClick={() => { dispatch({ type: 'reset', seed: Date.now() }); boardRef.current?.focus({ preventScroll: true }) }}>RESTART</button></div>
    <p id={instructions} className={`mt-3 text-center font-['DM_Mono'] text-[9px] leading-5 ${muted}`}>A/D or ←/→ move · W/↑ rotate<br />S/↓ soft drop · Space hard drop<br />Focus to play · Blur or Esc to pause</p>
    <div className="mt-2 flex justify-center gap-2 md:hidden" aria-label="Touch game controls">
      {([['left', '←'], ['rotate', '↻'], ['right', '→'], ['down', '↓'], ['drop', 'DROP']] as const).map(([type, label]) => <button key={type} type="button" aria-label={type} className={`min-h-10 min-w-10 cursor-pointer border border-current px-2 font-['DM_Mono'] text-xs ${text}`} onClick={() => { boardRef.current?.focus({ preventScroll: true }); dispatch({ type }) }}>{label}</button>)}
    </div>
  </div>
}
