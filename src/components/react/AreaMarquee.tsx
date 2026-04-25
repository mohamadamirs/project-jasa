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
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplikasi area untuk efek loop jika diperlukan, tapi untuk snapping step-by-step
  // kita cukup gunakan list aslinya dan loop indexnya.
  const displayAreas = areas;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayAreas.length);
    }, 3000); // Ganti tiap 3 detik

    return () => clearInterval(interval);
  }, [displayAreas.length]);

  return (
    <div className="relative w-full overflow-hidden py-12 px-4" ref={containerRef}>
      <div 
        className="flex gap-4 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          transform: `translateX(calc(50% - 70px - (${activeIndex} * (140px + 16px))))`
        }}
      >
        {displayAreas.map((area, idx) => (
          <div
            key={area.id}
            className={`shrink-0 w-[140px] transition-all duration-700 ease-in-out
              ${activeIndex === idx ? 'scale-110 opacity-100' : 'scale-90 opacity-40 blur-[0.5px]'}`}
          >
            <a
              href={`/${area.id}/`}
              className={`w-full h-full card-standard p-6 flex flex-col items-center justify-center text-center min-h-[120px] ${activeIndex === idx ? 'border-blue-600/30 shadow-xl shadow-blue-600/10' : ''}`}
            >
              <h4 className="text-slate-900 leading-tight block w-full font-bold text-sm">
                {area.data.cityName}
              </h4>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mt-2">
                Detail
              </span>
            </a>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-1.5 mt-8">
        {displayAreas.map((_, i) => (
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
