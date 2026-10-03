import type { PortfolioProject } from '../features/portfolio/types'

export const projects: PortfolioProject[] = [
  { title: 'Stack Sustudio', description: 'A focused workspace for ideas that deserve to ship.', stack: 'REACT / TYPESCRIPT / 2026', color: 'bg-[#4dd1dc]', shape: ['0,1', '1,0', '1,1', '1,2'], grid: 'grid-cols-3 grid-rows-2' },
  { title: 'Common Ground', description: 'A community platform that brings good people and local ideas together.', stack: 'NEXT.JS / POSTGRESQL / 2026', color: 'bg-[#a3ec68]', shape: ['0,0', '0,1', '1,0', '1,1'], grid: 'grid-cols-2 grid-rows-2' },
  { title: 'Loop Radio', description: 'An experimental music player built for finding your next favorite sound.', stack: 'REACT / WEB AUDIO / 2025', color: 'bg-[#ff9060]', shape: ['0,0', '1,0', '1,1', '2,0'], grid: 'grid-cols-2 grid-rows-3' },
  { title: 'Tiny Tools', description: 'Small, fast utilities that make everyday development a little easier.', stack: 'TYPESCRIPT / NODE.JS / 2025', color: 'bg-[#7693ff]', shape: ['0,0', '0,1', '0,2', '0,3'], grid: 'grid-cols-4 grid-rows-1' },
]
