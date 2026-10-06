import { siteContent } from '@/content/site'
import SocialIcon from '@/components/shared/SocialIcon'

export default function Contact() {
  const content = siteContent.contact

  return (
    <section id="contact" className="scroll-mt-[72px] pb-8 md:scroll-mt-[96px] md:pb-[86px]">
      <span className="font-['DM_Mono'] text-[7px] tracking-[.12em] text-[#4dd1dc] md:text-[9px]">
        {content.eyebrow}
      </span>
      <h2 className="my-[14px] max-w-[285px] font-['Press_Start_2P'] text-[clamp(9px,3.1vw,12px)] font-normal leading-[1.85] md:my-[23px] md:max-w-none md:text-[clamp(14px,1.65vw,20px)]">
        {content.heading}
      </h2>
      <p className="text-[9px] leading-[1.55] text-[#91939c] md:text-sm md:leading-[1.7]">
        {content.description}
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3 md:mt-9">
        {siteContent.footer.socialLinks.map(({ label, href, display }) => (
          <a
            key={label}
            href={href}
            target={label === 'Email' ? undefined : '_blank'}
            rel={label === 'Email' ? undefined : 'noopener noreferrer'}
            className="flex min-w-0 items-center gap-3 border border-[#2a2b2f] bg-[#191a1e] p-4 transition hover:border-[#4dd1dc] hover:text-[#4dd1dc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4dd1dc]"
          >
            <SocialIcon name={label} className="h-5 w-5 shrink-0" />
            <span className="min-w-0">
              <span className="block font-['DM_Mono'] text-[9px] tracking-[.1em]">{label}</span>
              <span className="block break-all text-[10px] text-[#91939c] md:text-xs">{display}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
