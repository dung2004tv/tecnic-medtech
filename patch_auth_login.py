import re

with open('src/components/AuthModal.tsx', 'r') as f:
    content = f.read()

# Replace handleDirectLogin
import re
new_login = """  const handleDirectLogin = async (e: React.FormEvent) => {
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
      if (loginMethod === 'otp' && !identifier.includes('@') && confirmationResult) {
        // Verify Firebase OTP for Phone
        await confirmationResult.confirm(loginOtp);
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          identifier, 
          password: loginMethod === 'password' ? password : '', 
          otp: loginMethod === 'otp' ? (identifier.includes('@') ? loginOtp : '123456') : '',
          isFirebaseVerified: loginMethod === 'otp' && !identifier.includes('@')
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
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/invalid-verification-code') {
        setErrorMessage('Mã OTP không chính xác. Vui lòng kiểm tra lại.');
      } else {
        setErrorMessage('Đã có lỗi xảy ra trong quá trình đăng nhập.');
      }
    } finally {
      setIsLoading(false);
    }
  };"""

content = re.sub(
    r"  const handleDirectLogin = async \(e: React.FormEvent\) => \{.*?\n  \};\n", 
    new_login + "\n", 
    content, 
    flags=re.DOTALL
)

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)
