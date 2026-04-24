import React, { useEffect, useRef, useState } from 'react';
import { Minus, Search, Layers, Zap, Code, Mail, ChevronsLeft, ChevronsRight, MoveHorizontal } from 'lucide-react';

interface Feature {
  label: string;
  value: string;
  icon: string;
  active: boolean;
}

interface Plan {
  name: string;
  subtitle: string;
  price: string;
  recommended?: boolean;
  features: Feature[];
  theme: 'light' | 'blue' | 'dark';
}

const plans: Plan[] = [
  {
    name: "Starter",
    subtitle: "Personal & Kreator",
    price: "Rp 250rb",
    features: [
      { label: "Email Bisnis", value: "Tidak Tersedia", icon: "minus", active: false },
      { label: "Visibilitas Google", value: "SEO Standar", icon: "search", active: true },
      { label: "Kapasitas Web", value: "1 Halaman Landing", icon: "layers", active: true },
      { label: "Sistem Cerdas", value: "Tidak Tersedia", icon: "minus", active: false },
      { label: "Biaya Bulanan", value: "Gratis Selamanya", icon: "zap", active: true }
    ],
    theme: "light"
  },
  {
    name: "Business",
    subtitle: "UMKM & Profesional",
    price: "Rp 1.8jt",
    recommended: true,
    features: [
      { label: "Email Bisnis", value: "Email Resmi Bisnis", icon: "mail", active: true },
      { label: "Visibilitas Google", value: "Prioritas Google Maps", icon: "search", active: true },
      { label: "Kapasitas Web", value: "Hingga 5 Halaman", icon: "layers", active: true },
      { label: "Sistem Cerdas", value: "Tidak Tersedia", icon: "minus", active: false },
      { label: "Biaya Bulanan", value: "Gratis Selamanya", icon: "zap", active: true }
    ],
    theme: "blue"
  },
  {
    name: "Enterprise",
    subtitle: "Korporat & Instansi",
    price: "Custom",
    features: [
      { label: "Email Bisnis", value: "Email Premium (Unlimited)", icon: "mail", active: true },
      { label: "Visibilitas Google", value: "Dominasi SEO Nasional", icon: "search", active: true },
      { label: "Kapasitas Web", value: "Halaman Tak Terbatas", icon: "layers", active: true },
      { label: "Sistem Cerdas", value: "Aplikasi Kustom & IoT", icon: "code", active: true },
      { label: "Biaya Bulanan", value: "Sesuai Infrastruktur", icon: "zap", active: true }
    ],
    theme: "dark"
  }
];

const IconMap: Record<string, React.ElementType> = {
  minus: Minus,
  search: Search,
  layers: Layers,
  zap: Zap,
  code: Code,
  mail: Mail
};

