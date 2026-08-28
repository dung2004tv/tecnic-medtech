import re

with open('src/components/AuthModal.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "alert('Hệ thống đang chạy chế độ thử nghiệm (Chưa cấu hình máy chủ Email).\n\nMã OTP của bạn là: ' + data.mockOtp);",
    "alert('Hệ thống đang chạy chế độ thử nghiệm (Chưa cấu hình máy chủ Email).\\n\\nMã OTP của bạn là: ' + data.mockOtp);"
)

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)
