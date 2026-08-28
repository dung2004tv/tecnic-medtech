import re

with open('src/components/AuthModal.tsx', 'r') as f:
    content = f.read()

old_logic = """        if (data.success) {
          setOtpCountdown(60);
          setSuccessMessage(data.message || 'Mã OTP đã được gửi tới Gmail của bạn.');
        } else {"""

new_logic = """        if (data.success) {
          setOtpCountdown(60);
          setSuccessMessage(data.message || 'Mã OTP đã được gửi tới Gmail của bạn.');
          if (data.mockOtp) {
            alert('Hệ thống đang chạy chế độ thử nghiệm (Chưa cấu hình máy chủ Email).\n\nMã OTP của bạn là: ' + data.mockOtp);
          }
        } else {"""

content = content.replace(old_logic, new_logic)

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)
