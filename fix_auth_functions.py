import re

with open('src/components/AuthModal.tsx', 'r') as f:
    content = f.read()

# Replace the whole block of functions from handleRegisterNextStep to the end of handleRegisterSubmit

start_idx = content.find("  const handleRegisterNextStep = (e: React.FormEvent) => {")
# Find the next function which is handleResetPasswordSubmit
end_idx = content.find("  const handleResetPasswordSubmit = async (e: React.FormEvent) => {")

if start_idx != -1 and end_idx != -1:
    correct_functions = """  const handleRegisterNextStep = (e: React.FormEvent) => {
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

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regOtp) {
      setErrorMessage('Vui lòng nhập mã OTP xác thực để hoàn tất đăng ký.');
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
          fullName: fullName,
          phone: regPhone,
          email: regEmail,
          password: regPassword,
          otp: regOtp,
          isFirebaseVerified: otpChannel === 'phone'
        })
      });

      const data = await response.json();
      if (data.success) {
        onAuthSuccess(data.user);
        onClose();
      } else {
        setErrorMessage(data.message || 'Đăng ký thất bại.');
      }
    } catch (error: any) {
      console.error("Lỗi đăng ký:", error);
      setErrorMessage('Mã OTP không đúng hoặc đã hết hạn.');
    } finally {
      setIsLoading(false);
    }
  };

"""
    content = content[:start_idx] + correct_functions + content[end_idx:]
    
    with open('src/components/AuthModal.tsx', 'w') as f:
        f.write(content)
