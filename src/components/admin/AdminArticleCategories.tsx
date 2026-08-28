import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface ArticleCategory {
  id: string;
  name: string;
  order: number;
  status: 'ACTIVE' | 'HIDDEN';
}

export const AdminArticleCategories: React.FC = () => {
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Partial<ArticleCategory>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/article-categories');
      const json = await res.json();
      if (json.success) {
        setCategories(json.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const isEdit = !!editingCat.id;
      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit ? `/api/article-categories/${editingCat.id}` : `/api/article-categories`;
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingCat.name,
          order: editingCat.order || 1,
          status: editingCat.status || 'ACTIVE'
        })
      });
      
      const json = await res.json();
      if (json.success) {
        await fetchCategories();
        setIsModalOpen(false);
      } else {
        alert("Có lỗi xảy ra: " + json.message);
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi kết nối");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;
    try {
      const res = await fetch(`/api/article-categories/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setCategories(categories.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4 font-sans text-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Danh mục tin tức</h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="hover:text-blue-600 cursor-pointer">Tin tức</span>
          <span>/</span>
          <span className="font-semibold text-slate-700">Danh mục</span>
        </div>
      </div>

      <div className="flex justify-start">
        <button 
          onClick={() => {
            setEditingCat({ name: '', order: categories.length + 1, status: 'ACTIVE' });
            setIsModalOpen(true);
          }}
          className="bg-[#17a2b8] hover:bg-[#138496] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Thêm mới</span>
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-2.5 px-3 w-12 text-center">#</th>
              <th className="py-2.5 px-3">Tên danh mục</th>
              <th className="py-2.5 px-3 w-20 text-center">Thứ tự</th>
              <th className="py-2.5 px-3 w-24 text-center">Trạng thái</th>
              <th className="py-2.5 px-3 w-24 text-center">Tác vụ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-slate-500">Đang tải...</td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-slate-500">Chưa có danh mục nào.</td>
              </tr>
            ) : categories.map((c, i) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="py-2.5 px-3 text-center text-slate-500">{i + 1}</td>
                <td className="py-2.5 px-3 font-bold text-[#0071ba]">{c.name}</td>
                <td className="py-2.5 px-3 text-center">{c.order}</td>
                <td className="py-2.5 px-3 text-center">
                  {c.status === 'ACTIVE' ? (
                    <span className="bg-[#28a745] text-white px-2 py-0.5 rounded text-[11px] font-bold">Hiện</span>
                  ) : (
                    <span className="bg-[#dc3545] text-white px-2 py-0.5 rounded text-[11px] font-bold">Ẩn</span>
                  )}
                </td>
                <td className="py-2.5 px-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button 
                      onClick={() => {
                        setEditingCat(c);
                        setIsModalOpen(true);
                      }}
                      className="bg-[#17a2b8] hover:bg-[#138496] text-white p-1 rounded transition" 
                      title="Sửa"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(c.id)}
                      className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded transition" 
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col animate-fadeIn">
            <div className="bg-[#143472] text-white px-4 py-3 flex justify-between items-center shrink-0">
              <h3 className="font-bold text-sm">{editingCat.id ? 'Sửa danh mục' : 'Thêm danh mục mới'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white hover:text-red-300">
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên danh mục *</label>
                <input 
                  required
                  type="text" 
                  value={editingCat.name || ''}
                  onChange={e => setEditingCat({...editingCat, name: e.target.value})}
                  className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                  placeholder="Ví dụ: Tin tức y khoa"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Thứ tự hiển thị</label>
                  <input 
                    type="number" 
                    value={editingCat.order || 1}
                    onChange={e => setEditingCat({...editingCat, order: Number(e.target.value)})}
                    className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                  />
                </div>
                
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Trạng thái</label>
                  <select
                    value={editingCat.status || 'ACTIVE'}
                    onChange={e => setEditingCat({...editingCat, status: e.target.value as any})}
                    className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8] bg-white"
                  >
                    <option value="ACTIVE">Hiện</option>
                    <option value="HIDDEN">Ẩn</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded transition"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#28a745] hover:bg-[#218838] text-white font-bold rounded transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Đang lưu...' : 'Lưu danh mục'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
