'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { PortfolioProject } from '@/features/portfolio/types'

export default function ProjectPreview({ project }: { project: PortfolioProject }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`project-preview${!project.imageSrc || failed ? ' project-placeholder' : ''}`}>
      {project.imageSrc && !failed ? (
        <Image
          src={project.imageSrc}
          alt={project.imageAlt || `${project.title} preview`}
          fill
          unoptimized
          sizes="(min-width: 1184px) 550px, (min-width: 640px) 48vw, 100vw"
          className="project-image"
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <span className="pixel-envelope" aria-hidden="true"><i /><i /></span>
          <span className="eyebrow">{failed ? 'Preview unavailable' : 'In development'}</span>
        </>
      )}
    </div>
  )
}
