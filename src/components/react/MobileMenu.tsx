import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Briefcase, Zap, MessageSquare } from 'lucide-react';

interface Props {
  whatsappNumber: string;
  siteName: string;
}

export default function MobileMenu({ whatsappNumber, siteName }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <button 
        onClick={toggleMenu}
        type="button" 
        className="text-slate-900 p-2 focus:outline-none" 
        aria-label="Toggle Menu"
      >
        <Menu size={28} strokeWidth={2.5} />
      </button>

      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={toggleMenu}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 w-[75%] max-w-[280px] h-full bg-white z-[120] shadow-2xl transition-all duration-300 ease-in-out p-6 flex flex-col ${isOpen ? 'translate-x-0 visible' : 'translate-x-full invisible'}`}>
        <div className="flex justify-between items-center mb-8">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Navigasi</span>
          <button 
            onClick={toggleMenu}
            className="text-slate-900 p-1.5 hover:bg-slate-50 rounded-full transition-colors" 
            aria-label="Close Menu"
          >
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>
        
        <nav className="flex flex-col space-y-3">
          <a href="/" className="flex items-center justify-between text-base font-bold text-slate-900 bg-slate-50/50 p-4 rounded-xl border border-transparent hover:border-blue-100 transition-all active:scale-[0.98]">
            <span>Beranda</span>
            <Home className="text-blue-600" size={20} strokeWidth={2.2} />
          </a>
          <a href="/portofolio/" className="flex items-center justify-between text-base font-bold text-slate-900 bg-slate-50/50 p-4 rounded-xl border border-transparent hover:border-blue-100 transition-all active:scale-[0.98]">
            <span>Portofolio</span>
            <Briefcase className="text-blue-600" size={20} strokeWidth={2.2} />
          </a>
          <a href="/#layanan" className="flex items-center justify-between text-base font-bold text-slate-900 bg-slate-50/50 p-4 rounded-xl border border-transparent hover:border-blue-100 transition-all active:scale-[0.98]">
            <span>Layanan</span>
            <Zap className="text-blue-600" size={20} strokeWidth={2.2} />
          </a>
          
          <div className="pt-6">
            <a href={`https://wa.me/${whatsappNumber}`} className="flex items-center justify-center w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-xl shadow-blue-200 active:scale-95 transition-all text-base">
               <MessageSquare className="mr-2" size={20} strokeWidth={2.5} /> Chat WhatsApp
            </a>
          </div>
        </nav>

        <div className="mt-auto pt-8 text-center border-t border-slate-50">
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
            {siteName}<br />Partner Digital Brebes & Tegal
          </p>
        </div>
      </div>
    </>
  );
}
