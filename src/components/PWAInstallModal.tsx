import React, { useState } from 'react';
import { Smartphone, Apple, Monitor, Check, Share, PlusSquare, X, ShieldCheck, Sparkles, QrCode, Copy, Globe } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isIOS, isAndroid } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'qr' | 'android' | 'ios' | 'pc'>('qr');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Lấy chính xác địa chỉ web đang chạy (tự động khớp khi anh chạy Render, Vercel, hoặc domain riêng)
  const currentOrigin = typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null'
    ? window.location.origin
    : 'https://tecnic-medtech-osf1.onrender.com';

  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(currentOrigin)}&bgcolor=ffffff&color=0077b6&margin=1`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-800 flex flex-col relative max-h-[92vh]">
        
        {/* Header with App Brand Banner */}
        <div className="bg-gradient-to-r from-[#0077b6] to-[#023e8a] p-4 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-md flex items-center justify-center overflow-hidden shrink-0 border border-white/40">
              <img 
                src="/logo-tecnic.jpg" 
                alt="TECNIC Logo" 
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 bg-amber-400 text-blue-950 text-[10px] font-black px-2 py-0.5 rounded-full mb-0.5 uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                Ứng dụng chính hãng
              </div>
              <h3 className="text-base font-black leading-tight text-white">TECNIC MEDTECH App</h3>
              <p className="text-xs text-blue-100 font-medium">Cài đặt trực tiếp lên Màn hình Điện thoại & PC</p>
            </div>
          </div>
        </div>

        {/* Tab switcher: Quét mã QR / Android / iOS / PC */}
        <div className="flex border-b border-slate-100 bg-slate-50 p-1.5 gap-1">
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-1.5 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'qr'
                ? 'bg-white text-[#0077b6] shadow-sm border border-slate-200/80 font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <QrCode className="w-3.5 h-3.5 text-blue-600" />
            <span>Quét Mã QR</span>
          </button>
          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-1.5 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'android'
                ? 'bg-white text-[#0077b6] shadow-sm border border-slate-200/80 font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Android</span>
          </button>
          <button
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-1.5 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'ios'
                ? 'bg-white text-[#0077b6] shadow-sm border border-slate-200/80 font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Apple className="w-3.5 h-3.5 text-slate-900" />
            <span>iPhone</span>
          </button>
          <button
            onClick={() => setActiveTab('pc')}
            className={`flex-1 py-1.5 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'pc'
                ? 'bg-white text-[#0077b6] shadow-sm border border-slate-200/80 font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-sky-600" />
            <span>Máy tính</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5">
          {activeTab === 'qr' ? (
            /* TAB 1: QR CODE QUÉT BẰNG ĐIỆN THOẠI */
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-1 rounded-2xl bg-gradient-to-tr from-[#0077b6] to-sky-400 shadow-md">
                <div className="bg-white p-3 rounded-[14px]">
                  <img
                    src={qrApiUrl}
                    alt="Mã QR tải ứng dụng TECNIC"
                    className="w-44 h-44 sm:w-48 sm:h-48 object-contain rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-black text-slate-900">
                  Dùng Camera điện thoại hoặc Zalo quét mã này
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed px-2">
                  Quét mã để mở website chính thức trên điện thoại và cài đặt ra màn hình.
                </p>
              </div>

              {/* Box copy link trực tiếp */}
              <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-left space-y-1.5">
                <div className="text-[11px] font-bold text-slate-500 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-[#0077b6]" />
                    Đường dẫn website:
                  </span>
                  {copied && <span className="text-emerald-600 font-black">Đã copy link!</span>}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={currentOrigin}
                    className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-blue-700 font-bold select-all focus:outline-none truncate"
                  />
                  <button
                    onClick={() => copyToClipboard(currentOrigin)}
                    className="px-3 py-1.5 bg-[#0077b6] hover:bg-[#023e8a] text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition active:scale-95 shrink-0"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              <div className="w-full bg-emerald-50 border border-emerald-200/80 rounded-2xl p-2.5 text-left text-xs text-emerald-900 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Sau khi trang web mở ra trên điện thoại:</strong><br />
                  - <strong>iPhone</strong>: Bấm nút <em>Chia sẻ</em> (dưới đáy) $\rightarrow$ Chọn <em>"Thêm vào MH chính"</em>.<br />
                  - <strong>Android</strong>: Bấm <em>Ba chấm ⋮</em> $\rightarrow$ Chọn <em>"Cài đặt ứng dụng"</em>.
                </div>
              </div>
            </div>
          ) : activeTab === 'android' ? (
            /* TAB 2: ANDROID */
            <div className="space-y-3">
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Khi mở trang web trên điện thoại Android bằng <strong>Chrome / Cốc Cốc</strong>:
              </p>

              <div className="space-y-2.5">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800">
                  <span className="w-6 h-6 rounded-full bg-[#0077b6] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">1</span>
                  <div className="leading-relaxed">
                    Bấm vào biểu tượng <strong>Ba chấm ⋮</strong> ở góc trên cùng bên phải màn hình Chrome.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800">
                  <span className="w-6 h-6 rounded-full bg-[#0077b6] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">2</span>
                  <div className="leading-relaxed">
                    Chọn dòng <strong>"Cài đặt ứng dụng"</strong> (hoặc <strong>"Thêm vào Màn hình chính"</strong>).
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">3</span>
                  <div className="leading-relaxed">
                    Bấm <strong>Cài đặt</strong>. App TECNIC sẽ xuất hiện ngay ngoài màn hình chính điện thoại như ứng dụng CH Play!
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'ios' ? (
            /* TAB 3: IPHONE SAFARI */
            <div className="space-y-3">
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Khi mở trang web trên iPhone / iPad bằng trình duyệt <strong>Safari</strong>:
              </p>

              <div className="space-y-2.5">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-[#0077b6] flex items-center justify-center shrink-0">
                    <Share className="w-3.5 h-3.5" />
                  </div>
                  <div className="leading-relaxed">
                    <strong>Bước 1:</strong> Bấm nút <strong>Chia sẻ (Share)</strong> ở thanh menu dưới đáy màn hình Safari (biểu tượng ô vuông có mũi tên chỉ lên).
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-[#0077b6] flex items-center justify-center shrink-0">
                    <PlusSquare className="w-3.5 h-3.5" />
                  </div>
                  <div className="leading-relaxed">
                    <strong>Bước 2:</strong> Cuộn danh sách xuống chọn dòng <strong>"Thêm vào Màn hình chính"</strong> (Add to Home Screen).
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div className="leading-relaxed">
                    <strong>Bước 3:</strong> Bấm chữ <strong>"Thêm" (Add)</strong> ở góc trên bên phải. Logo TECNIC App sẽ xuất hiện ngay ngoài màn hình iPhone!
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* TAB 4: PC */
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 text-xs font-semibold leading-relaxed">
                👉 Trên máy tính (Edge / Chrome), trình duyệt có sẵn nút cài đặt trên thanh địa chỉ:
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800">
                  <span className="w-6 h-6 rounded-full bg-[#0077b6] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">1</span>
                  <div className="leading-relaxed">
                    Nhìn lên <strong>thanh địa chỉ trên cùng</strong> của trình duyệt (nơi hiển thị link web). Ở phía góc bên phải, bấm vào biểu tượng <strong>Cài đặt ứng dụng</strong> (hình chiếc màn hình máy tính có dấu <kbd className="bg-slate-200 px-1 py-0.5 rounded font-bold text-[10px]">+</kbd> hoặc mũi tên).
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">2</span>
                  <div className="leading-relaxed">
                    Bấm <strong>Cài đặt (Install)</strong>. Một cửa sổ TECNIC App riêng biệt sẽ mở ra và biểu tượng App sẽ xuất hiện ngay ngoài Desktop!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Value Highlights */}
          <div className="pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0077b6]" />
              <span>Chính hãng 100%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Mở mượt mà toàn màn hình</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dung lượng siêu nhẹ (&lt; 2MB)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tự cập nhật sản phẩm mới</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition cursor-pointer"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
