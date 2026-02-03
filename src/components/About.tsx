'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const About = () => {
  const paragraphs = [
    `Heyy, welcome to my art chaos ✨`,
    `I'm a mandala artist, pen sketch artist, pencil sketch artist… and on emotionally stable days, a digital artist and try DIY stuff too..`,
    `I'm slightly clumsy, heavily passionate, and powered by patience + overthinking. Like… Olympic level overthinking. Introvert? Yes. Will still post my art online like it's a personality trait? ALSO yes.`,
    `I live for details , which is why mandala art and I are basically soulmates. If it has tiny lines, patterns, or takes 500 years to finish… I'm in. Just like in life, I will zoom into the smallest detail and think about it for 3–5 business days.`,
    `Go ahead, scroll like you "accidentally" ended up here. Fall in love with a piece, pretend you're "just looking," and then buy it anyway..  I support good decisions 😌`,
    `Stick around for new drops, detailed chaos, and proof that overthinking can actually be productive 🌝✨`,
  ]

  return (
    <section id="about" className="relative min-h-[90vh] flex flex-col lg:flex-row overflow-hidden">
      {/* Left panel - image */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        viewport={{ once: true }}
        className="relative w-full lg:w-[42%] lg:min-w-[320px] min-h-[50vh] lg:min-h-[90vh] flex items-center justify-center p-6 lg:p-10 order-2 lg:order-1"
      >
        <div
          className="relative w-full max-w-[350px] md:max-w-[400px] aspect-[4/5] rounded-lg overflow-hidden border-4 border-white shadow-2xl"
          style={{ transform: 'rotate(30deg)' }}
        >
          <Image
            src="/images/about/about-silhouette.png"
            alt="Sai Vindhya - artist at work"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 350px, 400px"
            priority={false}
          />
        </div>
      </motion.div>

      {/* Right panel - content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative w-full lg:flex-1 min-w-0 flex flex-col lg:flex-row order-1 lg:order-2"
      >
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-12 py-16 lg:py-24">
          <p className="text-white/60 text-sm font-medium tracking-widest uppercase mb-2">About</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-8">
            Who is Sai Vindhya?
          </h2>
          <div className="space-y-5 text-white/85 text-base md:text-lg leading-relaxed max-w-2xl">
            {paragraphs.map((text, i) => (
              <p key={i} className={i === 0 ? 'text-lg md:text-xl font-medium text-white' : ''}>
                {text}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default About
