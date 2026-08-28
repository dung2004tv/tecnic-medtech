import re

with open('server.ts', 'r') as f:
    content = f.read()

old_transport = """      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });"""

new_transport = """      // Cấu hình linh hoạt: Mặc định dùng Gmail, nhưng hỗ trợ các dịch vụ lớn (SendGrid, SES...) khi có lượng khách hàng lớn
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });"""

content = content.replace(old_transport, new_transport)

with open('server.ts', 'w') as f:
    f.write(content)
