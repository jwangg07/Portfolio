'use client'

import { useEffect, useRef, useState } from 'react'
import Arrow from './Arrow'

export default function BackToTop() {
  const endRef = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const end = endRef.current
    if (!end) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(end)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <span className="page-end" ref={endRef} aria-hidden="true" />
      <a className="button button-primary back-to-top" href="#top" data-visible={visible} tabIndex={visible ? 0 : -1}>
        Back to top <Arrow direction="up" />
      </a>
    </>
  )
}
