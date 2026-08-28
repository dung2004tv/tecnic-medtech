import re

with open('src/components/AuthModal.tsx', 'r') as f:
    content = f.read()

# Replace handleRegisterSubmit
new_register = """  const handleRegisterSubmit = async (e: React.FormEvent) => {
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
      if (otpChannel === 'phone' && confirmationResult) {
        await confirmationResult.confirm(regOtp);
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: regName,
          phone: regPhone,
          email: regEmail,
          password: regPassword,
          otp: regOtp,
          isFirebaseVerified: otpChannel === 'phone'
        })
      });
      const data = await response.json();

      if (data.success && data.data) {
        setSuccessMessage('Đăng ký tài khoản thành công! Tự động đăng nhập...');
        setTimeout(() => {
          onLoginSuccess(data.data);
          onClose();
        }, 1000);
      } else {
        setErrorMessage(data.message || 'Lỗi đăng ký tài khoản.');
      }
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/invalid-verification-code') {
        setErrorMessage('Mã OTP không chính xác. Vui lòng kiểm tra lại.');
      } else {
        setErrorMessage('Đã có lỗi xảy ra trong quá trình đăng ký.');
      }
    } finally {
      setIsLoading(false);
    }
  };"""

content = re.sub(
    r"  const handleRegisterSubmit = async \(e: React.FormEvent\) => \{.*?\n  \};\n", 
    new_register + "\n", 
    content, 
    flags=re.DOTALL
)

# Replace handleResetPasswordSubmit
new_reset = """  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (resetPassword !== resetPasswordConfirm) {
      setErrorMessage('Mật khẩu nhập lại không khớp!');
      return;
    }

    setIsLoading(true);
    try {
      if (otpChannel === 'phone' && confirmationResult) {
        await confirmationResult.confirm(resetOtp);
      }

      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: resetIdentifier,
          otp: resetOtp,
          newPassword: resetPassword,
          isFirebaseVerified: otpChannel === 'phone'
        })
      });
      const data = await response.json();

      if (data.success) {
        setSuccessMessage(data.message);
        setTimeout(() => {
          setMode('login');
        }, 2000);
      } else {
        setErrorMessage(data.message || 'Lỗi đặt lại mật khẩu.');
      }
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/invalid-verification-code') {
        setErrorMessage('Mã OTP không chính xác. Vui lòng kiểm tra lại.');
      } else {
        setErrorMessage('Đã có lỗi xảy ra.');
      }
    } finally {
      setIsLoading(false);
    }
  };"""

content = re.sub(
    r"  const handleResetPasswordSubmit = async \(e: React.FormEvent\) => \{.*?\n  \};\n", 
    new_reset + "\n", 
    content, 
    flags=re.DOTALL
)

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)
