'use client'

import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface LightboxProps {
  images: string[]
  index: number
  productName: string
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ images, index, productName, onClose, onNavigate }: LightboxProps) {
  const hasPrev = index > 0
  const hasNext = index < images.length - 1

  const prev = useCallback(() => { if (hasPrev) onNavigate(index - 1) }, [hasPrev, index, onNavigate])
  const next = useCallback(() => { if (hasNext) onNavigate(index + 1) }, [hasNext, index, onNavigate])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/92 backdrop-blur-md" />

      {/* Main image — z-10, full area, stops propagation so backdrop click doesn't fire */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center px-20 py-20"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={images[index]}
          src={images[index]}
          alt={`${productName} — modelo ${index + 1}`}
          className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl shadow-black/80 animate-lb-in"
          style={{ maxHeight: 'calc(100vh - 140px)', maxWidth: 'calc(100vw - 160px)' }}
        />
      </div>

      {/* Close button — z-20 to sit above the image container */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        aria-label="Cerrar"
        className="absolute top-5 right-5 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-400 hover:text-brand-gold hover:border-brand-gold/50 transition-all duration-200"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter — z-20 */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-zinc-900/70 border border-zinc-800 rounded-full px-4 py-1.5 pointer-events-none">
        <span className="text-brand-gold text-xs font-semibold">{index + 1}</span>
        <span className="text-zinc-600 text-xs">/</span>
        <span className="text-zinc-400 text-xs">{images.length}</span>
      </div>

      {/* Prev arrow — z-20 */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          aria-label="Anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-brand-gold hover:border-brand-gold/50 hover:bg-zinc-900 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next arrow — z-20 */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); next() }}
          aria-label="Siguiente"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-brand-gold hover:border-brand-gold/50 hover:bg-zinc-900 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Thumbnail strip — z-20 */}
      {images.length > 1 && (
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className={`w-12 h-12 rounded-lg overflow-hidden ring-2 transition-all duration-200 ${
                i === index
                  ? 'ring-brand-gold scale-110'
                  : 'ring-zinc-700 opacity-50 hover:opacity-100 hover:ring-zinc-500'
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  )
}
