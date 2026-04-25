import React, { useEffect, useState, useRef } from 'react';
import { Code2, Cpu, Database } from 'lucide-react';

const services = [
  {
    title: "Website Kustom",
    desc: "Arsitektur modern dengan performa Zero-JS yang super cepat. Dioptimasi penuh untuk konversi.",
    icon: Code2,
    features: ["Desain UI/UX Eksklusif", "SEO Local Optimization", "Kecepatan Akses Tinggi"]
  },
  {
    title: "IoT Solutions",
    desc: "Integrasi perangkat cerdas untuk otomatisasi operasional bisnis Anda yang lebih efisien.",
    icon: Cpu,
    features: ["Real-time Monitoring", "Data Analytics Dashboard", "Hardware Integration"]
  },
  {
    title: "Sistem Informasi",
    desc: "Aplikasi internal untuk manajemen data dan efisiensi alur kerja perusahaan skala besar.",
    icon: Database,
    features: ["Cloud Based Storage", "Multi-user Access Control", "Automated Reporting"]
  }
];

export default function ServicesSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const cardWidth = 300;
  const gap = 20;

  const onStart = (x: number) => {
    setIsDragging(true);
    setStartX(x);
  };

  const onMove = (x: number) => {
    if (!isDragging) return;
    setDragOffset(x - startX);
  };

  const onEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (dragOffset > 60 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (dragOffset < -60 && activeIndex < services.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    
    setDragOffset(0);
  };

  return (
    <div 
      className="relative w-full overflow-hidden py-12 touch-none select-none cursor-grab active:cursor-grabbing"
      onMouseDown={(e) => onStart(e.pageX)}
      onMouseMove={(e) => onMove(e.pageX)}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
      onTouchStart={(e) => onStart(e.touches[0].clientX)}
      onTouchMove={(e) => onMove(e.touches[0].clientX)}
      onTouchEnd={onEnd}
    >
      <div 
        className={`flex gap-5 ${isDragging ? 'duration-0' : 'transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]'}`}
        style={{
          transform: `translateX(calc(50% - ${cardWidth/2}px - (${activeIndex} * (${cardWidth}px + ${gap}px)) + ${dragOffset}px))`
        }}
      >
        {services.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeIndex === idx;
          return (
            <div
              key={idx}
              className={`shrink-0 w-[${cardWidth}px] transition-all duration-700
                ${isActive ? 'scale-105 opacity-100' : 'scale-90 opacity-30 blur-[0.5px]'}`}
            >
              <div className={`bg-white card-standard p-8 flex flex-col min-h-[420px] transition-all duration-500 ${isActive ? 'border-blue-600/30 shadow-2xl shadow-blue-600/10 bg-linear-to-br from-white to-blue-50/30' : 'border-slate-100'}`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-100 text-slate-400'}`}>
                  <Icon size={32} />
                </div>
                
                <div className="flex-grow">
                  <h3 className={`mb-4 transition-colors duration-500 text-xl font-bold ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>{item.title}</h3>
                  <p className={`text-slate-600 text-sm leading-relaxed mb-8 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>{item.desc}</p>
                  
                  <ul className={`space-y-4 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    {item.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600/40 mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modern Slim Indicators */}
      <div className="flex justify-center gap-2 mt-12">
        {services.map((_, i) => (
          <div 
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-12 bg-blue-600' : 'w-4 bg-blue-600/10'}`}
          />
        ))}
      </div>
    </div>
  );
}
