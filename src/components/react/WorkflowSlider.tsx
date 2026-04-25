import React, { useEffect, useState, useRef } from 'react';
import { Search, Layout, Code2, Rocket } from 'lucide-react';

const steps = [
  { step: "01", t: "Konsultasi", d: "Diskusi kebutuhan bisnis Anda secara detail.", i: Search },
  { step: "02", t: "Desain", d: "Pembuatan konsep visual yang modern.", i: Layout },
  { step: "03", t: "Development", d: "Proses pengkodean dan optimasi SEO.", i: Code2 },
  { step: "04", t: "Launch", d: "Website online dan siap menerima pelanggan.", i: Rocket }
];

export default function WorkflowSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const onStart = (x: number) => {
    setIsDragging(true);
    setStartX(x);
    stopAutoPlay();
  };

  const onMove = (x: number) => {
    if (!isDragging) return;
    const diff = x - startX;
    setDragOffset(diff);
  };

  const onEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Snapping logic based on drag distance
    if (dragOffset > 50) {
      setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length);
    } else if (dragOffset < -50) {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }
    
    setDragOffset(0);
    startAutoPlay();
  };

  return (
    <div 
      className="relative w-full overflow-hidden py-12 touch-none select-none cursor-grab active:cursor-grabbing"
      onMouseDown={(e) => onStart(e.pageX)}
      onMouseMove={(e) => onMove(e.pageX)}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
      onTouchStart={(e) => onStart(e.touches[0].clientX)}
      onTouchMove={(e) => onMove(e.touches[0].clientX)}
      onTouchEnd={onEnd}
    >
      <div 
        className={`flex gap-6 transition-transform ${isDragging ? 'duration-0' : 'duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]'}`}
        style={{
          transform: `translateX(calc(50% - 100px - (${activeIndex} * (200px + 24px)) + ${dragOffset}px))`
        }}
      >
        {steps.map((step, idx) => {
          const Icon = step.i;
          const isActive = activeIndex === idx;
          return (
            <div
              key={step.step}
              className={`shrink-0 w-[200px] transition-all duration-700
                ${isActive ? 'scale-110 opacity-100' : 'scale-90 opacity-30 blur-[0.5px]'}`}
            >
              <div className={`bg-white card-standard p-8 text-center flex flex-col items-center justify-center min-h-[240px] ${isActive ? 'border-blue-600/20 shadow-2xl shadow-blue-600/10' : ''}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500 ${isActive ? 'bg-blue-600 text-white' : 'bg-blue-600/10 text-blue-600'}`}>
                  <Icon size={28} />
                </div>
                <h4 className={`mb-3 font-bold transition-colors duration-500 ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>{step.t}</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-3">{step.d}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mt-12">
        {steps.map((_, i) => (
          <div 
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-10 bg-blue-600' : 'w-3 bg-blue-600/10'}`}
          />
        ))}
      </div>
    </div>
  );
}
