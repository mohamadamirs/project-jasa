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
  const trackRef = useRef<HTMLDivElement>(null);

  const doubledAreas = [...areas, ...areas, ...areas];

  useEffect(() => {
    const handleScrollFocus = () => {
      if (!containerRef.current || !trackRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      const items = trackRef.current.children;
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

    let animationFrameId: number;
    const loop = () => {
      handleScrollFocus();
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [doubledAreas.length]);

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
        className="flex gap-6 w-max"
        ref={trackRef}
        style={{
          animation: 'scroll-left 40s linear infinite'
        }}
      >
        {doubledAreas.map((area, idx) => (
          <div
            key={`${area.id}-${idx}`}
            className={`shrink-0 w-[180px] transition-all duration-700 ease-in-out flex items-center justify-center
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
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @media (hover: hover) {
          div:hover > .flex {
            animation-play-state: paused;
          }
        }
      `}</style>
    </div>
  );
};

export default AreaMarquee;
