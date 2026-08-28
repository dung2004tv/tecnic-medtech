import re

with open('server.ts', 'r') as f:
    content = f.read()

# Replace missing config block
old_missing = """    if (!smtpUser || !smtpPass) {
      return res.json({ 
        success: true, 
        channel: 'EMAIL',
        isFree: true,
        message: `[GMAIL OTP - MIỄN PHÍ] Mã OTP xác nhận tài khoản của bạn là: ${otpCode} (Hiệu lực 5 phút)`,
        mockOtp: otpCode
      });
    }"""

new_missing = """    if (!smtpUser || !smtpPass) {
      return res.status(500).json({ 
        success: false, 
        message: "Hệ thống chưa được cấu hình máy chủ gửi Email. Vui lòng cấu hình SMTP_USER và SMTP_PASS."
      });
    }"""

content = content.replace(old_missing, new_missing)

# Replace catch block
old_catch = """    } catch (err: any) {
      console.error("Nodemailer error:", err);
      return res.json({ 
        success: true, 
        channel: 'EMAIL',
        isFree: true,
        message: `[GMAIL OTP - MIỄN PHÍ] Mã OTP của bạn là: ${otpCode}`,
        mockOtp: otpCode
      });
    }"""

new_catch = """    } catch (err: any) {
      console.error("Nodemailer error:", err);
      return res.status(500).json({ 
        success: false, 
        message: "Lỗi gửi Email (Nodemailer). Vui lòng kiểm tra lại cấu hình mật khẩu ứng dụng Gmail."
      });
    }"""

content = content.replace(old_catch, new_catch)

# Replace mockOtp in success
old_success = """      return res.json({ 
        success: true, 
        channel: 'EMAIL',
        isFree: true,
        message: `Mã OTP đã được gửi MIỄN PHÍ đến hòm thư Gmail: ${email}`, 
        mockOtp: otpCode 
      });"""

new_success = """      return res.json({ 
        success: true, 
        channel: 'EMAIL',
        isFree: true,
        message: `Mã OTP đã được gửi thành công đến email: ${email}`
      });"""
content = content.replace(old_success, new_success)

# Replace SMS fallback mock
old_sms = """  // 2. PHONE SMS OTP: CUSTOMER PAYS CARRIER CHARGE
  if (phone) {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    return res.json({ 
      success: true, 
      channel: 'SMS',
      isFree: false,
      message: `[SMS OTP - CƯỚC VIỄN THÔNG TỰ TÚC] Mã OTP gửi tới số ${cleanPhone}: ${otpCode}. (Lưu ý: Phí SMS do khách hàng chi trả theo cước nhà mạng).`,
      mockOtp: otpCode
    });
  }"""

new_sms = """  // 2. PHONE SMS OTP
  if (phone) {
    return res.status(400).json({ 
      success: false, 
      message: "Gửi SMS OTP yêu cầu sử dụng Firebase Phone Auth ở phía Client."
    });
  }"""

content = content.replace(old_sms, new_sms)

with open('server.ts', 'w') as f:
    f.write(content)

with open('src/components/AuthModal.tsx', 'r') as f:
    auth_content = f.read()

old_auth_alert = """        if (data.success) {
          setOtpCountdown(60);
          setSuccessMessage(data.message || 'Mã OTP đã được gửi tới Gmail của bạn.');
          if (data.mockOtp) {
            alert('Hệ thống đang chạy chế độ thử nghiệm (Chưa cấu hình máy chủ Email).\\n\\nMã OTP của bạn là: ' + data.mockOtp);
          }
        }"""

new_auth_alert = """        if (data.success) {
          setOtpCountdown(60);
          setSuccessMessage(data.message || 'Mã OTP đã được gửi tới Gmail của bạn.');
        }"""

auth_content = auth_content.replace(old_auth_alert, new_auth_alert)
auth_content = auth_content.replace("alert('Hệ thống đang chạy chế độ thử nghiệm (Chưa cấu hình máy chủ Email).\\n\\nMã OTP của bạn là: ' + data.mockOtp);", "")
auth_content = auth_content.replace("if (data.mockOtp) {}", "")

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(auth_content)
