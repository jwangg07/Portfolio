export const siteContent = {
  metadata: {
    title: 'Jerry Wang',
    description: 'Jerry Wang is a full-stack developer and UBC computer science student. Explore his projects and play a round of Build Mode.',
  },
  header: {
    brand: 'Jerry Wang',
    homeLabel: 'Jerry Wang home',
    navigationLabel: 'Main navigation',
    navigation: [
      { label: 'About', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  hero: {
    greeting: 'Hi, I’m Jerry.',
    headline: 'I fit blocks together.',
    description: 'Second year computer science student at UBC, interested in building software to automate everyday tasks, and exploring whats possible with AI.',
    resumeHref: 'https://drive.google.com/file/d/17rfqfPy_jljDpgBJo4ilXSdHvvtDOYHp/view?usp=drive_link',
  },
  about: {
    description: 'I’m a second-year Computer Science student at the University of British Columbia. I enjoy building software, exploring new technologies, and turning ideas into projects that solve real problems. Outside of coding, you’ll probably find me playing Tetris or Minesweeper, or on the court playing volleyball and badminton.',
  },
  contact: {
    heading: 'Let’s get in touch',
    description: 'Have a project in mind or just want to say hi? Send me a message.',
  },
  buildMode: {
    title: 'Build Mode',
    ariaLabel: 'Falling block game board',
    touchControls: [
      { action: 'left', label: '←', ariaLabel: 'Move left' },
      { action: 'right', label: '→', ariaLabel: 'Move right' },
      { action: 'rotate', label: '↻', ariaLabel: 'Rotate' },
      { action: 'down', label: '↓', ariaLabel: 'Soft drop' },
      { action: 'drop', label: 'Drop', ariaLabel: 'Hard drop' },
    ],
  },
  footer: {
    copyright: '© 2026 Jerry Wang',
    socialLinks: [
      { label: 'GitHub', href: 'https://github.com/jwangg07', display: 'github.com/jwangg07' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jwangg07', display: 'linkedin.com/in/jwangg07' },
      { label: 'Email', href: 'mailto:wangjerry1007@gmail.com', display: 'wangjerry1007@gmail.com' },
    ],
  },
} as const
