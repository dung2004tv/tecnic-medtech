import re

with open('src/components/AuthModal.tsx', 'r') as f:
    content = f.read()

# 1. Add handleRegisterNextStep
new_functions = """  const handleRegisterNextStep = (e: React.FormEvent) => {
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

    setRegStep(2);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {"""

content = re.sub(r'  const handleRegisterSubmit = async \(e: React\.FormEvent\) => \{', new_functions, content)

# Remove old validations from handleRegisterSubmit
content = re.sub(
    r"    const cleanPhone = regPhone.*?if \(!regOtp\) \{.*?return;\n    \}",
    r"""    if (!regOtp) {
      setErrorMessage('Vui lòng bấm "Gửi mã OTP" và nhập mã OTP xác thực để hoàn tất đăng ký.');
      return;
    }""",
    content,
    flags=re.DOTALL
)

# 2. Rewrite the form UI
old_form_start = """          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">"""

new_form_start = """          {mode === 'register' && (
            <form onSubmit={regStep === 1 ? handleRegisterNextStep : handleRegisterSubmit} className="space-y-3 text-xs">"""
            
content = content.replace(old_form_start, new_form_start)

# 3. Add conditional rendering inside the form
# We need to wrap everything before "XÁC THỰC MÃ OTP KHI ĐĂNG KÝ" with `{regStep === 1 ? (...) : (...) }`
# Wait, it's easier to just string replace the specific chunks.

old_step1_end_and_step2 = """              {/* XÁC THỰC MÃ OTP KHI ĐĂNG KÝ */}
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
                      Gmail
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
                      placeholder=""
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
                    ? '🟢 Mã OTP sẽ được gửi về Gmail của bạn.' 
                    : '📱 Mã OTP sẽ được gửi qua tin nhắn SMS.'}
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 bg-[#0071ba] hover:bg-[#143472] text-white font-black rounded-xl transition shadow-md uppercase tracking-wide cursor-pointer"
              >
                {isLoading ? 'Đang xác thực & tạo tài khoản...' : 'HOÀN TẤT ĐĂNG KÝ TÀI KHOẢN'}
              </button>"""

new_step1_end_and_step2 = """              {regStep === 1 && (
                <button
                  type="submit"
                  className="w-full mt-2 py-3 bg-[#0071ba] hover:bg-[#143472] text-white font-black rounded-xl transition shadow-md uppercase tracking-wide cursor-pointer flex justify-center items-center gap-2"
                >
                  TIẾP TỤC
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {regStep === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <button
                    type="button"
                    onClick={() => setRegStep(1)}
                    className="text-[#0071ba] font-bold text-xs flex items-center gap-1 mb-2 hover:underline"
                  >
                    <ChevronLeft className="w-4 h-4" /> Quay lại chỉnh sửa thông tin
                  </button>

                  {/* XÁC THỰC MÃ OTP KHI ĐĂNG KÝ */}
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-slate-800 text-sm flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-[#0071ba]" />
                        Kênh nhận mã OTP:
                      </label>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setOtpChannel('email')}
                          className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition ${
                            otpChannel === 'email' 
                              ? 'bg-emerald-600 text-white border-emerald-600' 
                              : 'bg-white text-slate-600 border-slate-200'
                          }`}
                        >
                          Gmail
                        </button>
                        <button
                          type="button"
                          onClick={() => setOtpChannel('phone')}
                          className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition ${
                            otpChannel === 'phone' 
                              ? 'bg-amber-600 text-white border-amber-600' 
                              : 'bg-white text-slate-600 border-slate-200'
                          }`}
                        >
                          SMS
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
                          placeholder=""
                          maxLength={6}
                          className="w-full border border-slate-300 pl-9 pr-3 py-2.5 rounded-xl text-center font-mono font-bold text-sm tracking-widest outline-none focus:ring-2 focus:ring-[#0071ba] bg-white"
                        />
                        <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      </div>
                      <button
                        type="button"
                        disabled={otpCountdown > 0 || isSendingOtp}
                        onClick={() => handleSendOtp(regEmail, regPhone, otpChannel)}
                        className="px-4 py-2.5 bg-[#0071ba] hover:bg-[#143472] text-white rounded-xl font-bold text-sm transition disabled:opacity-50 flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
                      >
                        {isSendingOtp ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : otpCountdown > 0 ? (
                          <span>Gửi lại ({otpCountdown}s)</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Gửi mã OTP</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 italic mt-1">
                      {otpChannel === 'email' 
                        ? '🟢 Mã OTP sẽ được gửi về Gmail của bạn.' 
                        : '📱 Mã OTP sẽ được gửi qua tin nhắn SMS của bạn.'}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-[#0071ba] hover:bg-[#143472] text-white font-black rounded-xl transition shadow-md uppercase tracking-wide cursor-pointer"
                  >
                    {isLoading ? 'Đang xác thực & tạo tài khoản...' : 'HOÀN TẤT ĐĂNG KÝ TÀI KHOẢN'}
                  </button>
                </div>
              )}"""

content = content.replace(old_step1_end_and_step2, new_step1_end_and_step2)

# Wrap step 1 fields in `{regStep === 1 && (`
content = content.replace(
"""              <div>
                <label className="font-bold text-slate-700 block mb-1">Loại hình khách hàng:</label>""",
"""              {regStep === 1 && (
                <div className="space-y-3 animate-fadeIn">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Loại hình khách hàng:</label>"""
)

# Close the `{regStep === 1 && (` before the new buttons
content = content.replace(
"""              {regStep === 1 && (
                <button
                  type="submit"
                  className="w-full mt-2 py-3 bg-[#0071ba] hover:bg-[#143472] text-white font-black rounded-xl transition shadow-md uppercase tracking-wide cursor-pointer flex justify-center items-center gap-2"
                >""",
"""                <button
                  type="submit"
                  className="w-full mt-2 py-3 bg-[#0071ba] hover:bg-[#143472] text-white font-black rounded-xl transition shadow-md uppercase tracking-wide cursor-pointer flex justify-center items-center gap-2"
                >"""
)
# Add closing div/parenthesis for step 1
content = content.replace(
"""                <button
                  type="submit"
                  className="w-full mt-2 py-3 bg-[#0071ba] hover:bg-[#143472] text-white font-black rounded-xl transition shadow-md uppercase tracking-wide cursor-pointer flex justify-center items-center gap-2"
                >
                  TIẾP TỤC
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}""",
"""                <button
                  type="submit"
                  className="w-full mt-2 py-3 bg-[#0071ba] hover:bg-[#143472] text-white font-black rounded-xl transition shadow-md uppercase tracking-wide cursor-pointer flex justify-center items-center gap-2"
                >
                  TIẾP TỤC
                  <ArrowRight className="w-4 h-4" />
                </button>
                </div>
              )}"""
)


with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)
