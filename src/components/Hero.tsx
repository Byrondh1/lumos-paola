'use client'

import { useRef, useEffect, useCallback } from 'react'
import { WHATSAPP_URL } from '@/lib/constants'

// Candle positions: x/y as % of section, s=size scale, d=flicker duration(s), delay(s)
const CANDLES = [
  { x:  5, y: 70, s: 0.80, d: 2.8, delay: 0.0 },
  { x: 14, y: 82, s: 0.60, d: 3.3, delay: 0.7 },
  { x: 24, y: 76, s: 0.72, d: 2.6, delay: 1.4 },
  { x: 73, y: 73, s: 0.88, d: 3.0, delay: 0.3 },
  { x: 83, y: 66, s: 0.75, d: 2.4, delay: 1.9 },
  { x: 91, y: 79, s: 0.65, d: 3.2, delay: 0.9 },
  { x: 96, y: 62, s: 0.55, d: 2.7, delay: 2.2 },
  { x: 38, y: 88, s: 0.55, d: 3.5, delay: 1.1 },
  { x: 62, y: 86, s: 0.60, d: 2.9, delay: 1.7 },
  { x:  2, y: 88, s: 0.50, d: 3.1, delay: 2.5 },
  { x: 97, y: 90, s: 0.50, d: 2.5, delay: 1.6 },
  { x: 50, y: 93, s: 0.45, d: 3.4, delay: 0.5 },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const glowRef    = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback((e: MouseEvent) => {
    const glow    = glowRef.current
    const section = sectionRef.current
    if (!glow || !section) return
    const { left, top } = section.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    glow.style.background =
      `radial-gradient(circle at ${x}px ${y}px,` +
      `rgba(232,149,109,0.20) 0px,` +
      `rgba(232,149,109,0.07) 110px,` +
      `transparent 240px,` +
      `rgba(0,0,0,0.38) 430px)`
    glow.style.opacity = '1'
  }, [])

  const onMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)
    return () => {
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [onMouseMove, onMouseLeave])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#2D4A2D' }}
    >
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/hero/hero.jpg')` }}
        aria-hidden="true"
      />

      {/* Warm botanical overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-green/70 via-brand-green/40 to-brand-green/75" />

      {/* Soft decorative glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-brand-peach/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-brand-cream/8 blur-3xl" />
      </div>

      {/* Animated candle flames — scattered along edges and bottom */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {CANDLES.map((c, i) => (
          <div
            key={i}
            className="absolute"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          >
            {/* Ambient halo */}
            <div
              style={{
                position: 'absolute',
                width:  `${c.s * 150}px`,
                height: `${c.s * 150}px`,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(ellipse at 50% 55%,
                  rgba(232,149,109,0.22) 0%,
                  rgba(200,110,40,0.08) 45%,
                  transparent 70%)`,
                animation: `candle-glow-pulse ${(c.d * 1.25).toFixed(2)}s ease-in-out infinite ${(c.delay + 0.3).toFixed(2)}s`,
              }}
            />
            {/* Flame body */}
            <div
              style={{
                position: 'absolute',
                width:  `${c.s * 16}px`,
                height: `${c.s * 28}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -95%)',
                borderRadius: '45% 45% 55% 55% / 30% 30% 70% 70%',
                background: 'linear-gradient(to top, rgba(255,150,30,0.75) 0%, rgba(232,90,15,0.45) 55%, transparent 100%)',
                filter: `blur(${(c.s * 2.5).toFixed(1)}px)`,
                animation: `candle-flicker ${c.d}s ease-in-out infinite ${c.delay}s`,
                transformOrigin: 'bottom center',
              }}
            />
            {/* Bright inner core */}
            <div
              style={{
                position: 'absolute',
                width:  `${c.s * 7}px`,
                height: `${c.s * 12}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -108%)',
                borderRadius: '45% 45% 55% 55% / 30% 30% 70% 70%',
                background: 'rgba(255, 215, 110, 0.82)',
                filter: `blur(${(c.s * 1.2).toFixed(1)}px)`,
                animation: `candle-flicker ${(c.d * 0.88).toFixed(2)}s ease-in-out infinite ${(c.delay + 0.15).toFixed(2)}s`,
                transformOrigin: 'bottom center',
              }}
            />
          </div>
        ))}
      </div>

      {/* Candle-glow cursor effect — follows the mouse with a warm peach light */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{ transition: 'opacity 0.6s ease' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-20">

        {/* Badge */}
        <div
          className="hero-anim inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-5 py-2 mb-8 backdrop-blur-sm"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-peach animate-pulse" />
          <span className="text-brand-cream text-xs font-semibold tracking-widest uppercase">
            Velas Artesanales • Ecuador
          </span>
        </div>

        {/* Cursive title */}
        <h1
          className="hero-anim font-cursive text-6xl md:text-8xl lg:text-9xl text-white mb-2 leading-none"
          style={{ animationDelay: '0.3s' }}
        >
          Lumos
        </h1>
        <p
          className="hero-anim font-heading italic text-brand-cream/90 text-xl md:text-2xl lg:text-3xl font-light mb-6"
          style={{ animationDelay: '0.45s' }}
        >
          by Paola
        </p>

        {/* Floral separator */}
        <div
          className="hero-anim flex items-center justify-center gap-4 mb-7"
          style={{ animationDelay: '0.55s' }}
        >
          <div className="h-px w-16 bg-brand-peach/60" />
          <svg className="w-6 h-6 text-brand-peach/80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a2 2 0 00-2 2c0 .74.4 1.38 1 1.72V7h-2a2 2 0 000 4h.28A2 2 0 008 13a2 2 0 002 2v.28A2 2 0 0012 17a2 2 0 002-1.72V13a2 2 0 002-2 2 2 0 00-2.28-1.98H14V5.72A2 2 0 0014 4a2 2 0 00-2-2z"/>
          </svg>
          <div className="h-px w-16 bg-brand-peach/60" />
        </div>

        {/* Slogan */}
        <p
          className="hero-anim font-heading italic text-xl md:text-2xl text-white/85 mb-4"
          style={{ animationDelay: '0.65s' }}
        >
          &ldquo;Transforma tu espacio con un destello de aroma&rdquo;
        </p>

        {/* Description */}
        <p
          className="hero-anim text-brand-cream/75 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ animationDelay: '0.78s' }}
        >
          Velas florales artesanales elaboradas 100% a mano. Diseños únicos y personalizados
          para eventos, regalos y momentos especiales.
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-anim flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animationDelay: '0.9s' }}
        >
          <a href="#productos" className="btn-peach text-base px-8 py-4 shadow-lg shadow-brand-peach/30">
            <LeafIcon className="w-4 h-4" />
            Ver Catálogo
          </a>
          <a
            href={`${WHATSAPP_URL}?text=${encodeURIComponent('¡Hola! Me gustaría saber más sobre sus velas artesanales.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white active:scale-95 text-base"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Contactar por WhatsApp
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="hero-anim mt-16 flex justify-center animate-bounce"
          style={{ animationDelay: '1.1s' }}
        >
          <a href="#nosotros" className="text-white/40 hover:text-brand-peach transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
