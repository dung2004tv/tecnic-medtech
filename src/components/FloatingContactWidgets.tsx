import React from 'react';
import { Phone } from 'lucide-react';

interface FloatingContactWidgetsProps {
  isAppMode?: boolean;
}

export const FloatingContactWidgets: React.FC<FloatingContactWidgetsProps> = ({ isAppMode = false }) => {
  return (
    <>
      {/* 1. FLOATING CALL BUTTON (BÊN TRÁI - GÓC DƯỚI)
          - Chế độ Web: hiển thị cả trên điện thoại và máy tính.
          - Chế độ App: ẩn trên mobile vì thanh điều hướng đáy App đã có nút Hotline riêng.
      */}
      <div className={`${isAppMode ? 'hidden md:flex' : 'flex'} fixed bottom-4 left-3 sm:left-4 z-40 flex-col items-start gap-2.5`}>
        <a
          href="tel:0348402466"
          className="group relative flex items-center bg-[#ea3a3a] hover:bg-[#d12f2f] text-white px-3 sm:px-3.5 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/80 cursor-pointer"
          title="Gọi Hotline tư vấn miễn phí: 034 84 02466"
        >
          <div className="w-5 h-5 flex items-center justify-center mr-1 sm:mr-1.5 animate-bounce">
            <Phone className="w-4 h-4 text-white" fill="currentColor" />
          </div>
          <span className="font-black text-xs sm:text-sm tracking-wide text-white whitespace-nowrap leading-tight">
            034 84 02466
          </span>
        </a>
      </div>

      {/* 2. FLOATING RIGHT WIDGETS: ZALO CHAT
          - Chế độ Web: bottom-16 (ngay trên nút Tư vấn thiết bị bottom-4)
          - Chế độ App: bottom-30 (dời lên trên nút Tư vấn thiết bị bottom-18 để không che thanh đáy)
      */}
      <div className={`fixed ${isAppMode ? 'bottom-30 md:bottom-18' : 'bottom-16 sm:bottom-18'} right-3 sm:right-6 z-40 flex flex-col items-end`}>
        <a
          href="https://zalo.me/0348402466"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1877f2] hover:bg-[#0d6efd] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 border-2 border-white cursor-pointer"
          title="Chat tư vấn qua Zalo: 034 84 02466"
        >
          <span className="font-black text-[11px] sm:text-[13px] tracking-tight text-white select-none">Zalo</span>
        </a>
      </div>
    </>
  );
};
