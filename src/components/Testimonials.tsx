'use client'

import { motion } from 'framer-motion'

interface Testimonial {
  id: string
  text: string
  author: string
  handle?: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    text: "If you're not using testimonials, you're missing out on a golden opportunity to turn visitors and potential buyers into actual customers.",
    author: 'Christine Jackson',
    handle: 'gmail_christina_29',
  },
  {
    id: '2',
    text: "If you're not using testimonials, you're missing out on a golden opportunity to turn visitors and potential buyers into actual customers.",
    author: 'Yasmine Garcia',
    handle: 'yasmine_g_29',
  },
  {
    id: '3',
    text: "If you're not using testimonials, you're missing out on a golden opportunity to turn visitors and potential buyers into actual customers.",
    author: 'Sakura Palestri',
    handle: '@ADORA_palastri_20',
  },
  {
    id: '4',
    text: "If you're not using testimonials, you're missing out on a golden opportunity to turn visitors and potential buyers into actual customers.",
    author: 'Bie, Lô Linh',
    handle: 'product_manager_29',
  },
  {
    id: '5',
    text: "If you're not using testimonials, you're missing out on a golden opportunity to turn visitors and potential buyers into actual customers.",
    author: 'Ibrahim Mahmud',
    handle: 'sport_manager_29',
  },
  {
    id: '6',
    text: "If you're not using testimonials, you're missing out on a golden opportunity to turn visitors and potential buyers into actual customers.",
    author: 'Margaret Taylor',
    handle: 'started_painting_in_2015',
  },
]

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-6 md:px-12 lg:px-20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Our trusted clients
          </h2>
          <p className="text-white/80 text-lg">
            Some of my favorite testimonials from my clients.
          </p>
        </motion.div>

        {/* Testimonials Grid - 2x3, white cards, dark text, no profile images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg flex flex-col"
            >
              <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-6 flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div>
                <p className="text-gray-900 font-semibold text-base">
                  {testimonial.author}
                </p>
                {testimonial.handle && (
                  <p className="text-gray-500 text-sm mt-0.5">
                    {testimonial.handle}
                  </p>
                )}
              </div>
              <p className="text-gray-400 text-6xl font-serif mt-4 leading-none select-none" aria-hidden>
                &ldquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
