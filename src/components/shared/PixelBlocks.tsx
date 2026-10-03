const positions: Record<string, string> = {
  '0,0': 'row-start-1 col-start-1', '0,1': 'row-start-1 col-start-2', '0,2': 'row-start-1 col-start-3', '0,3': 'row-start-1 col-start-4',
  '1,0': 'row-start-2 col-start-1', '1,1': 'row-start-2 col-start-2', '1,2': 'row-start-2 col-start-3', '1,3': 'row-start-2 col-start-4',
  '2,0': 'row-start-3 col-start-1', '2,1': 'row-start-3 col-start-2', '2,2': 'row-start-3 col-start-3', '2,3': 'row-start-3 col-start-4',
}

export function PixelBlocks({ cells, className, color = 'bg-[#111214]' }: { cells: string[]; className: string; color?: string }) {
  return <span aria-hidden="true" className={`grid gap-[3px] ${className}`}>{cells.map((cell) => <i key={cell} className={`${color} ${positions[cell]}`} />)}</span>
}

export function PixelMark() {
  return <span aria-hidden="true" className="grid h-[14px] w-[15px] grid-cols-[repeat(3,4px)] grid-rows-[repeat(2,4px)] items-end gap-[2px]">{['col-start-1 row-start-2', 'col-start-2 row-start-1', 'col-start-2 row-start-2', 'col-start-3 row-start-2'].map((pos) => <i key={pos} className={`h-1 w-1 bg-[#a3ec68] ${pos}`} />)}</span>
}
