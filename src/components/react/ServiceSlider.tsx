import React, { useEffect, useRef, useState } from 'react';
import { Code2, Cpu, Database, Check, MoveHorizontal, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface ServiceItem {
  title: string;
  desc: string;
  icon: string;
  features: string[];
}

const services: ServiceItem[] = [
  {
    title: "Website Kustom",
    desc: "Arsitektur modern dengan performa Zero-JS yang super cepat.",
    icon: "code-2",
    features: ["Desain UI/UX Eksklusif", "SEO Local Optimization", "Kecepatan Akses Tinggi"]
  },
  {
    title: "IoT Solutions",
    desc: "Integrasi perangkat cerdas untuk otomatisasi operasional bisnis.",
    icon: "cpu",
    features: ["Real-time Monitoring", "Data Analytics Dashboard", "Hardware Integration"]
  },
  {
    title: "Sistem Informasi",
    desc: "Aplikasi internal untuk manajemen data dan efisiensi alur kerja.",
    icon: "database",
    features: ["Cloud Based Storage", "Multi-user Access Control", "Automated Reporting"]
  }
];

const iconMap: Record<string, React.ReactNode> = {
  "code-2": <Code2 className="w-7 h-7 md:w-8 md:h-8" />,
  "cpu": <Cpu className="w-7 h-7 md:w-8 md:h-8" />,
  "database": <Database className="w-7 h-7 md:w-8 md:h-8" />
};

export const ServiceSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const containerRect = slider.getBoundingClientRect();
      const center = containerRect.left + containerRect.width / 2;

      let closestIdx = 0;
      let minDistance = Infinity;

      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(center - cardCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });
      setActiveIndex(closestIdx);
    };

    slider.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => slider.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full">
      {/* Mobile Hint */}
      <div className="lg:hidden flex items-center justify-center gap-3 mb-8 text-blue-600/40">
        <ChevronsLeft className="w-4 h-4" />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-blue-50/50 px-4 py-1.5 rounded-full border border-blue-100/50 flex items-center gap-2">
          <MoveHorizontal className="w-3 h-3" /> Geser Layanan
        </span>
        <ChevronsRight className="w-4 h-4" />
      </div>

      <div 
        ref={sliderRef}
        className="flex lg:grid lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto pb-16 snap-x snap-mandatory no-scrollbar lg:overflow-visible lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
      >
        {/* Spacer for mobile centering */}
        <div className="lg:hidden shrink-0 w-[5vw]" />

        {services.map((item, idx) => {
          const isActive = activeIndex === idx;
          
          return (
            <div 
              key={idx}
              ref={el => cardsRef.current[idx] = el}
              className={`
                min-w-[85vw] sm:min-w-[340px] lg:min-w-0 
                rounded-[clamp(1.25rem,5vw,2rem)] 
                p-[clamp(1.25rem,6vw,2.5rem)] 
                transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                snap-center lg:snap-align-none
                flex flex-col h-auto lg:h-full
                bg-white border
                ${isActive 
                  ? "border-blue-200 shadow-[0_20px_50px_rgba(37,99,235,0.12)] -translate-y-4 z-10 scale-100" 
                  : "border-slate-100 shadow-sm translate-y-0 z-0 scale-[0.96] opacity-90"
                }
              `}
            >
              <div className={`
                w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 transition-all duration-500
                ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-blue-50 text-blue-600"}
              `}>
                {iconMap[item.icon]}
              </div>
              
              <div className="flex-grow">
                <h4 className={`
                  mb-3 md:mb-4 text-[clamp(1.1rem,2vw,1.35rem)] font-bold tracking-tight transition-colors duration-500
                  ${isActive ? "text-slate-900" : "text-slate-700"}
                `}>
                  {item.title}
                </h4>
                <p className={`
                  mb-6 md:mb-8 text-[clamp(0.9375rem,1vw+0.25rem,1.0625rem)] leading-relaxed transition-colors duration-500
                  ${isActive ? "text-slate-600" : "text-slate-500"}
                `}>
                  {item.desc}
                </p>
                
                <div className={`h-px w-full mb-6 transition-colors duration-500 ${isActive ? "bg-blue-100" : "bg-slate-100"}`}></div>
                
                <ul className="space-y-4">
                  {item.features.map((feature, fIdx) => (
                    <li key={fIdx} className={`
                      flex items-center text-[clamp(0.85rem,1.2vw,0.95rem)] font-medium tracking-tight transition-colors duration-500
                      ${isActive ? "text-slate-700" : "text-slate-600"}
                    `}>
                      <div className={`
                        w-5 h-5 rounded-full flex items-center justify-center mr-3 shrink-0 transition-all duration-500
                        ${isActive ? "bg-blue-100 text-blue-600" : "bg-slate-50 text-slate-400"}
                      `}>
                        <Check className="w-3 h-3" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

        {/* Spacer for mobile centering */}
        <div className="lg:hidden shrink-0 w-[5vw]" />
      </div>

      {/* Pagination Dots for Mobile */}
      <div className="lg:hidden flex justify-center gap-2 mt-2">
        {services.map((_, i) => (
          <div 
            key={i}
            className={`h-1.5 transition-all duration-500 rounded-full ${activeIndex === i ? "w-8 bg-blue-600" : "w-2 bg-slate-200"}`}
          />
        ))}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
