'use client';
import { useEffect, useRef } from 'react';

interface ChapterVIProps {
  analyser: AnalyserNode | null;
}

export default function ChapterVI({ analyser }: ChapterVIProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const bufferLength = analyser ? analyser.frequencyBinCount : 32;
    const dataArray = new Uint8Array(bufferLength);

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 400;
      canvas.height = 200;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      animationId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (analyser) {
        analyser.getByteFrequencyData(dataArray);
      } else {
        // Fallback procedural se o áudio ainda não tiver iniciado
        for(let i=0; i<bufferLength; i++) {
          dataArray[i] = Math.sin(Date.now() * 0.003 + i) * 30 + 40;
        }
      }

      const barWidth = (canvas.width / bufferLength) * 1.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
        
        // Gradiente romântico de espectro
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, 'rgba(74, 88, 110, 0.2)');
        gradient.addColorStop(0.5, 'rgba(220, 214, 247, 0.6)');
        gradient.addColorStop(1, 'rgba(232, 197, 200, 0.9)');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);

        x += barWidth;
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [analyser]);

  return (
    <section className="min-h-[60vh] py-16 px-4 relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center justify-center">
      <span className="font-script text-5xl text-romantic-pink mb-2">Capítulo VI</span>
      <h2 className="font-cinzel text-3xl md:text-4xl text-antiqueGold tracking-widest text-center mb-6">A Trilha das Nossas Almas</h2>
      <p className="font-serif italic text-parchment/60 text-center max-w-md mb-12">A frequência exata de quando nossos mundos colidiram.</p>
      
      <div className="w-full max-w-xl bg-black/40 backdrop-blur-sm border border-antiqueGold/20 p-6 rounded-md shadow-2xl">
        <canvas ref={canvasRef} className="w-full h-[200px]" />
      </div>
    </section>
  );
}