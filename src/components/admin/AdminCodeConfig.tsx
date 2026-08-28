import React, { useState } from 'react';
import { Plus, Edit, Code, CheckCircle2, Trash2 } from 'lucide-react';

interface CodeSnippet {
  id: string;
  name: string;
  code: string;
  order: number;
  isVisible: boolean;
}

export const AdminCodeConfig: React.FC = () => {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([
    {
      id: '1',
      name: 'Code top Google',
      code: '<!-- Google Tag Manager / Google Analytics 4 (GA4) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-TECNIC123"></script>',
      order: 1,
      isVisible: true
    },
    {
      id: '2',
      name: 'Code home',
      code: '<!-- Facebook Pixel Code / Hotjar Tracking -->\n<script>!function(f,b,e,v,n,t,s){...}(window, document);</script>',
      order: 2,
      isVisible: true
    },
    {
      id: '3',
      name: 'Code bottom',
      code: '<!-- Zalo Chat Widget & Tawk.to Live Support -->\n<div class="zalo-chat-widget" data-oaid="579745863508352884"></div>',
      order: 3,
      isVisible: true
    }
  ]);
  const [editingSnippet, setEditingSnippet] = useState<CodeSnippet | null>(null);
  
  if (editingSnippet) {
    return (
      <div className="space-y-4 font-sans text-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Edit code
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
            <span>/</span>
            <span className="hover:text-blue-600 cursor-pointer">code</span>
            <span>/</span>
            <span className="font-semibold text-slate-700">Edit code</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 mb-2">
          <button 
            onClick={() => {
              if (editingSnippet.id) {
                setSnippets(snippets.map(s => s.id === editingSnippet.id ? editingSnippet : s));
              } else {
                setSnippets([...snippets, { ...editingSnippet, id: Date.now().toString() }]);
              }
              setEditingSnippet(null);
            }}
            className="px-4 py-2 bg-[#17a2b8] hover:bg-[#138496] text-white font-bold rounded shadow-xs transition"
          >
            Chấp nhận
          </button>
          <button 
            onClick={() => setEditingSnippet(null)}
            className="px-4 py-2 bg-[#dc3545] hover:bg-[#c82333] text-white font-bold rounded shadow-xs transition"
          >
            Làm lại
          </button>
        </div>

        <div className="bg-white border border-slate-200 shadow-xs">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
            <h2 className="font-bold text-slate-800">Thông tin code</h2>
          </div>
          
          <div className="p-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start border-b border-slate-100 pb-6">
              <label className="font-bold text-slate-700 pt-2 text-sm">Tên</label>
              <input 
                type="text" 
                value={editingSnippet.name}
                onChange={(e) => setEditingSnippet({ ...editingSnippet, name: e.target.value })}
                className="w-full border border-slate-300 p-2.5 outline-none focus:border-[#17a2b8]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start border-b border-slate-100 pb-6">
              <label className="font-bold text-slate-700 pt-2 text-sm">Nhập mô tả</label>
              <textarea 
                rows={10}
                value={editingSnippet.code}
                onChange={(e) => setEditingSnippet({ ...editingSnippet, code: e.target.value })}
                className="w-full border border-slate-300 p-2.5 outline-none focus:border-[#17a2b8] font-mono text-sm"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start border-b border-slate-100 pb-6">
              <label className="font-bold text-slate-700 pt-2 text-sm">Số thứ tự</label>
              <input 
                type="number" 
                value={editingSnippet.order}
                onChange={(e) => setEditingSnippet({ ...editingSnippet, order: parseInt(e.target.value) || 0 })}
                className="w-full border border-slate-300 p-2.5 outline-none focus:border-[#17a2b8]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
              <label className="font-bold text-slate-700 text-sm">Trạng thái</label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="status"
                    checked={editingSnippet.isVisible}
                    onChange={() => setEditingSnippet({ ...editingSnippet, isVisible: true })}
                    className="w-4 h-4 text-[#0071ba] focus:ring-[#0071ba]"
                  />
                  <span>Hiện</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="status"
                    checked={!editingSnippet.isVisible}
                    onChange={() => setEditingSnippet({ ...editingSnippet, isVisible: false })}
                    className="w-4 h-4 text-[#0071ba] focus:ring-[#0071ba]"
                  />
                  <span>Ẩn</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-sans text-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Danh sách code</h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="hover:text-blue-600 cursor-pointer">Code</span>
          <span>/</span>
          <span className="font-semibold text-slate-700">Danh sách code</span>
        </div>
      </div>

      <div className="flex justify-start">
        <button 
          onClick={() => {
            setEditingSnippet({
              id: '',
              name: '',
              code: '',
              order: 0,
              isVisible: true
            });
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
              <th className="py-2.5 px-3 w-16 text-center">STT</th>
              <th className="py-2.5 px-4 min-w-[240px]">Name</th>
              <th className="py-2.5 px-3 w-28 text-center">Số thứ tự</th>
              <th className="py-2.5 px-3 w-28 text-center">Hiển thị</th>
              <th className="py-2.5 px-3 w-24 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {snippets.map((snip, idx) => (
              <tr key={snip.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3 px-3 text-center text-slate-500">{idx + 1}</td>
                <td className="py-3 px-4 font-bold text-[#0071ba]">{snip.name}</td>
                <td className="py-3 px-3 text-center">{snip.order}</td>
                <td className="py-3 px-3 text-center">
                  {snip.isVisible ? (
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold text-white bg-[#28a745]">Hiện</span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold text-white bg-[#dc3545]">Ẩn</span>
                  )}
                </td>
                <td className="py-3 px-3 text-center">
                  <button 
                    onClick={() => setEditingSnippet(snip)}
                    className="bg-[#17a2b8] hover:bg-[#138496] text-white p-1.5 rounded transition" 
                    title="Sửa mã code"
                  >
                    <Edit className="w-3.5 h-3.5" />
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
