import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
}

export default function ImageSlider({ images = [] }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    containerRef.current.scrollTo({
      left: width * index,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % images.length;
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + images.length) % images.length;
    scrollToIndex(prevIndex);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setActiveIndex(index);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="relative group w-full max-w-4xl mx-auto overflow-hidden rounded-[2rem] border border-blue-100 shadow-xl shadow-blue-100/50 bg-white">
      {/* Slider Container */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar aspect-video items-center bg-slate-900"
      >
        {images.map((img, index) => (
          <div key={index} className="flex-none w-full h-full snap-center relative flex items-center justify-center overflow-hidden">
            {/* Adaptive Blurred Backdrop */}
            <div className="absolute inset-0 z-0 opacity-30 scale-110 blur-2xl pointer-events-none">
              <img 
                src={img} 
                alt="" 
                className="w-full h-full object-cover"
                aria-hidden="true"
              />
            </div>

            {/* Main Image */}
            <img 
              src={img} 
              alt={`Tampilan proyek ${index + 1}`} 
              className="relative z-10 max-w-full max-h-full object-contain shadow-2xl" 
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button 
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur shadow-lg rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white hover:scale-105 transition-all opacity-0 group-hover:opacity-100 z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur shadow-lg rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white hover:scale-105 transition-all opacity-0 group-hover:opacity-100 z-20"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Position Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <div 
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`cursor-pointer rounded-full transition-all duration-300 ${activeIndex === i ? 'bg-blue-600 w-6 h-2' : 'bg-blue-200/50 w-2 h-2'}`}
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
