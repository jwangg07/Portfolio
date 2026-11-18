import Image from 'next/image'
import { siteContent } from '@/content/site'

export default function About() {
  const { description } = siteContent.about

  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="page-width about-inner">
        <div className="portrait-frame">
          <Image
            src="/projects/profile.JPG"
            alt="Portrait of Jerry Wang"
            width={1657}
            height={1649}
            sizes="(min-width: 800px) 320px, (min-width: 420px) 300px, 78vw"
            className="portrait"
          />
          <PixelDecoration />
        </div>
        <div className="about-copy">
          <h2 id="about-title" className="section-title">About me<span aria-hidden="true">.</span></h2>
          <p>{description}</p>
        </div>
      </div>
    </section>
  )
}

function PixelDecoration() {
  return <span className="portrait-pixels" aria-hidden="true"><i /><i /><i /><i /></span>
}
