import { projects } from '@/content/projects'
import { PixelBlocks } from '../shared/PixelBlocks'

type ProjectsProps = { muted: string; panel: string }
const shapeSizes = [
  'h-[56px] w-[84px] md:h-[84px] md:w-[126px]',
  'h-[58px] w-[58px] md:h-[84px] md:w-[84px]',
  'h-[84px] w-[58px] md:h-[126px] md:w-[84px]',
  'h-[25px] w-[100px] md:h-[38px] md:w-[150px]',
]

export default function Projects({ muted, panel }: ProjectsProps) {
  return <section id="projects" className="pb-[57px] md:pb-[92px] lg:pb-[115px]">
    <div className="mb-[15px] flex flex-col items-start gap-2 md:mb-[25px] md:flex-row md:items-center md:justify-between"><h2 className="m-0 font-['Press_Start_2P'] text-[14px] font-normal tracking-[.05em] md:text-[20px]">PROJECTS</h2><span className={`font-['DM_Mono'] text-[6px] tracking-[.13em] md:text-[8px] ${muted}`}>04 BLOCKS / SAMPLE PROJECTS</span></div>
    <div className="grid grid-cols-1 gap-[13px] md:grid-cols-2 md:gap-[22px]">{projects.map((project, i) => <article key={project.title} className={`min-w-0 ${panel}`}>
      <div className={`grid aspect-[1.36/1] place-items-center md:aspect-auto md:h-[190px] lg:h-[220px] ${project.color}`}><PixelBlocks cells={project.shape} className={`gap-0.5 md:gap-[3px] ${shapeSizes[i]} ${project.grid}`} /></div>
      <div className="min-h-0 p-[15px_13px] md:min-h-[178px] md:p-5 lg:p-[24px_25px_25px]"><div className="flex items-center justify-between gap-2"><h3 className="m-0 font-['Press_Start_2P'] text-[8px] font-normal leading-[1.5] md:text-[10px] lg:text-xs">{project.title}</h3><span className={`font-['DM_Mono'] text-[6px] md:text-[8px] ${muted}`}>0{i + 1}</span></div><p className={`my-[7px] text-[9px] leading-[1.6] md:my-[11px] md:text-[13px] lg:text-sm ${muted}`}>{project.description}</p><span className={`font-['DM_Mono'] text-[6px] tracking-[.1em] md:text-[8px] ${muted}`}>{project.stack}</span></div>
    </article>)}</div>
  </section>
}
