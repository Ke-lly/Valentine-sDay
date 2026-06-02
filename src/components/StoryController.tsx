'use client';
import { useAudioEngine } from '../hooks/useAudioEngine';
import CanvasBackground from './CanvasBackground';
import OpeningLetter from './OpeningLetter';
import TimeCounter from './TimeCounter';
import ChapterI from './ChapterI';
import ChapterII from './ChapterII';
import ChapterIII from './ChapterIII';
import ChapterIV from './ChapterIV';
import ChapterV from './ChapterV';
import ChapterVI from './ChapterVI';
import ChapterVII from './ChapterVII';
import FinalGift from './FinalGift';
import { useState } from 'react';

export default function StoryController() {
  const [isOpen, setIsOpen] = useState(false);
  const { initAndPlay, analyser } = useAudioEngine();

  const handleOpenExperience = () => {
    setIsOpen(true);
    initAndPlay(); // Inicia o mecanismo de áudio de forma segura após o gesto do usuário
  };

  if (!isOpen) {
    return <OpeningLetter onOpen={handleOpenExperience} />;
  }

  return (
    <main className="relative min-h-screen bg-[#0c0f12] text-[#F5EFE6]">
      {/* Camada Cinematográfica de Background */}
      <CanvasBackground />

      <div className="relative z-10">
        <TimeCounter />
        <ChapterI />
        <hr className="border-t border-antiqueGold/10 max-w-xs mx-auto" />
        <ChapterII />
        <hr className="border-t border-antiqueGold/10 max-w-xs mx-auto" />
        <ChapterIII />
        <hr className="border-t border-antiqueGold/10 max-w-xs mx-auto" />
        <ChapterIV />
        <hr className="border-t border-antiqueGold/10 max-w-xs mx-auto" />
        <ChapterV />
        <hr className="border-t border-antiqueGold/10 max-w-xs mx-auto" />
        <ChapterVI analyser={analyser} />
        <ChapterVII />
        <FinalGift />
      </div>
    </main>
  );
}