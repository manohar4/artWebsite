'use client'

const TAGS = [
  'Concept Artist',
  'Mandala Artist',
  'Portrait',
  'Freelance Creative',
  'Tattoo Design',
  'Wall Painter',
]

export default function TagsBanner() {
  const repeatedTags = [...TAGS, ...TAGS, ...TAGS]

  return (
    <section className="relative w-full py-12 md:py-16 overflow-hidden" aria-hidden="true">
      {/* Diagonal strip - generous padding so rotated strip and text aren't clipped */}
      <div className="w-full px-4 md:px-6">
        <div
          className="relative w-full py-5 md:py-6 bg-white/10 backdrop-blur-sm border-y border-white/20 overflow-visible"
          style={{ transform: 'rotate(-2deg)' }}
        >
          <div className="flex items-center gap-8 md:gap-12 animate-tags-marquee whitespace-nowrap py-1 pl-16 md:pl-24 pr-16 md:pr-24">
            {repeatedTags.map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="text-white/90 font-semibold text-sm md:text-base uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
