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
  const [activeIndex, setActiveIndex] = useState<number | null>(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          setActiveIndex(index);
        }
      });
    }, {
      root: slider,
      threshold: 0.7
    });

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    // Scroll to center card initially
    setTimeout(() => {
      const middleCard = cardsRef.current[1];
      if (middleCard && slider) {
        slider.scrollTo({
          left: middleCard.offsetLeft - (slider.clientWidth / 2) + (middleCard.clientWidth / 2),
          behavior: 'smooth'
        });
      }
    }, 500);

    return () => observer.disconnect();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (sliderRef.current) {
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseEnterCard = (index: number) => {
    if (window.matchMedia("(pointer: fine)").matches && sliderRef.current && cardsRef.current[index]) {
      const card = cardsRef.current[index]!;
      sliderRef.current.scrollTo({
        left: card.offsetLeft - (sliderRef.current.clientWidth / 2) + (card.clientWidth / 2),
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center gap-3 mb-8 text-blue-600 animate-pulse">
        <ChevronsLeft className="w-4 h-4 opacity-50" />
        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 flex items-center gap-2">
          <MoveHorizontal className="w-3 h-3" /> Tarik & Geser
        </span>
        <ChevronsRight className="w-4 h-4 opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto -mx-4 sm:mx-auto">
        <div className="absolute top-0 left-0 w-8 md:w-32 h-full bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-8 md:w-32 h-full bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

        <div 
          id="pricing-slider" 
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12 pt-4 px-[10vw] sm:px-[20vw] md:px-[25vw] gap-4 md:gap-8 items-center cursor-grab scroll-smooth ${isDragging ? 'active:cursor-grabbing' : ''}`}
        >
          {plans.map((plan, i) => {
            const isActive = activeIndex === i;
            
            return (
              <div 
                key={i}
                ref={el => cardsRef.current[i] = el}
                data-index={i}
                onMouseEnter={() => handleMouseEnterCard(i)}
                className={`pricing-card shrink-0 w-[80vw] sm:w-[340px] md:w-[380px] snap-center rounded-[2.5rem] p-6 md:p-8 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] relative shadow-2xl origin-center
                  ${plan.theme === "light" ? "bg-white border border-slate-200 text-slate-800" : 
                    plan.theme === "blue" ? "bg-gradient-to-b from-blue-600 to-indigo-800 border border-blue-500 text-white" : 
                    "bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-slate-100"}
                  ${isActive ? 'is-active' : ''}
                `}
                style={{
                  transform: isActive ? 'scale(1)' : 'scale(0.85)',
                  opacity: isActive ? 1 : 0.4,
                  boxShadow: isActive ? '0 25px 50px -12px rgba(37, 99, 235, 0.25)' : 'none',
                  zIndex: isActive ? 10 : 0
                }}
              >
                
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] md:text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] whitespace-nowrap border border-amber-300">
                      Paling Diminati
                    </div>
                  </div>
                )}

                <div className={`transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isActive ? 'filter-none' : 'blur-[3px]'}`}>
                  <div className={`text-center pb-6 border-b ${plan.theme === "light" ? "border-slate-100" : plan.theme === "blue" ? "border-blue-500/50" : "border-slate-800"}`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${plan.theme === "light" ? "text-slate-400" : plan.theme === "blue" ? "text-blue-300" : "text-slate-500"}`}>
                      {plan.subtitle}
                    </span>
                    <h4 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">{plan.name}</h4>
                    <div className={`inline-block px-4 py-2 rounded-xl text-lg font-bold shadow-inner ${plan.theme === "light" ? "bg-slate-50 text-slate-900" : plan.theme === "blue" ? "bg-blue-800/50 text-white backdrop-blur-sm" : "bg-white/5 text-white backdrop-blur-sm"}`}>
                      {plan.price}
                    </div>
                  </div>

                  <div className="pt-6">
                    <ul className="space-y-4 md:space-y-5">
                      {plan.features.map((feature, j) => {
                        const Icon = IconMap[feature.icon];
                        return (
                          <li key={j} className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors shadow-sm
                              ${feature.active 
                                ? (plan.theme === "light" ? "bg-blue-50 text-blue-600" : plan.theme === "blue" ? "bg-white/20 text-white backdrop-blur-sm" : "bg-blue-600/20 text-blue-400")
                                : (plan.theme === "light" ? "bg-slate-50 text-slate-300 shadow-none" : plan.theme === "blue" ? "bg-blue-800/30 text-blue-400/50 shadow-none" : "bg-slate-800/50 text-slate-600 shadow-none")}
                            `}>
                              {Icon && <Icon className="w-5 h-5" />}
                            </div>
                            <div>
                              <span className={`block text-[10px] md:text-xs uppercase tracking-wider font-bold mb-0.5
                                ${plan.theme === "light" ? "text-slate-400" : plan.theme === "blue" ? "text-blue-300" : "text-slate-500"}
                              `}>
                                {feature.label}
                              </span>
                              <span className={`block text-sm md:text-base font-semibold
                                ${plan.theme === "light" ? "text-slate-700" : "text-white"}
                                ${!feature.active ? "opacity-50" : ""}
                              `}>
                                {feature.value}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className={`mt-8 text-center transition-opacity duration-300 hint-text ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${plan.theme === "light" ? "text-blue-600" : "text-blue-200"}`}>
                      Paket Terpilih
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
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