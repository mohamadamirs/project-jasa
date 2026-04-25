import React, { useEffect, useRef, useState } from 'react';
import { Search, Layout, Code2, Rocket, ChevronsLeft, ChevronsRight } from 'lucide-react';

const steps = [
  { step: "01", t: "Konsultasi", d: "Diskusi kebutuhan bisnis Anda secara detail.", i: "search" },
  { step: "02", t: "Desain", d: "Pembuatan konsep visual yang modern.", i: "layout" },
  { step: "03", t: "Development", d: "Proses pengkodean dan optimasi SEO.", i: "code-2" },
  { step: "04", t: "Launch", d: "Website online dan siap menerima pelanggan.", i: "rocket" }
];

const IconMap: Record<string, React.ReactNode> = {
  "search": <Search className="w-10 h-10" />,
  "layout": <Layout className="w-10 h-10" />,
  "code-2": <Code2 className="w-10 h-10" />,
  "rocket": <Rocket className="w-10 h-10" />
};

export const WorkflowSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const tripledSteps = [...steps, ...steps, ...steps];

  // Stable Scroll Handler
  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;
    const firstCard = slider.querySelector('.workflow-card') as HTMLElement;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth + 24;
    const setWidth = cardWidth * steps.length;

    // Infinite Loop Logic
    if (scrollLeft <= 0) {
      slider.scrollLeft = setWidth;
    } else if (scrollLeft >= scrollWidth - clientWidth - 2) {
      slider.scrollLeft = setWidth - (cardWidth * (steps.length - 1));
    }

    // Elevation Focus Detection
    const center = slider.getBoundingClientRect().left + slider.offsetWidth / 2;
    const cards = slider.querySelectorAll('.workflow-card');
    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(center - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });
    setActiveIndex(closestIdx % steps.length);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Initial Position Setup
    const firstCard = slider.querySelector('.workflow-card') as HTMLElement;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 24;
      slider.scrollLeft = cardWidth * steps.length;
      // Force immediate focus detection
      setTimeout(handleScroll, 50);
    }

    slider.addEventListener('scroll', handleScroll, { passive: true });
    return () => slider.removeEventListener('scroll', handleScroll);
  }, []);

  // Separate Auto-Scroll Interval
  useEffect(() => {
    if (isInteracting) return;

    const autoScroll = setInterval(() => {
      const slider = sliderRef.current;
      if (slider) {
        const firstCard = slider.querySelector('.workflow-card') as HTMLElement;
        if (firstCard) {
          const cardWidth = firstCard.offsetWidth + 24;
          const nextIndex = (activeIndex + 1) % steps.length;
          slider.scrollTo({ 
            left: cardWidth * (steps.length + nextIndex), 
            behavior: 'smooth' 
          });
        }
      }
    }, 4000);

    return () => clearInterval(autoScroll);
  }, [isInteracting, activeIndex]);

  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
    >
      {/* Visual Swipe Hint */}
      <div className="flex items-center justify-center gap-2 mb-6 text-blue-600/40 animate-pulse" aria-hidden="true">
        <ChevronsLeft className="w-4 h-4" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Geser untuk Lihat Proses</span>
        <ChevronsRight className="w-4 h-4" />
      </div>

      <div 
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto pb-16 pt-8 snap-x snap-mandatory no-scrollbar scroll-smooth px-4"
      >
        {tripledSteps.map((item, idx) => {
          const isActive = activeIndex === (idx % steps.length);
          const isClone = idx < steps.length || idx >= steps.length * 2;

          return (
            <div 
              key={`${item.step}-${idx}`}
              aria-hidden={isClone}
              className={`
                workflow-card shrink-0
                w-[280px] bg-white border rounded-[clamp(1.25rem,5vw,2rem)] p-8 snap-center
                transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] relative
                ${isActive 
                  ? "border-blue-200 shadow-[0_20px_50px_rgba(37,99,235,0.12)] -translate-y-4 z-10 scale-100 opacity-100" 
                  : "border-slate-100 shadow-sm translate-y-0 scale-95 opacity-100 lg:opacity-100"
                }
              `}
            >
              <div className="relative">
                {/* Step Number Badge */}
                <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border-4 border-white z-20 transition-colors duration-500 ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {item.step}
                </div>
                
                <div className={`w-20 h-20 bg-white border-2 rounded-[2rem] flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-xl transition-all duration-500 ${isActive ? 'bg-blue-600 text-white border-blue-600 rotate-6 shadow-blue-600/20' : 'bg-slate-50 text-blue-600 border-blue-600/5 shadow-blue-600/5'}`}>
                  {IconMap[item.i]}
                </div>
              </div>
              
              <h3 className={`mb-3 md:mb-4 text-xl font-bold tracking-tight transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                {item.t}
              </h3>
              <p className={`text-sm leading-relaxed transition-colors ${isActive ? 'text-slate-500' : 'text-slate-400'}`}>
                {item.d}
              </p>

              {/* Large Background Step Counter */}
              <div className={`mt-6 text-[4rem] font-black leading-none select-none transition-all duration-700 ${isActive ? 'text-blue-600/5 translate-y-0' : 'text-blue-600/0 translate-y-4'}`}>
                {item.step}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 -mt-8 mb-8">
        {steps.map((_, i) => (
          <button 
            key={i}
            onClick={() => {
              const slider = sliderRef.current;
              if (slider) {
                const firstCard = slider.querySelector('.workflow-card') as HTMLElement;
                const cardWidth = firstCard.offsetWidth + 24;
                slider.scrollTo({ left: cardWidth * (steps.length + i), behavior: 'smooth' });
              }
            }}
            className={`h-2 transition-all duration-500 rounded-full cursor-pointer hover:bg-blue-400 ${activeIndex === i ? "w-10 bg-blue-600" : "w-2 bg-slate-200"}`}
            aria-label={`Lihat langkah ${steps[i].t}`}
          />
        ))}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};
