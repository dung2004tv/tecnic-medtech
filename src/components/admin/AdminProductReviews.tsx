import React, { useState } from 'react';
import { Star, Trash2, Plus, Edit, X, Save, Check } from 'lucide-react';

interface ReviewItem {
  id: string;
  name: string;
  phone: string;
  content: string;
  productName: string;
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggleApprove = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, isApproved: !r.isApproved } : r));
    showToast('Đã thay đổi trạng thái duyệt đánh giá!');
  };

  const handleDeleteReview = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đánh giá này?")) {
      setReviews(prev => prev.filter(r => r.id !== id));
      showToast('Đã xóa đánh giá thành công!');
    }
  };

  const handleOpenAdd = () => {
    setEditingReview({
      id: '',
      name: '',
      phone: '',
      content: '',
      productName: '',
      rating: 5,
      reviewer: 'Khách hàng',
      isApproved: true,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (r: ReviewItem) => {
    setEditingReview({ ...r });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview || !editingReview.name.trim() || !editingReview.content.trim()) {
      showToast('Vui lòng nhập tên người đánh giá và nội dung!');
      return;
    }

    if (editingReview.id) {
      setReviews(prev => prev.map(r => r.id === editingReview.id ? editingReview : r));
      showToast('Đã cập nhật đánh giá!');
    } else {
      const newReview: ReviewItem = {
        ...editingReview,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };
      setReviews(prev => [newReview, ...prev]);
      showToast('Đã thêm đánh giá mới thành công!');
    }

    setIsModalOpen(false);
    setEditingReview(null);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 animate-fadeIn">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-[#032f6a] text-white px-4 py-2.5 rounded shadow-lg text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

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

      {/* Add button */}
      <div className="flex justify-start">
        <button 
          onClick={handleOpenAdd}
          className="bg-[#17a2b8] hover:bg-[#138496] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center gap-1.5 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Thêm đánh giá mới</span>
        </button>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-2.5 px-3 w-12 text-center">STT</th>
              <th className="py-2.5 px-4 min-w-[320px]">Tên & Nội dung đánh giá</th>
              <th className="py-2.5 px-3 w-20 text-center">Số sao</th>
              <th className="py-2.5 px-3 w-32 text-center">Người đánh giá</th>
              <th className="py-2.5 px-3 w-24 text-center">Duyệt</th>
              <th className="py-2.5 px-3 w-28 text-center">Tác vụ</th>
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
                    &quot;{r.content}&quot;
                  </div>
                  <div className="text-[11px] text-[#0071ba] font-semibold flex items-center gap-1">
                    <span className="text-slate-500 font-normal">Sản phẩm:</span>
                    <span className="hover:underline cursor-pointer">{r.productName || 'Tất cả sản phẩm'}</span>
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
                    className={`px-3 py-1 rounded text-xs font-bold transition shadow-xs cursor-pointer ${
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
                  <div className="flex items-center justify-center gap-1.5">
                    <button 
                      onClick={() => handleOpenEdit(r)}
                      className="bg-[#17a2b8] hover:bg-[#138496] text-white p-1.5 rounded transition"
                      title="Chỉnh sửa đánh giá"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteReview(r.id)}
                      className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1.5 rounded transition"
                      title="Xóa đánh giá"
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

      {/* MODAL THÊM / SỬA ĐÁNH GIÁ */}
      {isModalOpen && editingReview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-[#032f6a] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-bold text-sm">
                {editingReview.id ? 'Chỉnh sửa Đánh giá' : 'Thêm mới Đánh giá'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tên khách hàng <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    value={editingReview.name}
                    onChange={(e) => setEditingReview({ ...editingReview, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Số điện thoại</label>
                  <input 
                    type="text" 
                    value={editingReview.phone}
                    onChange={(e) => setEditingReview({ ...editingReview, phone: e.target.value })}
                    placeholder="0912..."
                    className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Tên sản phẩm liên quan</label>
                <input 
                  type="text" 
                  value={editingReview.productName}
                  onChange={(e) => setEditingReview({ ...editingReview, productName: e.target.value })}
                  placeholder="Giường y tế 4 tay quay TECNIC OSADA..."
                  className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Nội dung nhận xét <span className="text-red-500">*</span></label>
                <textarea 
                  rows={3}
                  required
                  value={editingReview.content}
                  onChange={(e) => setEditingReview({ ...editingReview, content: e.target.value })}
                  placeholder="Sản phẩm rất chất lượng, nhân viên tư vấn nhiệt tình..."
                  className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Số sao đánh giá (1 - 5)</label>
                  <select
                    value={editingReview.rating}
                    onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
                    className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8] bg-white font-bold text-amber-600"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 sao)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 sao)</option>
                    <option value={3}>⭐⭐⭐ (3 sao)</option>
                    <option value={2}>⭐⭐ (2 sao)</option>
                    <option value={1}>⭐ (1 sao)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Vai trò người gửi</label>
                  <input 
                    type="text" 
                    value={editingReview.reviewer}
                    onChange={(e) => setEditingReview({ ...editingReview, reviewer: e.target.value })}
                    placeholder="Khách hàng / Bác sĩ..."
                    className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="revApprove"
                  checked={editingReview.isApproved}
                  onChange={(e) => setEditingReview({ ...editingReview, isApproved: e.target.checked })}
                  className="w-4 h-4 text-[#0071ba] rounded cursor-pointer"
                />
                <label htmlFor="revApprove" className="text-slate-700 font-bold cursor-pointer">
                  Duyệt hiển thị đánh giá này lên sản phẩm
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold transition"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-[#032f6a] hover:bg-[#021f4a] text-white rounded text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>{editingReview.id ? 'Lưu đánh giá' : 'Thêm đánh giá'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
