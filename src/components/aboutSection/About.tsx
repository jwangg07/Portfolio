import { siteContent } from '@/content/site'

export default function About() {
  const content = siteContent.about
  return <section id="about" className="grid grid-cols-1 gap-[13px] pb-[51px] md:grid-cols-2 md:gap-8 md:pb-[92px] lg:gap-14 lg:pb-[102px]">
    <div><span className="font-['DM_Mono'] text-[7px] tracking-[.12em] text-[#ff9060] md:text-[9px]">{content.eyebrow}</span><h2 className="mt-[15px] font-['Press_Start_2P'] text-[clamp(12px,3.7vw,15px)] font-normal leading-[1.9] md:mt-[23px] md:text-[clamp(16px,1.8vw,21px)] md:leading-[1.95]">{content.titleLines.map((line, index) => <span key={line}>{line}{index < content.titleLines.length - 1 && <br />}</span>)}</h2></div>
    <div className="max-w-[535px]"><p className="mb-[13px] text-[10px] leading-[1.65] text-[#91939c] md:mb-[22px] md:text-[15px] md:leading-[1.7]">{content.description}</p><span className="font-['DM_Mono'] text-[6px] tracking-[.11em] text-[#91939c] md:text-[8px]"><b className="font-medium text-[#e8e8e5]">{content.toolkitLabel}</b> / {content.toolkit}</span></div>
  </section>
}
