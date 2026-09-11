import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface FloatingInstallPromptProps {
  onOpenModal: () => void;
}

export const FloatingInstallPrompt: React.FC<FloatingInstallPromptProps> = ({ onOpenModal }) => {
  const { isInstalled } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem('tecnic_pwa_prompt_dismissed');
      if (isDismissed === 'true') {
        setDismissed(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(true);
    try {
      sessionStorage.setItem('tecnic_pwa_prompt_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  if (isInstalled || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-sm">
      <div 
        onClick={onOpenModal}
        className="bg-[#0077b6] text-white p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-white/30 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#023e8a] transition transform active:scale-98"
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-white p-1 shrink-0 flex items-center justify-center shadow-sm">
            <img src="/logo-tecnic.jpg" alt="TECNIC App" className="w-full h-full object-contain rounded-lg" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs font-black text-white truncate">Cài TECNIC App về máy</span>
              <span className="bg-amber-400 text-blue-950 font-black text-[9px] px-1.5 py-0.2 rounded-full uppercase shrink-0">Mới</span>
            </div>
            <p className="text-[11px] text-blue-100 truncate">Mở siêu nhanh • Hỗ trợ cả iOS & Android</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            className="bg-white text-[#0077b6] hover:bg-blue-50 font-black text-xs px-2.5 py-1.5 rounded-xl flex items-center gap-1 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải ngay</span>
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 rounded-full text-blue-200 hover:text-white hover:bg-white/10 transition"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
