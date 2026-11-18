import Arrow from '@/components/shared/Arrow'
import About from '@/components/aboutSection/About'
import BuildMode from '@/components/buildMode/BuildMode'
import Contact from '@/components/contactSection/Contact'
import Projects from '@/components/projectsSection/Projects'
import { PixelMark } from '@/components/shared/PixelBlocks'
import { siteContent } from '@/content/site'

export default function Portfolio() {
  const { header, hero, footer } = siteContent

  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <header className="site-header">
        <div className="page-width header-inner">
          <a href="#top" aria-label={header.homeLabel} className="wordmark">
            <PixelMark />
            {header.brand}<span aria-hidden="true">.</span>
          </a>
          <nav aria-label={header.navigationLabel} className="site-nav">
            {header.navigation.map(({ label, href }) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
          <a href={hero.resumeHref} target="_blank" rel="noopener noreferrer" className="button button-outline resume-link">
            Résumé <Arrow direction="up-right" />
          </a>
        </div>
      </header>

      <main id="content" tabIndex={-1}>
        <section className="hero" aria-labelledby="intro-title">
          <div className="page-width hero-inner">
            <div className="hero-copy">
              <p className="eyebrow hero-role"><span aria-hidden="true" />{hero.role}</p>
              <h1 id="intro-title">
                {hero.greeting}
                <span>{hero.headline}<span className="hero-pixels" aria-hidden="true"><i /><i /><i /></span></span>
              </h1>
              <p className="hero-description">{hero.description}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">Explore projects <Arrow direction="down-right" /></a>
                <a className="button button-outline" href="#build-mode"><span className="play-icon" aria-hidden="true" /> Try Build Mode</a>
              </div>
              <a className="current-project" href="#mini-mailroom">
                <span className="status-dot" aria-hidden="true" />
                Building <strong>Mini Mailroom</strong> <Arrow direction="up-right" />
              </a>
            </div>
            <BuildMode />
          </div>
        </section>

        <Projects />
        <About />
        <Contact />
      </main>

      <footer className="site-footer">
        <div className="page-width footer-inner">
          <span>{footer.copyright}</span>
          <a href="#top">Back to top <Arrow direction="up" /></a>
        </div>
      </footer>
    </>
  )
}
