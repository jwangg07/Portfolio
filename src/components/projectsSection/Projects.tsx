'use client'

import Image from 'next/image'
import { useState } from 'react'
import { projects } from '@/content/projects'
import { siteContent } from '@/content/site'
import type { PortfolioProject } from '@/features/portfolio/types'

type ProjectPreviewProps = { project: PortfolioProject }
type ProjectCardProps = ProjectPreviewProps & { index: number }

function ProjectPreview({ project }: ProjectPreviewProps) {
  const [failed, setFailed] = useState(false)
  const content = siteContent.projects

  return (
    <div className={`relative grid aspect-video place-items-center overflow-hidden ${project.color}`}>
      {project.imageSrc && !failed ? (
        <Image
          src={project.imageSrc}
          alt={project.imageAlt || `${project.title} ${content.previewAltSuffix}`}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex flex-col items-center gap-3 text-[#111214]/65">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current stroke-[1.5]">
            <rect x="3" y="3" width="18" height="18" rx="1" />
            <circle cx="8" cy="8" r="1.5" />
            <path d="m3 17 5-5 4 4 4-6 5 7" />
          </svg>
          <span className="font-['DM_Mono'] text-[10px] tracking-[.12em]">
            {content.previewPlaceholder}
          </span>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const links = [
    { label: 'GitHub', href: project.githubUrl },
    { label: 'Devpost', href: project.devpostUrl },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href))

  return (
    <article className={`relative z-0 flex min-w-0 flex-col bg-[#191a1e] ${project.projectUrl ? 'group transition-shadow hover:ring-1 hover:ring-[#a3ec68] focus-within:ring-2 focus-within:ring-[#4dd1dc]' : ''}`}>
      <ProjectPreview project={project} />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-['Press_Start_2P'] text-[10px] font-normal leading-5">
            {project.title}
          </h3>
          <span className="shrink-0 font-['DM_Mono'] text-[9px] text-[#91939c]">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <p className="mt-2 mb-4 text-[13px] leading-5 text-[#91939c]">
          {project.description}
        </p>
        {links.length > 0 && (
          <div className="relative z-20 mb-4 flex flex-wrap gap-2">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on ${label} (opens in a new tab)`}
                className="inline-flex min-h-8 items-center border border-[#46484b] px-3 font-['DM_Mono'] text-[9px] tracking-[.08em] text-[#e8e8e5] transition hover:border-[#a3ec68] hover:text-[#a3ec68] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4dd1dc]"
              >
                {label} <span aria-hidden="true" className="ml-1.5">↗</span>
              </a>
            ))}
          </div>
        )}
        <span className="mt-auto font-['DM_Mono'] text-[8px] leading-4 tracking-[.1em] text-[#91939c]">
          {project.stack}
        </span>
      </div>
      {project.projectUrl && (
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} project (opens in a new tab)`}
          className="absolute inset-0 z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4dd1dc]"
        />
      )}
    </article>
  )
}

export default function Projects() {
  const content = siteContent.projects

  return (
    <section id="projects" className="relative z-0 scroll-mt-[72px] pb-[57px] md:scroll-mt-[96px] md:pb-[92px] lg:pb-[115px]">
      <div className="mb-[15px] flex flex-col items-start gap-2 md:mb-[25px] md:flex-row md:items-center md:justify-between">
        <h2 className="m-0 font-['Press_Start_2P'] text-[14px] font-normal tracking-[.05em] md:text-[20px]">
          {content.heading}
        </h2>
        <span className="font-['DM_Mono'] text-[8px] tracking-[.13em] text-[#91939c]">
          {String(projects.length).padStart(2, '0')} {content.countLabel}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
