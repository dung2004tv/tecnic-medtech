import React from 'react';
import { 
  Building2, MapPin, Phone, Mail, ShieldCheck, 
  FileText, CreditCard, Award, ExternalLink, X, CheckCircle2, Target, HeartHandshake, Eye
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { TecnicLogo } from './TecnicLogo';

interface CompanyAboutProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompanyAbout: React.FC<CompanyAboutProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER */}
        <div className="bg-[#123577] text-white px-6 py-4 flex justify-between items-center shrink-0 border-b-2 border-red-500">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-xl shadow-xs">
              <TecnicLogo size="sm" showSlogan={false} />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base uppercase tracking-tight">
                VỀ TECNIC MEDICAL & HỆ SINH THÁI Y KHOA
              </h3>
              <p className="text-[11px] text-blue-200">Website: tecnic.vn • MST: {COMPANY_INFO.taxId}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY CONTENT */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          
          {/* INTRO HERO WITH VERTICAL LOGO */}
          <div className="bg-gradient-to-r from-[#123577] to-[#0071ba] text-white p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
            <div className="bg-white p-4 rounded-2xl shadow-lg shrink-0">
              <TecnicLogo size="md" layout="vertical" showSlogan={true} />
            </div>
            
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-block bg-amber-400 text-blue-950 font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                Hệ Sinh Thái Thiết Bị Y Tế & PHCN
              </span>
              <h2 className="text-lg sm:text-xl font-black">{COMPANY_INFO.name}</h2>
              <p className="text-sm text-amber-300 font-bold italic">"{COMPANY_INFO.slogan}"</p>
              <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
                TECNIC tự hào mang đến Giải pháp Y tế & Phục hồi chức năng Toàn diện, đồng hành cùng người bệnh và người cao tuổi trên hành trình tự chủ sinh hoạt và nâng cao chất lượng cuộc sống.
              </p>
            </div>
          </div>

          {/* TẦM NHÌN - SỨ MỆNH - GIÁ TRỊ CỐT LÕI */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* TẦM NHÌN */}
            <div className="bg-blue-50/60 border border-blue-200 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-[#123577] font-black text-xs uppercase">
                <Eye className="w-4 h-4 text-[#0071ba]" />
                Tầm Nhìn
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {COMPANY_INFO.vision}
              </p>
            </div>

            {/* SỨ MỆNH */}
            <div className="bg-amber-50/60 border border-amber-200 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-black text-xs uppercase">
                <Target className="w-4 h-4 text-amber-600" />
                Sứ Mệnh
              </div>
              <p className="text-sm font-black text-red-600 italic">
                "{COMPANY_INFO.mission}"
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Cung cấp giải pháp thiết bị công nghệ hỗ trợ và phục hồi chức năng đạt chuẩn, vì sự an toàn và hạnh phúc của cộng đồng.
              </p>
            </div>

            {/* GIÁ TRỊ CỐT LÕI */}
            <div className="bg-emerald-50/60 border border-emerald-200 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-black text-xs uppercase">
                <HeartHandshake className="w-4 h-4 text-emerald-600" />
                Giá Trị Cốt Lõi
              </div>
              <ul className="space-y-1 text-[11px] text-slate-700 font-medium">
                {COMPANY_INFO.coreValues.map((v, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4 LĨNH VỰC CỐT LÕI HOẠT ĐỘNG */}
          <div className="space-y-3">
            <h4 className="font-black text-sm text-[#123577] uppercase flex items-center gap-2 border-b pb-2">
              <Award className="w-4 h-4 text-amber-500" />
              4 Trụ Cột Giải Pháp Của TECNIC
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {COMPANY_INFO.coreFields.map((field, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-lg font-black text-[#0071ba]">{field.step}</span>
                    <h5 className="font-bold text-xs text-slate-900 mt-1">{field.title}</h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1">{field.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HEADQUARTERS & CONTACT & BANK INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Contact Box */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
              <h4 className="font-bold text-xs text-[#123577] uppercase flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#0071ba]" />
                Thông Tin Trụ Sở & Pháp Lý
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Địa chỉ:</span>
                    <p className="text-slate-600">{COMPANY_INFO.address}</p>
                    <a 
                      href={COMPANY_INFO.googleMapsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#0071ba] hover:underline font-bold text-[11px] inline-flex items-center gap-1 mt-0.5"
                    >
                      Xem bản đồ Google Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Hotline: <b>034 84 02466</b></span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Email: <b>tecnic.vn.medical@gmail.com</b></span>
                </div>

                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Mã số thuế doanh nghiệp (MST): <b>{COMPANY_INFO.taxId}</b></span>
                </div>
              </div>
            </div>

            {/* Official Bank Account */}
            <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-2xl space-y-3">
              <h4 className="font-bold text-xs text-[#123577] uppercase flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#0071ba]" />
                Tài Khoản Ngân Hàng Doanh Nghiệp
              </h4>

              <div className="space-y-2 text-xs bg-white p-3 rounded-xl border border-blue-100">
                <p><span className="text-slate-500">Ngân hàng:</span> <b>{COMPANY_INFO.bankAccount.bankName}</b></p>
                <p><span className="text-slate-500">Chi nhánh:</span> <b>{COMPANY_INFO.bankAccount.branch}</b></p>
                <p><span className="text-slate-500">Số tài khoản:</span> <b className="text-red-600 text-sm font-mono">{COMPANY_INFO.bankAccount.accountNumber}</b></p>
                <p><span className="text-slate-500">Chủ tài khoản:</span> <b className="text-slate-800 text-[11px]">{COMPANY_INFO.bankAccount.accountHolder}</b></p>
                <p className="text-[10px] text-red-600 italic mt-1 pt-1 border-t">
                  ⚠️ {COMPANY_INFO.bankAccount.note}
                </p>
              </div>
            </div>

          </div>

          {/* POLICIES */}
          <div className="space-y-3">
            <h4 className="font-black text-sm text-[#123577] uppercase flex items-center gap-2 border-b pb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Chính Sách Khách Hàng & Bảo Hành
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COMPANY_INFO.policies.map((p, idx) => (
                <div key={idx} className="bg-slate-50 border p-3 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{p.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 pl-5">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
