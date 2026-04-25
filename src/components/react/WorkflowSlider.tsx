import React, { useEffect, useRef, useState } from 'react';
import { Search, Layout, Code2, Rocket } from 'lucide-react';

const steps = [
  { step: "01", t: "Konsultasi", d: "Diskusi kebutuhan bisnis Anda secara detail.", i: "search" },
  { step: "02", t: "Desain", d: "Pembuatan konsep visual yang modern.", i: "layout" },
  { step: "03", t: "Development", d: "Proses pengkodean dan optimasi SEO.", i: "code-2" },
  { step: "04", t: "Launch", d: "Website online dan siap menerima pelanggan.", i: "rocket" }
];

const IconMap: Record<string, React.ReactNode> = {
  "search": <Search className="w-6 h-6 md:w-8 md:h-8" />,
  "layout": <Layout className="w-6 h-6 md:w-8 md:h-8" />,
  "code-2": <Code2 className="w-6 h-6 md:w-8 md:h-8" />,
  "rocket": <Rocket className="w-6 h-6 md:w-8 md:h-8" />
};

export const WorkflowSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  // Triple the steps for infinite loop
  const tripledSteps = [...steps, ...steps, ...steps];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Auto Scroll Logic
    const autoScroll = setInterval(() => {
      if (!isInteracting && slider) {
        const cardWidth = (slider.querySelector('.workflow-card') as HTMLElement).offsetWidth + 24;
        const nextIndex = (activeIndex + 1) % steps.length;
        slider.scrollTo({ 
          left: cardWidth * (steps.length + nextIndex), 
          behavior: 'smooth' 
        });
      }
    }, 4000);

    // Initial Scroll to start of the middle set
    const firstCard = slider.querySelector('.workflow-card') as HTMLElement;
    if (firstCard && slider.scrollLeft === 0) {
      const cardWidth = firstCard.offsetWidth + 24;
      slider.scrollLeft = cardWidth * steps.length;
    }

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = slider;
      const cardWidth = (slider.querySelector('.workflow-card') as HTMLElement).offsetWidth + 24;
      const setWidth = cardWidth * steps.length;

      if (scrollLeft <= 0) {
        slider.scrollLeft = setWidth;
      } else if (scrollLeft >= scrollWidth - clientWidth - 2) {
        slider.scrollLeft = setWidth - (cardWidth * (steps.length - 1));
      }

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

    slider.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      slider.removeEventListener('scroll', handleScroll);
      clearInterval(autoScroll);
    };
  }, [activeIndex, isInteracting]);

  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
    >
      <div 
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto pb-16 pt-8 snap-x snap-mandatory no-scrollbar scroll-smooth px-4"
      >
        {tripledSteps.map((item, idx) => {
          const isActive = activeIndex === (idx % steps.length);
          // Only the middle set is "visible" to bots/screen-readers for SEO
          const isClone = idx < steps.length || idx >= steps.length * 2;

          return (
            <div 
              key={`${item.step}-${idx}`}
              aria-hidden={isClone}
              className={`
                workflow-card shrink-0
                w-[280px] md:w-[320px] bg-white border rounded-[clamp(1.25rem,5vw,2rem)] p-8 snap-center
                transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                ${isActive 
                  ? "border-blue-200 shadow-[0_20px_50px_rgba(37,99,235,0.12)] -translate-y-4 z-10 scale-100" 
                  : "border-slate-100 shadow-sm translate-y-0 opacity-100 scale-[0.96]"
                }
              `}
            >
              <div className={`w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20`}>
                {IconMap[item.i]}
              </div>
              <span className="text-[clamp(0.75rem,0.8vw,0.875rem)] font-bold uppercase tracking-[0.15em] text-blue-600 block mb-2">Step {item.step}</span>
              <h4 className="mb-3 text-[clamp(1.1rem,2vw,1.35rem)] font-bold text-slate-900 leading-tight">{item.t}</h4>
              <p className="text-slate-600 text-[clamp(0.9375rem,1vw+0.25rem,1.0625rem)] leading-relaxed">{item.d}</p>
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
                const cardWidth = (slider.querySelector('.workflow-card') as HTMLElement).offsetWidth + 24;
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
