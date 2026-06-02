'use client';
import { motion } from 'framer-motion';
import { CHAPTER_DATA } from '../config/historyData';

export default function ChapterIII() {
  const s = CHAPTER_DATA.stats;

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.8, ease: "easeOut" }
    })
  };

  return (
    <section className="min-h-screen py-24 flex flex-col items-center justify-center px-4 relative z-10 w-full max-w-5xl mx-auto">
      <span className="font-script text-5xl text-romantic-pink mb-2">Capítulo III</span>
      <h2 className="font-cinzel text-3xl md:text-4xl text-antiqueGold tracking-widest text-center mb-16">Nossa Linha Matemática</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {[
          { value: s.daysTogether, label: "Dias Ininterruptos", sub: "De puro amor" },
          { value: s.hoursShared, label: "Horas Conversando", sub: "Sem o tempo passar" },
          { value: s.memoriesCount, label: "Memórias Claras", sub: "E eternizadas" },
          { value: s.favoriteSong, label: "Melodia Guia", sub: "A trilha das almas" },
        ].map((item, idx) => (
          <motion.div
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -8, borderColor: 'rgba(214,175,55,0.6)' }}
            key={idx}
            className="bg-[#12161c] border border-antiqueGold/20 rounded-md p-6 text-center flex flex-col justify-center items-center h-56 transition-all duration-300 shadow-xl"
          >
            <span className="font-cinzel text-2xl md:text-3xl text-antiqueGold font-bold tracking-tight mb-2">{item.value}</span>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-parchment/90 mb-1">{item.label}</h4>
            <p className="font-serif text-xs italic text-parchment/40">{item.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}