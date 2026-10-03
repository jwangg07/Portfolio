type AboutProps = { muted: string; text: string }

export default function About({ muted, text }: AboutProps) {
  return <section id="about" className="grid grid-cols-1 gap-[13px] pb-[51px] md:grid-cols-2 md:gap-8 md:pb-[92px] lg:gap-14 lg:pb-[102px]">
    <div><span className="font-['DM_Mono'] text-[7px] tracking-[.12em] text-[#ff9060] md:text-[9px]">01 / ABOUT ME</span><h2 className="mt-[15px] font-['Press_Start_2P'] text-[clamp(12px,3.7vw,15px)] font-normal leading-[1.9] md:mt-[23px] md:text-[clamp(16px,1.8vw,21px)] md:leading-[1.95]">CURIOSITY IS MY<br className="hidden md:block" /> FAVORITE<br className="md:hidden" /> BUILDING BLOCK.</h2></div>
    <div className="max-w-[535px]"><p className={`mb-[13px] text-[10px] leading-[1.65] md:mb-[22px] md:text-[15px] md:leading-[1.7] ${muted}`}>I’m Jerry, a developer who enjoys the space where logic meets creativity. I care about the small details: a fast interaction, a clear interface, and code that’s a pleasure to work with.</p><span className={`font-['DM_Mono'] text-[6px] tracking-[.11em] md:text-[8px] ${muted}`}><b className={`font-medium ${text}`}>MY TOOLKIT</b> / REACT · TYPESCRIPT · NODE.JS</span></div>
  </section>
}
