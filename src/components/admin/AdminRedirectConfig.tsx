import React, { useState } from 'react';
import { Plus, Edit, Trash2, ArrowRight } from 'lucide-react';

interface RedirectItem {
  id: string;
  oldUrl: string;
  newUrl: string;
}

export const AdminRedirectConfig: React.FC = () => {
  const [redirects, setRedirects] = useState<RedirectItem[]>([
    {
      id: '1',
      oldUrl: 'https://ytetecnic.vn/mua-giuong-y-te-ha-noi',
      newUrl: 'https://ytetecnic.vn/danh-muc/giuong-y-te'
    },
    {
      id: '2',
      oldUrl: 'https://ytetecnic.vn/xe-lan-tay-cho-nguoi-gia',
      newUrl: 'https://ytetecnic.vn/danh-muc/xe-lan-y-te'
    },
    {
      id: '3',
      oldUrl: 'https://ytetecnic.vn/thiet-bi-phuc-hoi-chuc-nang-tai-bien',
      newUrl: 'https://ytetecnic.vn/danh-muc/tap-phuc-hoi-chuc-nang'
    },
    {
      id: '4',
      oldUrl: 'https://ytetecnic.vn/dem-chong-loet-osada',
      newUrl: 'https://ytetecnic.vn/san-pham/dem-hoi-chong-loet-osada'
    },
    {
      id: '5',
      oldUrl: 'https://ytetecnic.vn/bang-gia-thiet-bi-y-te-2025',
      newUrl: 'https://ytetecnic.vn/tin-tuc/bang-gia-thiet-bi-y-te'
    }
  ]);

  const [editingItem, setEditingItem] = useState<RedirectItem | null>(null);

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa cấu hình chuyển hướng URL này?")) {
      setRedirects(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="space-y-4 font-sans text-slate-800">
      
      {/* Title & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Danh sách redirect</h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="hover:text-blue-600 cursor-pointer">Vai trò</span>
          <span>/</span>
          <span className="font-semibold text-slate-700">Danh sách redirect</span>
        </div>
      </div>

      {/* Button: + Thêm mới */}
      <div className="flex justify-start">
        <button 
          onClick={() => {
            const newItem: RedirectItem = {
              id: Date.now().toString(),
              oldUrl: 'https://ytetecnic.vn/link-cu',
              newUrl: 'https://ytetecnic.vn/link-moi'
            };
            setRedirects([...redirects, newItem]);
          }}
          className="bg-[#17a2b8] hover:bg-[#138496] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Thêm mới</span>
        </button>
      </div>

      {/* Redirects Table (Chuẩn cấu trúc hình 11) */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-2.5 px-3 w-16 text-center">STT</th>
              <th className="py-2.5 px-4 min-w-[280px]">Link cũ (301 Redirect)</th>
              <th className="py-2.5 px-4 min-w-[280px]">Link mới</th>
              <th className="py-2.5 px-3 w-28 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {redirects.map((r, idx) => (
              <tr key={r.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3 px-3 text-center text-slate-500">{idx + 1}</td>
                <td className="py-3 px-4 font-mono text-slate-700">
                  {r.oldUrl}
                </td>
                <td className="py-3 px-4 font-mono text-[#0071ba] font-bold">
                  {r.newUrl}
                </td>
                <td className="py-3 px-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button 
                      onClick={() => setEditingItem(r)}
                      className="bg-[#28a745] hover:bg-[#218838] text-white p-1.5 rounded" 
                      title="Sửa chuyển hướng"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(r.id)}
                      className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1.5 rounded" 
                      title="Xóa chuyển hướng"
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

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-sm text-slate-800">Cấu hình chuyển hướng URL</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Link Cũ</label>
                <input 
                  type="text" 
                  value={editingItem.oldUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, oldUrl: e.target.value })}
                  className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8] font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Link Mới Đích Đến</label>
                <input 
                  type="text" 
                  value={editingItem.newUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, newUrl: e.target.value })}
                  className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8] font-mono text-[#0071ba] font-bold"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setEditingItem(null)}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-bold"
              >
                Hủy
              </button>
              <button 
                onClick={() => {
                  setRedirects(redirects.map(r => r.id === editingItem.id ? editingItem : r));
                  setEditingItem(null);
                }}
                className="px-4 py-1.5 bg-[#28a745] hover:bg-[#218838] text-white rounded text-xs font-bold"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
