import React, { useState } from 'react';

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
  const [isPaused, setIsPaused] = useState(false);
  const doubledAreas = [...areas, ...areas, ...areas];

  return (
    <div className="relative w-full overflow-hidden py-12">
      <div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to right, white, transparent 15%, transparent 85%, white)' }}
      />
      
      <div 
        className={`flex gap-6 w-max animate-scroll-left ${isPaused ? '[animation-play-state:paused]' : ''}`}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {doubledAreas.map((area, idx) => (
          <div
            key={`${area.id}-${idx}`}
            className="shrink-0 w-[180px] transition-all duration-500 hover:-translate-y-3 group"
          >
            <a
              href={`/${area.id}/`}
              className="w-full h-full bg-white border border-slate-100 rounded-[clamp(1.25rem,5vw,2rem)] p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:shadow-blue-600/10 hover:border-blue-100 min-h-[140px] transition-all"
            >
              <h4 className="text-[clamp(1.1rem,2vw,1.35rem)] text-slate-900 leading-tight block w-full font-bold group-hover:text-blue-600">
                {area.data.cityName}
              </h4>
              <span className="text-[clamp(0.75rem,0.8vw,0.875rem)] font-bold uppercase tracking-[0.15em] text-slate-400 mt-3">
                Detail
              </span>
            </a>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3 - 0.5rem)); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AreaMarquee;
