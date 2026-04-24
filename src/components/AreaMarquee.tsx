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

  // Duplikasi list agar endless
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

    // Gunakan rAF untuk deteksi yang presisi saat animasi jalan
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
        className="flex gap-4 w-max animate-marquee"
        ref={trackRef}
        style={{
          animation: 'scroll-left 30s linear infinite'
        }}
      >
        {doubledAreas.map((area, idx) => (
          <div
            key={`${area.id}-${idx}`}
            className={`shrink-0 w-[160px] h-[120px] transition-all duration-500 ease-out flex items-center justify-center
              ${focusedIndex === idx ? 'scale-125 opacity-100' : 'scale-75 opacity-40'}`}
          >
            <a
              href={`/${area.id}/`}
              className="w-full h-full bg-white rounded-3xl border border-slate-100 flex flex-col items-center justify-center text-center shadow-lg p-4"
            >
              <span className="text-slate-900 font-bold text-sm leading-tight block w-full">
                {area.data.cityName}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-2 font-black">
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
        .animate-marquee:active {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default AreaMarquee;