export default function PricingCarousel() {
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
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
      if (!mobileView) setActiveIndex(1); // Default center in desktop
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
    
    // Initial Load: Scroll to Starter (First Card)
    if (isMobile) {
      setTimeout(() => {
        if (slider) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
          setActiveIndex(0);
        }
      }, 100);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      slider.removeEventListener('scroll', handleScrollFocus);
    };
  }, [isMobile]);

  return (
    <>
      <div className="md:hidden flex items-center justify-center gap-3 mb-8 text-blue-600 animate-pulse">
        <ChevronsLeft className="w-4 h-4 opacity-50" />
        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 flex items-center gap-2">
          <MoveHorizontal className="w-3 h-3" /> Tarik & Geser
        </span>
        <ChevronsRight className="w-4 h-4 opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto -mx-4 sm:mx-auto px-4 md:px-0">
        <div 
          id="pricing-slider" 
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x md:snap-none snap-mandatory no-scrollbar pb-12 md:pb-8 pt-4 gap-4 md:gap-8 items-center ${isMobile ? (isDragging ? 'active:cursor-grabbing cursor-grab' : 'cursor-grab') : ''}`}
        >
          {/* Spacer for centering first and last cards on mobile */}
          <div className="md:hidden shrink-0 w-[10vw]" />
          
          {plans.map((plan, i) => {
            const isCenterMobile = isMobile && activeIndex === i;
            
            // UI Logic:
            // Mobile: Starter muncul pertama (scale-100). Saat geser ke Business, Starter mengecil (scale-75/85) 
            // dan Business membesar dari kecil ke besar.
            const scaleClass = isMobile 
              ? (isCenterMobile ? 'scale-100' : 'scale-[0.85] opacity-50') 
              : (plan.recommended ? 'scale-105' : 'scale-100');
              
            const zIndexClass = isCenterMobile || (!isMobile && plan.recommended) ? 'z-10' : 'z-0';

            return (
              <div 
                key={i}
                ref={el => cardsRef.current[i] = el}
                data-index={i}
                className={`pricing-card shrink-0 w-[75vw] sm:w-[340px] md:w-full snap-center rounded-[2.5rem] p-6 md:p-8 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative origin-center
                  ${plan.theme === "light" ? "bg-white border-2 border-slate-200 text-slate-900" : 
                    plan.theme === "blue" ? "bg-blue-600 border-2 border-blue-400 text-white" : 
                    "bg-slate-900 border-2 border-slate-700 text-white"}
                  ${scaleClass} ${zIndexClass}
                `}
                style={{ 
                  boxShadow: (isCenterMobile || (!isMobile && plan.recommended)) ? '0 25px 50px -12px rgba(37, 99, 235, 0.25)' : 'none'
                }}
              >
                
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] md:text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-lg whitespace-nowrap border border-amber-300">
                      Paling Diminati
                    </div>
                  </div>
                )}

                <div className="transition-all duration-500 filter-none">
                  <div className={`text-center pb-6 border-b ${plan.theme === "light" ? "border-slate-200" : plan.theme === "blue" ? "border-blue-400/50" : "border-slate-700/50"}`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${plan.theme === "light" ? "text-blue-600" : plan.theme === "blue" ? "text-blue-100" : "text-slate-400"}`}>
                      {plan.subtitle}
                    </span>
                    <h4 className="text-2xl md:text-4xl font-black mb-3 tracking-tight">{plan.name}</h4>
                    <div className={`inline-block px-4 py-2 rounded-xl text-lg font-bold shadow-sm ${plan.theme === "light" ? "bg-slate-100 text-slate-900 border border-slate-200" : plan.theme === "blue" ? "bg-white/20 text-white border border-white/30" : "bg-white/5 text-white border border-white/10"}`}>
                      {plan.price}
                    </div>
                  </div>

                  <div className="pt-6">
                    <ul className="space-y-4">
                      {plan.features.map((feature, j) => {
                        const Icon = IconMap[feature.icon];
                        return (
                          <li key={j} className="flex items-center gap-4">
                            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 transition-colors
                              ${feature.active 
                                ? (plan.theme === "light" ? "bg-blue-50 text-blue-600" : plan.theme === "blue" ? "bg-white/20 text-white" : "bg-blue-500/30 text-blue-300")
                                : (plan.theme === "light" ? "bg-slate-50 text-slate-300" : plan.theme === "blue" ? "bg-blue-800/30 text-blue-400/50" : "bg-slate-800/50 text-slate-600")}
                            `}>
                              {Icon && <Icon className="w-4 h-4" />}
                            </div>
                            <div>
                              <span className={`block text-[10px] uppercase tracking-wider font-bold mb-0.5
                                ${plan.theme === "light" ? "text-slate-500" : plan.theme === "blue" ? "text-blue-100/80" : "text-slate-400"}
                              `}>
                                {feature.label}
                              </span>
                              <span className={`block text-xs md:text-sm font-bold
                                ${plan.theme === "light" ? "text-slate-900" : "text-white"}
                                ${!feature.active ? "opacity-30" : ""}
                              `}>
                                {feature.value}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {isMobile && (
                    <div className={`mt-8 text-center transition-opacity duration-300 ${isCenterMobile ? 'opacity-100' : 'opacity-0'}`}>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${plan.theme === "light" ? "text-blue-600" : "text-blue-100"}`}>
                        Pilihan Saat Ini
                      </span>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
          
          {/* Spacer for centering last card on mobile */}
          <div className="md:hidden shrink-0 w-[10vw]" />
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