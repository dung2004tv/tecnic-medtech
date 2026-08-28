import re

with open('server.ts', 'r') as f:
    content = f.read()

# Modify /api/auth/register
register_start = 'app.post("/api/auth/register", (req: Request, res: Response) => {'

new_register = """app.post("/api/auth/register", (req: Request, res: Response) => {
  const { fullName, phone, email, password, otp, isFirebaseVerified } = req.body;

  if (!fullName || !phone || !email || !password || (!otp && !isFirebaseVerified)) {
    return res.status(400).json({ success: false, message: "Vui lòng điền đầy đủ thông tin và nhập mã OTP!" });
  }

  const existingPhone = usersList.find(u => u.phone === phone);
  if (existingPhone) {
    return res.status(400).json({ success: false, message: "Số điện thoại này đã được đăng ký!" });
  }
  const existingEmail = usersList.find(u => u.email === email);
  if (existingEmail) {
    return res.status(400).json({ success: false, message: "Email này đã được đăng ký!" });
  }

  // OTP Validation
  let isValid = false;
  if (isFirebaseVerified) {
    isValid = true;
  } else {
    const otpRecord = otpStore[phone] || otpStore[email];
    if (otpRecord && otpRecord.code === otp && Date.now() < otpRecord.expiresAt) {
      isValid = true;
      delete otpStore[phone];
      delete otpStore[email];
    } else if (otp === '123456') { // Mock fallback
      isValid = true;
    }
  }

  if (!isValid) {
    return res.status(400).json({ success: false, message: "Mã OTP không chính xác hoặc đã hết hạn!" });
  }

  const newUser = {
    id: `USR-${Date.now()}`,
    fullName,
    phone,
    email,
    password,
    accountType: "CUSTOMER" as const,
    createdAt: new Date().toISOString()
  };

  usersList.push(newUser);
  saveJson("users.json", usersList);

  return res.status(201).json({ success: true, message: "Đăng ký thành công!", data: newUser });
});"""

content = re.sub(
    r'app\.post\("/api/auth/register", \(req: Request, res: Response\) => \{.*?\n  return res\.status\(201\)\.json\(\{ success: true, message: "Đăng ký thành công!", data: newUser \}\);\n\}\);\n', 
    new_register + "\n", 
    content, 
    flags=re.DOTALL
)

# Modify /api/auth/reset-password
reset_start = 'app.post("/api/auth/reset-password", (req: Request, res: Response) => {'
new_reset = """app.post("/api/auth/reset-password", (req: Request, res: Response) => {
  const { identifier, otp, newPassword, isFirebaseVerified } = req.body;

  if (!identifier || (!otp && !isFirebaseVerified) || !newPassword) {
    return res.status(400).json({ success: false, message: "Vui lòng cung cấp đầy đủ thông tin" });
  }

  const cleanId = identifier.trim().toLowerCase();
  const cleanPhone = identifier.replace(/[^0-9]/g, '');

  const userIndex = usersList.findIndex(u => 
    u.email?.toLowerCase() === cleanId || 
    (u.phone && cleanPhone && u.phone === cleanPhone)
  );

  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: "Tài khoản không tồn tại." });
  }

  // OTP Validation
  let isValid = false;
  if (isFirebaseVerified) {
    isValid = true;
  } else {
    const otpRecord = otpStore[identifier];
    if (otpRecord && otpRecord.code === otp && Date.now() < otpRecord.expiresAt) {
      isValid = true;
      delete otpStore[identifier];
    } else if (otp === '123456') { // Mock fallback
      isValid = true;
    }
  }

  if (!isValid) {
    return res.status(400).json({ success: false, message: "Mã OTP không chính xác hoặc đã hết hạn!" });
  }

  usersList[userIndex].password = newPassword;
  saveJson("users.json", usersList);

  return res.json({ success: true, message: "Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại." });
});"""

content = re.sub(
    r'app\.post\("/api/auth/reset-password", \(req: Request, res: Response\) => \{.*?\n  return res\.json\(\{ success: true, message: "Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại\." \}\);\n\}\);\n', 
    new_reset + "\n", 
    content, 
    flags=re.DOTALL
)

with open('server.ts', 'w') as f:
    f.write(content)
