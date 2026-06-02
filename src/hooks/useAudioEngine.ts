import { useEffect, useRef, useState } from 'react';
import { SYSTEM_CONFIG } from '../config/historyData';

export function useAudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  useEffect(() => {
    // Carregamento assíncrono preventivo do arquivo de áudio
    fetch(SYSTEM_CONFIG.musicUrl)
      .then(res => res.arrayBuffer())
      .then(arrayBuffer => {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;
        
        ctx.decodeAudioData(arrayBuffer, (buffer) => {
          audioBufferRef.current = buffer;
        });
      }).catch(err => console.error("Erro ao carregar trilha sonora:", err));

    return () => {
      if (sourceNodeRef.current) sourceNodeRef.current.stop();
    };
  }, []);

  const initAndPlay = () => {
    if (!audioContextRef.current || !audioBufferRef.current || isPlaying) return;

    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const source = ctx.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.loop = true;

    const gainNode = ctx.createGain();
    const analyserNode = ctx.createAnalyser();
    analyserNode.fftSize = 64;

    source.connect(analyserNode);
    analyserNode.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Fade-in linear cinematográfico de 3 segundos
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 3);

    source.start(0);
    sourceNodeRef.current = source;
    gainNodeRef.current = gainNode;
    setAnalyser(analyserNode);
    setIsPlaying(true);
  };

  return { initAndPlay, isPlaying, analyser };
}