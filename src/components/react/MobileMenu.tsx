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
        className={`fixed inset-0 bg-slate-900/50 z-[110] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={toggleMenu}
      />

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-[80%] max-w-[300px] bg-white z-[300] shadow-[-10px_0_30px_-5px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out p-6 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: '#ffffff', visibility: 'visible' }}
      >
        <div className="flex justify-between items-center mb-10">
          <span className="text-caption text-blue-600">Navigasi</span>
          <button 
            onClick={toggleMenu}
            className="text-slate-900 p-2 hover:bg-slate-50 rounded-full transition-colors active:scale-95" 
            aria-label="Close Menu"
          >
            <X size={28} strokeWidth={2.5} />
          </button>
        </div>
        
        <nav className="flex flex-col space-y-4">
          <a href="/" className="flex items-center justify-between text-base font-bold text-slate-900 bg-slate-100 p-5 rounded-2xl border border-slate-200/50 hover:border-blue-600/10 transition-all active:scale-[0.98] min-h-[60px]">
            <span>Beranda</span>
            <Home className="text-blue-600" size={20} strokeWidth={2.2} />
          </a>
          <a href="/portofolio/" className="flex items-center justify-between text-base font-bold text-slate-900 bg-slate-100 p-5 rounded-2xl border border-slate-200/50 hover:border-blue-600/10 transition-all active:scale-[0.98] min-h-[60px]">
            <span>Portofolio</span>
            <Briefcase className="text-blue-600" size={20} strokeWidth={2.2} />
          </a>
          <a href="/#layanan" className="flex items-center justify-between text-base font-bold text-slate-900 bg-slate-100 p-5 rounded-2xl border border-slate-200/50 hover:border-blue-600/10 transition-all active:scale-[0.98] min-h-[60px]">
            <span>Layanan</span>
            <Zap className="text-blue-600" size={20} strokeWidth={2.2} />
          </a>
          
          <div className="pt-8">
            <a href={`https://wa.me/${whatsappNumber}`} className="flex items-center justify-center w-full bg-blue-600 text-white py-5 rounded-2xl font-bold shadow-xl shadow-blue-600/20 active:scale-95 transition-all text-base min-h-[60px]">
               <MessageSquare className="mr-2" size={20} strokeWidth={2.5} /> Chat WhatsApp
            </a>
          </div>
        </nav>

        <div className="mt-auto pt-8 text-center border-t border-slate-50">
          <p className="text-caption text-slate-400 opacity-60">
            {siteName}<br />Partner Digital Brebes & Tegal
          </p>
        </div>
      </div>
    </>
  );
}
