'use client';
import { useEffect, useRef, useState } from 'react';

export default function ChapterVII() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'intro' | 'gustavo' | 'kelly' | 'heart'>('intro');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('gustavo'), 2000);
    const timer2 = setTimeout(() => setPhase('kelly'), 7000);
    const timer3 = setTimeout(() => setPhase('heart'), 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Estrutura matemática de pontos para a constelação
    const totalParticles = 220;
    const particles: Array<{
      x: number; y: number;
      targetX: number; targetY: number;
      size: number; alpha: number;
      speed: number;
    }> = [];

    // Geração de posições iniciais dispersas pelo cosmos
    for (let i = 0; i < totalParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: Math.random() * width,
        targetY: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.4,
        speed: Math.random() * 0.04 + 0.02
      });
    }

    // Função interna para mapear coordenadas baseadas em texto ou equações matemáticas
    const updateTargets = () => {
      if (phase === 'gustavo' || phase === 'kelly') {
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 80px Georgia';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.clearRect(0, 0, width, height);
        ctx.fillText(phase === 'gustavo' ? 'Gustavo' : 'Kelly', width / 2, height / 2);

        const imgData = ctx.getImageData(0, 0, width, height).data;
        let pIndex = 0;

        // Amostragem de pixels acesos na tela para criar os alvos dos nós estelares
        for (let y = 0; y < height; y += 7) {
          for (let x = 0; x < width; x += 7) {
            const alphaIndex = (y * width + x) * 4 + 3;
            if (imgData[alphaIndex] > 128 && pIndex < totalParticles) {
              particles[pIndex].targetX = x;
              particles[pIndex].targetY = y;
              pIndex++;
            }
          }
        }
      } else if (phase === 'heart') {
        // Implementação matemática da Cardioide Clássica de Coordenadas
        for (let i = 0; i < totalParticles; i++) {
          const t = (i / totalParticles) * Math.PI * 2;
          // Equação paramétrica do coração estilizado
          const x = 16 * Math.pow(Math.sin(t), 3);
          const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);

          particles[i].targetX = width / 2 + x * 12;
          particles[i].targetY = height / 2 - y * 12; // Invertido para o espaço cartesiano do Canvas
        }
      }
    };

    updateTargets();

    const loop = () => {
      ctx.fillStyle = 'rgba(12, 15, 18, 0.2)'; // Rastro de fade cósmico elegante
      ctx.fillRect(0, 0, width, height);

      updateTargets();

      // Interpolação vetorial geométrica linear para o efeito de morphing suave
      particles.forEach((p, idx) => {
        p.x += (p.targetX - p.x) * p.speed;
        p.y += (p.targetY - p.y) * p.speed;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#fff';
        ctx.fill();

        // Linhas de constelação translúcidas entre nós próximos
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 45) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(220, 214, 247, ${0.15 * (1 - dist / 45)})`;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animationId);
  }, [phase]);

  return (
    <section className="h-screen w-full bg-[#0c0f12] relative overflow-hidden flex items-center justify-center z-20">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      <div className="absolute top-12 font-cinzel text-xs text-antiqueGold/40 tracking-[0.4em] uppercase text-center w-full pointer-events-none">
        O Céu das Nossas Memórias
      </div>
    </section>
  );
}