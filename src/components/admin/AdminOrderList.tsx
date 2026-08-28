import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Download, Eye, Trash2, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Order } from '../../types';

interface AdminOrderListProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: string, payment?: string) => void;
  onDeleteOrder: (orderId: string) => void;
  onViewOrderDetails: (order: Order) => void;
}

export const AdminOrderList: React.FC<AdminOrderListProps> = ({
  orders,
  onUpdateOrderStatus,
  onDeleteOrder,
  onViewOrderDetails
}) => {
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredOrders = useMemo(() => {
    let list = [...orders];

    if (keyword.trim()) {
      const q = keyword.toLowerCase().trim();
      list = list.filter(o => 
        (o.orderCode && o.orderCode.toLowerCase().includes(q)) ||
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q) ||
        o.shippingAddress.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'ALL') {
      list = list.filter(o => o.orderStatus === statusFilter);
    }

    if (sortOrder === 'oldest') {
      list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortOrder === 'total-desc') {
      list.sort((a, b) => b.finalTotal - a.finalTotal);
    } else if (sortOrder === 'total-asc') {
      list.sort((a, b) => a.finalTotal - b.finalTotal);
    } else {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return list;
  }, [orders, keyword, statusFilter, sortOrder]);

  const handleExportExcel = () => {
    if (filteredOrders.length === 0) {
      alert("Không có đơn hàng nào để xuất!");
      return;
    }

    const headers = ["STT", "Mã đơn hàng", "Người đặt hàng", "Số điện thoại", "Địa chỉ giao hàng", "Sản phẩm", "Tổng tiền (VNĐ)", "Trạng thái đơn", "Thanh toán", "Thời gian đặt"];
    const rows = filteredOrders.map((o, idx) => {
      const prodSummary = o.items.map(i => `${i.productName} (x${i.quantity})`).join("; ");
      return [
        idx + 1,
        `"${o.orderCode || o.id}"`,
        `"${o.customerName}"`,
        `"${o.customerPhone}"`,
        `"${o.shippingAddress.replace(/"/g, '""')}"`,
        `"${prodSummary.replace(/"/g, '""')}"`,
        o.finalTotal,
        `"${o.orderStatus}"`,
        `"${o.paymentStatus === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán'}"`,
        `"${new Date(o.createdAt).toLocaleString('vi-VN')}"`
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Don_Hang_TECNIC_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return <span className="bg-[#17a2b8] text-white px-2.5 py-1 rounded text-[11px] font-bold">Đã giao hàng</span>;
      case 'SHIPPING':
        return <span className="bg-[#28a745] text-white px-2.5 py-1 rounded text-[11px] font-bold">Đang vận chuyển</span>;
      case 'PACKING':
        return <span className="bg-[#ffc107] text-slate-900 px-2.5 py-1 rounded text-[11px] font-bold">Đang đóng gói</span>;
      case 'CANCELLED':
        return <span className="bg-[#dc3545] text-white px-2.5 py-1 rounded text-[11px] font-bold">Đã hủy</span>;
      default:
        return <span className="bg-[#17a2b8] text-white px-2.5 py-1 rounded text-[11px] font-bold">Đã tiếp nhận</span>;
    }
  };

  return (
    <div className="space-y-4 font-sans text-slate-800">
      
      {/* Title & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Danh sách đơn hàng</h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="hover:text-blue-600 cursor-pointer">Đơn hàng</span>
          <span>/</span>
          <span className="font-semibold text-slate-700">Danh sách đơn hàng</span>
        </div>
      </div>

      {/* Filter Box (Thanh tìm kiếm chuẩn hình 7) */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2.5 items-center">
          
          <div className="md:col-span-2">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Từ khóa"
              className="w-full border border-slate-300 px-3 py-1.5 text-xs rounded outline-none focus:border-[#17a2b8]"
            />
          </div>

          <div>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full border border-slate-300 px-2 py-1.5 text-xs rounded outline-none bg-white text-slate-700"
            >
              <option value="newest">Sắp xếp theo: Mới nhất</option>
              <option value="oldest">Sắp xếp theo: Cũ nhất</option>
              <option value="total-desc">Tổng tiền: Cao đến thấp</option>
              <option value="total-asc">Tổng tiền: Thấp đến cao</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-slate-300 px-2 py-1.5 text-xs rounded outline-none bg-white text-slate-700"
            >
              <option value="ALL">Tình trạng đơn (Tất cả)</option>
              <option value="PENDING">Chờ xử lý</option>
              <option value="PACKING">Đang đóng gói</option>
              <option value="SHIPPING">Đang vận chuyển</option>
              <option value="DELIVERED">Đã giao hàng</option>
              <option value="CANCELLED">Đã hủy</option>
            </select>
          </div>

          <div className="flex gap-1.5 md:col-span-2">
            <button 
              onClick={() => {}}
              className="flex-1 bg-[#28a745] hover:bg-[#218838] text-white text-xs font-bold py-1.5 px-2 rounded transition flex items-center justify-center gap-1"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Tìm kiếm</span>
            </button>
            <button 
              onClick={() => {
                setKeyword('');
                setStatusFilter('ALL');
                setSortOrder('newest');
              }}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white text-xs font-bold py-1.5 px-3 rounded transition flex items-center justify-center"
              title="Làm lại"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={handleExportExcel}
              className="bg-[#28a745] hover:bg-[#218838] text-white text-xs font-bold py-1.5 px-2.5 rounded transition flex items-center justify-center gap-1"
              title="Xuất Excel"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Excel</span>
            </button>
          </div>

        </div>
      </div>

      {/* Record Counter */}
      <div className="flex justify-end text-xs font-bold text-slate-700">
        <span>Tổng số bản ghi {filteredOrders.length} / {orders.length}</span>
      </div>

      {/* Orders Table (Chuẩn cấu trúc hình 7) */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-2.5 px-3 w-10 text-center">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="py-2.5 px-2 w-10 text-center">Stt</th>
              <th className="py-2.5 px-4 min-w-[280px]">Thông tin người đặt hàng</th>
              <th className="py-2.5 px-3 w-28 text-right">Tổng tiền</th>
              <th className="py-2.5 px-3 w-28 text-center">Trạng thái</th>
              <th className="py-2.5 px-3 w-28 text-center">Thanh toán</th>
              <th className="py-2.5 px-3 w-32 text-center">Thời gian</th>
              <th className="py-2.5 px-3 w-24 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredOrders.map((o, idx) => (
              <tr key={o.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3 px-3 text-center">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(o.id)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedIds([...selectedIds, o.id]);
                      else setSelectedIds(selectedIds.filter(id => id !== o.id));
                    }}
                    className="rounded" 
                  />
                </td>
                <td className="py-3 px-2 text-center text-slate-500">{idx + 1}</td>
                
                {/* Thông tin người đặt hàng (MGD, Tên, SĐT, Địa chỉ) */}
                <td className="py-3 px-4 space-y-1">
                  <div className="font-bold text-slate-800">
                    MGD: <span className="text-[#0071ba] font-mono">{o.orderCode || o.id}</span>
                  </div>
                  <div className="text-slate-700 font-semibold">
                    Tên: {o.customerName}
                  </div>
                  <div className="text-slate-600">
                    Số điện thoại: <span className="font-mono text-slate-800">{o.customerPhone}</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    Địa chỉ: {o.shippingAddress}
                  </div>
                </td>

                {/* Tổng tiền */}
                <td className="py-3 px-3 text-right font-bold text-red-600">
                  {o.finalTotal.toLocaleString('vi-VN')} đ
                </td>

                {/* Trạng thái đơn */}
                <td className="py-3 px-3 text-center">
                  {getStatusBadge(o.orderStatus)}
                </td>

                {/* Trạng thái thanh toán */}
                <td className="py-3 px-3 text-center">
                  <span className={`px-2.5 py-1 rounded text-[11px] font-bold text-white ${
                    o.paymentStatus === 'PAID' ? 'bg-[#28a745]' : 'bg-[#dc3545]'
                  }`}>
                    {o.paymentStatus === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                  </span>
                </td>

                {/* Thời gian */}
                <td className="py-3 px-3 text-center text-[11px] text-slate-600 font-mono">
                  {new Date(o.createdAt).toLocaleString('vi-VN')}
                </td>

                {/* Hành động */}
                <td className="py-3 px-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button 
                      onClick={() => onViewOrderDetails(o)}
                      className="bg-[#17a2b8] hover:bg-[#138496] text-white p-1.5 rounded" 
                      title="Xem chi tiết đơn hàng"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => onDeleteOrder(o.id)}
                      className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1.5 rounded" 
                      title="Xóa đơn hàng"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
