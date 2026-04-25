import React, { useEffect, useState } from 'react';
import { Search, Layout, Code2, Rocket } from 'lucide-react';

const steps = [
  { step: "01", t: "Konsultasi", d: "Diskusi kebutuhan bisnis Anda secara detail.", i: Search },
  { step: "02", t: "Desain", d: "Pembuatan konsep visual yang modern.", i: Layout },
  { step: "03", t: "Development", d: "Proses pengkodean dan optimasi SEO.", i: Code2 },
  { step: "04", t: "Launch", d: "Website online dan siap menerima pelanggan.", i: Rocket }
];

export default function WorkflowSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 4000); // Ganti tiap 4 detik (lebih lambat agar terbaca)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div 
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          transform: `translateX(calc(50% - 100px - (${activeIndex} * (200px + 24px))))`
        }}
      >
        {steps.map((step, idx) => {
          const Icon = step.i;
          return (
            <div
              key={step.step}
              className={`shrink-0 w-[200px] transition-all duration-700
                ${activeIndex === idx ? 'scale-110 opacity-100' : 'scale-90 opacity-40 blur-[0.5px]'}`}
            >
              <div className="bg-white card-standard p-8 text-center flex flex-col items-center justify-center min-h-[220px]">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
                  <Icon size={28} />
                </div>
                <h4 className="mb-3 font-bold text-slate-900">{step.t}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{step.d}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mt-10">
        {steps.map((_, i) => (
          <div 
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-8 bg-blue-600' : 'w-2 bg-blue-600/20'}`}
          />
        ))}
      </div>
    </div>
  );
}
