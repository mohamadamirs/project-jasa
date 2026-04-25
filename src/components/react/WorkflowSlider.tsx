import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Search, Layout, Code2, Rocket, ChevronsLeft, ChevronsRight, MoveHorizontal } from 'lucide-react';

interface Step {
  step: string;
  t: string;
  d: string;
  i: string;
}

const steps: Step[] = [
  { step: "01", t: "Konsultasi", d: "Diskusi kebutuhan bisnis Anda secara detail.", i: "search" },
  { step: "02", t: "Desain", d: "Pembuatan konsep visual yang modern.", i: "layout" },
  { step: "03", t: "Development", d: "Proses pengkodean dan optimasi SEO.", i: "code-2" },
  { step: "04", t: "Launch", d: "Website online dan siap menerima pelanggan.", i: "rocket" }
];

const IconMap: Record<string, React.ElementType> = {
  'search': Search,
  'layout': Layout,
  'code-2': Code2,
  'rocket': Rocket
};

export default function WorkflowSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Triple the items for infinite feel
  const displaySteps = useMemo(() => [...steps, ...steps, ...steps], []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Center scroll on mount for mobile
  useEffect(() => {
    if (isMobile && sliderRef.current) {
      const slider = sliderRef.current;
      // Wait a bit for layout to be stable
      const timer = setTimeout(() => {
        const totalSetWidth = slider.scrollWidth / 3;
        slider.scrollLeft = totalSetWidth;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // Auto-animation logic (Marquee style but with snap awareness)
  useEffect(() => {
    if (!isMobile || isDragging || !isAutoPlaying) return;

    let animationFrameId: number;
    let lastTime = Date.now();
    const speed = 0.5; // pixels per frame approx

    const scroll = () => {
      if (sliderRef.current) {
        const slider = sliderRef.current;
        slider.scrollLeft += speed;

        const totalSetWidth = slider.scrollWidth / 3;

        if (slider.scrollLeft >= totalSetWidth * 2) {
          slider.scrollLeft -= totalSetWidth;
        } else if (slider.scrollLeft <= 0) {
          slider.scrollLeft += totalSetWidth;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile, isDragging, isAutoPlaying]);

  // Handle Focus Effect
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || !isMobile) return;

    const handleScroll = () => {
      const containerRect = slider.getBoundingClientRect();
      const center = containerRect.left + containerRect.width / 2;
      
      let minDistance = Infinity;
      let closestIdx = 0;

      Array.from(slider.children).forEach((child, idx) => {
        const rect = child.getBoundingClientRect();
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
    return () => slider.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMobile) return;
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
    // Resume autoplay after a delay
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const handleTouchStart = () => {
    setIsAutoPlaying(false);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  return (
    <div className="w-full">
      {/* Mobile Indicator */}
      <div className="md:hidden flex items-center justify-center gap-3 mb-6 text-blue-600 animate-pulse">
        <ChevronsLeft className="w-4 h-4 opacity-50" />
        <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-600/10 px-4 py-2 rounded-full border border-blue-600/10 flex items-center gap-2">
          <MoveHorizontal className="w-3 h-3" /> Geser Alur Kerja
        </span>
        <ChevronsRight className="w-4 h-4 opacity-50" />
      </div>

      <div 
        ref={containerRef}
        className="relative"
      >
        <div 
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`
            flex md:grid md:grid-cols-4 gap-4 md:gap-8 
            overflow-x-auto md:overflow-visible 
            snap-x snap-mandatory no-scrollbar
            pb-8 md:pb-0
            ${isMobile ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''}
          `}
        >
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-blue-600/20 -z-0"></div>

          {displaySteps.map((step, idx) => {
            const Icon = IconMap[step.i] || Search;
            const isCenter = isMobile && activeIndex === idx;
            const realIdx = idx % steps.length;
            
            // Only show one set on desktop
            if (!isMobile && idx >= steps.length) return null;

            return (
              <div 
                key={idx}
                className={`
                  flex-none w-[240px] md:w-auto relative group z-10 snap-center
                  transition-all duration-500 ease-out text-center
                  ${isMobile ? (isCenter ? 'scale-110 opacity-100' : 'scale-90 opacity-40 blur-[0.5px]') : 'scale-100 opacity-100'}
                `}
              >
                <div className={`
                  w-14 h-14 md:w-20 md:h-20 
                  ${isCenter || !isMobile ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'bg-white text-blue-600 border border-blue-600/10'}
                  rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-8 
                  transition-all duration-500
                  group-hover:rotate-6
                `}>
                  <Icon className="w-7 h-7 md:w-10 md:h-10" />
                </div>
                <div className="px-4 md:px-0">
                  <span className="text-[10px] font-bold text-blue-600 mb-1 block uppercase tracking-widest">Langkah {step.step}</span>
                  <h4 className={`mb-2 md:mb-4 transition-colors ${isCenter ? 'text-blue-600' : 'text-slate-900'}`}>{step.t}</h4>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">{step.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
