'use client';
import { useEffect, useState } from 'react';
import { SYSTEM_CONFIG } from '../config/historyData';

export default function TimeCounter() {
  const [time, setTime] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(SYSTEM_CONFIG.anniversaryDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = now - targetDate;

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const year = day * 365.25;

      const years = Math.floor(diff / year);
      const months = Math.floor((diff % year) / (day * 30.4375));
      const days = Math.floor(((diff % year) % (day * 30.4375)) / day);
      const hours = Math.floor((diff % day) / hour);
      const minutes = Math.floor((diff % hour) / minute);
      const seconds = Math.floor((diff % minute) / second);

      setTime({ years, months, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderUnit = (val: number, label: string) => (
    <div className="flex flex-col items-center p-3 md:p-5 bg-black/30 backdrop-blur-sm rounded-lg border border-antiqueGold/20 w-16 md:w-24">
      <span className="font-cinzel text-xl md:text-3xl text-antiqueGold font-bold">{val.toString().padStart(2, '0')}</span>
      <span className="text-[10px] md:text-xs font-serif uppercase tracking-widest text-parchment/60 mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-2 md:gap-4 justify-center items-center my-12 px-2">
      {renderUnit(time.years, 'Anos')}
      {renderUnit(time.months, 'Meses')}
      {renderUnit(time.days, 'Dias')}
      {renderUnit(time.hours, 'Horas')}
      {renderUnit(time.minutes, 'Minutos')}
      {renderUnit(time.seconds, 'Segundos')}
    </div>
  );
}