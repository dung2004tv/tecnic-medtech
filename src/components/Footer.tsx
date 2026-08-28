import React from 'react';
import { 
  MapPin, Phone, Mail, ShieldCheck, 
  ExternalLink, CheckCircle2, Truck, 
  CreditCard, Award, HeadphonesIcon,
  ChevronRight, Navigation, Globe
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { CategoryId } from '../types';
import { TecnicLogo } from './TecnicLogo';

interface FooterProps {
  onSelectCategory?: (catId: CategoryId) => void;
  onOpenAbout: () => void;
  onOpenContact?: () => void;
  onOpenArticles?: () => void;
  onOpenProducts?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenAbout,
  onOpenContact,
  onOpenArticles,
  onOpenProducts
}) => {
  const handleOpenMap = () => {
    window.open(COMPANY_INFO.googleMapsUrl, '_blank');
  };

  return (
    <footer className="bg-white text-slate-800 pt-8 pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* 1. CENTERED TECNIC LOGO */}
        <div className="flex flex-col items-center justify-center text-center pt-2">
          <TecnicLogo size="lg" layout="vertical" showSlogan={true} />
        </div>

        {/* 2. THREE COLUMNS CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 pt-4 border-t border-slate-100">
          
          {/* CỘT 1: CÔNG TY CỔ PHẦN CÔNG NGHỆ VÀ DỊCH VỤ Y TẾ TECNIC (TECNIC) */}
          <div className="space-y-4">
            <h4 className="font-black text-sm sm:text-base text-slate-900 uppercase tracking-tight leading-snug">
              {COMPANY_INFO.name}
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
              <div 
                onClick={handleOpenMap}
                className="flex items-start gap-2 cursor-pointer group hover:text-[#0071ba] transition"
                title="Bấm để mở Google Maps chỉ đường"
              >
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Địa chỉ:</strong> {COMPANY_INFO.address}
                </span>
              </div>

              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong className="text-slate-900">Mã số thuế:</strong> {COMPANY_INFO.taxId}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0071ba] shrink-0" />
                <span>
                  <strong className="text-slate-900">Điện thoại:</strong>{' '}
                  <a href="tel:0348402466" className="text-red-600 font-bold hover:underline">
                    034 84 02466
                  </a>{' '}
                  /{' '}
                  <a href="tel:0389880369" className="text-red-600 font-bold hover:underline">
                    038 988 0369
                  </a>
                </span>
              </p>

              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0071ba] shrink-0" />
                <span>
                  <strong className="text-slate-900">Email:</strong> {COMPANY_INFO.emails[0]}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong className="text-slate-900">Website:</strong>{' '}
                  <a href="https://tecnic.vn" target="_blank" rel="noopener noreferrer" className="text-[#0071ba] hover:underline font-bold">
                    tecnic.vn
                  </a>
                </span>
              </p>
            </div>
          </div>

          {/* CỘT 2: LIÊN KẾT HỮU ÍCH */}
          <div className="space-y-4">
            <h4 className="font-black text-sm sm:text-base text-slate-900 uppercase tracking-tight">
              LIÊN KẾT HỮU ÍCH
            </h4>

            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <button 
                  onClick={onOpenProducts} 
                  className="hover:text-[#0071ba] hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  Trang chủ TECNIC
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenAbout} 
                  className="hover:text-[#0071ba] hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  Giới thiệu doanh nghiệp & Sứ mệnh
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenProducts} 
                  className="hover:text-[#0071ba] hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  Danh mục thiết bị y tế & PHCN
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenArticles} 
                  className="hover:text-[#0071ba] hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  Kiến thức & Hướng dẫn y khoa
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenAbout} 
                  className="hover:text-[#0071ba] hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  Chính sách bán hàng & Chất lượng
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenAbout} 
                  className="hover:text-[#0071ba] hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  Chính sách giao hàng & Bảo hành chính hãng
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenContact} 
                  className="hover:text-[#0071ba] hover:translate-x-1 transition-all flex items-center gap-1.5 font-bold text-[#0071ba]"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#0071ba]" />
                  Liên hệ & Đặt lịch tư vấn
                </button>
              </li>
            </ul>
          </div>

          {/* CỘT 3: BẢN ĐỒ CHỈ ĐƯỜNG */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-sm sm:text-base text-slate-900 uppercase tracking-tight">
                BẢN ĐỒ CHỈ ĐƯỜNG
              </h4>
              <button
                onClick={handleOpenMap}
                className="text-[11px] font-bold text-[#0071ba] hover:underline flex items-center gap-1"
              >
                <span>Mở Maps lớn</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* INTERACTIVE MAP EMBED */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative h-48 sm:h-52 bg-slate-100 group">
              <iframe
                title="Bản đồ TECNIC Hà Đông"
                src="https://maps.google.com/maps?q=T%E1%BA%A7ng%202,%20T%C3%B2a%20nh%C3%A0%20New%20Skyline,%20V%C4%83n%20Qu%C3%A1n,%20H%C3%A0%20%C4%90%C3%B4ng,%20H%C3%A0%20N%E1%BB%99i&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div 
                onClick={handleOpenMap}
                className="absolute inset-0 bg-transparent cursor-pointer"
                title="Bấm để mở bản đồ Google Maps chỉ đường"
              />
            </div>
            
            <p className="text-[11px] text-slate-500 italic">
              * Tòa nhà New Skyline Văn Quán - Yên Phúc, Hà Đông (Có bãi đỗ xe ô tô và xe máy thuận tiện).
            </p>
          </div>

        </div>

        {/* 3. COPYRIGHT BAR */}
        <div className="pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
          <p className="font-semibold text-slate-700">
            Bản quyền thuộc về CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ HỖ TRỢ Y TẾ TECNIC (TECNIC Medtech).
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Chuyên cung cấp giải pháp công nghệ, thiết bị y tế & dụng cụ phục hồi chức năng chính hãng tại Việt Nam.
          </p>
        </div>

      </div>
    </footer>
  );
};
