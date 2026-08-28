import React, { useState } from 'react';
import { Plus, Edit, Trash2, Folder, FileText, CheckCircle2 } from 'lucide-react';

interface InfoSection {
  id: string;
  isFolder: boolean;
  name: string;
  value: string;
  order: number;
  isVisible: boolean;
}

export const AdminInfoPages: React.FC = () => {
  const [sections, setSections] = useState<InfoSection[]>([
    {
      id: '1',
      isFolder: false,
      name: 'Quản lý nội dung đầu trang',
      value: 'Hotline, logo, slogan, mạng xã hội header',
      order: 1,
      isVisible: true
    },
    {
      id: '2',
      isFolder: true,
      name: 'Quản lý nội dung giao diện trang chủ',
      value: 'Khối giới thiệu TECNIC, cam kết chất lượng, chứng nhận y tế',
      order: 2,
      isVisible: true
    },
    {
      id: '3',
      isFolder: true,
      name: 'Quản lý nội dung cuối trang',
      value: 'Địa chỉ trụ sở, chi nhánh Hà Nội & TP.HCM, giấy phép kinh doanh TTBYT',
      order: 3,
      isVisible: true
    },
    {
      id: '4',
      isFolder: false,
      name: 'Thông tin trang chi tiết tin tức',
      value: 'Thông tin liên hệ',
      order: 4,
      isVisible: true
    }
  ]);

  const [editingSection, setEditingSection] = useState<InfoSection | null>(null);

  return (
    <div className="space-y-4 font-sans text-slate-800">
      
      {/* Title & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Danh sách nội dung</h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="hover:text-blue-600 cursor-pointer">Setting</span>
          <span>/</span>
          <span className="font-semibold text-slate-700">Danh sách nội dung</span>
        </div>
      </div>

      {/* Button: + Thêm mới */}
      <div className="flex justify-start">
        <button 
          onClick={() => {
            const newSec: InfoSection = {
              id: Date.now().toString(),
              isFolder: false,
              name: 'Nội dung mới',
              value: 'Mô tả nội dung...',
              order: sections.length + 1,
              isVisible: true
            };
            setSections([...sections, newSec]);
          }}
          className="bg-[#17a2b8] hover:bg-[#138496] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Thêm mới</span>
        </button>
      </div>

      {/* Info Pages Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-2.5 px-3 w-10 text-center">#</th>
              <th className="py-2.5 px-3 min-w-[220px]">Tên nội dung</th>
              <th className="py-2.5 px-3 min-w-[200px]">Giá trị</th>
              <th className="py-2.5 px-3 w-16 text-center">STT</th>
              <th className="py-2.5 px-3 w-20 text-center">Hiển thị</th>
              <th className="py-2.5 px-3 w-36 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {sections.map((sec, idx) => (
              <tr key={sec.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3 px-3 text-center text-slate-500">
                  {sec.isFolder ? (
                    <Folder className="w-4 h-4 text-amber-500 fill-amber-400 mx-auto" />
                  ) : (
                    <FileText className="w-4 h-4 text-blue-500 mx-auto" />
                  )}
                </td>
                <td className="py-3 px-3 font-bold text-slate-800">
                  <span className="hover:text-blue-600 cursor-pointer">{sec.name}</span>
                </td>
                <td className="py-3 px-3 text-slate-600">
                  {sec.value}
                </td>
                <td className="py-3 px-3 text-center">
                  <input 
                    type="number" 
                    defaultValue={sec.order} 
                    className="w-12 text-center border border-slate-300 py-0.5 rounded text-xs" 
                  />
                </td>
                <td className="py-3 px-3 text-center">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold text-white bg-[#28a745]">
                    Hiện
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button 
                      onClick={() => setEditingSection(sec)}
                      className="bg-[#17a2b8] hover:bg-[#138496] text-white p-1 rounded" 
                      title="Sửa"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button className="bg-[#17a2b8] hover:bg-[#138496] text-white px-2 py-0.5 rounded text-[11px] font-bold" title="Thêm">
                      + Thêm
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm("Xóa nội dung này?")) {
                          setSections(sections.filter(s => s.id !== sec.id));
                        }
                      }}
                      className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded" 
                      title="Xóa"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="bg-[#17a2b8] hover:bg-[#138496] text-white p-1 rounded" title="Thêm">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Edit Modal */}
      {editingSection && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-sm text-slate-800">Cập nhật nội dung thông tin</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Tên nội dung</label>
                <input 
                  type="text" 
                  value={editingSection.name}
                  onChange={(e) => setEditingSection({ ...editingSection, name: e.target.value })}
                  className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Giá trị / Mô tả</label>
                <textarea 
                  rows={3}
                  value={editingSection.value}
                  onChange={(e) => setEditingSection({ ...editingSection, value: e.target.value })}
                  className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setEditingSection(null)}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-bold"
              >
                Hủy
              </button>
              <button 
                onClick={() => {
                  setSections(sections.map(s => s.id === editingSection.id ? editingSection : s));
                  setEditingSection(null);
                }}
                className="px-4 py-1.5 bg-[#17a2b8] hover:bg-[#138496] text-white rounded text-xs font-bold"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
