import React, { useState } from 'react';
import { 
  X, CheckCircle2, ShieldCheck, QrCode, Copy, 
  CreditCard, Banknote, Building2, MapPin, Truck, FileText, Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Order, PaymentMethodType, User } from '../types';
import { COMPANY_INFO } from '../data/companyData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currentUser: User | null;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currentUser,
  onOrderSuccess
}) => {
  const [customerName, setCustomerName] = useState(currentUser?.fullName || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || 'nguyendungdbd1@gmail.com');
  const [shippingAddress, setShippingAddress] = useState(currentUser?.address || '');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('COD');
  const [needsInvoice, setNeedsInvoice] = useState(false);
  const [companyName, setCompanyName] = useState(currentUser?.clinicName || '');
  const [companyTaxCode, setCompanyTaxCode] = useState(currentUser?.taxCode || '');
  const [companyAddress, setCompanyAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  let totalMarketPrice = 0;
  let totalTecnicPrice = 0;

  items.forEach(item => {
    totalMarketPrice += item.product.marketPrice * item.quantity;
    totalTecnicPrice += item.product.tecnicPrice * item.quantity;
  });

  const totalSaved = totalMarketPrice - totalTecnicPrice;
  const isFreeShipping = totalTecnicPrice >= 1000000;
  const shippingFee = isFreeShipping ? 0 : 30000;
  const finalTotal = totalTecnicPrice + shippingFee;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone number
    const cleanPhone = customerPhone.replace(/[^0-9]/g, '');
    if (!/^0[35789][0-9]{8}$/.test(cleanPhone)) {
      alert("Số điện thoại không hợp lệ! Vui lòng nhập số di động (10 số, bắt đầu bằng 03, 05, 07, 08, 09) để nhân viên giao hàng liên hệ.");
      return;
    }

    if (!shippingAddress.trim()) {
      alert("Vui lòng nhập địa chỉ giao nhận hàng chi tiết.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customerName,
        customerPhone: cleanPhone,
        customerEmail,
        shippingAddress,
        paymentMethod,
        needsInvoice,
        invoiceInfo: needsInvoice ? {
          companyName,
          taxCode: companyTaxCode,
          companyAddress,
          invoiceEmail: customerEmail
        } : null,
        notes,
        items: items.map(i => ({
          productId: i.product.id,
          productName: i.product.name,
          productImage: i.product.image,
          price: i.product.tecnicPrice,
          marketPrice: i.product.marketPrice,
          quantity: i.quantity
        }))
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const data = await response.json();

      if (data.success && data.data) {
        setCompletedOrder(data.data);
        onOrderSuccess(data.data);

        // Confetti celebration
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore
        }
      } else {
        alert(data.message || "Không thể tạo đơn hàng, vui lòng thử lại!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối máy chủ đặt hàng. Vui lòng liên hệ hotline: 034 84 02466");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER */}
        <div className="bg-[#143472] text-white px-6 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-black text-base uppercase">
              {completedOrder ? 'XÁC NHẬN ĐƠN HÀNG THÀNH CÔNG' : 'THANH TOÁN & GIAO NHẬN THIẾT BỊ Y TẾ'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ORDER SUCCESS SCREEN */}
        {completedOrder ? (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-center">
            
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
                MÃ ĐƠN HÀNG: <b className="text-[#143472]">{completedOrder.orderCode}</b>
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-2">ĐẶT HÀNG THÀNH CÔNG!</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Cảm ơn bạn đã tin dùng thiết bị y tế TECNIC MEDICAL. Chuyên viên giao vận sẽ liên hệ số điện thoại <b>{completedOrder.customerPhone}</b> để xác nhận và giao hàng tận nơi.
              </p>
            </div>

            {/* IF BANK TRANSFER: SHOW VIETQR CODE */}
            {completedOrder.paymentMethod === 'BANK_TRANSFER' && (
              <div className="bg-blue-50/80 p-5 rounded-2xl border border-blue-200 text-left space-y-4 max-w-lg mx-auto">
                <div className="flex items-center gap-2 text-xs font-bold text-[#143472] border-b pb-2">
                  <QrCode className="w-4 h-4 text-[#0071ba]" />
                  <span>Quét mã VietQR hoặc Chuyển khoản chính thức:</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* QR Image */}
                  <div className="bg-white p-2 rounded-xl shadow-md border shrink-0 text-center">
                    <img 
                      src={`https://img.vietqr.io/image/mb-787216666-compact2.png?amount=${completedOrder.finalTotal}&addInfo=TECNIC%20${completedOrder.customerPhone}&accountName=CONG%20TY%20CP%20CN%20VA%20DV%20Y%20TE%20TECNIC`}
                      alt="Mã QR Chuyển Khoản MB Bank TECNIC"
                      className="w-36 h-36 object-contain" 
                    />
                    <span className="text-[10px] font-bold text-slate-500 block mt-1">Mã VietQR Tự Động</span>
                  </div>

                  {/* Bank detail copyable items */}
                  <div className="space-y-2 text-xs flex-1 w-full">
                    <div className="bg-white p-2 rounded-lg border flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Ngân hàng:</span>
                        <b className="text-slate-800">MB Bank</b>
                      </div>
                    </div>

                    <div className="bg-white p-2 rounded-lg border flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Số tài khoản:</span>
                        <b className="text-red-600 text-sm font-mono">{COMPANY_INFO.bankAccount.accountNumber}</b>
                      </div>
                      <button 
                        type="button"
                        onClick={() => handleCopy(COMPANY_INFO.bankAccount.accountNumber, 'stk')}
                        className="text-[#0071ba] hover:bg-blue-50 p-1 rounded font-bold text-[11px] flex items-center gap-1"
                      >
                        {copiedField === 'stk' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        {copiedField === 'stk' ? 'Đã chép' : 'Sao chép'}
                      </button>
                    </div>

                    <div className="bg-white p-2 rounded-lg border flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Chủ tài khoản:</span>
                        <b className="text-slate-800 text-[11px]">{COMPANY_INFO.bankAccount.accountHolder}</b>
                      </div>
                    </div>

                    <div className="bg-white p-2 rounded-lg border flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Số tiền:</span>
                        <b className="text-red-600 text-sm">{completedOrder.finalTotal.toLocaleString('vi-VN')} đ</b>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-red-600 italic bg-white/70 p-2 rounded-lg border border-red-200">
                  Lưu ý: TECNIC MEDICAL chỉ sử dụng duy nhất tài khoản doanh nghiệp đứng tên CÔNG TY CP CÔNG NGHỆ VÀ DỊCH VỤ Y TẾ TECNIC.
                </p>
              </div>
            )}

            {/* ORDER SUMMARY */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs max-w-lg mx-auto">
              <div className="flex justify-between text-slate-600">
                <span>Người nhận:</span>
                <b>{completedOrder.customerName} ({completedOrder.customerPhone})</b>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Địa chỉ giao:</span>
                <span className="text-right max-w-xs">{completedOrder.shippingAddress}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Phương thức:</span>
                <b>{completedOrder.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản VietQR MB Bank'}</b>
              </div>
              <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t">
                <span>Tổng tiền cần thanh toán:</span>
                <span className="text-red-600 text-base">{completedOrder.finalTotal.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="bg-[#0071ba] hover:bg-blue-800 text-white font-bold text-xs px-8 py-3 rounded-full transition shadow-md"
            >
              Hoàn tất & Tiếp tục mua sắm
            </button>

          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
            
            {/* 1. THÔNG TIN KHÁCH HÀNG & GIAO HÀNG */}
            <div className="space-y-3">
              <h4 className="font-black text-xs sm:text-sm text-[#143472] uppercase flex items-center gap-2 border-b pb-2">
                <Truck className="w-4 h-4 text-[#0071ba]" />
                1. Thông tin giao nhận hàng
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Họ và tên người nhận *</label>
                  <input
                    required
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn Dũng"
                    className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:border-[#0071ba]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Số điện thoại di động *</label>
                  <input
                    required
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="10 số (03x, 05x, 07x, 08x, 09x)"
                    className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:border-[#0071ba]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Gmail / Email nhận thông báo đơn hàng *</label>
                  <input
                    required
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="nguyendungdbd1@gmail.com"
                    className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:border-[#0071ba]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Địa chỉ nhận hàng chi tiết *</label>
                  <textarea
                    required
                    rows={2}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Số nhà, ngõ/đường, phường/xã, quận/huyện, tỉnh/thành phố..."
                    className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:border-[#0071ba]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Ghi chú đơn hàng (nếu có):</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến..."
                    className="w-full border border-slate-300 p-2 rounded-xl outline-none focus:border-[#0071ba]"
                  />
                </div>
              </div>
            </div>

            {/* 2. PHƯƠNG THỨC THANH TOÁN (4 Hình thức chuẩn TECNIC) */}
            <div className="space-y-3">
              <h4 className="font-black text-xs sm:text-sm text-[#143472] uppercase flex items-center gap-2 border-b pb-2">
                <Banknote className="w-4 h-4 text-emerald-600" />
                2. Hình thức thanh toán
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                {/* COD */}
                <label className={`border-2 rounded-2xl p-3 cursor-pointer flex items-start gap-3 transition ${
                  paymentMethod === 'COD' ? 'border-[#0071ba] bg-blue-50/60' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="mt-1 text-[#0071ba]"
                  />
                  <div>
                    <p className="font-bold text-slate-900">Thanh toán khi nhận hàng (COD)</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Kiểm tra thiết bị nguyên seal trước khi thanh toán cho shipper.</p>
                  </div>
                </label>

                {/* BANK TRANSFER (VIETQR MB Bank) */}
                <label className={`border-2 rounded-2xl p-3 cursor-pointer flex items-start gap-3 transition ${
                  paymentMethod === 'BANK_TRANSFER' ? 'border-[#0071ba] bg-blue-50/60' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'BANK_TRANSFER'}
                    onChange={() => setPaymentMethod('BANK_TRANSFER')}
                    className="mt-1 text-[#0071ba]"
                  />
                  <div>
                    <p className="font-bold text-slate-900 flex items-center gap-1.5">
                      Chuyển khoản VietQR MB Bank
                      <span className="text-[9px] bg-red-100 text-red-600 font-bold px-1.5 py-0.2 rounded">Khuyên dùng</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Quét mã QR tự động qua app ngân hàng (MB Bank 787216666).</p>
                  </div>
                </label>

                {/* STORE PAYMENT */}
                <label className={`border-2 rounded-2xl p-3 cursor-pointer flex items-start gap-3 transition ${
                  paymentMethod === 'STORE_PAYMENT' ? 'border-[#0071ba] bg-blue-50/60' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'STORE_PAYMENT'}
                    onChange={() => setPaymentMethod('STORE_PAYMENT')}
                    className="mt-1 text-[#0071ba]"
                  />
                  <div>
                    <p className="font-bold text-slate-900">Thanh toán tại Trụ sở TECNIC</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Tầng 2, Tòa New Skyline, KĐT Văn Quán, Hà Đông, Hà Nội.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* 3. TÙY CHỌN XUẤT HÓA ĐƠN VAT ĐIỆN TỬ */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needsInvoice}
                  onChange={(e) => setNeedsInvoice(e.target.checked)}
                  className="rounded text-[#0071ba]"
                />
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#0071ba]" />
                  Yêu cầu xuất hóa đơn đỏ VAT điện tử (cho Phòng khám / Công ty)
                </span>
              </label>

              {needsInvoice && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs border-t border-slate-200">
                  <input
                    required={needsInvoice}
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Tên công ty / Phòng khám *"
                    className="w-full border p-2 rounded-lg bg-white outline-none"
                  />
                  <input
                    required={needsInvoice}
                    type="text"
                    value={companyTaxCode}
                    onChange={(e) => setCompanyTaxCode(e.target.value)}
                    placeholder="Mã số thuế (MST) *"
                    className="w-full border p-2 rounded-lg bg-white outline-none"
                  />
                  <input
                    type="text"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    placeholder="Địa chỉ đăng ký kinh doanh"
                    className="sm:col-span-2 w-full border p-2 rounded-lg bg-white outline-none"
                  />
                </div>
              )}
            </div>

            {/* TOTAL & SUBMIT BUTTON */}
            <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-xs text-slate-500">Tổng thanh toán (Đã gồm VAT & vận chuyển):</p>
                <p className="text-xl font-black text-red-600">{finalTotal.toLocaleString('vi-VN')} đ</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm rounded-full transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Đang xử lý đơn hàng...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    XÁC NHẬN ĐẶT HÀNG NGAY
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
