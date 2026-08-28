import React, { useState } from 'react';
import { Plus, Edit, Trash2, ShieldCheck, UserCheck } from 'lucide-react';
import { User } from '../../types';

interface AdminUserItem {
  id: string;
  displayId: string;
  name: string;
  email: string;
  role: 'Quản trị' | 'Nhân viên';
}

interface AdminUserListProps {
  usersList?: User[];
}

export const AdminUserList: React.FC<AdminUserListProps> = ({ usersList }) => {
  const [adminUsers, setAdminUsers] = useState<AdminUserItem[]>([
    {
      id: '1',
      displayId: '17',
      name: 'thcong5',
      email: 'ytetecnic.vn.congnt@gmail.com',
      role: 'Quản trị'
    },
    {
      id: '2',
      displayId: '16',
      name: 'Admin',
      email: 'ytetecnic.vn.group@gmail.com',
      role: 'Quản trị'
    },
    {
      id: '3',
      displayId: '18',
      name: 'Nhân viên tư vấn Y tế',
      email: 'tuvan.tecnic@gmail.com',
      role: 'Nhân viên'
    }
  ]);

  const [editingUser, setEditingUser] = useState<AdminUserItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Quản trị' as 'Quản trị' | 'Nhân viên'
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa quản trị viên này khỏi hệ thống?")) {
      setAdminUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const handleCreate = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      alert("Vui lòng điền đầy đủ tên và email!");
      return;
    }
    const created: AdminUserItem = {
      id: Date.now().toString(),
      displayId: (adminUsers.length + 19).toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };
    setAdminUsers([...adminUsers, created]);
    setIsAdding(false);
    setNewUser({ name: '', email: '', role: 'Quản trị' });
  };

  return (
    <div className="space-y-4 font-sans text-slate-800">
      
      {/* Title & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Danh sách admin user</h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="hover:text-blue-600 cursor-pointer">Admin User</span>
          <span>/</span>
          <span className="font-semibold text-slate-700">Danh sách admin user</span>
        </div>
      </div>

      {/* Button: + Thêm mới */}
      <div className="flex justify-start">
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-[#17a2b8] hover:bg-[#138496] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Thêm mới</span>
        </button>
      </div>

      {/* Users Table (Chuẩn cấu trúc hình 12) */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-2.5 px-3 w-16 text-center">STT</th>
              <th className="py-2.5 px-3 w-20 text-center">ID</th>
              <th className="py-2.5 px-4 min-w-[200px]">Tên</th>
              <th className="py-2.5 px-4 min-w-[240px]">email</th>
              <th className="py-2.5 px-3 w-28 text-center">Vai trò</th>
              <th className="py-2.5 px-3 w-28 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {adminUsers.map((u, idx) => (
              <tr key={u.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3 px-3 text-center text-slate-500">{idx}</td>
                <td className="py-3 px-3 text-center font-mono font-bold text-slate-700">{u.displayId}</td>
                <td className="py-3 px-4 font-bold text-slate-800">
                  {u.name}
                </td>
                <td className="py-3 px-4 text-slate-600 font-mono">
                  {u.email}
                </td>
                <td className="py-3 px-3 text-center">
                  <span className={`px-2.5 py-1 rounded text-[11px] font-bold text-white ${
                    u.role === 'Quản trị' ? 'bg-[#28a745]' : 'bg-[#17a2b8]'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button 
                      onClick={() => setEditingUser(u)}
                      className="bg-[#28a745] hover:bg-[#218838] text-white p-1.5 rounded" 
                      title="Sửa quyền"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(u.id)}
                      className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1.5 rounded" 
                      title="Xóa quản trị viên"
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

      {/* Add / Edit Modal */}
      {(isAdding || editingUser) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-sm text-slate-800">
              {isAdding ? 'Thêm mới Quản trị viên' : `Chỉnh sửa: ${editingUser?.name}`}
            </h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Tên hiển thị / Username</label>
                <input 
                  type="text" 
                  value={isAdding ? newUser.name : editingUser?.name || ''}
                  onChange={(e) => isAdding ? setNewUser({ ...newUser, name: e.target.value }) : setEditingUser(editingUser ? { ...editingUser, name: e.target.value } : null)}
                  className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Email đăng nhập</label>
                <input 
                  type="email" 
                  value={isAdding ? newUser.email : editingUser?.email || ''}
                  onChange={(e) => isAdding ? setNewUser({ ...newUser, email: e.target.value }) : setEditingUser(editingUser ? { ...editingUser, email: e.target.value } : null)}
                  className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Vai trò quyền hạn</label>
                <select 
                  value={isAdding ? newUser.role : editingUser?.role || 'Quản trị'}
                  onChange={(e) => isAdding ? setNewUser({ ...newUser, role: e.target.value as any }) : setEditingUser(editingUser ? { ...editingUser, role: e.target.value as any } : null)}
                  className="w-full border border-slate-300 p-2 rounded outline-none focus:border-[#17a2b8] bg-white"
                >
                  <option value="Quản trị">Quản trị (Toàn quyền)</option>
                  <option value="Nhân viên">Nhân viên (Xem & Quản lý đơn hàng/tin tức)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => {
                  setIsAdding(false);
                  setEditingUser(null);
                }}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-bold"
              >
                Hủy
              </button>
              <button 
                onClick={() => {
                  if (isAdding) {
                    handleCreate();
                  } else if (editingUser) {
                    setAdminUsers(adminUsers.map(u => u.id === editingUser.id ? editingUser : u));
                    setEditingUser(null);
                  }
                }}
                className="px-4 py-1.5 bg-[#28a745] hover:bg-[#218838] text-white rounded text-xs font-bold"
              >
                {isAdding ? 'Tạo mới' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
