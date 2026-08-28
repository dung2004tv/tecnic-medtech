import os

content = """import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, Eye, EyeOff, ShieldCheck, Building2, Users, CheckCircle2, Phone, User as UserIcon } from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider, facebookProvider } from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onLoginSuccess?: (user: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [loginRole, setLoginRole] = useState<'admin' | 'staff' | 'customer'>('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError('');
      setEmail('');
      setPassword('');
      setName('');
      setPhone('');
      setShowPassword(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const validatePhone = (p: string) => {
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\\b/;
    return phoneRegex.test(p);
  };

  const handleAuthSuccess = async (user: any, additionalData?: any) => {
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    
    let userData: any = {};
    if (!snap.exists()) {
      const isAdminEmail = user.email === 'nguyendungdbd1@gmail.com' || user.email === 'ytetecnic.vn.group@gmail.com';
      userData = {
        uid: user.uid,
        email: user.email || '',
        name: user.displayName || additionalData?.name || 'Thành viên mới',
        phone: user.phoneNumber || additionalData?.phone || '',
        role: isAdminEmail ? 'ADMIN' : 'CA_NHAN',
        createdAt: new Date().toISOString()
      };
      await setDoc(userRef, userData);
    } else {
      userData = snap.data();
    }

    if (onLoginSuccess) {
      onLoginSuccess({
        id: user.uid,
        fullName: userData.name || userData.fullName || user.displayName || 'Thành viên',
        phone: userData.phone || user.phoneNumber || '',
        email: userData.email || user.email || '',
        accountType: userData.role || userData.accountType || 'CA_NHAN',
        createdAt: userData.createdAt || new Date().toISOString()
      });
    }
    onClose();
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        await handleAuthSuccess(userCred.user);
      } else {
        if (!validatePhone(phone)) {
          throw new Error('Số điện thoại không hợp lệ. Vui lòng nhập đúng số di động.');
        }
        if (password.length < 6) {
          throw new Error('Mật khẩu phải có ít nhất 6 ký tự.');
        }

        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, { displayName: name });
        await handleAuthSuccess(userCred.user, { name, phone });
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') setError('Email này đã được đăng ký.');
      else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') setError('Email hoặc mật khẩu không chính xác.');
      else setError(err.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: any) => {
    setError('');
    setLoading(true);
    try {
      const userCred = await signInWithPopup(auth, provider);
      await handleAuthSuccess(userCred.user);
    } catch (err: any) {
      console.error('Social Auth Error:', err);
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        if (err.code === 'auth/operation-not-allowed') {
          setError('Lỗi: Bạn chưa BẬT tính năng đăng nhập (Google/Facebook) trong Firebase Console.');
        } else if (err.code === 'auth/unauthorized-domain') {
          setError(`Lỗi tên miền: Cần thêm ${window.location.hostname} vào Firebase Authorized domains.`);
        } else {
          setError(`Lỗi: ${err.message}`);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-[550px] rounded-xl shadow-2xl overflow-hidden relative max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER (Dark Blue) */}
        <div className="bg-[#143472] p-5 pb-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl border border-[#ffb700]/40 flex items-center justify-center bg-[#0f2858] shadow-inner">
                <ShieldCheck className="w-6 h-6 text-[#ffb700]" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-white tracking-wide">Hệ Thống Xác Thực TECNIC</h2>
                <p className="text-blue-200 text-xs mt-0.5 font-medium">Bảo mật tài khoản & Đặt mua thiết bị y tế chính hãng</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-blue-200 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex gap-3 mt-6 mb-4">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${
                mode === 'login' ? 'bg-[#ffb700] text-[#143472] shadow-md' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              ĐĂNG NHẬP HỆ THỐNG
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${
                mode === 'register' ? 'bg-[#ffb700] text-[#143472] shadow-md' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              ĐĂNG KÝ KHÁCH HÀNG
            </button>
          </div>
        </div>

        {/* BODY (White) */}
        <div className="p-6 overflow-y-auto bg-white">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === 'login' && (
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Chọn vai trò đăng nhập:</label>
                <div className="grid grid-cols-3 gap-3">
                  <div 
                    onClick={() => setLoginRole('admin')} 
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      loginRole === 'admin' ? 'border-[#ffb700] bg-[#fffdf5] text-[#906500]' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    <ShieldCheck className={`w-6 h-6 mb-1.5 ${loginRole === 'admin' ? 'text-[#ffb700]' : ''}`} />
                    <span className={`text-[13px] ${loginRole === 'admin' ? 'font-bold' : 'font-medium'}`}>Quản trị viên</span>
                  </div>
                  <div 
                    onClick={() => setLoginRole('staff')} 
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      loginRole === 'staff' ? 'border-[#0071ba] bg-[#f0f7ff] text-[#0071ba]' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    <Building2 className={`w-6 h-6 mb-1.5 ${loginRole === 'staff' ? 'text-[#0071ba]' : ''}`} />
                    <span className={`text-[13px] ${loginRole === 'staff' ? 'font-bold' : 'font-medium'}`}>Nhân viên</span>
                  </div>
                  <div 
                    onClick={() => setLoginRole('customer')} 
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      loginRole === 'customer' ? 'border-[#0071ba] bg-[#f0f7ff] text-[#0071ba]' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    <Users className={`w-6 h-6 mb-1.5 ${loginRole === 'customer' ? 'text-[#0071ba]' : ''}`} />
                    <span className={`text-[13px] ${loginRole === 'customer' ? 'font-bold' : 'font-medium'}`}>Khách hàng</span>
                  </div>
                </div>
              </div>
            )}

            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#0071ba] outline-none transition-colors"
                      placeholder="Nhập họ tên của bạn"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#0071ba] outline-none transition-colors"
                      placeholder="Nhập số điện thoại hợp lệ"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                {mode === 'login' ? 'Số điện thoại hoặc Email đã đăng ký' : 'Email'} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type={mode === 'login' && !email.includes('@') && email.length > 0 ? 'text' : 'email'}
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#0071ba] outline-none transition-colors"
                  placeholder={mode === 'login' ? "admin@ytetecnic.vn" : "Nhập địa chỉ email"}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-bold text-slate-700">Mật khẩu bảo mật <span className="text-red-500">*</span></label>
                {mode === 'login' && (
                  <button type="button" className="text-[13px] text-[#0071ba] hover:underline font-medium">
                    Quên mật khẩu?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 focus:border-[#0071ba] outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 bg-[#0071ba] hover:bg-[#005a96] text-white font-bold rounded-lg transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'ĐANG XỬ LÝ...' : (
                <>
                  <CheckCircle2 className={`w-5 h-5 ${mode === 'login' ? 'text-[#ffb700]' : 'text-white'}`} />
                  {mode === 'login' ? 'ĐĂNG NHẬP HỆ THỐNG' : 'ĐĂNG KÝ TÀI KHOẢN'}
                </>
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative mb-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-slate-500 text-[13px] font-medium">Hoặc đăng nhập nhanh bằng</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialAuth(facebookProvider)}
                className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 text-sm font-bold transition shadow-sm"
              >
                <svg className="w-5 h-5 text-[#1877f2] fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
              <button
                type="button"
                onClick={() => handleSocialAuth(googleProvider)}
                className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 text-sm font-bold transition shadow-sm"
              >
                <svg className="w-5 h-5 text-[#ea4335] fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Google
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER (Gray) */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 text-center mt-auto">
          <p className="text-[13px] text-slate-500">
            Tổng đài hỗ trợ kỹ thuật & phân quyền: <strong className="text-[#0071ba] font-bold">034 840 2466</strong> (24/7)
          </p>
        </div>

      </div>
    </div>
  );
};
"""

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)

