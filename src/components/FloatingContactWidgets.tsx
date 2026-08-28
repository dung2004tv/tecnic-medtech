import React from 'react';
import { Phone } from 'lucide-react';

export const FloatingContactWidgets: React.FC = () => {
  return (
    <>
      {/* 1. FLOATING CALL BUTTON (BÊN TRÁI - GỐC DƯỚI) */}
      <div className="fixed bottom-5 left-4 z-40 flex flex-col items-start gap-2.5">
        {/* CALL BUTTON */}
        <a
          href="tel:0348402466"
          className="relative flex items-center bg-[#ea3a3a] hover:bg-[#d12f2f] text-white pl-1 pr-3 py-1 rounded-full shadow-md transition-all duration-300 hover:scale-105 active:scale-95 border border-white/50"
          title="Gọi ngay 034 84 02466"
        >
          {/* Phone Circle Icon */}
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-1.5">
            <Phone className="w-3 h-3 text-white" fill="currentColor" />
          </div>
          
          {/* Phone Number */}
          <span className="font-bold text-sm tracking-wide text-white whitespace-nowrap">
            034 84 02466
          </span>
        </a>
      </div>

      {/* 2. FLOATING RIGHT WIDGETS: ZALO (BÊN PHẢI - GỐC DƯỚI) */}
      <div className="fixed bottom-[60px] right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5">
        
        {/* ZALO BUTTON */}
        <a
          href="https://zalo.me/0348402466"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-[44px] h-[44px] bg-[#0068ff] hover:bg-[#0055d4] rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
          title="Tư vấn nhanh qua Zalo: 034 84 02466"
        >
          <div className="absolute inset-0 rounded-full bg-[#0068ff] animate-ping opacity-40" style={{ animationDuration: '3s' }}></div>
          <div className="w-[34px] h-[34px] rounded-full bg-white flex items-center justify-center z-10 shadow-sm">
            <span className="font-extrabold text-[12px] text-[#0068ff] tracking-tight">Zalo</span>
          </div>
        </a>
      </div>
    </>
  );
};
