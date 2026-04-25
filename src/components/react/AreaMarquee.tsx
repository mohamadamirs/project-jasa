import React, { useEffect, useRef, useState } from 'react';

interface Area {
  id: string;
  data: {
    cityName: string;
  };
}

interface Props {
  areas: Area[];
}

const AreaMarquee: React.FC<Props> = ({ areas }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  // Triple the areas for infinite loop
  const tripledAreas = [...areas, ...areas, ...areas];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Auto Scroll Logic
    const autoScroll = setInterval(() => {
      if (!isInteracting && slider) {
        const cardWidth = (slider.querySelector('.area-card') as HTMLElement).offsetWidth + 24;
        const nextIndex = (activeIndex + 1) % areas.length;
        slider.scrollTo({ 
          left: cardWidth * (areas.length + nextIndex), 
          behavior: 'smooth' 
        });
      }
    }, 3000);

    // Initial Scroll to start of the middle set
    const firstCard = slider.querySelector('.area-card') as HTMLElement;
    if (firstCard && slider.scrollLeft === 0) {
      const cardWidth = firstCard.offsetWidth + 24;
      slider.scrollLeft = cardWidth * areas.length;
    }

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = slider;
      const cardWidth = (slider.querySelector('.area-card') as HTMLElement).offsetWidth + 24;
      const setWidth = cardWidth * areas.length;

      // Infinite Loop Logic
      if (scrollLeft <= 0) {
        slider.scrollLeft = setWidth;
      } else if (scrollLeft >= scrollWidth - clientWidth - 2) {
        slider.scrollLeft = setWidth - (cardWidth * (areas.length - 1));
      }

      // Elevation Focus Detection
      const center = slider.getBoundingClientRect().left + slider.offsetWidth / 2;
      const cards = slider.querySelectorAll('.area-card');
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
      setActiveIndex(closestIdx % areas.length);
    };

    slider.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      slider.removeEventListener('scroll', handleScroll);
      clearInterval(autoScroll);
    };
  }, [areas.length, activeIndex, isInteracting]);

  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
    >
      {/* Masking Fade Edges */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to right, white, transparent 15%, transparent 85%, white)' }}
      />
      
      <div 
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto pb-16 pt-12 snap-x snap-mandatory no-scrollbar scroll-smooth px-4"
      >
        {tripledAreas.map((area, idx) => {
          const isActive = activeIndex === (idx % areas.length);
          const isClone = idx < areas.length || idx >= areas.length * 2;

          return (
            <div
              key={`${area.id}-${idx}`}
              aria-hidden={isClone}
              className={`
                area-card shrink-0 w-[180px] snap-center
                transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                ${isActive 
                  ? "scale-110 -translate-y-4 z-10" 
                  : "scale-95 translate-y-0 opacity-80 z-0"
                }
              `}
            >
              <a
                href={isClone ? undefined : `/${area.id}/`}
                className={`
                  w-full h-full bg-white border rounded-[clamp(1rem,3vw,1.5rem)] p-6 
                  flex flex-col items-center justify-center text-center transition-all duration-500
                  min-h-[140px]
                  ${isActive 
                    ? "border-blue-200 shadow-[0_20px_50px_rgba(37,99,235,0.12)]" 
                    : "border-slate-100 shadow-sm"
                  }
                `}
              >
                <h4 className={`text-[clamp(1rem,2vw,1.2rem)] leading-tight block w-full font-bold transition-colors ${isActive ? "text-blue-600" : "text-slate-900"}`}>
                  {area.data.cityName}
                </h4>
                <span className="text-[clamp(0.7rem,0.8vw,0.75rem)] font-bold uppercase tracking-widest text-slate-400 mt-3">
                  Detail
                </span>
              </a>
            </div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 -mt-8 mb-4">
        {areas.map((_, i) => (
          <button 
            key={i}
            onClick={() => {
              const slider = sliderRef.current;
              if (slider) {
                const cardWidth = (slider.querySelector('.area-card') as HTMLElement).offsetWidth + 24;
                slider.scrollTo({ left: cardWidth * (areas.length + i), behavior: 'smooth' });
              }
            }}
            className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer hover:bg-blue-400 ${activeIndex === i ? "w-8 bg-blue-600" : "w-2 bg-slate-200"}`}
            aria-label={`Lihat wilayah ${areas[i].data.cityName}`}
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

export default AreaMarquee;
