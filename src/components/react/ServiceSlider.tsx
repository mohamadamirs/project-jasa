import React, { useEffect, useRef, useState } from 'react';
import { Code2, Cpu, Database, Check, ChevronsLeft, ChevronsRight, MoveHorizontal } from 'lucide-react';

interface ServiceItem {
  title: string;
  desc: string;
  icon: 'code-2' | 'cpu' | 'database';
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

const IconMap = {
  'code-2': Code2,
  'cpu': Cpu,
  'database': Database
};

export default function ServiceSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(true);
  
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMobile) return;
    setIsDragging(true);
    if (sliderRef.current) {
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current || !isMobile) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const checkMobile = () => {
      const mobileView = window.innerWidth < 1024; // Using 1024 to match lg: breakpoint
      setIsMobile(mobileView);
      if (!mobileView) setActiveIndex(-1); // No active scale effect on desktop
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const slider = sliderRef.current;
    if (!slider) return;

    const handleScrollFocus = () => {
      if (!isMobile || !slider) return;
      
      const containerRect = slider.getBoundingClientRect();
      const focusPoint = containerRect.left + containerRect.width / 2;

      let closestIdx = 0;
      let minDistance = Infinity;

      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(focusPoint - cardCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });
      setActiveIndex(closestIdx);
    };

    slider.addEventListener('scroll', handleScrollFocus, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      slider.removeEventListener('scroll', handleScrollFocus);
    };
  }, [isMobile]);

  return (
    <>
      {/* Mobile Indicator */}
      <div className="lg:hidden flex items-center justify-center gap-3 mb-6 text-blue-600 animate-pulse">
        <ChevronsLeft className="w-4 h-4 opacity-50" />
        <span className="text-caption bg-blue-600/10 px-4 py-2 rounded-full border border-blue-600/10 flex items-center gap-2">
          <MoveHorizontal className="w-3 h-3" /> Geser Layanan
        </span>
        <ChevronsRight className="w-4 h-4 opacity-50" />
      </div>

      <div className="relative -mx-4 lg:mx-0">
        <div 
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible snap-x lg:snap-none snap-mandatory no-scrollbar pb-12 lg:pb-0 gap-6 lg:gap-8 items-stretch ${isMobile ? (isDragging ? 'active:cursor-grabbing cursor-grab' : 'cursor-grab') : ''}`}
        >
          {/* Padding for centering first card */}
          <div className="lg:hidden shrink-0 w-[7.5vw]" />
          
          {services.map((item, i) => {
            const Icon = IconMap[item.icon];
            const isActive = isMobile && activeIndex === i;
            
            return (
              <div 
                key={i}
                ref={el => cardsRef.current[i] = el}
                className={`shrink-0 w-[85vw] sm:w-[380px] lg:w-full snap-center card-padding-fluid card-standard hover:shadow-2xl hover:shadow-blue-600/10 shine-effect group flex flex-col transition-all duration-500 origin-center
                  ${isActive ? 'scale-100 shadow-2xl shadow-blue-600/20 border-blue-600/30' : isMobile ? 'scale-[0.92] opacity-60' : 'scale-100'}
                `}
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-6 md:mb-8 transition-colors
                  ${isActive || !isMobile ? 'bg-blue-600 text-white' : 'bg-blue-600/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}
                `}>
                  <Icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                
                <div className="flex-grow">
                  <h4 className={`mb-3 md:mb-4 transition-colors ${isActive ? 'text-blue-600' : ''}`}>{item.title}</h4>
                  <p className="text-slate-600 mb-6 md:mb-8">{item.desc}</p>
                  <ul className="space-y-2 md:space-y-3 mb-4">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-caption text-slate-600 normal-case tracking-normal">
                        <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {isMobile && (
                  <div className={`mt-auto pt-4 text-center transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                      Solusi Unggulan
                    </span>
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Padding for centering last card */}
          <div className="lg:hidden shrink-0 w-[7.5vw]" />
        </div>
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
    </>
  );
}
