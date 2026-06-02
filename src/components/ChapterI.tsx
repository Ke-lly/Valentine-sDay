'use client';
import { motion } from 'framer-motion';
import { CHAPTER_DATA } from '../config/historyData';

export default function ChapterI() {
  return (
    <section className="min-h-screen py-24 flex flex-col items-center justify-center px-4 max-w-5xl mx-auto relative z-10">
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-script text-5xl text-romantic-pink mb-2 text-center"
      >
        Capítulo I
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-cinzel text-3xl md:text-4xl text-antiqueGold tracking-widest text-center mb-16"
      >
        {CHAPTER_DATA.chapter1.title}
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <div className="space-y-6 text-parchment-dark/90 leading-relaxed text-lg text-justify font-serif">
          {CHAPTER_DATA.chapter1.paragraphs.map((para, idx) => (
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.3, duration: 1 }}
              viewport={{ once: true }}
              key={idx}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Molduras Físicas Flutuantes de Fotos */}
        <div className="relative flex justify-center h-[350px]">
          <motion.div 
            animate={{ y: [0, -12, 0], rotate: [-2, -1, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-6 top-0 p-3 parchment-texture text-neutral-800 shadow-2xl max-w-[240px] transform rounded-sm border border-neutral-300"
          >
            <div className="w-full aspect-square bg-neutral-300 mb-3 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 to-transparent pointer-events-none" />
              <div className="w-full h-full bg-[radial-gradient(#8b7355_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
            </div>
            <p className="font-script text-center text-xl text-neutral-700">O início de tudo...</p>
          </motion.div>

          <motion.div 
            animate={{ y: [-10, 2, -10], rotate: [3, 4, 3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute right-6 bottom-0 p-3 parchment-texture text-neutral-800 shadow-2xl max-w-[240px] transform rounded-sm border border-neutral-300"
          >
            <div className="w-full aspect-square bg-neutral-300 mb-3 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 to-transparent pointer-events-none" />
            </div>
            <p className="font-script text-center text-xl text-neutral-700">Cumplicidade</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}