'use client';
import { motion } from 'framer-motion';
import { CHAPTER_DATA } from '../config/historyData';

export default function ChapterII() {
  return (
    <section className="min-h-screen py-24 flex flex-col items-center justify-center px-4 relative z-10 max-w-4xl mx-auto">
      <motion.span 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="font-script text-5xl text-romantic-pink mb-2"
      >
        Capítulo II
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="font-cinzel text-3xl md:text-4xl text-antiqueGold tracking-widest text-center mb-16"
      >
        {CHAPTER_DATA.chapter2.title}
      </motion.h2>

      <div className="parchment-texture text-neutral-900 p-8 md:p-16 rounded-sm shadow-2xl relative w-full border border-antiqueGold-dark/30">
        <div className="absolute top-4 right-4 font-cinzel text-xs text-neutral-400 tracking-widest">Confidencial</div>
        
        <div className="space-y-8 font-serif italic text-lg md:text-xl text-neutral-800 leading-relaxed text-center max-w-2xl mx-auto">
          {CHAPTER_DATA.chapter2.paragraphs.map((p, idx) => (
            <motion.p
              initial={{ opacity: 0, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: idx * 0.4 }}
              viewport={{ once: true }}
              key={idx}
              className="relative"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50 }}
            viewport={{ once: true }}
            className="w-12 h-[1px] bg-neutral-400"
          />
        </div>
      </div>
    </section>
  );
}