import React from 'react';
import { Phone } from 'lucide-react';

export const FloatingContactWidgets: React.FC = () => {
  return (
    <>
      {/* 1. FLOATING CALL BUTTON (BÊN TRÁI - GÓC DƯỚI, ẩn trên mobile vì thanh đáy đã có nút Hotline) */}
      <div className="hidden sm:flex fixed bottom-5 left-4 z-40 flex-col items-start gap-2.5">
        <a
          href="tel:0348402466"
          className="group relative flex items-center bg-[#ea3a3a] hover:bg-[#d12f2f] text-white px-3.5 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/80"
          title="Gọi Hotline tư vấn miễn phí: 034 84 02466"
        >
          <div className="w-5 h-5 flex items-center justify-center mr-1.5 animate-bounce">
            <Phone className="w-4 h-4 text-white" fill="currentColor" />
          </div>
          <span className="font-black text-sm tracking-wide text-white whitespace-nowrap leading-tight">
            034 84 02466
          </span>
        </a>
      </div>

      {/* 2. FLOATING RIGHT WIDGETS: ZALO CHAT (NẰM GỌN GÀNG TRÊN NÚT TƯ VẤN THIẾT BỊ) */}
      <div className="fixed bottom-30 sm:bottom-18 right-3 sm:right-6 z-40 flex flex-col items-end">
        <a
          href="https://zalo.me/0348402466"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1877f2] hover:bg-[#0d6efd] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 border-2 border-white cursor-pointer"
          title="Chat tư vấn qua Zalo: 034 84 02466"
        >
          <span className="font-black text-xs sm:text-[13px] tracking-tight text-white select-none">Zalo</span>
        </a>
      </div>
    </>
  );
};
