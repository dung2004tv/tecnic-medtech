import React, { useState, useEffect } from 'react';
import { 
  X, User as UserIcon, Phone, Mail, Lock, ShieldCheck, 
  KeyRound, Building2, Users, CheckCircle2, Eye, EyeOff, Sparkles, ArrowRight,
  Send, AlertCircle, Info, RefreshCw
} from 'lucide-react';
import { User, UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [selectedRole, setSelectedRole] = useState<'ADMIN' | 'STAFF' | 'CA_NHAN'>('ADMIN');
  const [showPassword, setShowPassword] = useState(false);
  
  // OTP channel preference: 'email' (Free) | 'phone' (Customer pays carrier fee)
  const [otpChannel, setOtpChannel] = useState<'email' | 'phone'>('email');
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  
  // Login fields
  const [identifier, setIdentifier] = useState('admin@tecnic.vn');
  const [password, setPassword] = useState('admin123');
  const [loginOtp, setLoginOtp] = useState('');

  // Register fields
  const [fullName, setFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regClinicName, setRegClinicName] = useState('');
  const [regAccountType, setRegAccountType] = useState<UserRole>('CA_NHAN');
  const [regOtp, setRegOtp] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Countdown timer for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  if (!isOpen) return null;

  const handleRoleSelect = (role: 'ADMIN' | 'STAFF' | 'CA_NHAN') => {
    setSelectedRole(role);
    setErrorMessage('');
    if (role === 'ADMIN') {
      setIdentifier('admin@tecnic.vn');
      setPassword('admin123');
      setLoginMethod('password');
    } else if (role === 'STAFF') {
      setIdentifier('nhanvien@tecnic.vn');
      setPassword('staff123');
      setLoginMethod('password');
    } else {
      setIdentifier('');
      setPassword('');
    }
  };

  // Send OTP handler
  const handleSendOtp = async (targetEmail: string, targetPhone: string, channel: 'email' | 'phone') => {
    setErrorMessage('');
    setSuccessMessage('');

    if (channel === 'email') {
      if (!targetEmail || !targetEmail.includes('@')) {
        setErrorMessage('Vui lòng nhập địa chỉ Email / Gmail hợp lệ để nhận OTP Miễn Phí.');
        return;
      }
    } else {
      const cleanPhone = targetPhone.replace(/[^0-9]/g, '');
      if (!cleanPhone || cleanPhone.length < 9) {
        setErrorMessage('Vui lòng nhập số điện thoại hợp lệ để nhận mã OTP qua SMS.');
        return;
      }
    }

    setIsSendingOtp(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          phone: targetPhone,
          method: channel
        })
      });
      const data = await res.json();
      if (data.success) {
        setOtpCountdown(60);
        if (channel === 'email') {
          setSuccessMessage(data.message || 'Mã OTP đã được gửi MIỄN PHÍ tới Gmail của bạn.');
        } else {
          setSuccessMessage(data.message || 'Mã OTP SMS đã được gửi. (Cước SMS viễn thông do khách hàng chi trả)');
        }
        if (data.mockOtp) {
          if (mode === 'login') setLoginOtp(data.mockOtp);
          if (mode === 'register') setRegOtp(data.mockOtp);
        }
      } else {
        setErrorMessage(data.message || 'Không thể gửi mã OTP. Vui lòng thử lại.');
      }
    } catch (err) {
      setErrorMessage('Lỗi kết nối máy chủ khi gửi OTP.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleDirectLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!identifier) {
      setErrorMessage('Vui lòng nhập số điện thoại hoặc email đã đăng ký.');
      return;
    }

    if (loginMethod === 'otp' && !loginOtp) {
      setErrorMessage('Vui lòng nhập mã OTP 6 số để xác thực đăng nhập.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          identifier, 
          password: loginMethod === 'password' ? password : '', 
          selectedRole,
          otp: loginMethod === 'otp' ? loginOtp : '123456'
        })
      });
      const data = await response.json();

      if (data.success && data.data) {
        setSuccessMessage(`Đăng nhập thành công! Chào mừng ${data.data.fullName}`);
        setTimeout(() => {
          onLoginSuccess(data.data);
          onClose();
        }, 400);
      } else {
        setErrorMessage(data.message || 'Tài khoản, mật khẩu hoặc mã OTP không chính xác.');
      }
    } catch (err) {
      setErrorMessage('Lỗi kết nối đến máy chủ.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanPhone = regPhone.replace(/[^0-9]/g, '');
    if (!/^0[35789][0-9]{8}$/.test(cleanPhone)) {
      setErrorMessage('Số điện thoại không hợp lệ! Vui lòng nhập số di động 10 số (03, 05, 07, 08, 09).');
      return;
    }

    if (!regEmail.includes('@')) {
      setErrorMessage('Địa chỉ Email/Gmail không hợp lệ.');
      return;
    }

    if (!regOtp) {
      setErrorMessage('Vui lòng bấm "Gửi mã OTP" và nhập mã OTP xác thực để hoàn tất đăng ký.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone: cleanPhone,
          email: regEmail,
          password: regPassword || '123456',
          address: regAddress,
          accountType: regAccountType,
          clinicName: regClinicName,
          otp: regOtp
        })
      });
      const data = await response.json();

      if (data.success && data.data) {
        setSuccessMessage('Đăng ký tài khoản thành công! Đang đăng nhập...');
        setTimeout(() => {
          onLoginSuccess(data.data);
          onClose();
        }, 500);
      } else {
        setErrorMessage(data.message || 'Đăng ký không thành công. Kiểm tra lại mã OTP.');
      }
    } catch (err) {
      setErrorMessage('Lỗi kết nối máy chủ.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white w-full max-w-lg rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER MODAL (Phong cách chuẩn TECNIC) */}
        <div className="bg-[#143472] text-white px-6 pt-5 pb-4 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-wide text-white flex items-center gap-2">
                Hệ Thống Xác Thực TECNIC
              </h2>
              <p className="text-[11px] text-blue-200">Bảo mật tài khoản & Đặt mua thiết bị y tế chính hãng</p>
            </div>
          </div>

          {/* MAIN TABS */}
          <div className="flex gap-2 mt-4 pt-2 border-t border-blue-900/60">
            <button
              onClick={() => { setMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition text-center ${
                mode === 'login' 
                  ? 'bg-amber-400 text-blue-950 shadow-md font-black' 
                  : 'bg-white/10 text-blue-200 hover:bg-white/15'
              }`}
            >
              ĐĂNG NHẬP HỆ THỐNG
            </button>
            <button
              onClick={() => { setMode('register'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition text-center ${
                mode === 'register' 
                  ? 'bg-amber-400 text-blue-950 shadow-md font-black' 
                  : 'bg-white/10 text-blue-200 hover:bg-white/15'
              }`}
            >
              ĐĂNG KÝ KHÁCH HÀNG
            </button>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        {errorMessage && (
          <div className="mx-6 mt-3 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="mx-6 mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-medium flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* BODY */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {mode === 'login' && (
            <form onSubmit={handleDirectLogin} className="space-y-4">
              
              {/* CHỌN LUỒNG VAI TRÒ ĐĂNG NHẬP */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Chọn vai trò đăng nhập:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('ADMIN')}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                      selectedRole === 'ADMIN'
                        ? 'border-amber-500 bg-amber-50/80 text-amber-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${selectedRole === 'ADMIN' ? 'bg-amber-400 text-blue-950' : 'bg-slate-200 text-slate-600'}`}>
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs">Quản trị viên</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect('STAFF')}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                      selectedRole === 'STAFF'
                        ? 'border-blue-600 bg-blue-50/80 text-blue-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${selectedRole === 'STAFF' ? 'bg-[#0071ba] text-white' : 'bg-slate-200 text-slate-600'}`}>
                      <Building2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs">Nhân viên</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect('CA_NHAN')}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                      selectedRole === 'CA_NHAN'
                        ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${selectedRole === 'CA_NHAN' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-xs">Khách hàng</span>
                  </button>
                </div>
              </div>

              {/* LOGIN METHOD TOGGLE (MẬT KHẨU HOẶC MÃ OTP) */}
              {selectedRole === 'CA_NHAN' && (
                <div className="flex bg-slate-100 p-1 rounded-xl gap-1 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setLoginMethod('password')}
                    className={`flex-1 py-1.5 rounded-lg transition ${
                      loginMethod === 'password'
                        ? 'bg-white text-[#143472] shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Đăng nhập bằng Mật khẩu
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMethod('otp')}
                    className={`flex-1 py-1.5 rounded-lg transition ${
                      loginMethod === 'otp'
                        ? 'bg-white text-[#0071ba] shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Đăng nhập bằng mã OTP
                  </button>
                </div>
              )}

              {/* INPUT FIELDS */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Số điện thoại hoặc Email đã đăng ký <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      required
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={selectedRole === 'ADMIN' ? 'admin@tecnic.vn' : selectedRole === 'STAFF' ? 'nhanvien@tecnic.vn' : 'Ví dụ: 0912345678 hoặc email@gmail.com'}
                      className="w-full border border-slate-300 pl-9 pr-3 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba] focus:border-transparent text-slate-800 font-medium"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                {loginMethod === 'password' ? (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-bold text-slate-700">
                        Mật khẩu bảo mật <span className="text-red-500">*</span>
                      </label>
                      <button 
                        type="button" 
                        onClick={() => alert("Vui lòng liên hệ Hotline TECNIC: 034 84 02466 để được hỗ trợ cấp lại mật khẩu.")}
                        className="text-[11px] text-[#0071ba] hover:underline"
                      >
                        Quên mật khẩu?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        required
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu..."
                        className="w-full border border-slate-300 pl-9 pr-10 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba] focus:border-transparent text-slate-800 font-medium"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* OTP LOGIN BLOCK */
                  <div className="space-y-2 bg-blue-50/60 p-3.5 rounded-2xl border border-blue-100">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-slate-800 text-[11px]">Chọn kênh nhận mã OTP:</label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setOtpChannel('email')}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition ${
                            otpChannel === 'email' 
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                              : 'bg-white text-slate-600 border-slate-300'
                          }`}
                        >
                          Gmail (Free 100%)
                        </button>
                        <button
                          type="button"
                          onClick={() => setOtpChannel('phone')}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition ${
                            otpChannel === 'phone' 
                              ? 'bg-amber-600 text-white border-amber-600 shadow-xs' 
                              : 'bg-white text-slate-600 border-slate-300'
                          }`}
                        >
                          SMS (Có cước phí)
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={loginOtp}
                          onChange={(e) => setLoginOtp(e.target.value)}
                          placeholder="Nhập mã OTP 6 số..."
                          maxLength={6}
                          className="w-full border border-slate-300 pl-8 pr-3 py-2 rounded-xl text-center font-mono font-bold text-base tracking-widest outline-none focus:ring-2 focus:ring-[#0071ba] bg-white"
                        />
                        <KeyRound className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
                      </div>
                      <button
                        type="button"
                        disabled={otpCountdown > 0 || isSendingOtp}
                        onClick={() => handleSendOtp(identifier.includes('@') ? identifier : '', !identifier.includes('@') ? identifier : '', otpChannel)}
                        className="px-3.5 py-2 bg-[#0071ba] hover:bg-[#143472] text-white rounded-xl font-bold text-xs transition disabled:opacity-50 flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                      >
                        {isSendingOtp ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : otpCountdown > 0 ? (
                          <span>Gửi lại ({otpCountdown}s)</span>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Gửi mã OTP</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[10px] text-slate-500 italic">
                      {otpChannel === 'email' ? '🟢 Gửi mã OTP xác thực qua Gmail hoàn toàn Miễn phí.' : '📱 Gửi qua SMS: Khách hàng tự thanh toán cước tin nhắn theo bảng giá nhà mạng viễn thông.'}
                    </p>
                  </div>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#0071ba] hover:bg-[#143472] text-white font-black rounded-xl transition shadow-md flex items-center justify-center gap-2 text-sm uppercase tracking-wide cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Đang xử lý đăng nhập...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-amber-300" />
                    ĐĂNG NHẬP HỆ THỐNG
                  </>
                )}
              </button>
            </form>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Loại hình khách hàng:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegAccountType('CA_NHAN')}
                    className={`p-2 rounded-xl border text-center font-bold ${
                      regAccountType === 'CA_NHAN' ? 'border-[#0071ba] bg-blue-50 text-[#0071ba]' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Khách hàng cá nhân
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegAccountType('DAI_LY')}
                    className={`p-2 rounded-xl border text-center font-bold ${
                      regAccountType === 'DAI_LY' ? 'border-[#0071ba] bg-blue-50 text-[#0071ba]' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Đại lý / Doanh nghiệp / Tổ chức
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Họ và tên khách hàng <span className="text-red-500">*</span></label>
                <input
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ví dụ: Bác sĩ Nguyễn Văn Long"
                  className="w-full border border-slate-300 px-3 py-2 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Số điện thoại di động <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="0912345678"
                    className="w-full border border-slate-300 px-3 py-2 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email / Gmail <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="nguyenvanlong@gmail.com"
                    className="w-full border border-slate-300 px-3 py-2 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                  />
                </div>
              </div>

              {regAccountType === 'DAI_LY' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tên Công ty / Phòng khám / Đại lý:</label>
                  <input
                    type="text"
                    value={regClinicName}
                    onChange={(e) => setRegClinicName(e.target.value)}
                    placeholder="Công ty Thiết bị Y tế Hoàng Long..."
                    className="w-full border border-slate-300 px-3 py-2 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                  />
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 block mb-1">Địa chỉ nhận thiết bị / giao hàng:</label>
                <input
                  type="text"
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  placeholder="Số nhà, đường phố, quận huyện, tỉnh thành..."
                  className="w-full border border-slate-300 px-3 py-2 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Mật khẩu đăng nhập <span className="text-red-500">*</span></label>
                <input
                  required
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Nhập mật khẩu ít nhất 6 ký tự..."
                  className="w-full border border-slate-300 px-3 py-2 rounded-xl outline-none focus:ring-2 focus:ring-[#0071ba]"
                />
              </div>

              {/* XÁC THỰC MÃ OTP KHI ĐĂNG KÝ */}
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0071ba]" />
                    Xác thực tài khoản (OTP) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setOtpChannel('email')}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition ${
                        otpChannel === 'email' 
                          ? 'bg-emerald-600 text-white border-emerald-600' 
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      Gmail (Free 100%)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtpChannel('phone')}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition ${
                        otpChannel === 'phone' 
                          ? 'bg-amber-600 text-white border-amber-600' 
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      SMS (Khách trả phí)
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      required
                      type="text"
                      value={regOtp}
                      onChange={(e) => setRegOtp(e.target.value)}
                      placeholder="Nhập mã OTP..."
                      maxLength={6}
                      className="w-full border border-slate-300 pl-8 pr-3 py-1.5 rounded-xl text-center font-mono font-bold text-sm tracking-widest outline-none focus:ring-2 focus:ring-[#0071ba] bg-white"
                    />
                    <KeyRound className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                  <button
                    type="button"
                    disabled={otpCountdown > 0 || isSendingOtp}
                    onClick={() => handleSendOtp(regEmail, regPhone, otpChannel)}
                    className="px-3 py-1.5 bg-[#0071ba] hover:bg-[#143472] text-white rounded-xl font-bold text-xs transition disabled:opacity-50 flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
                  >
                    {isSendingOtp ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : otpCountdown > 0 ? (
                      <span>Gửi lại ({otpCountdown}s)</span>
                    ) : (
                      <>
                        <Send className="w-3 h-3" />
                        <span>Gửi mã OTP</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[10px] text-slate-500 italic">
                  {otpChannel === 'email' 
                    ? '🟢 Mã OTP gửi về Gmail hoàn toàn Miễn phí.' 
                    : '📱 Mã OTP gửi qua tin nhắn SMS: Khách hàng tự thanh toán cước viễn thông.'}
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 bg-[#0071ba] hover:bg-[#143472] text-white font-black rounded-xl transition shadow-md uppercase tracking-wide cursor-pointer"
              >
                {isLoading ? 'Đang xác thực & tạo tài khoản...' : 'HOÀN TẤT ĐĂNG KÝ TÀI KHOẢN'}
              </button>
            </form>
          )}

        </div>

        {/* FOOTER NOTE */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 text-center text-[11px] text-slate-500">
          Tổng đài hỗ trợ kỹ thuật & phân quyền: <b className="text-[#0071ba]">034 840 2466</b> (24/7)
        </div>
      </div>
    </div>
  );
};

