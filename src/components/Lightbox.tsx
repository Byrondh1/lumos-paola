'use client'

import { useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'

export function isVideo(url: string) {
  return /\.(mp4|mov)$/i.test(url)
}

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
  const videoRef = useRef<HTMLVideoElement>(null)

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

  // Autoplay when navigating to a video
  useEffect(() => {
    if (isVideo(images[index])) {
      videoRef.current?.play().catch(() => {})
    }
  }, [index, images])

  const current = images[index]

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/92 backdrop-blur-md" />

      {/* Main media — z-10 */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center px-20 py-20"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo(current) ? (
          <video
            ref={videoRef}
            key={current}
            src={current}
            autoPlay
            controls
            playsInline
            className="max-w-full max-h-full rounded-2xl shadow-2xl shadow-black/80 animate-lb-in"
            style={{ maxHeight: 'calc(100vh - 140px)', maxWidth: 'calc(100vw - 160px)' }}
          />
        ) : (
          <img
            key={current}
            src={current}
            alt={`${productName} — modelo ${index + 1}`}
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl shadow-black/80 animate-lb-in"
            style={{ maxHeight: 'calc(100vh - 140px)', maxWidth: 'calc(100vw - 160px)' }}
          />
        )}
      </div>

      {/* Close button — z-20 */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        aria-label="Cerrar"
        className="absolute top-5 right-5 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-400 hover:text-brand-peach hover:border-brand-peach/50 transition-all duration-200"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter — z-20 */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-zinc-900/70 border border-zinc-800 rounded-full px-4 py-1.5 pointer-events-none">
        <span className="text-brand-peach text-xs font-semibold">{index + 1}</span>
        <span className="text-zinc-600 text-xs">/</span>
        <span className="text-zinc-400 text-xs">{images.length}</span>
      </div>

      {/* Prev arrow — z-20 */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          aria-label="Anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-brand-peach hover:border-brand-peach/50 hover:bg-zinc-900 transition-all duration-200"
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
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-brand-peach hover:border-brand-peach/50 hover:bg-zinc-900 transition-all duration-200"
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
              className={`relative w-12 h-12 rounded-lg overflow-hidden ring-2 transition-all duration-200 ${
                i === index
                  ? 'ring-brand-peach scale-110'
                  : 'ring-zinc-700 opacity-50 hover:opacity-100 hover:ring-zinc-500'
              }`}
            >
              <MediaThumb src={src} alt="" />
              {isVideo(src) && <PlayOverlay size="sm" />}
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  )
}

/** Shows first frame for videos, or the image directly. */
function MediaThumb({ src, alt }: { src: string; alt: string }) {
  if (isVideo(src)) {
    return (
      <video
        src={src}
        preload="metadata"
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    )
  }
  return <img src={src} alt={alt} className="w-full h-full object-cover" />
}

/** Gold play icon overlay */
export function PlayOverlay({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const outer = size === 'sm' ? 'w-6 h-6' : 'w-10 h-10'
  const icon  = size === 'sm' ? 'w-2.5 h-2.5' : 'w-4 h-4'
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
      <div className={`${outer} rounded-full bg-brand-peach/90 flex items-center justify-center shadow-lg`}>
        <svg className={`${icon} text-brand-black ml-0.5`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  )
}
