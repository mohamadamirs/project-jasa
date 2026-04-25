import React, { useEffect, useState, useRef } from 'react';
import { Search, Layout, Code2, Rocket } from 'lucide-react';

const baseSteps = [
  { step: "01", t: "Konsultasi", d: "Diskusi kebutuhan bisnis Anda secara detail.", i: Search },
  { step: "02", t: "Desain", d: "Pembuatan konsep visual yang modern.", i: Layout },
  { step: "03", t: "Development", d: "Proses pengkodean dan optimasi SEO.", i: Code2 },
  { step: "04", t: "Launch", d: "Website online dan siap menerima pelanggan.", i: Rocket }
];

// Duplicate steps to create infinite loop effect
const steps = [...baseSteps, ...baseSteps, ...baseSteps];

export default function WorkflowSlider() {
  // Start from the middle set to allow backward scrolling
  const [activeIndex, setActiveIndex] = useState(baseSteps.length);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const cardWidth = 240; // Card width
  const gap = 24; // Gap between cards

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 3500);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [activeIndex]);

  const handleNext = () => {
    setTransitionEnabled(true);
    setActiveIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    setTransitionEnabled(true);
    setActiveIndex(prev => prev - 1);
  };

  // Logic to handle infinite loop jump
  useEffect(() => {
    if (activeIndex >= baseSteps.length * 2) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setActiveIndex(baseSteps.length);
      }, 700); // Wait for transition animation
    } else if (activeIndex < baseSteps.length) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setActiveIndex(baseSteps.length * 2 - 1);
      }, 700);
    }
  }, [activeIndex]);

  const onStart = (x: number) => {
    setIsDragging(true);
    setStartX(x);
    stopAutoPlay();
  };

  const onMove = (x: number) => {
    if (!isDragging) return;
    setDragOffset(x - startX);
  };

  const onEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (dragOffset > 50) {
      handlePrev();
    } else if (dragOffset < -50) {
      handleNext();
    }
    
    setDragOffset(0);
  };

  return (
    <div 
      className="relative w-full overflow-hidden py-16 touch-none select-none cursor-grab active:cursor-grabbing"
      onMouseDown={(e) => onStart(e.pageX)}
      onMouseMove={(e) => onMove(e.pageX)}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
      onTouchStart={(e) => onStart(e.touches[0].clientX)}
      onTouchMove={(e) => onMove(e.touches[0].clientX)}
      onTouchEnd={onEnd}
    >
      <div 
        className={`flex gap-6 ${transitionEnabled && !isDragging ? 'transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]' : ''}`}
        style={{
          transform: `translateX(calc(50% - ${cardWidth/2}px - (${activeIndex} * (${cardWidth}px + ${gap}px)) + ${dragOffset}px))`
        }}
      >
        {steps.map((step, idx) => {
          const Icon = step.i;
          const isActive = activeIndex === idx;
          const isRealActive = (idx % baseSteps.length) === (activeIndex % baseSteps.length);
          
          return (
            <div
              key={`${step.step}-${idx}`}
              className={`shrink-0 w-[${cardWidth}px] transition-all duration-700
                ${isActive ? 'scale-110 opacity-100' : 'scale-90 opacity-20 blur-[1px]'}`}
            >
              <div className={`bg-white card-standard p-10 text-center flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden ${isActive ? 'border-blue-600/30 shadow-2xl shadow-blue-600/10' : 'border-slate-100'}`}>
                {/* Step Number Badge */}
                <div className={`absolute top-4 right-6 text-4xl font-black italic transition-opacity duration-500 ${isActive ? 'opacity-10 text-blue-600' : 'opacity-0'}`}>
                  {step.step}
                </div>

                <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center mb-8 transition-all duration-500 ${isActive ? 'bg-blue-600 text-white rotate-6 scale-110' : 'bg-slate-100 text-slate-400'}`}>
                  <Icon size={32} strokeWidth={2.5} />
                </div>
                <h3 className={`mb-4 transition-colors duration-500 text-xl font-extrabold ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>{step.t}</h3>
                <p className={`text-slate-600 text-sm leading-relaxed transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>{step.d}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modern Slim Indicators */}
      <div className="flex justify-center gap-1.5 mt-12">
        {baseSteps.map((_, i) => {
          const currentRealIndex = activeIndex % baseSteps.length;
          return (
            <div 
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${currentRealIndex === i ? 'w-10 bg-blue-600' : 'w-2 bg-blue-600/10'}`}
            />
          );
        })}
      </div>
    </div>
  );
}
