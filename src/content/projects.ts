import type { PortfolioProject } from '../features/portfolio/types'

// imageSrc: public path (e.g. /projects/demo.webp) or full image URL.
// githubUrl: repository link. Empty values show a placeholder and an unlinked card.
export const projects: PortfolioProject[] = [
  {
    title: 'Cortex',
    description: 'AI-powered learning web app that transforms a user’s learning goals into interactive, visual knowledge trees to help users break down unfamiliar subjects into structured learning paths',
    stack: 'React, TypeScript, Node.js, Express, Gemini, MongoDB',
    color: 'bg-[#4dd1dc]',
    imageSrc: '',
    imageAlt: '',
    githubUrl: ''
  },
  {
    title: 'Oboxle',
    description: 'A browser based boxing game that lets players use webcam movements to spar in real time',
    stack: 'React, TypeScript, Node.js, Express, Gemini, MongoDB',
    color: 'bg-[#4dd1dc]',
    imageSrc: '/projects/oboxle.png',
    imageAlt: 'Multiplayer view punching',
    githubUrl: 'https://github.com/jwangg07/StormHacks2026'
  },
  {
    title: 'Findr',
    description: 'Event discovery platform for students to easily find events near them',
    stack: 'Next.js, Supabase, Gemini',
    color: 'bg-[#4dd1dc]',
    imageSrc: '/projects/findr.png',
    imageAlt: 'Findr event discovery platform preview',
    githubUrl: 'https://github.com/br-iscool/hellohacks2026'
  },
  {
    title: 'UBCSchedules',
    description: 'Generate all possible weekly course schedules from a set of user picked UBC courses to streamline UBC’s course selection process',
    stack: 'React, JavaScript, Node.js, Express, Resend',
    color: 'bg-[#4dd1dc]',
    imageSrc: '/projects/ubcschedules.png',
    imageAlt: 'UBC Schedules example calendar preview',
    githubUrl: 'https://github.com/jwangg07/UBCSchedules'
  },
  {
    title: 'Personal Note Taking App',
    description: 'Easy-access personal sticky-note style notes stored on local storage for privacy and offline access',
    stack: 'Java, Swing, JUnit',
    color: 'bg-[#4dd1dc]',
    imageSrc: '/projects/notetakingapp.png',
    imageAlt: 'Note taking app preview',
    githubUrl: 'https://github.com/jwangg07/note-taking-app'
  },
]
