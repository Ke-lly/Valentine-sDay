'use client';
import { motion } from 'framer-motion';
import { CHAPTER_DATA } from '../config/historyData';

export default function ChapterIV() {
  return (
    <section className="min-h-screen py-24 px-4 relative z-10 max-w-4xl mx-auto w-full">
      <div className="text-center mb-20">
        <span className="font-script text-5xl text-romantic-pink mb-2 block">Capítulo IV</span>
        <h2 className="font-cinzel text-3xl md:text-4xl text-antiqueGold tracking-widest">O Livro das Eras</h2>
      </div>

      <div className="relative border-l border-antiqueGold/30 ml-4 md:ml-32 space-y-16">
        {CHAPTER_DATA.timeline.map((item, index) => (
          <div key={item.id} className="relative pl-8 md:pl-12 group">
            {/* Marcador de Ouro */}
            <div className="absolute -left-[6px] top-2 w-3 h-3 rounded-full bg-antiqueGold group-hover:scale-150 transition-transform duration-300 shadow-[0_0_8px_#D4AF37]" />
            
            {/* Data Flutuante na Lateral Esquerda */}
            <div className="absolute right-full mr-8 top-1 hidden md:block text-right w-48 font-cinzel text-xs text-antiqueGold/60 tracking-wider">
              {item.date}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="parchment-texture text-neutral-900 p-6 rounded-sm shadow-xl max-w-xl border border-antiqueGold-dark/20"
            >
              <span className="font-cinzel text-[10px] uppercase tracking-widest text-neutral-500 block md:hidden mb-2">{item.date}</span>
              <h3 className="font-cinzel text-lg font-bold text-neutral-800 mb-2">{item.title}</h3>
              <p className="font-serif text-neutral-700 leading-relaxed text-sm">{item.text}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}