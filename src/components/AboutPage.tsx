import React, { useState } from 'react';
import { 
  Building2, MapPin, Phone, Mail, ShieldCheck, 
  Award, CheckCircle2, Target, HeartHandshake, Eye, 
  ExternalLink, Users, Stethoscope, Sparkles, BookOpen, 
  Check, ArrowRight, Bed, Accessibility, Bot, Home, Activity
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { TecnicLogo } from './TecnicLogo';
import { CategoryId } from '../types';

interface AboutPageProps {
  onSelectCategory?: (categoryId: CategoryId) => void;
  onOpenArticles?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onSelectCategory,
  onOpenArticles
}) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'CORE_PILLARS' | 'STANDARDS' | 'CONTACT'>('OVERVIEW');

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 1. HERO BANNER WITH BRAND VALUES (INSPIRED BY PHANA) */}
      <div className="bg-gradient-to-r from-[#123577] via-[#0f4c9c] to-[#0071ba] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/15 text-white border border-white/25 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              <span>HỆ SINH THÁI THIẾT BỊ Y TẾ & PHỤC HỒI CHỨC NĂNG</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              {COMPANY_INFO.name}
            </h1>

            <p className="text-base sm:text-lg text-sky-200 font-bold italic">
              "{COMPANY_INFO.slogan}" — Sứ Mệnh: "{COMPANY_INFO.mission}"
            </p>

            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
              Tự hào là đơn vị tiên phong chuẩn hóa thiết bị Phục hồi chức năng (PHCN) & Y tế gia đình tại Việt Nam. TECNIC cung ứng giải pháp y khoa toàn diện, hỗ trợ người bệnh sau tai biến, phẫu thuật và người cao tuổi tự chủ sinh hoạt với tiêu chuẩn chất lượng cao nhất.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-bold">
              <div className="flex items-center gap-1.5 bg-blue-950/60 px-3 py-1.5 rounded-full border border-blue-400/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Hệ Sinh Thái Thiết Bị Y Tế Chuẩn Bộ Y Tế</span>
              </div>
              <div className="flex items-center gap-1.5 bg-blue-950/60 px-3 py-1.5 rounded-full border border-blue-400/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Bảo Hành Chính Hãng 12 - 36 Tháng</span>
              </div>
              <div className="flex items-center gap-1.5 bg-blue-950/60 px-3 py-1.5 rounded-full border border-blue-400/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Xuất Hóa Đơn VAT Điện Tử</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center items-center">
            <div className="p-4 flex items-center justify-center">
              <TecnicLogo size="xl" layout="vertical" variant="dark" showSlogan={true} />
            </div>
          </div>

        </div>

        {/* Ambient Blur */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. NAVIGATION TABS (PhaNa Architecture) */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2">
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1.5 text-xs font-bold">
          
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`px-4 py-2.5 rounded-xl transition ${
              activeTab === 'OVERVIEW'
                ? 'bg-[#143472] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Tổng Quan & Thư Ngỏ
          </button>

          <button
            onClick={() => setActiveTab('CORE_PILLARS')}
            className={`px-4 py-2.5 rounded-xl transition ${
              activeTab === 'CORE_PILLARS'
                ? 'bg-[#143472] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            4 Trụ Cột Giải Pháp
          </button>

          <button
            onClick={() => setActiveTab('STANDARDS')}
            className={`px-4 py-2.5 rounded-xl transition ${
              activeTab === 'STANDARDS'
                ? 'bg-[#143472] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Tiêu Chuẩn & Chứng Nhận
          </button>

          <button
            onClick={() => setActiveTab('CONTACT')}
            className={`px-4 py-2.5 rounded-xl transition ${
              activeTab === 'CONTACT'
                ? 'bg-[#143472] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Trụ Sở & Liên Hệ
          </button>

        </div>
      </div>

      {/* 3. TAB 1: OVERVIEW & THƯ NGỎ (OPENING LETTER) */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          
          {/* THƯ NGỎ CỦA BAN LÃNH ĐẠO */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0071ba] flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base sm:text-lg text-[#143472] uppercase">
                  THƯ NGỎ TỪ BAN LÃNH ĐẠO TECNIC MEDTECH
                </h3>
                <p className="text-xs text-slate-500">Gửi Quý Khách Hàng, Bệnh Nhân và Đối Tác Y Khoa</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                <b>Kính gửi Quý Khách hàng, Quý Đối tác và Các Gia đình thân mến!</b>
              </p>
              <p>
                Tai biến mạch máu não, chấn thương xương khớp và suy giảm vận động tuổi già là những biến cố sức khỏe bất ngờ, lấy đi khả năng tự chủ sinh hoạt hàng ngày của người bệnh và đặt gánh nặng tâm lý lẫn thể chất lên những người thân yêu trong gia đình.
              </p>
              <p>
                Thấu hiểu sâu sắc nỗi đau và khát khao hồi phục đó, <b>TECNIC MEDTECH</b> được thành lập với triết lý xuyên suốt: <span className="text-[#0071ba] font-bold">"Kiến tạo để phụng sự - Giải pháp toàn diện, tái sinh cuộc sống"</span>. Chúng tôi không chỉ cung ứng các thiết bị y tế đơn thuần, mà cung cấp một <b>Hệ sinh thái trị liệu và phục hồi chức năng đồng bộ</b>, từ găng tay robot công nghệ cao, giường y tế dưỡng bệnh có bô, xe lăn ngả nằm, đệm hơi chống loét đến hệ thống cải tạo không gian sống an toàn chống trượt ngã.
              </p>
              <p>
                Với tinh thần phụng sự tận tâm, TECNIC cam kết 100% sản phẩm chính hãng, được đội ngũ Kỹ thuật viên, Chuyên viên tư vấn hướng dẫn vận hành chu đáo, đồng hành cùng người bệnh trên từng bước chân phục hồi.
              </p>
            </div>
          </div>

          {/* TẦM NHÌN - SỨ MỆNH - GIÁ TRỊ CỐT LÕI (3 CARDS ĐỒNG BỘ TÔNG MÀU XANH Y TẾ TECNIC) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* TẦM NHÌN */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-300 shadow-xs space-y-3 flex flex-col justify-between transition">
              <div className="space-y-2.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0071ba] flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <h4 className="font-black text-sm text-[#143472] uppercase tracking-wide">
                  TẦM NHÌN CHIẾN LƯỢC
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {COMPANY_INFO.vision}
                </p>
              </div>
              <div className="text-[11px] font-bold text-[#0071ba] pt-2 border-t border-slate-100">
                ★ Top thương hiệu PHCN dẫn đầu
              </div>
            </div>

            {/* SỨ MỆNH */}
            <div className="bg-white rounded-3xl p-6 border border-blue-200 hover:border-blue-400 shadow-xs space-y-3 flex flex-col justify-between transition relative overflow-hidden">
              <div className="space-y-2.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0071ba] flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="font-black text-sm text-[#143472] uppercase tracking-wide">
                  SỨ MỆNH THIÊNG LIÊNG
                </h4>
                <div className="text-lg font-black text-[#0071ba] bg-blue-50/80 border border-blue-100/80 p-3 rounded-2xl text-center">
                  "{COMPANY_INFO.mission}"
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Nâng tầm chất lượng cuộc sống cho người khuyết tật, người già và người bệnh thông qua các giải pháp công nghệ hỗ trợ y khoa thông minh.
                </p>
              </div>
              <div className="text-[11px] font-bold text-[#0071ba] pt-2 border-t border-slate-100">
                ★ Đồng hành cùng 1 triệu gia đình Việt
              </div>
            </div>

            {/* GIÁ TRỊ CỐT LÕI */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-300 shadow-xs space-y-3 flex flex-col justify-between transition">
              <div className="space-y-2.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0071ba] flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h4 className="font-black text-sm text-[#143472] uppercase tracking-wide">
                  4 GIÁ TRỊ CỐT LÕI
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                  {COMPANY_INFO.coreValues.map((val, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0071ba] shrink-0" />
                      <span>{val}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-[11px] font-bold text-[#0071ba] pt-2 border-t border-slate-100">
                ★ Văn hóa phụng sự từ tâm
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 4. TAB 2: 4 TRỤ CỘT GIẢI PHÁP (CORE PILLARS) */}
      {activeTab === 'CORE_PILLARS' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-[#143472] uppercase">
              3 LĨNH VỰC TRỌNG TÂM & HỆ SINH THÁI Y KHOA TECNIC
            </h3>
            <p className="text-xs text-slate-500">
              Với phương châm "Kiến tạo để phụng sự", TECNIC tập trung vào 3 trụ cột y khoa toàn diện
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Trụ cột 1: Y tế dự phòng */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between hover:border-blue-300 transition">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 font-black text-base flex items-center justify-center">
                    01
                  </span>
                  <Activity className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-black text-base text-slate-900">
                  Y Tế Dự Phòng - Chăm Sóc Sức Khỏe Cho Người Khỏe
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Chủ động chăm sóc sức khỏe, phát hiện sớm nguy cơ và phòng ngừa bệnh lý tại gia đình: Máy đo huyết áp, đo đường huyết, đai bảo vệ cơ xương khớp thể thao Bonbone Nhật Bản, súng massage cơ sâu, thiết bị theo dõi sức khỏe chủ động.
                </p>
              </div>
              <button
                onClick={() => onSelectCategory && onSelectCategory('DAI_NEP_KHOP')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 pt-3 border-t border-slate-100"
              >
                Xem thiết bị Chăm sóc sức khỏe <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Trụ cột 2: Phục hồi chức năng */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between hover:border-blue-300 transition">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 font-black text-base flex items-center justify-center">
                    02
                  </span>
                  <Accessibility className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-black text-base text-slate-900">
                  Phục Hồi Chức Năng - Đồng Hành Cùng Người Bệnh Tại Nhà
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Giải pháp chuyên sâu cho người sau tai biến, đột quỵ, phẫu thuật: Găng tay robot tập phục hồi ngón tay, xe lăn ngả nằm đa năng, khung tập đi 3 chế độ, giường y tế có bô vệ sinh, đệm hơi chống loét đảo khí tì đè.
                </p>
              </div>
              <button
                onClick={() => onSelectCategory && onSelectCategory('ROBOT_NANG_HA')}
                className="text-xs font-bold text-[#0071ba] hover:text-blue-900 inline-flex items-center gap-1 pt-3 border-t border-slate-100"
              >
                Xem thiết bị Phục hồi chức năng <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Trụ cột 3: Công nghệ y tế chuyên sâu */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between hover:border-blue-300 transition">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 font-black text-base flex items-center justify-center">
                    03
                  </span>
                  <Bot className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-black text-base text-slate-900">
                  Công Nghệ Y Tế Chuyên Sâu - Hỗ Trợ Cơ Sở Y Tế & Bệnh Viện
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cung cấp thiết bị vật lý trị liệu công nghệ cao, máy kéo giãn cột sống lưng cổ tự động, máy nén ép trị liệu suy giãn tĩnh mạch, máy điện xung TENS/EMS tiêu chuẩn bệnh viện và trung tâm PHCN.
                </p>
              </div>
              <button
                onClick={() => onSelectCategory && onSelectCategory('TRI_LIEU_XUNG_DIEN')}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 inline-flex items-center gap-1 pt-3 border-t border-slate-100"
              >
                Xem thiết bị Vật lý trị liệu <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 5. TAB 3: TIÊU CHUẨN & CHỨNG NHẬN (STANDARDS & CERTIFICATIONS) */}
      {activeTab === 'STANDARDS' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#0071ba] flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base uppercase text-[#143472]">
                  TIÊU CHUẨN CHẤT LƯỢNG & CHỨNG NHẬN Y KHOA
                </h3>
                <p className="text-xs text-slate-500">Cam kết 100% an toàn sinh học và hiệu quả lâm sàng</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-black text-sm text-[#0071ba]">Bộ Y Tế Việt Nam</div>
                <p className="text-slate-600">
                  Toàn bộ danh mục sản phẩm thiết bị y tế & PHCN do TECNIC phân phối đều có hồ sơ công bố tiêu chuẩn áp dụng, giấy phép lưu hành thiết bị y tế loại A, B, C theo Nghị định của Chính phủ.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-black text-sm text-emerald-600">ISO 13485 & CE Mark</div>
                <p className="text-slate-600">
                  Nhà máy và các đối tác sản xuất (OSADA, GBM, Lucass, Bonbone Japan, Omron) đạt hệ thống quản lý chất lượng thiết bị y tế quốc tế ISO 13485:2016 và chứng nhận an toàn CE châu Âu.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-black text-sm text-purple-600">Hóa Đơn VAT & CO/CQ</div>
                <p className="text-slate-600">
                  Cung cấp đầy đủ hóa đơn giá trị gia tăng điện tử, chứng nhận xuất xứ hàng hóa (CO) và chứng nhận chất lượng (CQ) cho mọi cá nhân, phòng khám và cơ sở y tế.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. TAB 4: TRỤ SỞ & LIÊN HỆ */}
      {activeTab === 'CONTACT' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0071ba] flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base uppercase text-[#143472]">
                  TRỤ SỞ CÔNG TY & SHOWROOM TRẢI NGHIỆM THIẾT BỊ
                </h3>
                <p className="text-xs text-slate-500">Mã số thuế: {COMPANY_INFO.taxId} • Website: ytetecnic.vn</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
              
              <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-sm text-[#143472] uppercase">Thông Tin Trực Tiếp</h4>
                
                <div className="space-y-2 font-medium">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Địa chỉ trụ sở:</span>
                      <p className="text-slate-600">{COMPANY_INFO.address}</p>
                      <a 
                        href={COMPANY_INFO.googleMapsUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[#0071ba] font-bold text-[11px] underline inline-flex items-center gap-1 mt-0.5"
                      >
                        Mở chỉ đường trên Google Maps <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Hotline 24/7: <b>034 84 02466 / 038 988 0369</b></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Email: <b>tecnic.medtech@gmail.com</b></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Mã số doanh nghiệp: <b>{COMPANY_INFO.taxId}</b> do Sở KH&ĐT Hà Nội cấp</span>
                  </div>
                </div>

                {/* Bank Account Info */}
                <div className="pt-3 border-t border-slate-200 text-[11px] space-y-1">
                  <span className="font-bold text-slate-900 block">Tài khoản thanh toán doanh nghiệp chính thức:</span>
                  <div>Ngân hàng: <b>MB Bank (Ngân hàng Quân Đội)</b></div>
                  <div>Số tài khoản: <b className="font-mono text-[#0071ba] text-xs">787216666</b></div>
                  <div>Chủ tài khoản: <b>{COMPANY_INFO.bankAccount.accountHolder}</b></div>
                </div>
              </div>

              {/* Showroom visual */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-[#143472] uppercase">Giờ Làm Việc & Trải Nghiệm Thiết Bị</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Kính mời Quý khách hàng và đối tác đến trực tiếp Showroom TECNIC tại Tòa nhà New Skyline Văn Quán để trải nghiệm thực tế các dòng giường y tế đa năng, găng tay robot PHCN và xe lăn cao cấp.
                  </p>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <div>📅 {COMPANY_INFO.workingHours.weekday}</div>
                    <div>📅 {COMPANY_INFO.workingHours.weekend}</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#143472] to-[#0071ba] text-white p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-blue-100">Đặt lịch tư vấn & thử máy tại nhà:</div>
                    <div className="text-white font-black text-sm">034 84 02466 / 038 988 0369</div>
                  </div>
                  <a
                    href="tel:0348402466"
                    className="bg-white hover:bg-blue-50 text-[#0071ba] px-3.5 py-1.5 rounded-lg font-bold text-xs shadow-xs transition"
                  >
                    Gọi Ngay
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
