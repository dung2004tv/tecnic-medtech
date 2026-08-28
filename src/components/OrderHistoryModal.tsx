import React, { useState, useEffect } from 'react';
import { FileText, Search, Package, Clock, CheckCircle, Truck, X, Phone, AlertCircle } from 'lucide-react';
import { Order, User } from '../types';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  currentUser
}) => {
  const [searchPhone, setSearchPhone] = useState(currentUser?.phone || '');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (currentUser?.phone) {
      setSearchPhone(currentUser.phone);
      fetchOrders(currentUser.phone);
    }
  }, [currentUser, isOpen]);

  const fetchOrders = async (phoneToQuery: string) => {
    if (!phoneToQuery.trim()) return;
    setIsLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(`/api/orders?phone=${encodeURIComponent(phoneToQuery.trim())}`);
      const data = await res.json();
      if (data.success) {
        setOrders(data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(searchPhone);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER */}
        <div className="bg-[#143472] text-white px-6 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="font-black text-sm sm:text-base uppercase">
              TRA CỨU TIẾN ĐỘ ĐƠN HÀNG TECNIC
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SEARCH FORM */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 shrink-0">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="tel"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                placeholder="Nhập số điện thoại đã đặt hàng (Ví dụ: 0348402466)..."
                className="w-full bg-white border border-slate-300 pl-9 pr-3 py-2.5 rounded-xl text-xs outline-none focus:border-[#0071ba]"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 bg-[#0071ba] hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              Tra cứu
            </button>
          </form>
        </div>

        {/* ORDERS LIST */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {isLoading ? (
            <div className="py-12 text-center text-xs text-slate-500">Đang tìm kiếm đơn hàng...</div>
          ) : orders.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-700 text-xs">
                {hasSearched ? 'Không tìm thấy đơn hàng nào với số điện thoại này' : 'Nhập số điện thoại để tra cứu lịch sử mua thiết bị'}
              </p>
              <p className="text-[11px] text-slate-400">Bạn cũng có thể gọi Hotline <b>034 84 02466</b> để được chuyên viên hỗ trợ tra cứu.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
                  
                  {/* Top order info */}
                  <div className="flex flex-wrap justify-between items-center gap-2 border-b pb-2.5 text-xs">
                    <div>
                      <span className="font-black text-[#143472]">{order.orderCode}</span>
                      <span className="text-slate-400 text-[11px] block">{new Date(order.createdAt).toLocaleString('vi-VN')}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-blue-100 text-[#0071ba] font-bold px-2.5 py-1 rounded-full">
                        {order.paymentMethod === 'COD' ? 'Thanh toán COD' : 'Chuyển khoản VietQR MB Bank'}
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Đang chuẩn bị hàng
                      </span>
                    </div>
                  </div>

                  {/* Items in order */}
                  <div className="divide-y divide-slate-100 text-xs">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-2 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <img src={item.productImage} alt={item.productName} className="w-8 h-8 object-contain rounded border p-0.5" />
                          <div>
                            <p className="font-bold text-slate-800 line-clamp-1">{item.productName}</p>
                            <span className="text-[11px] text-slate-400">SL: {item.quantity} x {item.price.toLocaleString('vi-VN')} đ</span>
                          </div>
                        </div>
                        <span className="font-bold text-slate-800">{(item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="pt-2 border-t flex justify-between items-center text-xs">
                    <div className="text-[11px] text-slate-500">
                      <span>Người nhận: <b>{order.customerName}</b> ({order.customerPhone})</span>
                      <p className="line-clamp-1 text-slate-400">Giao đến: {order.shippingAddress}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Tổng thanh toán:</span>
                      <span className="font-black text-sm text-red-600">{order.finalTotal.toLocaleString('vi-VN')} đ</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
