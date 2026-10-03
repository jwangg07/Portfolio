import About from '@/components/aboutSection/About'
import BuildMode from '@/components/buildMode/BuildMode'
import Contact from '@/components/contactSection/Contact'
import Projects from '@/components/projectsSection/Projects'
import { PixelMark } from '@/components/shared/PixelBlocks'
import { siteContent } from '@/content/site'

function TitleLines({ lines }: { lines: readonly string[] }) {
  return lines.map((line, index) => (
    <span key={line}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ))
}

export default function Portfolio() {
  const { header, hero, footer } = siteContent

  return (
    <main
      id="top"
      className="min-h-screen scroll-smooth bg-[#101112] px-[13px] font-['DM_Sans'] text-[#e8e8e5] md:px-[34px] lg:px-[max(26px,calc((100vw-1128px)/2))]"
    >
      <header className="grid min-h-[57px] grid-cols-[1fr_auto] grid-rows-[27px_28px] items-center border-b border-[#2a2b2f] md:flex md:h-[82px] md:gap-[31px]">
        <a
          href="#top"
          aria-label={header.homeLabel}
          className="col-start-1 row-start-1 flex items-center gap-2 whitespace-nowrap font-['DM_Mono'] text-[7px] font-medium tracking-[.09em] text-[#e8e8e5] md:gap-[13px] md:text-[10px] md:tracking-[.12em]"
        >
          <PixelMark />
          {header.brand}
        </a>
        <nav
          aria-label={header.navigationLabel}
          className="col-span-2 col-start-1 row-start-2 flex items-end gap-[9px] md:ml-auto md:gap-[27px]"
        >
          {header.navigation.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="font-['DM_Mono'] text-[6px] tracking-[.06em] text-[#91939c] hover:text-[#a3ec68] md:text-[9px] md:tracking-[.1em]"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section className="grid grid-cols-1 items-center py-[26px] md:min-h-[485px] md:grid-cols-[1.05fr_.9fr] md:gap-[34px] md:py-[63px] lg:min-h-[550px] lg:grid-cols-[1.22fr_.88fr] lg:gap-[70px] lg:py-20">
        <div>
          <span className="font-['DM_Mono'] text-[7px] tracking-[.12em] text-[#a3ec68] md:text-[9px]">
            {hero.eyebrow}
          </span>
          <h1 className="my-[17px] max-w-[590px] font-['Press_Start_2P'] text-[14px] font-normal leading-[1.9] tracking-[-.04em] md:my-[25px] md:text-[20px] lg:text-[28px]">
            <span className="hidden md:inline">
              <TitleLines lines={hero.desktopTitleLines} />
            </span>
            <span className="md:hidden">
              <TitleLines lines={hero.mobileTitleLines} />
            </span>
          </h1>
          <p className="mb-[13px] max-w-[550px] text-[10px] leading-[1.65] text-[#91939c] md:mb-[25px] md:text-[15px] md:leading-[1.7]">
            {hero.description}
          </p>
          <a
            href={hero.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[25px] min-w-[61px] items-center justify-center bg-[#a3ec68] px-3 py-2 font-['DM_Mono'] text-[6px] tracking-[.12em] text-[#1a2115] hover:brightness-110 md:min-h-[46px] md:min-w-[102px] md:px-[25px] md:py-4 md:text-[9px]"
          >
            {hero.resumeLabel}
          </a>
          <span className="mt-[17px] flex items-center gap-[7px] font-['DM_Mono'] text-[6px] tracking-[.13em] md:mt-7 md:gap-[11px] md:text-[8px]">
            <i className="h-[5px] w-[5px] bg-[#a3ec68] md:h-[7px] md:w-[7px]" />
            <span className="text-[#91939c]">{hero.availability}</span>
          </span>
        </div>
        <BuildMode />
      </section>

      <About />
      <Projects />
      <Contact />

      <footer className="-mx-[13px] flex min-h-[46px] items-center justify-between border-t border-[#2a2b2f] px-[13px] font-['DM_Mono'] text-[6px] tracking-[.1em] text-[#91939c] md:mx-0 md:min-h-[76px] md:px-0 md:text-[8px]">
        <span>{footer.copyright}</span>
        <div className="flex gap-[6px] md:gap-[11px]">
          {footer.socialLinks.map(({ label, href, mark }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-[25px] w-[25px] place-items-center border border-[#2a2b2f] font-sans text-[12px] text-[#e8e8e5] transition hover:border-[#4dd1dc] hover:text-[#4dd1dc] md:h-[43px] md:w-[43px]"
            >
              {mark}
            </a>
          ))}
        </div>
      </footer>
    </main>
  )
}
