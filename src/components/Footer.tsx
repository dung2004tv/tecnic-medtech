import React from 'react';
import { 
  MapPin, Phone, Mail, ShieldCheck, 
  ExternalLink, CheckCircle2, Truck, 
  CreditCard, Award, HeadphonesIcon,
  Facebook, Youtube, Instagram
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
  return (
    <footer className="bg-[#0b1b3d] text-white pt-10 pb-6 border-t-4 border-[#0071ba]">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        {/* 1. TOP STATS BAR - Horizontal Layout Inspired by Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-blue-900/50">
          <div className="flex items-center gap-4">
            <Truck className="w-10 h-10 text-cyan-400" strokeWidth={1.5} />
            <div>
              <p className="font-bold text-sm">Giao hàng toàn quốc</p>
              <p className="text-xs text-blue-200">Hỗ trợ vận chuyển & lắp đặt tận nơi</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <CreditCard className="w-10 h-10 text-cyan-400" strokeWidth={1.5} />
            <div>
              <p className="font-bold text-sm">Thanh toán an toàn</p>
              <p className="text-xs text-blue-200">COD, Chuyển khoản VietQR, Tiền mặt</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Award className="w-10 h-10 text-cyan-400" strokeWidth={1.5} />
            <div>
              <p className="font-bold text-sm">Uy tín - Chất lượng</p>
              <p className="text-xs text-blue-200">Cam kết chính hãng 100%</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <HeadphonesIcon className="w-10 h-10 text-cyan-400" strokeWidth={1.5} />
            <div>
              <p className="font-bold text-sm">Hỗ trợ khách hàng 24/7</p>
              <p className="text-xs text-amber-300 font-bold">Hotline: 034 84 02466 / 038 988 0369</p>
            </div>
          </div>
        </div>

        {/* 2. MAIN FOOTER CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 text-sm text-blue-100">
          
          {/* CỘT 1: THÔNG TIN DOANH NGHIỆP TECNIC (Chiếm 4 cột trên PC) */}
          <div className="lg:col-span-4 space-y-4 pr-4">
            <div className="bg-white p-2.5 rounded-2xl inline-block shadow-sm">
              <TecnicLogo size="sm" showSlogan={true} />
            </div>

            <div className="space-y-3 pt-2 text-xs leading-relaxed">
              <p className="font-bold text-white uppercase">{COMPANY_INFO.name}</p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><b className="text-white">Địa chỉ:</b> {COMPANY_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><b className="text-white">Mã số thuế:</b> {COMPANY_INFO.taxId}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><b className="text-white">Điện thoại / Hotline:</b> <b className="text-amber-300">034 84 02466 / 038 988 0369</b></span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><b className="text-white">Email:</b> tecnic.medtech@gmail.com</span>
              </p>
            </div>
          </div>

          {/* CỘT 2: THÔNG TIN */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-bold text-base text-white">Thông tin</h4>
            <ul className="space-y-2.5 text-xs text-blue-200">
              <li><button onClick={onOpenProducts} className="hover:text-cyan-400 transition">Trang chủ</button></li>
              <li><button onClick={onOpenAbout} className="hover:text-cyan-400 transition">Giới thiệu</button></li>
              <li><button onClick={onOpenProducts} className="hover:text-cyan-400 transition">Sản phẩm</button></li>
              <li><button onClick={onOpenProducts} className="hover:text-cyan-400 transition">Thiết bị nổi bật</button></li>
              <li><button onClick={onOpenArticles} className="hover:text-cyan-400 transition">Kiến thức chuyên ngành</button></li>
              <li><button onClick={onOpenAbout} className="hover:text-cyan-400 transition">Tuyển dụng</button></li>
              <li><button onClick={onOpenContact} className="hover:text-cyan-400 transition font-bold text-amber-300">Liên hệ</button></li>
            </ul>
          </div>

          {/* CỘT 3: KHÁCH HÀNG */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-bold text-base text-white">Khách hàng</h4>
            <ul className="space-y-2.5 text-xs text-blue-200">
              <li><button onClick={onOpenAbout} className="hover:text-cyan-400 transition">Chính sách bảo hành</button></li>
              <li><button onClick={onOpenAbout} className="hover:text-cyan-400 transition">Chính sách đổi trả hàng</button></li>
              <li><button onClick={onOpenAbout} className="hover:text-cyan-400 transition">Quy định vận chuyển</button></li>
              <li><button onClick={onOpenAbout} className="hover:text-cyan-400 transition">Quy định chung</button></li>
              <li><button onClick={onOpenAbout} className="hover:text-cyan-400 transition">Bảo mật thông tin</button></li>
              <li><button onClick={onOpenAbout} className="hover:text-cyan-400 transition">Giải quyết khiếu nại</button></li>
            </ul>
          </div>

          {/* CỘT 4: HƯỚNG DẪN */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-bold text-base text-white">Hướng dẫn</h4>
            <ul className="space-y-2.5 text-xs text-blue-200">
              <li><button onClick={onOpenAbout} className="hover:text-cyan-400 transition">Hướng dẫn mua hàng</button></li>
              <li><button onClick={onOpenAbout} className="hover:text-cyan-400 transition">Giao nhận và thanh toán</button></li>
              <li><button onClick={onOpenAbout} className="hover:text-cyan-400 transition">Hướng dẫn sử dụng</button></li>
              <li><button onClick={onOpenAbout} className="hover:text-cyan-400 transition">Đăng ký thành viên</button></li>
              <li>
                <a href={COMPANY_INFO.website} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition flex items-center gap-1">
                  Tra cứu bảo hành trực tuyến <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* CỘT 5: MẠNG XÃ HỘI */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-bold text-base text-white">Theo dõi chúng tôi</h4>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-80 transition">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center hover:opacity-80 transition">
                <Youtube className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center hover:opacity-80 transition">
                <Instagram className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

        </div>

        {/* 3. BOTTOM COPYRIGHT */}
        <div className="pt-6 border-t border-blue-900/50 text-center text-xs text-blue-300 space-y-1">
          <p>© {new Date().getFullYear()} <b>TECNIC MEDTECH</b> (tecnic.vn) - {COMPANY_INFO.name}. Tất cả quyền được bảo lưu.</p>
          <p className="text-[10px] text-blue-400/80">
            Hệ sinh thái thiết bị y tế, phục hồi chức năng và giải pháp công nghệ hỗ trợ y tế hàng đầu Việt Nam.
          </p>
        </div>

      </div>
    </footer>
  );
};

