import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, ShieldCheck, QrCode, Copy, 
  CreditCard, Banknote, Building2, MapPin, Truck, FileText, Check,
  Phone, Navigation, Clock, RefreshCw, ShoppingBag
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
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [shippingAddress, setShippingAddress] = useState(currentUser?.address || '');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('COD');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [needsInvoice, setNeedsInvoice] = useState(false);
  const [companyName, setCompanyName] = useState(currentUser?.clinicName || '');
  const [companyTaxCode, setCompanyTaxCode] = useState(currentUser?.taxCode || '');
  const [companyAddress, setCompanyAddress] = useState('');
  const [invoiceEmail, setInvoiceEmail] = useState(currentUser?.email || '');
  const [invoiceNotes, setInvoiceNotes] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [paymentSuccessNotified, setPaymentSuccessNotified] = useState(false);

  // Sync user info when available
  useEffect(() => {
    if (currentUser) {
      if (!customerName) setCustomerName(currentUser.fullName || '');
      if (!customerPhone) setCustomerPhone(currentUser.phone || '');
      if (!customerEmail) setCustomerEmail(currentUser.email || '');
      if (!shippingAddress) setShippingAddress(currentUser.address || '');
      if (!companyName) setCompanyName(currentUser.clinicName || '');
      if (!companyTaxCode) setCompanyTaxCode(currentUser.taxCode || '');
    }
  }, [currentUser]);

  // Handle Verify Payment (PayOS / VietQR Instant Check)
  const handleVerifyPayment = async () => {
    if (!completedOrder) return;
    setIsVerifyingPayment(true);
    try {
      const res = await fetch(`/api/orders/${completedOrder.id}/verify-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success && data.data) {
        setCompletedOrder(data.data);
        setPaymentSuccessNotified(true);
        try {
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.5 }
          });
        } catch {}
      } else {
        alert("Hệ thống đang kiểm tra giao dịch với ngân hàng, vui lòng thử lại sau vài giây!");
      }
    } catch {
      alert("Đã gửi yêu cầu kiểm tra tới hệ thống PayOS / Ngân hàng.");
    } finally {
      setIsVerifyingPayment(false);
    }
  };

  // Reset completed order state if modal reopens with new cart items
  useEffect(() => {
    if (isOpen && items.length > 0 && completedOrder) {
      // Keep completedOrder if user just ordered, but reset when they start fresh
    }
  }, [isOpen, items]);

  if (!isOpen) return null;

  let totalMarketPrice = 0;
  let totalTecnicPrice = 0;

  items.forEach(item => {
    totalMarketPrice += item.product.marketPrice * item.quantity;
    totalTecnicPrice += item.product.tecnicPrice * item.quantity;
  });

  const totalSaved = totalMarketPrice - totalTecnicPrice;
  const hasBulkyItems = items.some(item => item.product.isBulky);
  const shippingFee = hasBulkyItems ? 150000 : 0;
  const finalTotal = totalTecnicPrice + shippingFee;

  const handleCopy = (text: string, field: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleStartNewOrder = () => {
    setCompletedOrder(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("Giỏ hàng của bạn đang trống. Vui lòng chọn sản phẩm trước khi đặt hàng.");
      return;
    }

    // Validate phone number
    const cleanPhone = customerPhone.replace(/[^0-9]/g, '');
    if (!/^0[35789][0-9]{8}$/.test(cleanPhone)) {
      alert("Số điện thoại không hợp lệ! Vui lòng nhập số di động (10 số, bắt đầu bằng 03, 05, 07, 08, 09) để nhân viên giao hàng liên hệ.");
      return;
    }

    let finalAddress = shippingAddress;
    if (paymentMethod === 'STORE_PAYMENT') {
      if (!appointmentDate || !appointmentTime) {
        alert("Vui lòng chọn ngày và giờ hẹn để chúng tôi chuẩn bị đón tiếp tốt nhất.");
        return;
      }
      finalAddress = `Hẹn thanh toán và nhận hàng tại trụ sở: Ngày ${appointmentDate}, lúc ${appointmentTime}`;
    } else {
      if (!shippingAddress.trim()) {
        alert("Vui lòng nhập địa chỉ giao nhận hàng chi tiết.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customerName,
        customerPhone: cleanPhone,
        customerEmail: customerEmail || `${cleanPhone}@ytetecnic.vn`,
        shippingAddress: finalAddress,
        paymentMethod,
        needsInvoice,
        invoiceInfo: needsInvoice ? {
          companyName,
          taxCode: companyTaxCode,
          companyAddress,
          invoiceEmail: invoiceEmail || customerEmail,
          invoiceNotes: invoiceNotes || ''
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
        <div className="bg-[#143472] text-white px-6 py-4 flex justify-between items-center shrink-0 border-b-2 border-amber-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-black text-sm sm:text-base uppercase tracking-wide">
              {completedOrder ? 'XÁC NHẬN ĐẶT HÀNG THÀNH CÔNG' : 'ĐẶT HÀNG & GIAO NHẬN THIẾT BỊ Y TẾ'}
            </h3>
          </div>

          <button
            onClick={handleStartNewOrder}
            className="p-1 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ORDER SUCCESS SCREEN WITH MAP & LOCATION (Ảnh 17 - 21) */}
        {completedOrder ? (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-center">
            
            {/* Status Icon */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-inner ${
              completedOrder.paymentStatus === 'PAID' || completedOrder.paymentMethod !== 'BANK_TRANSFER'
                ? 'bg-emerald-100 text-emerald-600'
                : 'bg-amber-100 text-amber-600'
            }`}>
              {completedOrder.paymentStatus === 'PAID' || completedOrder.paymentMethod !== 'BANK_TRANSFER' ? (
                <CheckCircle2 className="w-10 h-10" />
              ) : (
                <QrCode className="w-9 h-9 animate-pulse" />
              )}
            </div>

            <div className="space-y-1">
              <span className="inline-block text-xs bg-emerald-50 text-emerald-800 font-black px-4 py-1 rounded-full border border-emerald-300 shadow-2xs">
                MÃ ĐƠN HÀNG: <b className="text-[#143472] font-mono">{completedOrder.orderCode}</b>
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-2">
                {completedOrder.paymentStatus === 'PAID' || completedOrder.paymentMethod !== 'BANK_TRANSFER'
                  ? 'ĐẶT HÀNG THÀNH CÔNG!'
                  : 'ĐANG CHỜ THANH TOÁN QUA VIETQR / PAYOS'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {completedOrder.paymentStatus === 'PAID' || completedOrder.paymentMethod !== 'BANK_TRANSFER' ? (
                  <>
                    Kính gửi Quý khách, đơn hàng đã được tiếp nhận thành công vào hệ thống <b>TECNIC MEDTECH</b>. Đội ngũ Chăm sóc khách hàng sẽ chủ động liên hệ qua số điện thoại <b className="text-[#143472]">{completedOrder.customerPhone}</b> để xác nhận chi tiết đơn hàng và hỗ trợ Quý khách trong thời gian sớm nhất.
                  </>
                ) : (
                  <>
                    Quý khách vui lòng quét mã VietQR hoặc chuyển khoản bên dưới. Đơn hàng sẽ <b>tự động chuyển sang trạng thái Đặt Hàng Thành Công</b> ngay khi hệ thống ngân hàng ghi nhận.
                  </>
                )}
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
                      src={`https://img.vietqr.io/image/mb-787216666-compact2.png?amount=${completedOrder.finalTotal}&addInfo=${encodeURIComponent(completedOrder.orderCode)}&accountName=CONG%20TY%20CP%20CN%20VA%20DV%20Y%20TE%20TECNIC`}
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
                        <b className="text-slate-800">MB Bank (Quân Đội)</b>
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
                        <b className="text-red-600 text-sm whitespace-nowrap">{completedOrder.finalTotal.toLocaleString('vi-VN')} đ</b>
                      </div>
                    </div>
                  </div>
                </div>

                {/* REAL-TIME PAYMENT STATUS (PayOS / VietQR Instant Check) */}
                <div className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
                  completedOrder.paymentStatus === 'PAID' 
                    ? 'bg-emerald-100/90 border-emerald-300 text-emerald-900' 
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}>
                  <div className="flex items-center gap-2.5">
                    {completedOrder.paymentStatus === 'PAID' ? (
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs animate-pulse">
                        <RefreshCw className={`w-4 h-4 ${isVerifyingPayment ? 'animate-spin' : ''}`} />
                      </div>
                    )}
                    <div>
                      <p className="font-black text-xs sm:text-sm">
                        {completedOrder.paymentStatus === 'PAID' 
                          ? '🎉 ĐÃ XÁC NHẬN THANH TOÁN THÀNH CÔNG!' 
                          : 'Đang chờ chuyển khoản qua VietQR / PayOS'}
                      </p>
                      <p className="text-[11px] opacity-85">
                        {completedOrder.paymentStatus === 'PAID'
                          ? 'Hệ thống đã nhận được tiền và đang đóng gói sản phẩm gửi đến Quý khách.'
                          : 'Sau khi quét mã thanh toán, quý khách bấm nút bên cạnh để kiểm tra ngay.'}
                      </p>
                    </div>
                  </div>

                  {completedOrder.paymentStatus !== 'PAID' && (
                    <button
                      type="button"
                      onClick={handleVerifyPayment}
                      disabled={isVerifyingPayment}
                      className="bg-[#0071ba] hover:bg-blue-800 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isVerifyingPayment ? 'Đang kiểm tra...' : 'Tôi đã chuyển khoản'}
                    </button>
                  )}
                </div>

                <p className="text-[11px] text-red-600 italic bg-white/80 p-2.5 rounded-lg border border-red-200">
                  Lưu ý: TECNIC Medtech chỉ sử dụng duy nhất tài khoản doanh nghiệp đứng tên CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ HỖ TRỢ Y TẾ TECNIC.
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
                <span>Phương thức thanh toán:</span>
                <b>{completedOrder.paymentMethod === 'COD' ? 'Kiểm tra hàng và thanh toán trực tiếp cho người vận chuyển (COD)' : 'Chuyển khoản VietQR MB Bank'}</b>
              </div>
                            {/* Bổ sung hiển thị danh sách sản phẩm đã mua để khách hàng xem lại thông tin (Yêu cầu người dùng) */}
              <div className="pt-2 border-t">
                <b className="text-slate-700 block mb-2">Sản phẩm đã đặt:</b>
                <div className="space-y-3">
                  {completedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="w-16 h-16 bg-slate-50 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                        <img src={item.productImage || '/placeholder.png'} alt={item.productName} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-slate-800 line-clamp-2">{item.productName}</h5>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-slate-500">Số lượng: <b>{item.quantity}</b></span>
                          <b className="text-red-600">{item.price.toLocaleString('vi-VN')} đ</b>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between text-slate-900 font-black text-sm pt-3 border-t">
                <span>Tổng tiền cần thanh toán:</span>
                <span className="text-red-600 text-base whitespace-nowrap">{completedOrder.finalTotal.toLocaleString('vi-VN')} đ</span>
              </div>
              <p className="text-[10px] text-amber-700 italic mt-2 leading-snug">
                * Lưu ý: Đối với các sản phẩm nặng như giường hay sản phẩm nặng sẽ rơi vào hàng cồng kềnh và phát sinh phụ phí tùy từng mặt hàng.
              </p>
            </div>

            {/* BẢN ĐỒ VỊ TRÍ & THÔNG TIN ĐỊA CHỈ TRỤ SỞ LIÊN HỆ KHI ĐẾN (Ảnh 17 - 21) */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 p-5 rounded-2xl border border-blue-200 text-left space-y-3 max-w-lg mx-auto">
              <div className="flex items-center gap-2 text-xs font-black text-[#143472]">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>THÔNG TIN TRỤ SỞ & TRUNG TÂM BẢO HÀNH TECNIC MEDTECH:</span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700">
                <p className="font-bold text-slate-900">
                  {COMPANY_INFO.name}
                </p>
                <p className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span><b>Địa chỉ:</b> {COMPANY_INFO.address}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span><b>Hotline liên hệ khi đến:</b> <a href="tel:0348402466" className="text-[#0071ba] font-bold underline">034 84 02466</a> - <a href="tel:0389880369" className="text-[#0071ba] font-bold underline">038 988 0369</a></span>
                </p>
                <div className="flex items-start gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col text-xs space-y-0.5 text-slate-700">
                    <span><b>Thời gian làm việc:</b></span>
                    <span>• Thứ 2 – Thứ 6: sáng 08:00 – 12:00, chiều 14h30 – 17h30</span>
                    <span>• Thứ 7 – Chủ nhật: Nghỉ (Hotline hỗ trợ 24/7)</span>
                  </div>
                </div>
              </div>

              {/* Map Direction Link */}
              <div className="pt-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-white hover:bg-blue-50 border border-blue-300 rounded-xl text-xs font-bold text-[#0071ba] flex items-center justify-center gap-1.5 transition shadow-2xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-red-600" />
                  <span>Chỉ đường trên Google Maps đến TECNIC MEDTECH</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleStartNewOrder}
                className="w-full sm:w-auto bg-[#0071ba] hover:bg-blue-800 text-white font-bold text-xs px-8 py-3 rounded-full transition shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Tiếp tục mua sắm
              </button>
            </div>

          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
            
            {/* 1. THÔNG TIN KHÁCH HÀNG & GIAO HÀNG */}
            <div className="space-y-3">
              <h4 className="font-black text-xs sm:text-sm text-[#143472] uppercase flex items-center gap-2 border-b pb-2">
                <Truck className="w-4 h-4 text-[#0071ba]" />
                1. Thông tin người nhận hàng
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Họ và tên người nhận *</label>
                  <input
                    required
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder=""
                    className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:border-[#0071ba]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Số điện thoại di động (10 số) *</label>
                  <input
                    required
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder=""
                    className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:border-[#0071ba]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Gmail / Email nhận thông báo đơn hàng:</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder=""
                    className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:border-[#0071ba]"
                  />
                </div>

                {paymentMethod !== 'STORE_PAYMENT' ? (
                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Địa chỉ giao nhận hàng chi tiết *</label>
                    <textarea
                      required
                      rows={2}
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder=""
                      className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:border-[#0071ba]"
                    />
                  </div>
                ) : (
                  <div className="sm:col-span-2 grid grid-cols-2 gap-4 bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <div className="col-span-2">
                      <label className="font-bold text-amber-800 block mb-1 text-sm">Quý khách vui lòng chọn thời gian hẹn đến văn phòng:</label>
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1 text-xs">Ngày hẹn *</label>
                      <input
                        type="date"
                        required
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:border-[#0071ba]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1 text-xs">Giờ đến (dự kiến) *</label>
                      <input
                        type="time"
                        required
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        className="w-full border border-slate-300 p-2.5 rounded-xl outline-none focus:border-[#0071ba]"
                      />
                    </div>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Ghi chú đơn hàng (nếu có):</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder=""
                    className="w-full border border-slate-300 p-2 rounded-xl outline-none focus:border-[#0071ba]"
                  />
                </div>
              </div>
            </div>

            {/* 2. PHƯƠNG THỨC THANH TOÁN (Khớp yêu cầu ảnh 15) */}
            <div className="space-y-3">
              <h4 className="font-black text-xs sm:text-sm text-[#143472] uppercase flex items-center gap-2 border-b pb-2">
                <Banknote className="w-4 h-4 text-emerald-600" />
                2. Hình thức thanh toán
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                {/* COD - Đổi thành "Kiểm tra hàng và thanh toán trực tiếp cho người vận chuyển" (Ảnh 15) */}
                <label className={`border-2 rounded-2xl p-3.5 cursor-pointer flex items-start gap-3 transition ${
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
                    <p className="font-bold text-slate-900">Kiểm tra hàng và thanh toán trực tiếp cho người vận chuyển</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      Kiểm tra hàng và thanh toán trực tiếp cho người vận chuyển khi nhận hàng (đồng kiểm thiết bị nguyên seal).
                    </p>
                  </div>
                </label>

                {/* BANK TRANSFER (VIETQR MB Bank) */}
                <label className={`border-2 rounded-2xl p-3.5 cursor-pointer flex items-start gap-3 transition ${
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
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      Quét mã QR tự động qua app ngân hàng (MB Bank 787216666). Xác nhận đơn tức thì.
                    </p>
                  </div>
                </label>

                {/* STORE PAYMENT */}
                <label className={`border-2 rounded-2xl p-3.5 cursor-pointer flex items-start gap-3 transition sm:col-span-2 ${
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
                    <p className="font-bold text-slate-900">Thanh toán tại Trụ sở TECNIC MEDTECH</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Tầng 2, Tòa New Skyline, KĐT Văn Quán, Hà Đông, Hà Nội.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* 3. TÙY CHỌN XUẤT HÓA ĐƠN VAT ĐIỆN TỬ (Tham khảo form Vbee - Ảnh 14) */}
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
                  Yêu cầu xuất hóa đơn đỏ VAT điện tử (cho Doanh nghiệp / Phòng khám / Bệnh viện)
                </span>
              </label>

              {needsInvoice && (
                <div className="space-y-3 pt-2 text-xs border-t border-slate-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Tên công ty / Doanh nghiệp / Đơn vị *</label>
                      <input
                        required={needsInvoice}
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder=""
                        className="w-full border p-2.5 rounded-xl bg-white outline-none focus:border-[#0071ba]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Mã số thuế (MST) *</label>
                      <input
                        required={needsInvoice}
                        type="text"
                        value={companyTaxCode}
                        onChange={(e) => setCompanyTaxCode(e.target.value)}
                        placeholder=""
                        className="w-full border p-2.5 rounded-xl bg-white outline-none focus:border-[#0071ba]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-bold text-slate-700 block mb-1">Địa chỉ đăng ký kinh doanh theo GPKD *</label>
                      <input
                        required={needsInvoice}
                        type="text"
                        value={companyAddress}
                        onChange={(e) => setCompanyAddress(e.target.value)}
                        placeholder=""
                        className="w-full border p-2.5 rounded-xl bg-white outline-none focus:border-[#0071ba]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-bold text-slate-700 block mb-1">Email nhận hóa đơn điện tử (nhận file .xml & .pdf) *</label>
                      <input
                        required={needsInvoice}
                        type="email"
                        value={invoiceEmail}
                        onChange={(e) => setInvoiceEmail(e.target.value)}
                        placeholder=""
                        className="w-full border p-2.5 rounded-xl bg-white outline-none focus:border-[#0071ba]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-bold text-slate-700 block mb-1">Ghi chú bổ sung cho bộ phận kế toán (nếu có):</label>
                      <textarea
                        rows={2}
                        value={invoiceNotes}
                        onChange={(e) => setInvoiceNotes(e.target.value)}
                        placeholder=""
                        className="w-full border p-2.5 rounded-xl bg-white outline-none focus:border-[#0071ba]"
                      />
                    </div>
                  </div>

                  {/* Chú thích hướng dẫn VAT (Ảnh 14 - Chuẩn Vbee) */}
                  <div className="bg-blue-50/80 p-3.5 rounded-xl border border-blue-200 text-slate-700 text-[11px] leading-relaxed space-y-1">
                    <p className="font-bold text-blue-900 flex items-center gap-1.5">
                      <span>💡</span>
                      <span>Chú thích & Quy định phát hành Hóa đơn điện tử VAT:</span>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      <li>Hóa đơn điện tử hợp pháp theo <b>Nghị định 123/2020/NĐ-CP</b> và <b>Thông tư 78/2021/TT-BTC</b> sẽ được gửi tự động qua email kế toán sau khi đơn hàng được giao thành công.</li>
                      <li>Quý khách vui lòng kiểm tra chính xác Tên đơn vị và Mã số thuế (MST) để đảm bảo tính hợp lệ trong kê khai thuế doanh nghiệp.</li>
                      <li>Trường hợp cần hỗ trợ hóa đơn đỏ khẩn cấp hoặc hợp đồng mua bán thiết bị, xin vui lòng liên hệ trực tiếp hotline: <b>034 84 02466</b>.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* TOTAL & SUBMIT BUTTON */}
            <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-xs text-slate-500">Tổng thanh toán (Đã gồm VAT & vận chuyển):</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-black text-red-600 whitespace-nowrap">{finalTotal.toLocaleString('vi-VN')} đ</p>
                  {shippingFee > 0 && (
                    <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
                      +150K Phụ phí hàng cồng kềnh
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm rounded-full transition shadow-lg flex flex-col items-center justify-center disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Đang xử lý đơn hàng...</span>
                ) : (
                  <>
                    <span className="text-sm uppercase tracking-wide">XÁC NHẬN ĐẶT HÀNG</span>
                    <span className="text-[10px] font-normal text-red-100">Gọi điện xác nhận và giao hàng tận nơi</span>
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
