import Animate from '@/components/Animate'

const TESTIMONIALS = [
  {
    name: 'Jasmín Pinchao',
    text: 'Las velas están bien elaboradas y tienen un aroma super rico y fuerte. ¡Las recomiendo totalmente!',
    initials: 'JP',
    color: '#E8956D',
  },
  {
    name: 'Tania Arcos',
    text: 'Las virgencitas están muy lindas. Un detalle precioso y lleno de devoción. Quedé encantada.',
    initials: 'TA',
    color: '#2D4A2D',
  },
  {
    name: 'Dr. Alex Sandoval',
    text: 'Están hermosas, un detalle hecho con amor, super recomendado. La calidad y el acabado son increíbles.',
    initials: 'AS',
    color: '#3D6B3D',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Subtle botanical watermark */}
      <div className="absolute top-0 right-0 opacity-[0.04] pointer-events-none select-none text-[20rem] leading-none text-brand-green font-cursive">
        ❧
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <Animate animation="fade-up">
          <div className="text-center mb-14">
            <span className="section-label">Testimonios</span>
            <h2 className="section-heading">Lo que dicen nuestros clientes</h2>
            <div className="floral-divider">
              <svg className="w-5 h-5 text-brand-peach" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 2 4-4 8.5-.5 8.5-.5C18 5 17 8 17 8z"/>
              </svg>
            </div>
          </div>
        </Animate>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <Animate key={t.name} animation="fade-up" delay={idx * 150}>
              <div className="relative p-7 rounded-3xl bg-brand-cream border border-brand-cream-dark hover:border-brand-peach/30 hover:shadow-lg hover:shadow-brand-peach/10 transition-all duration-300 flex flex-col h-full">
                {/* Decorative quote */}
                <div className="absolute top-4 right-6 font-cursive text-6xl text-brand-peach/15 leading-none select-none">
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-brand-peach" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-brand-text-mid leading-relaxed flex-1 mb-6 text-sm md:text-base font-heading italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Divider */}
                <div className="h-px bg-brand-cream-dark mb-5" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm text-white flex-shrink-0"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-green text-sm">{t.name}</p>
                    <p className="text-brand-text-light text-xs">Cliente verificado</p>
                  </div>
                </div>
              </div>
            </Animate>
          ))}
        </div>

        {/* Tagline */}
        <Animate animation="fade-up" delay={300}>
          <div className="mt-14 text-center">
            <p className="font-cursive text-2xl text-brand-green/60">
              &ldquo;Cada vela cuenta tu historia&rdquo;
            </p>
          </div>
        </Animate>
      </div>
    </section>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
