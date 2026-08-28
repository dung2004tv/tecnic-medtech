import React, { useState } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { HERO_BANNERS } from '../../data/productsData';

interface SliderItem {
  id: string;
  name: string;
  description: string;
  image: string;
  order: number;
  isVisible: boolean;
}

export const AdminSliderBanner: React.FC = () => {
  const [sliders, setSliders] = useState<SliderItem[]>([
    {
      id: '1',
      name: 'Slider 1',
      description: 'Banner chính giới thiệu thiết bị y tế & Giải pháp phục hồi chức năng toàn diện TECNIC',
      image: HERO_BANNERS[0]?.image || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&auto=format&fit=crop&q=80',
      order: 1,
      isVisible: true
    },
    {
      id: '3',
      name: 'Slider 3',
      description: 'Chương trình trợ giá thiết bị dưỡng bệnh cho người già & người sau phẫu thuật',
      image: HERO_BANNERS[1]?.image || 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&auto=format&fit=crop&q=80',
      order: 2,
      isVisible: true
    },
    {
      id: '4',
      name: 'Banner Trang Chủ',
      description: 'Cam kết chất lượng chuẩn Bộ Y Tế & Giao hàng lắp đặt tận nhà 24/7',
      image: HERO_BANNERS[2]?.image || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
      order: 3,
      isVisible: true
    }
  ]);

  const [editingSlide, setEditingSlide] = useState<SliderItem | null>(null);

  const handleToggleVisible = (id: string) => {
    setSliders(prev => prev.map(s => s.id === id ? { ...s, isVisible: !s.isVisible } : s));
  };

  const handleDeleteSlide = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa slide này?")) {
      setSliders(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-4 font-sans text-slate-800">
      
      {/* Title & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Danh sách slider và banner</h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="hover:text-blue-600 cursor-pointer">Slider</span>
          <span>/</span>
          <span className="font-semibold text-slate-700">Danh sách slider và banner</span>
        </div>
      </div>

      {/* Button: + Thêm mới */}
      <div className="flex justify-start">
        <button 
          onClick={() => {
            const newSlide: SliderItem = {
              id: Date.now().toString(),
              name: `Slider ${sliders.length + 1}`,
              description: 'Mô tả banner mới...',
              image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&auto=format&fit=crop&q=80',
              order: sliders.length + 1,
              isVisible: true
            };
            setSliders([...sliders, newSlide]);
          }}
          className="bg-[#17a2b8] hover:bg-[#138496] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Thêm mới</span>
        </button>
      </div>

      {/* Sliders Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-2.5 px-3 w-12 text-center">ID</th>
              <th className="py-2.5 px-3 min-w-[140px]">Tên Slide</th>
              <th className="py-2.5 px-3 min-w-[240px]">Mô tả</th>
              <th className="py-2.5 px-3 w-36 text-center">Hình ảnh</th>
              <th className="py-2.5 px-3 w-16 text-center">STT</th>
              <th className="py-2.5 px-3 w-20 text-center">Hiển thị</th>
              <th className="py-2.5 px-3 w-24 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {sliders.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3 px-3 text-center text-slate-500">{s.id}</td>
                <td className="py-3 px-3 font-bold text-slate-800">
                  {s.name}
                </td>
                <td className="py-3 px-3 text-slate-600">
                  {s.description}
                </td>
                <td className="py-3 px-3 text-center">
                  <img 
                    src={s.image} 
                    alt={s.name} 
                    className="w-28 h-12 object-cover mx-auto rounded border border-slate-200 shadow-xs" 
                  />
                </td>
                <td className="py-3 px-3 text-center">
                  <input 
                    type="number" 
                    defaultValue={s.order} 
                    className="w-12 text-center border border-slate-300 py-0.5 rounded text-xs" 
                  />
                </td>
                <td className="py-3 px-3 text-center">
                  <button
                    onClick={() => handleToggleVisible(s.id)}
                    className={`px-3 py-0.5 rounded text-[11px] font-bold text-white transition ${
                      s.isVisible ? 'bg-[#28a745] hover:bg-[#218838]' : 'bg-[#e67e22] hover:bg-[#d35400]'
                    }`}
                  >
                    {s.isVisible ? 'Hiện' : 'Ẩn'}
                  </button>
                </td>
                <td className="py-3 px-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button 
                      onClick={() => setEditingSlide(s)}
                      className="bg-[#17a2b8] hover:bg-[#138496] text-white p-1.5 rounded" 
                      title="Sửa"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteSlide(s.id)}
                      className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1.5 rounded" 
                      title="Xóa"
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

      {/* Edit Slide Modal */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-sm text-slate-800">Chỉnh sửa Slide / Banner</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Tên Slide</label>
                <input 
                  type="text" 
                  value={editingSlide.name}
                  onChange={(e) => setEditingSlide({ ...editingSlide, name: e.target.value })}
                  className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Mô tả Slide</label>
                <textarea 
                  rows={2}
                  value={editingSlide.description}
                  onChange={(e) => setEditingSlide({ ...editingSlide, description: e.target.value })}
                  className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Link Ảnh (URL)</label>
                <input 
                  type="text" 
                  value={editingSlide.image}
                  onChange={(e) => setEditingSlide({ ...editingSlide, image: e.target.value })}
                  className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                />
                {editingSlide.image && (
                  <div className="mt-2">
                    <img src={editingSlide.image} alt="" className="w-full h-24 object-cover rounded border" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setEditingSlide(null)}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-bold"
              >
                Hủy
              </button>
              <button 
                onClick={() => {
                  setSliders(sliders.map(s => s.id === editingSlide.id ? editingSlide : s));
                  setEditingSlide(null);
                }}
                className="px-4 py-1.5 bg-[#17a2b8] hover:bg-[#138496] text-white rounded text-xs font-bold"
              >
                Lưu slide
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
