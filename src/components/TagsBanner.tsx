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
      {/* Full-width diagonal strip - extends past viewport so bg runs edge to edge when rotated */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] py-5 md:py-6 bg-white/10 backdrop-blur-sm border-y border-white/20"
        style={{ transform: 'translate(-50%, -50%) rotate(-2deg)' }}
      >
        <div className="flex items-center gap-8 md:gap-12 animate-tags-marquee whitespace-nowrap py-1 pl-8 md:pl-12 pr-8 md:pr-12">
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
    </section>
  )
}
