import React, { useState } from 'react';
import { Send, Phone, CheckCircle2 } from 'lucide-react';

interface ConsultationBannerProps {
  onSuccess?: (email: string) => void;
}

export const ConsultationBanner: React.FC<ConsultationBannerProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Vui lòng nhập địa chỉ email hợp lệ để nhận tư vấn.');
      return;
    }

    setLoading(true);
    try {
      await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, createdAt: new Date().toISOString(), source: 'bottom_banner' })
      }).catch(() => {});
      
      setSubmitted(true);
      if (onSuccess) onSuccess(email);

      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 4000);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#0077b6] text-white py-3.5 px-3 sm:px-4 flex justify-center overflow-hidden shadow-inner">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-3.5 sm:gap-4">
        
        {/* LEFT: ICON + TITLE */}
        <div className="flex items-center gap-2 shrink-0">
          <Send className="w-4 h-4 transform -rotate-45 shrink-0 text-[#fdb913]" />
          <span className="font-extrabold text-sm sm:text-base tracking-wider uppercase text-white whitespace-nowrap">
            ĐĂNG KÝ TƯ VẤN THIẾT BỊ
          </span>
        </div>

        {/* CENTER: EMAIL INPUT PILL + HOTLINE PILL */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full lg:w-auto justify-center">
          {/* EMAIL FORM PILL */}
          <form onSubmit={handleSubmit} className="relative flex items-center w-full max-w-[380px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn*"
              required
              disabled={submitted || loading}
              className="w-full bg-white text-slate-800 text-xs sm:text-sm pl-4 pr-[100px] py-2.5 rounded-full outline-none shadow-xs border border-transparent focus:border-sky-300"
            />
            <button
              type="submit"
              disabled={loading || submitted}
              className="absolute right-1 top-1 bottom-1 bg-[#023e8a] hover:bg-[#03045e] text-white font-black text-xs px-4 rounded-full transition shadow-xs cursor-pointer disabled:opacity-60"
            >
              {submitted ? 'ĐÃ GỬI' : 'ĐĂNG KÝ'}
            </button>
          </form>

          {/* HOTLINE */}
          <a
            href="tel:0348402466"
            className="flex items-center gap-2 border-2 border-[#fdb913] bg-[#023e8a]/70 hover:bg-[#023e8a] rounded-full px-4 py-1.5 transition shrink-0 shadow-xs"
          >
            <Phone className="w-4 h-4 text-[#fdb913] fill-[#fdb913] shrink-0" />
            <span className="font-black text-base sm:text-lg text-[#fdb913] whitespace-nowrap">034 84 02466</span>
          </a>
        </div>

        {/* RIGHT: SOCIAL ICONS */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-[#1877f2] flex items-center justify-center text-white hover:scale-110 transition"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-[#ff0000] flex items-center justify-center text-white hover:scale-110 transition"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white hover:scale-110 transition"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.48 6.3 6.3 0 0 0 1.83-4.48V8.71a8.28 8.28 0 0 0 4.95 1.63v-3.65z"/>
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
};
