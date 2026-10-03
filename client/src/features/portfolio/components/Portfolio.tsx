'use client'

import { useState } from 'react'
import About from '@/components/aboutSection/About'
import Contact from '@/components/contactSection/Contact'
import Projects from '@/components/projectsSection/Projects'
import { PixelMark } from '@/components/shared/PixelBlocks'
import BuildMode from '@/components/buildMode/BuildMode'

export default function Portfolio() {
  const [light, setLight] = useState(false)
  const text = light ? 'text-[#151618]' : 'text-[#e8e8e5]'
  const muted = light ? 'text-[#656872]' : 'text-[#91939c]'
  const panel = light ? 'bg-[#e5e5df]' : 'bg-[#191a1e]'
  const border = light ? 'border-[#d1d2cb]' : 'border-[#2a2b2f]'

  return <main id="top" className={`min-h-screen scroll-smooth px-[13px] font-['DM_Sans'] transition-colors md:px-[34px] lg:px-[max(26px,calc((100vw-1128px)/2))] ${light ? 'bg-[#f3f3ed]' : 'bg-[#101112]'} ${text}`}>
    <header className={`grid min-h-[57px] grid-cols-[1fr_auto] grid-rows-[27px_28px] items-center border-b md:flex md:h-[82px] md:gap-[31px] ${border}`}>
      <a href="#top" aria-label="Jerry Wang home" className={`col-start-1 row-start-1 flex items-center gap-2 whitespace-nowrap font-['DM_Mono'] text-[7px] font-medium tracking-[.09em] md:gap-[13px] md:text-[10px] md:tracking-[.12em] ${text}`}><PixelMark />JERRY WANG</a>
      <nav aria-label="Main navigation" className="col-span-2 col-start-1 row-start-2 flex items-end gap-[9px] md:ml-auto md:gap-[27px]">{[['ABOUT ME', '#about'], ['PROJECTS', '#projects'], ['CONTACT', '#contact']].map(([label, href]) => <a key={href} href={href} className={`font-['DM_Mono'] text-[6px] tracking-[.06em] hover:text-[#a3ec68] md:text-[9px] md:tracking-[.1em] ${muted}`}>{label}</a>)}</nav>
      <div role="group" aria-label="Choose color theme" className={`col-start-2 row-start-1 flex gap-0.5 border p-[1px] md:ml-auto ${border}`}>{[['LIGHT', true], ['DARK', false]].map(([label, mode]) => <button key={String(label)} onClick={() => setLight(Boolean(mode))} className={`border px-[7px] py-[5px] font-['DM_Mono'] text-[5px] tracking-[.1em] md:px-3 md:py-[11px] md:text-[9px] ${light === mode ? `border-[#4dd1dc] ${text}` : `border-transparent ${muted}`}`}>{label}</button>)}</div>
    </header>

    <section className="grid grid-cols-1 items-center py-[26px] md:min-h-[485px] md:grid-cols-[1.05fr_.9fr] md:gap-[34px] md:py-[63px] lg:min-h-[550px] lg:grid-cols-[1.22fr_.88fr] lg:gap-[70px] lg:py-20">
      <div><span className="font-['DM_Mono'] text-[7px] tracking-[.12em] text-[#a3ec68] md:text-[9px]">PLAYER 01 / JERRY WANG</span><h1 className="my-[17px] max-w-[590px] font-['Press_Start_2P'] text-[14px] font-normal leading-[1.9] tracking-[-.04em] md:my-[25px] md:text-[20px] lg:text-[28px]">HI, I’M JERRY.<span className="hidden md:inline"> I<br />MAKE THE PIECES FIT.</span><span className="md:hidden"><br />I MAKE THE<br />PIECES FIT.</span></h1><p className={`mb-[13px] max-w-[550px] text-[10px] leading-[1.65] md:mb-[25px] md:text-[15px] md:leading-[1.7] ${muted}`}>A developer turning complex problems into thoughtful digital experiences. One well-placed block at a time.</p><a href="mailto:hello@jerrywang.dev?subject=Resume%20request" className="inline-flex min-h-[25px] min-w-[61px] items-center justify-center bg-[#a3ec68] px-3 py-2 font-['DM_Mono'] text-[6px] tracking-[.12em] text-[#1a2115] hover:brightness-110 md:min-h-[46px] md:min-w-[102px] md:px-[25px] md:py-4 md:text-[9px]">RESUME</a><span className="mt-[17px] flex items-center gap-[7px] font-['DM_Mono'] text-[6px] tracking-[.13em] md:mt-7 md:gap-[11px] md:text-[8px]"><i className="h-[5px] w-[5px] bg-[#a3ec68] md:h-[7px] md:w-[7px]" /><span className={muted}>OPEN TO NEW COLLABORATIONS</span></span></div>
      <BuildMode panel={panel} text={text} muted={muted} />
    </section>

    <About muted={muted} text={text} />
    <Projects muted={muted} panel={panel} />
    <Contact muted={muted} />

    <footer className={`-mx-[13px] flex min-h-[46px] items-center justify-between border-t px-[13px] font-['DM_Mono'] text-[6px] tracking-[.1em] md:mx-0 md:min-h-[76px] md:px-0 md:text-[8px] ${border} ${muted}`}><span>© 2026 JERRY WANG</span><div className="flex gap-[6px] md:gap-[11px]">{[['GitHub', 'https://github.com/'], ['LinkedIn', 'https://www.linkedin.com/'], ['Email', 'mailto:hello@jerrywang.dev']].map(([label, href]) => <a key={label} href={href} aria-label={label} className={`grid h-[25px] w-[25px] place-items-center border font-sans text-[12px] transition hover:border-[#4dd1dc] hover:text-[#4dd1dc] md:h-[43px] md:w-[43px] ${border} ${text}`}>{label === 'GitHub' ? 'GH' : label === 'LinkedIn' ? 'in' : '✉'}</a>)}</div></footer>
  </main>
}
