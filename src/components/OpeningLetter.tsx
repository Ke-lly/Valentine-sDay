'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface OpeningLetterProps {
  onOpen: () => void;
}

export default function OpeningLetter({ onOpen }: OpeningLetterProps) {
  const [isBroken, setIsBroken] = useState(false);

  const handleSealClick = () => {
    setIsBroken(true);
    setTimeout(() => {
      onOpen();
    }, 1600);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0d0e12] relative overflow-hidden z-50 px-4">
      {/* Luz ambiente de vela */}
      <div className="absolute w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[140px] animate-candle-flicker pointer-events-none" />

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative max-w-xl w-full aspect-[4/3] flex items-center justify-center p-8 text-center"
      >
        {/* Corpo do Envelope Físico */}
        <div className="absolute inset-0 bg-[#e3dac9] rounded-sm shadow-2xl border border-[#c5ba9f] overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1/2 bg-[#dbd0bc] origin-top transform skew-y-12 shadow-sm border-b border-black/5" />
          <div className="absolute top-0 inset-x-0 h-1/2 bg-[#dbd0bc] origin-top transform -skew-y-12 shadow-sm border-b border-black/5" />
        </div>

        {/* Selo de Cera Dinâmico */}
        {!isBroken ? (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSealClick}
            className="z-10 w-24 h-24 rounded-full bg-gradient-to-br from-red-700 to-red-950 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.6)] cursor-pointer border border-red-600/30 relative"
          >
            {/* Interior Detalhado do Selo */}
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-red-500/20 flex items-center justify-center">
              <span className="font-script text-4xl text-amber-200/80 select-none">G&K</span>
            </div>
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/40 rounded-full" />
          </motion.button>
        ) : (
          <motion.div 
            animate={{ scale: [1, 2], opacity: [1, 0] }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="z-10 w-24 h-24 rounded-full bg-red-900 flex items-center justify-center font-script text-4xl text-amber-200"
          >
            ✦
          </motion.div>
        )}

        {/* Feedback de Interação */}
        <motion.p 
          animate={{ opacity: isBroken ? 0 : [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute bottom-8 font-cinzel text-xs tracking-[0.25em] text-romantic-slateBlue/70 uppercase pointer-events-none"
        >
          Toque no selo de cera para romper o segredo
        </motion.p>
      </motion.div>
    </div>
  );
}