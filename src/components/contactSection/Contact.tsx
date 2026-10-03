import { siteContent } from '@/content/site'

export default function Contact() {
  const content = siteContent.contact

  return (
    <section id="contact" className="pb-8 md:pb-[86px]">
      <span className="font-['DM_Mono'] text-[7px] tracking-[.12em] text-[#4dd1dc] md:text-[9px]">
        {content.eyebrow}
      </span>
      <h2 className="my-[14px] max-w-[285px] font-['Press_Start_2P'] text-[clamp(9px,3.1vw,12px)] font-normal leading-[1.85] md:my-[23px] md:max-w-none md:text-[clamp(14px,1.65vw,20px)]">
        {content.heading}
      </h2>
      <p className="text-[9px] leading-[1.55] text-[#91939c] md:text-sm md:leading-[1.7]">
        {content.description}
      </p>
    </section>
  )
}
