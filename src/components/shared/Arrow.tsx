export default function Arrow({ direction = 'right' }: { direction?: 'right' | 'up-right' | 'down-right' | 'up' }) {
  return <span aria-hidden="true" className={`arrow arrow-${direction}`} />
}
