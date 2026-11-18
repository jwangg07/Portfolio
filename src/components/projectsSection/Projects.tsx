import Arrow from '@/components/shared/Arrow'
import { projects } from '@/content/projects'
import type { PortfolioProject } from '@/features/portfolio/types'

import ProjectPreview from './ProjectPreview'

function ProjectCard({ project }: { project: PortfolioProject }) {
  const links = [
    { label: 'GitHub', href: project.githubUrl },
    { label: 'Devpost', href: project.devpostUrl },
  ].filter(({ href }) => Boolean(href))

  return (
    <article className="project-card" id={project.title.toLowerCase().replaceAll(/\s+/g, '-')}>
      <ProjectPreview project={project} />
      <div className="project-body">
        {project.date && <p className="project-date">{project.date}</p>}
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <ul className="project-stack" aria-label="Technologies">
          {project.stack.split(', ').map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <div className="project-links">
          {project.projectUrl && (
            <a
              className="project-live"
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo for ${project.title} (opens in a new tab)`}
            >
              Live demo <Arrow direction="up-right" />
            </a>
          )}
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on ${label} (opens in a new tab)`}
            >
              {label} <Arrow direction="up-right" />
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="page-width projects-section" aria-labelledby="projects-title">
      <h2 id="projects-title" className="section-title">Projects</h2>
      <div className="project-grid">
        {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
      </div>
    </section>
  )
}
