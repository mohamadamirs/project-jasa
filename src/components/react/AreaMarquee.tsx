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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % areas.length);
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [areas.length]);

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
    
    if (dragOffset > 40) {
      setActiveIndex((prev) => (prev - 1 + areas.length) % areas.length);
    } else if (dragOffset < -40) {
      setActiveIndex((prev) => (prev + 1) % areas.length);
    }
    
    setDragOffset(0);
    startAutoPlay();
  };

  return (
    <div 
      className="relative w-full overflow-hidden py-12 px-4 touch-none select-none cursor-grab active:cursor-grabbing"
      onMouseDown={(e) => onStart(e.pageX)}
      onMouseMove={(e) => onMove(e.pageX)}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
      onTouchStart={(e) => onStart(e.touches[0].clientX)}
      onTouchMove={(e) => onMove(e.touches[0].clientX)}
      onTouchEnd={onEnd}
    >
      <div 
        className={`flex gap-4 transition-transform ${isDragging ? 'duration-0' : 'duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]'}`}
        style={{
          transform: `translateX(calc(50% - 70px - (${activeIndex} * (140px + 16px)) + ${dragOffset}px))`
        }}
      >
        {areas.map((area, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div
              key={area.id}
              className={`shrink-0 w-[140px] transition-all duration-700
                ${isActive ? 'scale-110 opacity-100' : 'scale-90 opacity-40 blur-[0.5px]'}`}
            >
              <a
                href={`/${area.id}/`}
                className={`w-full h-full card-standard p-6 flex flex-col items-center justify-center text-center min-h-[120px] ${isActive ? 'border-blue-600/30 shadow-xl shadow-blue-600/10' : ''}`}
              >
                <h4 className="text-slate-900 leading-tight block w-full font-bold text-sm">
                  {area.data.cityName}
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mt-2">
                  Detail
                </span>
              </a>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-1.5 mt-8">
        {areas.map((_, i) => (
          <div 
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-6 bg-blue-600' : 'w-2 bg-blue-600/20'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AreaMarquee;
