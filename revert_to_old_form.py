import os

content = """import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User as UserIcon, Phone } from 'lucide-react';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        className="bg-white w-full max-w-md rounded shadow-2xl overflow-hidden relative max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex border-b border-slate-200">
          <button
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-4 text-center font-bold text-lg transition ${
              mode === 'login' ? 'text-[#1a4388] border-b-2 border-[#1a4388] bg-blue-50/30' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            ĐĂNG NHẬP
          </button>
          <button
            onClick={() => { setMode('register'); setError(''); }}
            className={`flex-1 py-4 text-center font-bold text-lg transition ${
              mode === 'register' ? 'text-[#1a4388] border-b-2 border-[#1a4388] bg-blue-50/30' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            ĐĂNG KÝ
          </button>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1">Họ và tên <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-2 rounded border border-slate-300 focus:border-[#143472] outline-none"
                    placeholder="Họ và tên"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-2 rounded border border-slate-300 focus:border-[#143472] outline-none"
                    placeholder="Số điện thoại"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded border border-slate-300 focus:border-[#143472] outline-none"
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">Mật khẩu <span className="text-red-500">*</span></label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded border border-slate-300 focus:border-[#143472] outline-none"
                placeholder="Mật khẩu"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 mt-2 bg-[#1a4388] hover:bg-[#143472] text-white font-bold rounded transition disabled:opacity-50"
            >
              {loading ? 'ĐANG XỬ LÝ...' : (mode === 'login' ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ')}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">Hoặc đăng nhập bằng</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialAuth(facebookProvider)}
              className="flex items-center justify-center gap-2 py-2 bg-[#3b5998] hover:bg-[#344e86] text-white rounded transition text-sm font-medium"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
            <button
              type="button"
              onClick={() => handleSocialAuth(googleProvider)}
              className="flex items-center justify-center gap-2 py-2 bg-[#dd4b39] hover:bg-[#c23321] text-white rounded transition text-sm font-medium"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
"""

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)

