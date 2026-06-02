'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { CHAPTER_DATA, CapsuleItem } from '../config/historyData';

export default function ChapterV() {
  const [activeItem, setActiveItem] = useState<CapsuleItem | null>(null);

  return (
    <section className="min-h-screen py-24 px-4 relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center justify-center">
      <span className="font-script text-5xl text-romantic-pink mb-2">Capítulo V</span>
      <h2 className="font-cinzel text-3xl md:text-4xl text-antiqueGold tracking-widest text-center mb-16">Cápsula do Tempo Oculta</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {CHAPTER_DATA.capsule.map((item) => (
          <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            onClick={() => setActiveItem(item)}
            key={item.id}
            className="p-6 bg-gradient-to-br from-[#13171e] to-[#0f1217] border border-antiqueGold/20 rounded-md cursor-pointer text-center group shadow-md"
          >
            <div className="font-script text-4xl text-romantic-pink mb-3 group-hover:rotate-12 transition-transform duration-300">✉</div>
            <h4 className="font-cinzel text-sm text-antiqueGold tracking-wider">{item.title}</h4>
            <span className="text-[10px] uppercase tracking-widest text-parchment/40 mt-1 block">{item.dateStr}</span>
          </motion.div>
        ))}
      </div>

      {/* Janela de Visualização Modal Cinematográfica */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="parchment-texture text-neutral-900 p-8 md:p-12 max-w-lg w-full rounded-sm relative shadow-2xl border border-antiqueGold"
            >
              <button 
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 font-cinzel text-sm text-neutral-400 hover:text-neutral-800 cursor-pointer"
              >
                Fechar ✕
              </button>
              <span className="font-cinzel text-xs text-neutral-400 tracking-widest block mb-1">{activeItem.dateStr}</span>
              <h3 className="font-cinzel text-xl font-bold text-neutral-800 mb-6 border-b border-neutral-300 pb-2">{activeItem.title}</h3>
              <p className="font-serif italic text-lg text-neutral-800 leading-relaxed text-center py-4">"{activeItem.content}"</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}