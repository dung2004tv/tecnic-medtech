import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, 
  Building2, MessageSquare, ShieldCheck, CreditCard, 
  ExternalLink, UserCheck, Sparkles, AlertCircle
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface ContactPageProps {
  onOpenAbout?: () => void;
  onOpenArticles?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onOpenAbout,
  onOpenArticles
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    interest: 'Tư vấn thiết bị phục hồi chức năng',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Vui lòng nhập họ tên và số điện thoại liên hệ');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        interest: 'Tư vấn thiết bị phục hồi chức năng',
        message: ''
      });
    }, 800);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. HERO HEADER */}
      <div className="bg-gradient-to-r from-[#143472] via-[#0071ba] to-[#143472] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-blue-950 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Hỗ Trợ 24/7 - Toàn Quốc
          </div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
            LIÊN HỆ TECNIC MEDTECH
          </h1>
          <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
            Đội ngũ tư vấn viên TECNIC luôn sẵn sàng lắng nghe, tư vấn cấu hình thiết bị y tế & hỗ trợ kỹ thuật phục hồi chức năng chuyên sâu cho gia đình và phòng khám.
          </p>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. CONTACT INFO CARDS (4 CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Hotline */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="font-black text-sm text-slate-900">Hotline Tư Vấn 24/7</h3>
          <p className="text-xs text-slate-500">Tư vấn chọn thiết bị & đặt hàng nhanh:</p>
          <div className="space-y-1">
            <a 
              href="tel:0348402466" 
              className="block text-base font-black text-red-600 hover:underline"
            >
              034 84 02466
            </a>
            <a 
              href="tel:0389880369" 
              className="block text-sm font-bold text-amber-700 hover:underline"
            >
              038 988 0369
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0071ba] flex items-center justify-center font-bold">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="font-black text-sm text-slate-900">Email Hỗ Trợ</h3>
          <p className="text-xs text-slate-500">Gửi yêu cầu báo giá dự án / phòng khám:</p>
          <a 
            href="mailto:tecnic.medtech@gmail.com" 
            className="block text-xs font-bold text-[#0071ba] truncate hover:underline"
          >
            tecnic.medtech@gmail.com
          </a>
        </div>

        {/* Working Hours */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-black text-sm text-slate-900">Giờ Làm Việc</h3>
          <div className="text-xs text-slate-600 space-y-1">
            <p>• {COMPANY_INFO.workingHours.weekday}</p>
            <p>• {COMPANY_INFO.workingHours.weekend}</p>
          </div>
        </div>

        {/* Address HQ */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-black text-sm text-slate-900">Trụ Sở Chính</h3>
          <p className="text-xs text-slate-600 line-clamp-3">
            Tầng 2, Tòa nhà New Skyline, KĐT Văn Quán, Hà Đông, TP. Hà Nội.
          </p>
        </div>
      </div>

      {/* 3. MAIN FORM & MAP GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: CONTACT FORM (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg sm:text-xl font-black text-[#143472] uppercase flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#0071ba]" />
              GỬI YÊU CẦU TƯ VẤN & BÁO GIÁ
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Điền thông tin bên dưới, tư vấn viên TECNIC sẽ liên hệ lại quý khách trong vòng 15 phút.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-black text-base text-emerald-900">Gửi Yêu Cầu Thành Công!</h3>
              <p className="text-xs text-emerald-700 max-w-md mx-auto">
                Cảm ơn quý khách đã gửi thông tin. Chuyên viên tư vấn của TECNIC MEDTECH sẽ liên hệ qua số điện thoại để hỗ trợ giải đáp chi tiết nhất.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-bold text-[#0071ba] underline"
              >
                Gửi thêm yêu cầu khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Họ và tên của bạn <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0071ba] focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Số điện thoại liên hệ <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0912 345 678"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0071ba] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Địa chỉ Email (tùy chọn)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0071ba] focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Nhu cầu cần tư vấn</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0071ba] focus:bg-white font-medium"
                  >
                    <option value="Tư vấn thiết bị phục hồi chức năng">Tư vấn thiết bị phục hồi chức năng</option>
                    <option value="Tư vấn giường y tế, xe lăn, nẹp khớp">Tư vấn giường y tế, xe lăn, nẹp khớp</option>
                    <option value="Báo giá cho phòng khám / dự án">Báo giá cho phòng khám / dự án</option>
                    <option value="Hỗ trợ kỹ thuật & bảo hành thiết bị">Hỗ trợ kỹ thuật & bảo hành thiết bị</option>
                    <option value="Khác">Nhu cầu khác</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Địa chỉ nhận hàng / Tỉnh thành</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Quận/Huyện, Tỉnh/Thành phố..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0071ba] focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nội dung chi tiết / Câu hỏi cần giải đáp</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mô tả tình trạng người bệnh, loại thiết bị quan tâm hoặc câu hỏi bạn cần tư vấn viên hỗ trợ..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 outline-none focus:border-[#0071ba] focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#143472] hover:bg-blue-900 text-white font-black py-3 rounded-2xl shadow-md transition flex items-center justify-center gap-2 uppercase tracking-wide text-xs"
              >
                {isSubmitting ? (
                  <span>Đang gửi thông tin...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Gửi Yêu Cầu Tư Vấn Ngay</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* RIGHT COLUMN: MAP & BANK INFO (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Map box */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-xs uppercase text-[#143472] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-600" />
                BẢN ĐỒ VỊ TRÍ TRỤ SỞ TECNIC
              </h3>
              <a
                href={COMPANY_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold text-[#0071ba] hover:underline flex items-center gap-1"
              >
                Mở Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
              <iframe
                title="Bản đồ TECNIC MEDTECH New Skyline Hà Đông"
                src={COMPANY_INFO.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <p className="text-[11px] text-slate-500">
              <b>Địa chỉ:</b> {COMPANY_INFO.address}
            </p>
          </div>

          {/* Official Bank Account */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-5 rounded-3xl shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-blue-400/30 pb-2.5">
              <CreditCard className="w-5 h-5 text-amber-300" />
              <h3 className="font-black text-xs uppercase tracking-wide">
                TÀI KHOẢN THANH TOÁN DOANH NGHIỆP
              </h3>
            </div>

            <div className="space-y-1.5 text-xs text-blue-100">
              <p>Ngân hàng: <b className="text-white font-bold">{COMPANY_INFO.bankAccount.bankName}</b></p>
              <p>Số tài khoản: <b className="text-amber-300 font-mono text-sm tracking-wider font-black">{COMPANY_INFO.bankAccount.accountNumber}</b></p>
              <p>Chủ tài khoản: <b className="text-white font-bold">{COMPANY_INFO.bankAccount.accountHolder}</b></p>
            </div>

            <div className="text-[11px] bg-blue-950/80 p-2.5 rounded-xl border border-blue-400/30 text-amber-200">
              ⚠️ {COMPANY_INFO.bankAccount.note}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
