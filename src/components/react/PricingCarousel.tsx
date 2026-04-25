import React, { useEffect, useRef, useState } from 'react';
import { Minus, Search, Layers, Zap, Code, Mail, ChevronsLeft, ChevronsRight, MoveHorizontal, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../../consts';

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
  waMessage: string;
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
      { label: "Biaya Bulanan", value: "Hanya Bayar Domain", icon: "zap", active: true }
    ],
    theme: "light",
    waMessage: "Halo, saya tertarik dengan Paket Starter."
  },
  {
    name: "Business",
    subtitle: "UMKM & Profesional",
    price: "Rp 1.8jt",
    recommended: true,
    features: [
      { label: "Email Bisnis", value: "Email Resmi Bisnis", icon: "mail", active: true },
      { label: "Visibilitas Google", value: "Prioritas Google Maps", icon: "search", active: true },
      { label: "Kapasitas Web", value: "Hingga 5 Halaman Lebih", icon: "layers", active: true },
      { label: "Sistem Cerdas", value: "Tidak Tersedia", icon: "minus", active: false },
      { label: "Biaya Bulanan", value: "Bayar Domain + Maintenance", icon: "zap", active: true }
    ],
    theme: "blue",
    waMessage: "Halo, saya tertarik dengan Paket Business."
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
    theme: "dark",
    waMessage: "Halo, saya tertarik dengan Paket Enterprise."
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
      const mobileView = window.innerWidth < 1024;
      setIsMobile(mobileView);
      if (!mobileView) setActiveIndex(1);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const slider = sliderRef.current;
    if (!slider) return;

    const handleScrollFocus = () => {
      if (!isMobile || !slider) return;
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

    slider.addEventListener('scroll', handleScrollFocus, { passive: true });
    return () => {
      window.removeEventListener('resize', checkMobile);
      slider.removeEventListener('scroll', handleScrollFocus);
    };
  }, [isMobile]);

  return (
    <div className="w-full">
      {/* Mobile Hint */}
      <div className="lg:hidden flex items-center justify-center gap-3 mb-8 text-blue-600/40 animate-pulse">
        <ChevronsLeft className="w-4 h-4" />
        <span className="text-[10px] font-bold tracking-[0.2em] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 flex items-center gap-2 text-blue-600">
          <MoveHorizontal className="w-3 h-3" /> Geser Paket
        </span>
        <ChevronsRight className="w-4 h-4" />
      </div>

      <div className="relative -mx-4 sm:-mx-6 lg:mx-auto">
        <div 
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar pb-16 pt-4 gap-6 lg:gap-8 items-stretch px-4 sm:px-6 lg:px-0 ${isMobile ? (isDragging ? 'active:cursor-grabbing cursor-grab' : 'cursor-grab') : ''}`}
        >
          {/* Peek spacer */}
          <div className="lg:hidden shrink-0 w-[12vw] min-[400px]:w-[5vw]" />
          
          {plans.map((plan, i) => {
            const isActive = activeIndex === i;
            
            return (
              <div 
                key={i}
                ref={el => cardsRef.current[i] = el}
                className={`pricing-card shrink-0 w-[265px] min-[360px]:w-[310px] sm:w-[360px] lg:w-full snap-center rounded-[2.5rem] p-8 min-[360px]:p-[clamp(1.25rem,6vw,2.5rem)] transition-all duration-400 lg:duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] relative flex flex-col border
                  ${plan.theme === "light" ? "bg-white border-slate-100 text-slate-900 shadow-sm" : 
                    plan.theme === "blue" ? "bg-blue-600 border-blue-500 text-white shadow-2xl shadow-blue-600/20" : 
                    "bg-slate-900 border-slate-800 text-white shadow-xl"}
                  ${isMobile 
                    ? (isActive ? 'scale-100 z-10 shadow-2xl shadow-blue-600/10 border-blue-200' : 'scale-[0.92] opacity-60 z-0') 
                    : (plan.recommended ? 'scale-105 z-10 shadow-2xl shadow-blue-600/20' : 'scale-100 z-0 opacity-100')}
                  lg:hover:-translate-y-4 lg:hover:scale-[1.02] lg:hover:shadow-2xl lg:hover:shadow-blue-600/15 lg:hover:border-blue-400/30 lg:hover:z-20
                `}
              >
                
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                    <div className="bg-linear-to-r from-amber-400 to-orange-500 text-white text-[9px] font-black px-5 py-2 rounded-full shadow-lg border border-amber-300 whitespace-nowrap">
                      Paling Populer
                    </div>
                  </div>
                )}

                <div className="text-center pb-8 border-b border-current/10">
                  <span className={`text-[9px] font-black tracking-widest block mb-3 ${plan.theme === "light" ? "text-blue-600" : "text-white/70"}`}>
                    {plan.subtitle}
                  </span>
                  <h3 className="mb-4 text-xl font-black tracking-tight">{plan.name}</h3>
                  <div className={`inline-block px-5 py-2 rounded-2xl text-lg font-black shadow-sm ${plan.theme === "light" ? "bg-slate-50 text-slate-900 border border-slate-200" : "bg-white/10 text-white border border-white/20"}`}>
                    {plan.price}
                  </div>
                </div>

                <div className="pt-8 flex-grow">
                  <ul className="space-y-4">
                    {plan.features.map((feature, j) => {
                      const Icon = IconMap[feature.icon];
                      return (
                        <li key={j} className="flex items-center gap-4 group/item">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300
                            ${feature.active 
                              ? (plan.theme === "light" ? "bg-blue-50 text-blue-600 shadow-blue-600/5" : "bg-white/20 text-white shadow-white/5")
                              : (plan.theme === "light" ? "bg-slate-50 text-slate-300" : "bg-white/10 text-white/30")}
                            lg:group-hover/item:scale-110
                          `}>
                            {Icon && <Icon className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <span className={`block text-[9px] font-bold tracking-wider mb-0.5
                              ${plan.theme === "light" ? "text-slate-500" : "text-white/60"}
                            `}>
                              {feature.label}
                            </span>
                            <span className={`block text-[clamp(0.75rem,1vw,0.85rem)] font-bold leading-tight
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

                <div className="mt-10">
                  <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(plan.waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 rounded-2xl font-black text-[10px] tracking-[0.1em] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg
                      ${plan.theme === "light" ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20" : 
                        plan.theme === "blue" ? "bg-white text-blue-600 hover:bg-slate-50 shadow-white/10" : 
                        "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20"}
                    `}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Pilih Paket
                  </a>
                </div>

              </div>
            );
          })}
          {/* Peek spacer */}
          <div className="lg:hidden shrink-0 w-[12vw] min-[400px]:w-[5vw]" />
        </div>
      </div>

      {/* Pagination Dots for Mobile */}
      <div className="lg:hidden flex justify-center gap-2 -mt-4 mb-8">
        {plans.map((_, i) => (
          <div 
            key={i}
            className={`h-1.5 transition-all duration-300 rounded-full ${activeIndex === i ? "w-8 bg-blue-600" : "w-2 bg-slate-200"}`}
          />
        ))}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
