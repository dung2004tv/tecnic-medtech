import React, { useState } from 'react';
import { Star, Trash2, CheckCircle, MessageSquare } from 'lucide-react';

interface ReviewItem {
  id: string;
  name: string;
  phone: string;
  content: string;
  productName: string;
  productUrl?: string;
  rating: number;
  reviewer: string;
  isApproved: boolean;
  createdAt: string;
}

export const AdminProductReviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: '1',
      name: 'Nguyễn Văn Hưng',
      phone: '0987654321',
      content: 'Sản phẩm giường y tế dùng rất tốt, nâng hạ êm ái nhẹ nhàng, người nhà tôi nằm dưỡng bệnh rất thoải mái và tiện chăm sóc.',
      productName: 'Giường y tế 4 tay quay đa chức năng TECNIC OSADA',
      rating: 5,
      reviewer: 'Khách hàng',
      isApproved: true,
      createdAt: '2026-03-20 14:32'
    },
    {
      id: '2',
      name: 'BS. Lê Minh',
      phone: '0912345678',
      content: 'Máy đo huyết áp Omron bắp tay đo rất chuẩn xác, màn hình lớn có đèn nền rõ ràng, người cao tuổi tự đo tại nhà rất thuận tiện.',
      productName: 'Máy đo huyết áp điện tử bắp tay OMRON HEM-7156',
      rating: 5,
      reviewer: 'Bác sĩ / Chuyên gia',
      isApproved: true,
      createdAt: '2026-03-18 09:15'
    },
    {
      id: '3',
      name: 'Chị Mai Lan',
      phone: '0945678901',
      content: 'Đệm chống loét tự động đảo múi khí OSADA chạy êm ru không nghe tiếng động, da bệnh nhân luôn khô thoáng, không bị đỏ rát.',
      productName: 'Đệm hơi chống loét tự động đảo khí OSADA SD-AM05',
      rating: 5,
      reviewer: 'Khách hàng',
      isApproved: false,
      createdAt: '2026-03-15 16:40'
    },
    {
      id: '4',
      name: 'Trần Đình Trọng',
      phone: '0978112233',
      content: 'Găng tay robot tập phục hồi chức năng tay tai biến rất hiệu quả, khớp ngón tay linh hoạt hơn sau 2 tuần kiên trì tập luyện.',
      productName: 'Găng tay Robot phục hồi chức năng Oromi 962',
      rating: 5,
      reviewer: 'Người bệnh',
      isApproved: true,
      createdAt: '2026-03-10 11:20'
    }
  ]);

  const handleToggleApprove = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, isApproved: !r.isApproved } : r));
  };

  const handleDeleteReview = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đánh giá này?")) {
      setReviews(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="space-y-4 font-sans text-slate-800">
      
      {/* Title & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Danh sách đánh giá</h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="hover:text-blue-600 cursor-pointer">Sản phẩm</span>
          <span>/</span>
          <span className="font-semibold text-slate-700">Danh sách đánh giá</span>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-2.5 px-3 w-12 text-center">STT</th>
              <th className="py-2.5 px-4 min-w-[320px]">Tên</th>
              <th className="py-2.5 px-3 w-20 text-center">Số sao</th>
              <th className="py-2.5 px-3 w-32 text-center">Người đánh giá</th>
              <th className="py-2.5 px-3 w-24 text-center">Duyệt</th>
              <th className="py-2.5 px-3 w-20 text-center">Tác vụ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {reviews.map((r, idx) => (
              <tr key={r.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3 px-3 text-center text-slate-500">{idx + 1}</td>
                
                {/* Thông tin đánh giá đa dòng chuẩn hình 3 */}
                <td className="py-3 px-4 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <span>{r.name}</span>
                    <span className="text-slate-400 font-normal text-[11px]">- {r.phone}</span>
                  </div>
                  <div className="text-slate-600 italic bg-slate-50 p-2 rounded border border-slate-100 text-[11px]">
                    "{r.content}"
                  </div>
                  <div className="text-[11px] text-[#0071ba] font-semibold flex items-center gap-1">
                    <span className="text-slate-500 font-normal">Sản phẩm:</span>
                    <span className="hover:underline cursor-pointer">{r.productName}</span>
                  </div>
                </td>

                {/* Số sao */}
                <td className="py-3 px-3 text-center font-bold text-amber-500">
                  <div className="flex items-center justify-center gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </td>

                {/* Người đánh giá */}
                <td className="py-3 px-3 text-center text-slate-600">
                  {r.reviewer}
                </td>

                {/* Nút Duyệt */}
                <td className="py-3 px-3 text-center">
                  <button
                    onClick={() => handleToggleApprove(r.id)}
                    className={`px-3 py-1 rounded text-xs font-bold transition shadow-xs ${
                      r.isApproved 
                        ? 'bg-[#28a745] hover:bg-[#218838] text-white' 
                        : 'bg-[#ffc107] hover:bg-[#e0a800] text-slate-900'
                    }`}
                  >
                    {r.isApproved ? 'Đã duyệt' : 'Duyệt'}
                  </button>
                </td>

                {/* Tác vụ */}
                <td className="py-3 px-3 text-center">
                  <button 
                    onClick={() => handleDeleteReview(r.id)}
                    className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1.5 rounded transition"
                    title="Xóa đánh giá"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
