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
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
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
    // Check if user document exists, if not create it
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email || '',
        name: user.displayName || additionalData?.name || 'Thành viên mới',
        phone: user.phoneNumber || additionalData?.phone || '',
        role: 'customer',
        createdAt: new Date().toISOString()
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
          throw new Error('Số điện thoại không hợp lệ. Vui lòng nhập đúng số di động Việt Nam (VD: 0987654321).');
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
      console.error(err);
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setError('Đăng nhập mạng xã hội thất bại. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (Absolute) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/10 hover:bg-black/20 md:bg-white/20 md:hover:bg-white/30 text-slate-700 md:text-white rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Forms */}
        <div className="w-full md:w-[60%] p-8 md:p-12 order-2 md:order-1 bg-white">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            {mode === 'login' ? 'Đăng nhập tài khoản' : 'Đăng ký tài khoản'}
          </h2>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#143472] focus:ring-1 focus:ring-[#143472] outline-none transition"
                      placeholder="Nhập họ tên của bạn"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#143472] focus:ring-1 focus:ring-[#143472] outline-none transition"
                      placeholder="Nhập số điện thoại hợp lệ"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email <span className="text-red-500">*</span></label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#143472] focus:ring-1 focus:ring-[#143472] outline-none transition"
                  placeholder="Nhập địa chỉ email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Mật khẩu <span className="text-red-500">*</span></label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#143472] focus:ring-1 focus:ring-[#143472] outline-none transition"
                  placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-[#143472] hover:bg-[#0f2858] text-white font-bold rounded-xl transition disabled:opacity-50 shadow-md"
            >
              {loading ? 'ĐANG XỬ LÝ...' : (mode === 'login' ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ')}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">Hoặc đăng nhập bằng</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleSocialAuth(facebookProvider)}
              className="flex items-center justify-center gap-2 py-2.5 bg-[#1877f2] hover:bg-[#1560c5] text-white rounded-xl transition font-semibold text-sm shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
            <button
              type="button"
              onClick={() => handleSocialAuth(googleProvider)}
              className="flex items-center justify-center gap-2 py-2.5 bg-[#ea4335] hover:bg-[#c53226] text-white rounded-xl transition font-semibold text-sm shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Google
            </button>
          </div>
        </div>

        {/* Right Column: Blue Side */}
        <div className="w-full md:w-[40%] bg-[#143472] text-white p-8 md:p-12 flex flex-col justify-center items-center text-center order-1 md:order-2">
          {mode === 'login' ? (
            <>
              <h3 className="text-3xl font-bold mb-4">Xin chào!</h3>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Bạn chưa có tài khoản? Hãy đăng ký ngay để trải nghiệm mua sắm dễ dàng và theo dõi đơn hàng tiện lợi.
              </p>
              <button
                type="button"
                onClick={() => { setMode('register'); setError(''); }}
                className="px-8 py-3 bg-transparent border-2 border-white rounded-xl font-bold hover:bg-white hover:text-[#143472] transition"
              >
                ĐĂNG KÝ NGAY
              </button>
            </>
          ) : (
            <>
              <h3 className="text-3xl font-bold mb-4">Chào mừng!</h3>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Nếu bạn đã có tài khoản, hãy đăng nhập để tiếp tục mua sắm các thiết bị y tế tốt nhất.
              </p>
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); }}
                className="px-8 py-3 bg-transparent border-2 border-white rounded-xl font-bold hover:bg-white hover:text-[#143472] transition"
              >
                ĐĂNG NHẬP
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
"""

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)

