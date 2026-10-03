export const WIDTH = 10
export const HEIGHT = 16
const SHAPES = [
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[0, 1, 0], [1, 1, 1]],
  [[0, 1, 1], [1, 1, 0]],
  [[1, 1, 0], [0, 1, 1]],
  [[1, 0, 0], [1, 1, 1]],
  [[0, 0, 1], [1, 1, 1]],
]

export type Piece = { shape: number[][]; x: number; y: number; color: number }
export type Game = {
  board: number[][]; piece: Piece; bag: number[]; seed: number
  score: number; lines: number; over: boolean
}
export type Action = { type: 'left' | 'right' | 'down' | 'tick' | 'rotate' | 'drop' } | { type: 'reset'; seed: number }

function nextPiece(game: Game): Game {
  const bag = [...game.bag]
  let seed = game.seed
  if (!bag.length) {
    bag.push(0, 1, 2, 3, 4, 5, 6)
    for (let i = bag.length - 1; i > 0; i--) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
      const j = seed % (i + 1)
      ;[bag[i], bag[j]] = [bag[j], bag[i]]
    }
  }
  const kind = bag.pop()!
  const shape = SHAPES[kind].map(row => [...row])
  const piece = { shape, x: Math.floor((WIDTH - shape[0].length) / 2), y: 0, color: kind + 1 }
  return { ...game, bag, seed, piece, over: !fits(game.board, piece) }
}

export function createGame(seed = 1): Game {
  return nextPiece({ board: Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(0)), piece: { shape: [], x: 0, y: 0, color: 1 }, bag: [], seed, score: 0, lines: 0, over: false })
}

export function fits(board: number[][], piece: Piece): boolean {
  return piece.shape.every((row, dy) => row.every((cell, dx) => !cell || (
    piece.x + dx >= 0 && piece.x + dx < WIDTH && piece.y + dy >= 0 &&
    piece.y + dy < HEIGHT && !board[piece.y + dy][piece.x + dx]
  )))
}

export function landing(game: Game): Piece {
  let piece = game.piece
  while (fits(game.board, { ...piece, y: piece.y + 1 })) piece = { ...piece, y: piece.y + 1 }
  return piece
}

function lock(game: Game): Game {
  const board = game.board.map(row => [...row])
  game.piece.shape.forEach((row, dy) => row.forEach((cell, dx) => {
    if (cell) board[game.piece.y + dy][game.piece.x + dx] = game.piece.color
  }))
  const remaining = board.filter(row => row.some(cell => !cell))
  const cleared = HEIGHT - remaining.length
  return nextPiece({ ...game,
    board: [...Array.from({ length: cleared }, () => Array(WIDTH).fill(0)), ...remaining],
    lines: game.lines + cleared,
    score: game.score + [0, 100, 300, 500, 800][cleared] * (1 + Math.floor(game.lines / 10)),
  })
}

export function gameReducer(game: Game, action: Action): Game {
  if (action.type === 'reset') return createGame(action.seed)
  if (game.over) return game
  if (action.type === 'drop') {
    const piece = landing(game)
    return lock({ ...game, piece, score: game.score + (piece.y - game.piece.y) * 2 })
  }
  if (action.type === 'rotate') {
    const shape = game.piece.shape[0].map((_, x) => game.piece.shape.map(row => row[x]).reverse())
    for (const offset of [0, -1, 1, -2, 2]) {
      const piece = { ...game.piece, shape, x: game.piece.x + offset }
      if (fits(game.board, piece)) return { ...game, piece }
    }
    return game
  }
  const horizontal = action.type === 'left' || action.type === 'right'
  const piece = { ...game.piece, x: game.piece.x + (horizontal ? (action.type === 'left' ? -1 : 1) : 0), y: game.piece.y + (horizontal ? 0 : 1) }
  if (fits(game.board, piece)) return { ...game, piece, score: game.score + (action.type === 'down' ? 1 : 0) }
  return horizontal ? game : lock(game)
}
