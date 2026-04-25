import React, { useState } from 'react';
import { Search, Layout, Code2, Rocket } from 'lucide-react';

const steps = [
  { step: "01", t: "Konsultasi", d: "Diskusi kebutuhan bisnis Anda secara detail.", i: "search" },
  { step: "02", t: "Desain", d: "Pembuatan konsep visual yang modern.", i: "layout" },
  { step: "03", t: "Development", d: "Proses pengkodean dan optimasi SEO.", i: "code-2" },
  { step: "04", t: "Launch", d: "Website online dan siap menerima pelanggan.", i: "rocket" }
];

const IconMap: Record<string, React.ReactNode> = {
  "search": <Search className="w-6 h-6 md:w-8 md:h-8" />,
  "layout": <Layout className="w-6 h-6 md:w-8 md:h-8" />,
  "code-2": <Code2 className="w-6 h-6 md:w-8 md:h-8" />,
  "rocket": <Rocket className="w-6 h-6 md:w-8 md:h-8" />
};

export const WorkflowSlider = () => {
  const [isPaused, setIsPaused] = useState(false);
  const doubledSteps = [...steps, ...steps, ...steps];

  return (
    <div className="relative w-full overflow-hidden py-12">
      <div 
        className={`flex gap-6 w-max animate-scroll-left ${isPaused ? '[animation-play-state:paused]' : ''}`}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {doubledSteps.map((step, idx) => (
          <div 
            key={`${step.step}-${idx}`}
            className="w-[260px] md:w-[300px] bg-white border border-slate-100 rounded-[clamp(1.25rem,5vw,2rem)] p-8 shadow-sm transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-blue-600/10 hover:border-blue-200 group"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20 group-hover:rotate-6 transition-transform">
              {IconMap[step.i]}
            </div>
            <span className="text-[clamp(0.75rem,0.8vw,0.875rem)] font-bold uppercase tracking-[0.15em] text-blue-600 block mb-2">Step {step.step}</span>
            <h4 className="mb-3 text-[clamp(1.1rem,2vw,1.35rem)] font-semibold text-slate-900">{step.t}</h4>
            <p className="text-slate-600 text-[clamp(0.9375rem,1vw+0.25rem,1.0625rem)] leading-relaxed">{step.d}</p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3 - 1rem)); }
        }
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
      `}</style>
    </div>
  );
};
