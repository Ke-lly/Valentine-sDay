'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function FinalGift() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <section className="min-h-screen py-24 px-4 flex flex-col items-center justify-center relative z-30 max-w-3xl mx-auto text-center">
      {!isUnlocked ? (
        <div className="space-y-8">
          <h3 className="font-cinzel text-xl md:text-2xl text-antiqueGold tracking-widest">O Próximo Capítulo</h3>
          <p className="font-serif italic text-parchment/70 max-w-md mx-auto">Você aceita abrir o nosso portal para as próximas eras?</p>
          
          <motion.button
            onClick={() => setIsUnlocked(true)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-20 h-20 bg-gradient-to-br from-antiqueGold via-amber-200 to-antiqueGold-dark text-neutral-900 rounded-full flex items-center justify-center shadow-2xl font-cinzel text-2xl font-bold border border-white/20 cursor-pointer mx-auto mt-6"
          >
            🔑
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="parchment-texture text-neutral-900 p-8 md:p-16 rounded-sm shadow-2xl border-4 border-double border-antiqueGold-dark/40 max-w-xl w-full"
        >
          <h2 className="font-script text-5xl text-romantic-slateBlue mb-6">Gustavo, meu eterno amor,</h2>
          <p className="font-serif text-justify text-neutral-800 leading-relaxed space-y-4">
            Obrigado por viver esta história comigo. Cada detalhe do que construímos até aqui é o meu tesouro mais precioso. 
            Isso não é um site, não é um portfólio; é a declaração de que meu mundo é infinitamente mais brilhante porque você está nele.
          </p>
          
          <div className="mt-12 text-center space-y-2 border-t border-neutral-300 pt-6">
            <p className="font-cinzel text-xs tracking-widest text-neutral-500 uppercase">Esta história ainda está sendo escrita.</p>
            <p className="font-script text-3xl text-romantic-slateBlue">Com todo o meu amor, Kelly.</p>
          </div>
        </motion.div>
      )}
    </section>
  );
}