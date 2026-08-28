import React, { useState } from 'react';
import { Search, RotateCcw, Download, Eye, Trash2, Mail, Phone, UserCheck } from 'lucide-react';

interface ContactItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  content: string;
  status: 'PROCESSED' | 'PENDING';
  createdAt: string;
}

export const AdminContactList: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [contacts, setContacts] = useState<ContactItem[]>([
    {
      id: '1',
      name: 'Nguyễn Đình Quân',
      phone: '0988776655',
      email: 'dinhquan.med@gmail.com',
      content: 'Tôi muốn tư vấn mua giường y tế 4 tay quay có bô vệ sinh cho người nhà tai biến tại Cầu Giấy, Hà Nội.',
      status: 'PROCESSED',
      createdAt: '2026-03-22 10:15'
    },
    {
      id: '2',
      name: 'Trần Thị Bích Ngọc',
      phone: '0912998877',
      email: 'bichngoc.clinic@gmail.com',
      content: 'Xin báo giá dự án cung cấp 10 máy đo huyết áp điện tử và 5 máy đo đường huyết cho phòng khám tư nhân.',
      status: 'PENDING',
      createdAt: '2026-03-21 15:40'
    }
  ]);

  const filteredContacts = contacts.filter(c => {
    const matchKey = !keyword.trim() || 
      c.name.toLowerCase().includes(keyword.toLowerCase()) || 
      c.phone.includes(keyword) || 
      c.email.toLowerCase().includes(keyword.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchKey && matchStatus;
  });

  const handleToggleStatus = (id: string) => {
    setContacts(prev => prev.map(c => c.id === id ? { 
      ...c, 
      status: c.status === 'PROCESSED' ? 'PENDING' : 'PROCESSED' 
    } : c));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa thông tin liên hệ này?")) {
      setContacts(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-4 font-sans text-slate-800">
      
      {/* Title & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Danh sách</h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="hover:text-blue-600 cursor-pointer">Liên hệ</span>
          <span>/</span>
          <span className="font-semibold text-slate-700">Danh sách</span>
        </div>
      </div>

      {/* Filter Box (Thanh tìm kiếm chuẩn hình 8) */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2.5 items-center">
          
          <div className="md:col-span-2">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Từ khóa (Họ tên, SĐT, Email...)"
              className="w-full border border-slate-300 px-3 py-1.5 text-xs rounded outline-none focus:border-[#17a2b8]"
            />
          </div>

          <div>
            <select
              className="w-full border border-slate-300 px-2 py-1.5 text-xs rounded outline-none bg-white text-slate-700"
            >
              <option value="newest">Sắp xếp theo: Mới nhất</option>
              <option value="oldest">Sắp xếp theo: Cũ nhất</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-slate-300 px-2 py-1.5 text-xs rounded outline-none bg-white text-slate-700"
            >
              <option value="ALL">Tình trạng (Tất cả)</option>
              <option value="PENDING">Chưa xử lý</option>
              <option value="PROCESSED">Đã xử lý</option>
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
              }}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white text-xs font-bold py-1.5 px-3 rounded transition flex items-center justify-center"
              title="Làm lại"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => alert("Đã xuất danh sách liên hệ!")}
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
        <span>Tổng số bản ghi {filteredContacts.length}</span>
      </div>

      {/* Contacts Table (Chuẩn cấu trúc hình 8) */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-2.5 px-3 w-10 text-center">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="py-2.5 px-2 w-10 text-center">Stt</th>
              <th className="py-2.5 px-4 min-w-[220px]">Thông tin</th>
              <th className="py-2.5 px-3 w-28 text-center">Trạng thái</th>
              <th className="py-2.5 px-4 min-w-[280px]">Nội dung</th>
              <th className="py-2.5 px-3 w-32 text-center">Thời gian</th>
              <th className="py-2.5 px-3 w-20 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredContacts.map((c, idx) => (
              <tr key={c.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3 px-3 text-center">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="py-3 px-2 text-center text-slate-500">{idx + 1}</td>
                
                {/* Thông tin */}
                <td className="py-3 px-4 space-y-0.5">
                  <div className="font-bold text-slate-800">{c.name}</div>
                  <div className="text-slate-600 font-mono text-[11px] flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" /> {c.phone}
                  </div>
                  <div className="text-slate-500 text-[11px] flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" /> {c.email}
                  </div>
                </td>

                {/* Trạng thái */}
                <td className="py-3 px-3 text-center">
                  <button
                    onClick={() => handleToggleStatus(c.id)}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                      c.status === 'PROCESSED' 
                        ? 'bg-[#28a745] hover:bg-[#218838] text-white' 
                        : 'bg-[#ffc107] hover:bg-[#e0a800] text-slate-900'
                    }`}
                  >
                    {c.status === 'PROCESSED' ? 'Đã xử lý' : 'Chưa xử lý'}
                  </button>
                </td>

                {/* Nội dung */}
                <td className="py-3 px-4 text-slate-700">
                  {c.content}
                </td>

                {/* Thời gian */}
                <td className="py-3 px-3 text-center text-[11px] text-slate-600 font-mono">
                  {c.createdAt}
                </td>

                {/* Hành động */}
                <td className="py-3 px-3 text-center">
                  <button 
                    onClick={() => handleDelete(c.id)}
                    className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1.5 rounded transition"
                    title="Xóa liên hệ"
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
