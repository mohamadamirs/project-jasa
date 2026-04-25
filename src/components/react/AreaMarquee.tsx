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
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const doubledAreas = [...areas, ...areas, ...areas];

  useEffect(() => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const timer = setTimeout(() => {
        const totalWidth = slider.scrollWidth / 3;
        slider.scrollLeft = totalWidth;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!sliderRef.current || isDragging || !isAutoPlaying) return;

    let animationFrameId: number;
    const speed = 0.5;

    const scroll = () => {
      if (sliderRef.current) {
        sliderRef.current.scrollLeft += speed;
        
        const totalWidth = sliderRef.current.scrollWidth / 3;
        if (sliderRef.current.scrollLeft >= totalWidth * 2) {
          sliderRef.current.scrollLeft -= totalWidth;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging, isAutoPlaying]);

  useEffect(() => {
    const handleScrollFocus = () => {
      if (!sliderRef.current) return;

      const containerRect = sliderRef.current.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      const items = sliderRef.current.children;
      let minDistance = Infinity;
      let closestIdx = 0;

      for (let i = 0; i < items.length; i++) {
        const rect = items[i].getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - itemCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = i;
        }
      }
      setFocusedIndex(closestIdx);
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScrollFocus, { passive: true });
      return () => slider.removeEventListener('scroll', handleScrollFocus);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    if (sliderRef.current) {
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => {
    setIsDragging(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  return (
    <div className="relative w-full overflow-hidden py-12" ref={containerRef}>
      {/* Masking Fade Edges */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, white, transparent 20%, transparent 80%, white)'
        }}
      />
      
      <div 
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onTouchStart={() => setIsAutoPlaying(false)}
        onTouchEnd={() => setTimeout(() => setIsAutoPlaying(true), 3000)}
        className={`flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        {doubledAreas.map((area, idx) => (
          <div
            key={`${area.id}-${idx}`}
            className={`shrink-0 w-[180px] transition-all duration-700 ease-in-out flex items-center justify-center snap-center
              ${focusedIndex === idx ? 'scale-125 opacity-100' : 'scale-90 opacity-30 blur-[0.5px]'}`}
          >
            <a
              href={`/${area.id}/`}
              className="w-full h-full card-standard card-padding-fluid flex flex-col items-center justify-center text-center shadow-xl min-h-[140px]"
            >
              <h4 className="text-slate-900 leading-tight block w-full font-bold">
                {area.data.cityName}
              </h4>
              <span className="text-caption text-slate-500 mt-3">
                Detail
              </span>
            </a>
          </div>
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
