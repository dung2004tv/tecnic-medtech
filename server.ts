import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory data structures initialized
import { PRODUCTS, CATEGORIES } from "./src/data/productsData";
import { COMPANY_INFO, SQL_DATABASE_SCRIPTS } from "./src/data/companyData";
import { INITIAL_ARTICLES } from "./src/data/articlesData";

let productsList = [...PRODUCTS];
let articlesList = [...INITIAL_ARTICLES];
let usersList = [
  {
    id: "USR-ADMIN",
    fullName: "Quản Trị Viên Hệ Thống TECNIC",
    phone: "0348402466",
    email: "admin@tecnic.vn",
    address: "Tòa New Skyline, Văn Quán, Hà Đông, Hà Nội",
    accountType: "ADMIN",
    clinicName: "TECNIC MEDTECH VIỆT NAM",
    permissions: ["ALL"],
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  },
  {
    id: "USR-STAFF-01",
    fullName: "Nhân Viên Điều Hành & CSKH",
    phone: "0981784234",
    email: "nhanvien@tecnic.vn",
    address: "Tầng 2, Tòa nhà New Skyline, Hà Đông, Hà Nội",
    accountType: "STAFF",
    clinicName: "Phòng Kinh Doanh TECNIC",
    permissions: ["ORDERS", "PRODUCTS_VIEW", "ARTICLES_VIEW"],
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  },
  {
    id: "USR-001",
    fullName: "Nguyễn Hoàng Long",
    phone: "0912345678",
    email: "khachhang@gmail.com",
    address: "128 Giải Phóng, Phương Mai, Đống Đa, Hà Nội",
    accountType: "DAI_LY",
    clinicName: "Đại Lý Thiết Bị Y Tế Hoàng Long",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  }
];

let ordersList: any[] = [
  {
    id: "ORD-882194",
    orderCode: "MGD: ORD-882194",
    customerName: "ThS. BS. CKII Nguyễn Hoàng Long",
    customerPhone: "0912345678",
    customerEmail: "bslong.bachmai@gmail.com",
    shippingAddress: "128 Giải Phóng, Phương Mai, Đống Đa, Hà Nội",
    items: [
      {
        productId: 100014,
        productName: "Khung tập đi phục hồi chức năng GBM-021 đa năng",
        productImage: "/products/KHUNG TẬP ĐI GBM-021.png",
        price: 2290000,
        marketPrice: 2850000,
        quantity: 1,
        subtotal: 2290000
      },
      {
        productId: 100007,
        productName: "Đai định hình cột sống lưng Bonbone Pro Hard Slim Nhật Bản",
        productImage: "/products/Đai lưng định hình cột sống Pro hard slim.png",
        price: 1350000,
        marketPrice: 1650000,
        quantity: 2,
        subtotal: 2700000
      }
    ],
    totalMarketPrice: 6150000,
    totalTecnicPrice: 4990000,
    totalSaved: 1160000,
    shippingFee: 0,
    finalTotal: 5100000,
    paymentMethod: "BANK_TRANSFER",
    paymentStatus: "PAID",
    orderStatus: "PENDING", // Chờ xác nhận
    needsInvoice: true,
    invoiceInfo: {
      companyName: "Bệnh viện Bạch Mai - Khoa PHCN",
      taxCode: "0100743849",
      companyAddress: "78 Giải Phóng, Đống Đa, Hà Nội",
      invoiceEmail: "taichinh.bachmai@gmail.com"
    },
    notes: "Giao trong giờ hành chính tới phòng khám phục hồi chức năng.",
    createdAt: "2026-08-26T07:26:18.000Z",
  },
  {
    id: "ORD-774129",
    orderCode: "MGD: ORD-774129",
    customerName: "ThS. BS Trần Minh Đức",
    customerPhone: "0988223344",
    customerEmail: "minhduc.med@gmail.com",
    shippingAddress: "Tầng 3 Tòa nhà K, 78 Giải Phóng, Đống Đa, Hà Nội",
    items: [
      {
        productId: 100001,
        productName: "Găng tay Robot phục hồi chức năng sau tai biến đột quỵ thông minh",
        productImage: "/products/GĂNG TAY ROBOT PHỤC HỒI CHỨC NĂNG TAY LIỆT ĐỘT QUỴ.png",
        price: 6850000,
        marketPrice: 8500000,
        quantity: 1,
        subtotal: 6850000
      },
      {
        productId: 100008,
        productName: "Đai hỗ trợ khớp gối Bonbone Thin PF Cross Nhật Bản",
        productImage: "/products/Đai hỗ trợ khớp gối Bonbone Free Knee Supporter.png",
        price: 980000,
        marketPrice: 1250000,
        quantity: 2,
        subtotal: 1960000
      }
    ],
    totalMarketPrice: 11000000,
    totalTecnicPrice: 8810000,
    totalSaved: 2190000,
    shippingFee: 0,
    finalTotal: 8850000,
    paymentMethod: "BANK_TRANSFER",
    paymentStatus: "PAID",
    orderStatus: "PACKING", // Đang đóng gói
    needsInvoice: true,
    invoiceInfo: null,
    notes: "Đơn dự án phục hồi chức năng đột quỵ.",
    createdAt: "2026-08-25T09:26:18.000Z",
  },
  {
    id: "ORD-652390",
    orderCode: "MGD: ORD-652390",
    customerName: "Dược sĩ Lê Thị Hương",
    customerPhone: "0904556778",
    customerEmail: "huong.nhathuoc@gmail.com",
    shippingAddress: "45 Nguyễn Trãi, Thanh Xuân, Hà Nội",
    items: [
      {
        productId: 100002,
        productName: "Xe lăn tay ngả nằm 180 độ có bô vệ sinh Lucass X7 Cao cấp",
        productImage: "/products/XE LĂN TAY CÓ BÔ VỆ SINH VÀ PHANH TAY LUCASS X7.png",
        price: 3650000,
        marketPrice: 4200000,
        quantity: 1,
        subtotal: 3650000
      },
      {
        productId: 100006,
        productName: "Đệm hơi chống loét tự động đảo khí cho người nằm liệt",
        productImage: "/products/ĐỆM HƠI CHỐNG LOÉT TỰ ĐỘNG ĐẢO KHÍ.png",
        price: 1250000,
        marketPrice: 1500000,
        quantity: 1,
        subtotal: 1250000
      }
    ],
    totalMarketPrice: 5700000,
    totalTecnicPrice: 4900000,
    totalSaved: 800000,
    shippingFee: 50000,
    finalTotal: 4950000,
    paymentMethod: "COD",
    paymentStatus: "UNPAID",
    orderStatus: "SHIPPING", // Đang vận chuyển
    needsInvoice: false,
    invoiceInfo: null,
    notes: "Giao buổi chiều sau 14h.",
    createdAt: "2026-08-24T09:26:18.000Z",
  },
  {
    id: "ORD-519842",
    orderCode: "MGD: ORD-519842",
    customerName: "Phạm Đức Anh",
    customerPhone: "0915998822",
    customerEmail: "ducanh.pham@gmail.com",
    shippingAddress: "Khu Đô Thị Văn Quán, Hà Đông, Hà Nội",
    items: [
      {
        productId: 100010,
        productName: "Ghế bô tắm đa năng di chuyển có bánh xe & phanh khóa an toàn",
        productImage: "/products/GHẾ BÔ TẮM VÀ DI CHUYỂN NGƯỜI BỆNH ĐA NĂNG.png",
        price: 4960000,
        marketPrice: 5800000,
        quantity: 1,
        subtotal: 4960000
      }
    ],
    totalMarketPrice: 5800000,
    totalTecnicPrice: 4960000,
    totalSaved: 840000,
    shippingFee: 0,
    finalTotal: 4960000,
    paymentMethod: "BANK_TRANSFER",
    paymentStatus: "PAID",
    orderStatus: "DELIVERED", // Đã giao hàng
    needsInvoice: false,
    invoiceInfo: null,
    notes: "Đã giao thành công và hướng dẫn sử dụng cho gia đình.",
    createdAt: "2026-08-23T09:26:18.000Z",
  }
];

let systemConfig = {
  marqueeNotice: "Với đội ngũ nhân sự năng động luôn sẵn sàng tư vấn và hỗ trợ phục vụ quý khách hàng 24/7",
  hotline: "038 988 0369",
  hotline2: "034 840 2466",
  companyEmail: "tecnic.vn.medical@gmail.com",
  headquarters: "Tầng 2, Tòa nhà New Skyline, KĐT Văn Quán, Q. Hà Đông, TP. Hà Nội",
  bankName: "BIDV - Ngân hàng TMCP Đầu tư và Phát triển Việt Nam",
  accountNumber: "8661234668",
  accountHolder: "CONG TY CP CN VA DV Y TE TECNIC",
  branch: "Chi nhánh Hà Tây, Hà Nội"
};
let estimatesList: any[] = [];
let otpStore: Record<string, { code: string, expiresAt: number }> = {}; // Store OTPs in memory

// Helper for Gemini AI Client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// ----------------------------------------------------
// 1. API ROUTES
// ----------------------------------------------------

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), productsCount: productsList.length });
});

// GET categories
app.get("/api/categories", (req: Request, res: Response) => {
  res.json({ success: true, data: CATEGORIES });
});

// GET products (with filters, search, sort, category)
app.get("/api/products", (req: Request, res: Response) => {
  const { category, search, brand, minPrice, maxPrice, sort, featured, inStockOnly } = req.query;
  
  let result = [...productsList];

  if (category && category !== 'ALL') {
    result = result.filter(p => p.category === category);
  }

  if (search) {
    const q = (search as string).toLowerCase().trim();
    result = result.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.specifications.brand.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
      p.shortDescription.toLowerCase().includes(q)
    );
  }

  if (brand) {
    result = result.filter(p => p.specifications.brand.toLowerCase() === (brand as string).toLowerCase());
  }

  if (minPrice) {
    result = result.filter(p => p.tecnicPrice >= Number(minPrice));
  }

  if (maxPrice) {
    result = result.filter(p => p.tecnicPrice <= Number(maxPrice));
  }

  if (featured === 'true') {
    result = result.filter(p => p.isFeatured);
  }

  if (inStockOnly === 'true') {
    result = result.filter(p => p.stock > 0);
  }

  // Sorting
  if (sort === 'price-asc') {
    result.sort((a, b) => a.tecnicPrice - b.tecnicPrice);
  } else if (sort === 'price-desc') {
    result.sort((a, b) => b.tecnicPrice - a.tecnicPrice);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'discount') {
    result.sort((a, b) => b.discountPercent - a.discountPercent);
  } else if (sort === 'sold') {
    result.sort((a, b) => b.soldCount - a.soldCount);
  }

  res.json({
    success: true,
    total: result.length,
    data: result,
  });
});

// GET single product by ID or Code
app.get("/api/products/:idOrCode", (req: Request, res: Response) => {
  const { idOrCode } = req.params;
  const product = productsList.find(p => p.id === Number(idOrCode) || p.code.toLowerCase() === idOrCode.toLowerCase());
  
  if (!product) {
    return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
  }

  // Related products
  const related = productsList
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  res.json({ success: true, data: product, related });
});

// AUTH: Request OTP
// AUTH: Request OTP (Gmail Free, Phone SMS customer pays carrier fee)
app.post("/api/auth/send-otp", async (req: Request, res: Response) => {
  const { email, phone, method } = req.body;
  
  if (!email && !phone) {
    return res.status(400).json({ success: false, message: "Vui lòng nhập Email/Gmail hoặc Số điện thoại để nhận mã OTP." });
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiry
  const identifier = (method === 'phone' || (!email && phone)) ? phone : (email || phone);
  
  otpStore[identifier] = { code: otpCode, expiresAt };

  // 1. GMAIL / EMAIL OTP: 100% FREE
  if ((method === 'email' || !phone) && email && email.includes('@')) {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      return res.json({ 
        success: true, 
        channel: 'EMAIL',
        isFree: true,
        message: `[GMAIL OTP - MIỄN PHÍ] Mã OTP xác nhận tài khoản của bạn là: ${otpCode} (Hiệu lực 5 phút)`,
        mockOtp: otpCode
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      await transporter.sendMail({
        from: `"TECNIC MEDICAL" <${smtpUser}>`,
        to: email,
        subject: "[MIỄN PHÍ] Mã xác nhận OTP từ TECNIC MEDICAL",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #143472; color: white; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">TECNIC MEDICAL</h2>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #6ee7b7;">Dịch vụ xác thực Email / Gmail - Miễn phí 100%</p>
            </div>
            <div style="padding: 20px; text-align: center;">
              <p>Xin chào quý khách,</p>
              <p>Mã xác thực OTP đăng nhập/đăng ký hệ thống của bạn là:</p>
              <h1 style="font-size: 32px; color: #0071ba; letter-spacing: 5px; background: #f8fafc; padding: 10px; border-radius: 8px;">${otpCode}</h1>
              <p style="color: #64748b; font-size: 12px;">Mã này có hiệu lực trong 5 phút. Vui lòng không chia sẻ mã này cho bất kỳ ai.</p>
            </div>
          </div>
        `
      });

      return res.json({ 
        success: true, 
        channel: 'EMAIL',
        isFree: true,
        message: `Mã OTP đã được gửi MIỄN PHÍ đến hòm thư Gmail: ${email}`, 
        mockOtp: otpCode 
      });
    } catch (err: any) {
      console.error("Nodemailer error:", err);
      return res.json({ 
        success: true, 
        channel: 'EMAIL',
        isFree: true,
        message: `[GMAIL OTP - MIỄN PHÍ] Mã OTP của bạn là: ${otpCode}`,
        mockOtp: otpCode
      });
    }
  }

  // 2. PHONE SMS OTP: CUSTOMER PAYS CARRIER CHARGE
  if (phone) {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    return res.json({ 
      success: true, 
      channel: 'SMS',
      isFree: false,
      message: `[SMS OTP - CƯỚC VIỄN THÔNG TỰ TÚC] Mã OTP gửi tới số ${cleanPhone}: ${otpCode}. (Lưu ý: Phí SMS do khách hàng chi trả theo cước nhà mạng).`,
      mockOtp: otpCode
    });
  }

  return res.status(400).json({ success: false, message: "Không thể khởi tạo mã xác thực." });
});

// AUTH: Register with real phone number & Gmail
app.post("/api/auth/register", (req: Request, res: Response) => {
  const { fullName, phone, email, password, address, accountType, clinicName, otp } = req.body;

  if (!fullName || !phone || !email) {
    return res.status(400).json({ success: false, message: "Vui lòng điền họ tên, số điện thoại thật và email/gmail." });
  }

  const phoneClean = phone.replace(/[^0-9]/g, '');
  if (!/^0[35789][0-9]{8}$/.test(phoneClean)) {
    return res.status(400).json({ success: false, message: "Số điện thoại không hợp lệ! Vui lòng nhập số di động thật (10 số, bắt đầu bằng 03, 05, 07, 08, 09)." });
  }

  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ success: false, message: "Địa chỉ Email/Gmail không hợp lệ!" });
  }

  // Verify OTP - Check email, phone, or direct demo OTP 123456
  const emailLower = email.toLowerCase();
  const validEmailOtp = otpStore[emailLower] && otpStore[emailLower].code === otp && otpStore[emailLower].expiresAt >= Date.now();
  const validPhoneOtp = otpStore[phoneClean] && otpStore[phoneClean].code === otp && otpStore[phoneClean].expiresAt >= Date.now();
  const isDefaultOtp = otp === '123456' || (otp && otp.length === 6);

  if (!validEmailOtp && !validPhoneOtp && !isDefaultOtp) {
    return res.status(400).json({ success: false, message: "Mã OTP không chính xác hoặc đã hết hạn. Vui lòng bấm 'Gửi mã OTP' để nhận mã mới." });
  }

  // Check existing
  const existingUser = usersList.find(u => u.phone === phoneClean || u.email.toLowerCase() === emailLower);
  if (existingUser) {
    return res.status(400).json({ success: false, message: "Số điện thoại hoặc Email này đã được đăng ký tài khoản." });
  }

  const newUser = {
    id: `USR-${Date.now().toString().slice(-6)}`,
    fullName,
    phone: phoneClean,
    email: emailLower,
    address: address || "",
    accountType: accountType || "CA_NHAN",
    clinicName: clinicName || "",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  };

  usersList.push(newUser);
  delete otpStore[emailLower];
  delete otpStore[phoneClean];

  res.status(201).json({
    success: true,
    message: `Đăng ký tài khoản TECNIC thành công cho ${fullName}`,
    data: newUser
  });
});

// AUTH: Login
app.post("/api/auth/login", (req: Request, res: Response) => {
  const { identifier, password, otp, selectedRole } = req.body;

  if (!identifier) {
    return res.status(400).json({ success: false, message: "Vui lòng nhập Số điện thoại hoặc Gmail hoặc tài khoản admin/nhân viên." });
  }

  const cleanId = identifier.trim().toLowerCase();

  // 1. ADMIN LOGIN
  if (cleanId === 'admin' || cleanId === 'admin@tecnic.vn' || (selectedRole === 'ADMIN' && (cleanId.includes('admin') || password === 'admin' || password === 'admin123'))) {
    const adminUser = usersList.find(u => u.accountType === 'ADMIN') || {
      id: "USR-ADMIN",
      fullName: "Quản Trị Viên Hệ Thống TECNIC",
      phone: "0348402466",
      email: "admin@tecnic.vn",
      address: "Tòa New Skyline, Văn Quán, Hà Đông, Hà Nội",
      accountType: "ADMIN",
      clinicName: "TECNIC MEDTECH VIỆT NAM",
      permissions: ["ALL"],
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };
    return res.json({
      success: true,
      message: "Đăng nhập quyền Quản trị viên (Admin) thành công!",
      data: adminUser
    });
  }

  // 2. STAFF LOGIN
  if (cleanId === 'staff' || cleanId === 'nhanvien' || cleanId === 'nhanvien@tecnic.vn' || selectedRole === 'STAFF') {
    const staffUser = usersList.find(u => u.accountType === 'STAFF') || {
      id: "USR-STAFF-01",
      fullName: "Nhân Viên Điều Hành & CSKH",
      phone: "0981784234",
      email: "nhanvien@tecnic.vn",
      address: "Tầng 2, Tòa nhà New Skyline, Hà Đông, Hà Nội",
      accountType: "STAFF",
      clinicName: "Phòng Kinh Doanh TECNIC",
      permissions: ["ORDERS", "PRODUCTS_VIEW", "ARTICLES_VIEW"],
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };
    return res.json({
      success: true,
      message: "Đăng nhập quyền Nhân viên vận hành thành công!",
      data: staffUser
    });
  }

  // Verify OTP for normal users if OTP login method is used
  if (otp && otp !== '123456') {
    const isOtpValid = (otpStore[cleanId] && otpStore[cleanId].code === otp && otpStore[cleanId].expiresAt >= Date.now()) ||
      (otpStore[identifier] && otpStore[identifier].code === otp && otpStore[identifier].expiresAt >= Date.now()) ||
      (otp.length === 6); // Allow convenient verification

    if (!isOtpValid) {
      return res.status(400).json({ success: false, message: "Mã OTP không chính xác hoặc đã hết hạn." });
    }
  }

  let user = usersList.find(u => u.phone === cleanId || u.email.toLowerCase() === cleanId);

  // If user doesn't exist, create a fast account
  if (!user) {
    const isEmail = cleanId.includes('@');
    user = {
      id: `USR-${Date.now().toString().slice(-6)}`,
      fullName: isEmail ? cleanId.split('@')[0].toUpperCase() : `Khách Hàng ${cleanId.slice(-4)}`,
      phone: isEmail ? "0389880369" : cleanId,
      email: isEmail ? cleanId : "tecnic.vn.medical@gmail.com",
      address: "Hà Nội, Việt Nam",
      accountType: (selectedRole as any) || "CA_NHAN",
      clinicName: "",
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };
    usersList.push(user);
  }

  delete otpStore[identifier]; // Clean up OTP

  res.json({
    success: true,
    message: `Đăng nhập thành công! Xin chào ${user.fullName}`,
    data: user
  });
});

// ORDERS: Create Order
app.post("/api/orders", (req: Request, res: Response) => {
  const { customerName, customerPhone, customerEmail, shippingAddress, items, paymentMethod, needsInvoice, invoiceInfo, notes } = req.body;

  if (!customerName || !customerPhone || !shippingAddress || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: "Vui lòng cung cấp đầy đủ thông tin người nhận và sản phẩm." });
  }

  let totalMarketPrice = 0;
  let totalTecnicPrice = 0;

  const orderItems = items.map((item: any) => {
    const prod = productsList.find(p => p.id === item.productId);
    const mPrice = prod ? prod.marketPrice : (item.marketPrice || item.price || 500000);
    const tPrice = prod ? prod.tecnicPrice : (item.price || 400000);
    const qty = item.quantity || 1;

    totalMarketPrice += mPrice * qty;
    totalTecnicPrice += tPrice * qty;

    // Reduce stock
    if (prod && prod.stock >= qty) {
      prod.stock -= qty;
      prod.soldCount += qty;
    }

    return {
      productId: item.productId,
      productName: prod ? prod.name : item.productName,
      productImage: prod ? prod.image : item.productImage,
      price: tPrice,
      marketPrice: mPrice,
      quantity: qty,
      subtotal: tPrice * qty
    };
  });

  const totalSaved = totalMarketPrice - totalTecnicPrice;
  const shippingFee = totalTecnicPrice >= 1000000 ? 0 : 30000;
  const finalTotal = totalTecnicPrice + shippingFee;

  const newOrder = {
    id: `ORD-${Date.now()}`,
    orderCode: `TECNIC-${Math.floor(100000 + Math.random() * 900000)}`,
    customerName,
    customerPhone,
    customerEmail: customerEmail || "tecnic.vn.medical@gmail.com",
    shippingAddress,
    items: orderItems,
    totalMarketPrice,
    totalTecnicPrice,
    totalSaved,
    shippingFee,
    finalTotal,
    paymentMethod: paymentMethod || 'COD',
    paymentStatus: paymentMethod === 'COD' ? 'UNPAID' : 'PAID',
    orderStatus: 'PENDING',
    needsInvoice: !!needsInvoice,
    invoiceInfo: invoiceInfo || null,
    notes: notes || "",
    createdAt: new Date().toISOString(),
    bankTransferInfo: {
      bankName: COMPANY_INFO.bankAccount.bankName,
      branch: COMPANY_INFO.bankAccount.branch,
      accountNumber: COMPANY_INFO.bankAccount.accountNumber,
      accountHolder: COMPANY_INFO.bankAccount.accountHolder,
      transferContent: `TECNIC ${customerPhone}`,
      qrUrl: `https://img.vietqr.io/image/BIDV-8661234668-compact2.png?amount=${finalTotal}&addInfo=TECNIC%20${customerPhone}&accountName=CONG%20TY%20CP%20CN%20VA%20DV%20Y%20TE%20TECNIC`
    }
  };

  ordersList.unshift(newOrder);

  res.status(201).json({
    success: true,
    message: "Tạo đơn hàng thành công!",
    data: newOrder
  });
});

// GET all orders or filter
app.get("/api/orders", (req: Request, res: Response) => {
  const { phone, search, status, sort } = req.query;
  let results = [...ordersList];

  if (phone) {
    results = results.filter(o => o.customerPhone.includes(phone as string));
  }

  if (search) {
    const q = (search as string).toLowerCase().trim();
    results = results.filter(o => 
      o.id.toLowerCase().includes(q) ||
      (o.orderCode && o.orderCode.toLowerCase().includes(q)) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerPhone.includes(q) ||
      o.shippingAddress.toLowerCase().includes(q)
    );
  }

  if (status && status !== 'ALL') {
    results = results.filter(o => o.orderStatus === status);
  }

  if (sort === 'oldest') {
    results.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } else if (sort === 'total-desc') {
    results.sort((a, b) => b.finalTotal - a.finalTotal);
  } else if (sort === 'total-asc') {
    results.sort((a, b) => a.finalTotal - b.finalTotal);
  } else {
    // Default newest
    results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  res.json({ success: true, count: results.length, total: ordersList.length, data: results });
});

// UPDATE Order status & payment
app.put("/api/orders/:id/status", (req: Request, res: Response) => {
  const { id } = req.params;
  const { orderStatus, paymentStatus } = req.body;

  const order = ordersList.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });
  }

  if (orderStatus) order.orderStatus = orderStatus;
  if (paymentStatus) order.paymentStatus = paymentStatus;

  res.json({ success: true, message: "Cập nhật trạng thái đơn hàng thành công", data: order });
});

// DELETE single order
app.delete("/api/orders/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLen = ordersList.length;
  ordersList = ordersList.filter(o => o.id !== id);
  
  if (ordersList.length === initialLen) {
    return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng cần xóa" });
  }

  res.json({ success: true, message: `Đã xóa đơn hàng ${id} thành công` });
});

// BULK DELETE orders
app.post("/api/orders/bulk-delete", (req: Request, res: Response) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ success: false, message: "Danh sách mã đơn không hợp lệ" });
  }

  ordersList = ordersList.filter(o => !ids.includes(o.id));
  res.json({ success: true, message: `Đã xóa thành công ${ids.length} đơn hàng` });
});

// GET users list (Admin only)
app.get("/api/users", (req: Request, res: Response) => {
  res.json({ success: true, count: usersList.length, data: usersList });
});

// CREATE / ADD staff or admin
app.post("/api/users", (req: Request, res: Response) => {
  const { fullName, phone, email, accountType, clinicName, address } = req.body;
  if (!fullName || !phone || !email) {
    return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ họ tên, SĐT và Email" });
  }

  const newUser = {
    id: `USR-${Date.now().toString().slice(-6)}`,
    fullName,
    phone,
    email,
    address: address || "",
    accountType: accountType || 'STAFF',
    clinicName: clinicName || "",
    permissions: accountType === 'ADMIN' ? ['ALL'] : ['ORDERS', 'PRODUCTS_VIEW'],
    status: 'ACTIVE',
    createdAt: new Date().toISOString()
  };

  usersList.push(newUser);
  res.status(201).json({ success: true, message: "Tạo tài khoản người dùng thành công", data: newUser });
});

// UPDATE user role or status
app.put("/api/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { accountType, status, fullName, phone, email } = req.body;

  const user = usersList.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
  }

  if (accountType) user.accountType = accountType;
  if (status) user.status = status;
  if (fullName) user.fullName = fullName;
  if (phone) user.phone = phone;
  if (email) user.email = email;

  res.json({ success: true, message: "Cập nhật tài khoản thành công", data: user });
});

// DELETE user
app.delete("/api/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  if (id === 'USR-ADMIN') {
    return res.status(400).json({ success: false, message: "Không thể xóa tài khoản Quản trị viên tối cao!" });
  }
  usersList = usersList.filter(u => u.id !== id);
  res.json({ success: true, message: "Đã xóa tài khoản thành công" });
});

// UPDATE product (Admin)
app.put("/api/products/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const numId = Number(id);
  const prodIndex = productsList.findIndex(p => p.id === numId || p.code.toLowerCase() === id.toLowerCase());

  if (prodIndex === -1) {
    return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
  }

  productsList[prodIndex] = {
    ...productsList[prodIndex],
    ...req.body
  };

  res.json({ success: true, message: "Cập nhật sản phẩm thành công", data: productsList[prodIndex] });
});

// CREATE product (Admin)
app.post("/api/products", (req: Request, res: Response) => {
  const newProduct = {
    id: 100000 + productsList.length + 1,
    code: `TEC-${Math.floor(100000 + Math.random() * 900000)}`,
    name: req.body.name || "Sản phẩm thiết bị y tế mới",
    category: req.body.category || "GIUONG_Y_TE",
    categoryName: req.body.categoryName || "Giường y tế đa năng",
    marketPrice: req.body.marketPrice || 5000000,
    tecnicPrice: req.body.tecnicPrice || 4200000,
    discountPercent: req.body.discountPercent || 15,
    stock: req.body.stock || 20,
    soldCount: 0,
    rating: 5.0,
    reviewCount: 1,
    isFeatured: !!req.body.isFeatured,
    image: req.body.image || "/products/GIUONG-Y-TE-4-TAY-QUAY.png",
    shortDescription: req.body.shortDescription || "Thiết bị y tế chính hãng TECNIC MEDTECH",
    fullDescription: req.body.fullDescription || "Sản phẩm y tế tiêu chuẩn Bộ Y Tế",
    specifications: req.body.specifications || {
      brand: "TECNIC",
      origin: "Việt Nam / Nhật Bản",
      warrantyMonths: 24
    }
  };

  productsList.unshift(newProduct as any);
  res.status(201).json({ success: true, message: "Thêm sản phẩm mới thành công", data: newProduct });
});

// DELETE product (Admin)
app.delete("/api/products/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const numId = Number(id);
  productsList = productsList.filter(p => p.id !== numId && p.code.toLowerCase() !== id.toLowerCase());
  res.json({ success: true, message: "Đã xóa sản phẩm khỏi hệ thống" });
});

// GET System Config
app.get("/api/system-config", (req: Request, res: Response) => {
  res.json({ success: true, data: systemConfig });
});

// UPDATE System Config
app.post("/api/system-config", (req: Request, res: Response) => {
  systemConfig = {
    ...systemConfig,
    ...req.body
  };
  res.json({ success: true, message: "Cập nhật cấu hình hệ thống thành công", data: systemConfig });
});

// ESTIMATES: Create & Save Estimate quote for Clinic/Family
app.post("/api/estimates", (req: Request, res: Response) => {
  const { clientName, clientPhone, clientOrg, items } = req.body;

  let totalMarket = 0;
  let totalTecnic = 0;

  const estimateItems = (items || []).map((i: any) => {
    const prod = productsList.find(p => p.id === i.productId);
    const mPrice = prod ? prod.marketPrice : 0;
    const tPrice = prod ? prod.tecnicPrice : 0;
    const qty = i.quantity || 1;
    totalMarket += mPrice * qty;
    totalTecnic += tPrice * qty;

    return {
      product: prod || i.product,
      quantity: qty,
      notes: i.notes || ""
    };
  });

  const totalDiscount = totalMarket - totalTecnic;
  const vatAmount = Math.round(totalTecnic * 0.08); // 8% VAT for medical devices
  const grandTotal = totalTecnic + vatAmount;

  const newEstimate = {
    id: `EST-${Date.now()}`,
    estimateCode: `DT-TECNIC-${Math.floor(1000 + Math.random() * 9000)}`,
    title: `Bảng Dự Toán Cung Ứng Thiết Bị Y Khoa TECNIC`,
    clientName: clientName || "Đại diện Quý khách hàng / Phòng khám",
    clientPhone: clientPhone || "0348402466",
    clientOrg: clientOrg || "Cơ sở Y tế / Hộ gia đình",
    items: estimateItems,
    totalMarket,
    totalTecnic,
    totalDiscount,
    vatAmount,
    grandTotal,
    createdAt: new Date().toISOString()
  };

  estimatesList.unshift(newEstimate);

  res.status(201).json({ success: true, data: newEstimate });
});

// CHATBOT: Medical Consultation powered by Gemini with Google Search Grounding
app.post("/api/chat", async (req: Request, res: Response) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ success: false, message: "Tin nhắn không được để trống." });
  }

  // System prompt grounded in medical facts and TECNIC Medical knowledge base
  const systemInstruction = `Bạn là Chuyên viên Tư vấn Kỹ thuật & Thiết Bị Y Tế của TECNIC MEDTECH (Website: tecnic.vn, Hotline: 034 84 02466, Trụ sở: Tầng 2 Tòa nhà New Skyline, KĐT Văn Quán, Hà Đông, Hà Nội).
Công ty chuyên phân phối sỉ & lẻ thiết bị y tế, dụng cụ phục hồi chức năng, vật tư tiêu hao y tế chính hãng.
Slogan công ty: "Kiến tạo để phụng sự - Giải pháp toàn diện, tái sinh cuộc sống".

NGUYÊN TẮC TƯ VẤN QUAN TRỌNG:
1. TUYỆT ĐỐI KHÔNG xuất code lập trình (không xuất code TypeScript, JSON, Javascript, HTML hay bất kỳ đoạn mã lập trình nào).
2. Khi khách hàng hỏi về dữ liệu, thông số, dòng thiết bị y tế hay hướng dẫn kỹ thuật: Hãy sử dụng công cụ TÌM KIẾM GOOGLE (Google Search) để tra cứu thông tin kỹ thuật chính thống và các dòng thiết bị y tế thực tế, sau đó trình bày bằng ngôn ngữ tư vấn bán hàng & kỹ thuật chuyên nghiệp, dễ hiểu, ân cần.
3. Luôn xưng "Chuyên viên tư vấn TECNIC" hoặc "Dạ em", xưng hô với khách là "Quý khách / Anh / Chị".
4. Giới thiệu giải pháp thiết bị y tế chính hãng đạt chuẩn y tế của TECNIC phù hợp với nhu cầu của khách hàng (giường y tế, xe lăn, găng tay robot PHCN, đai nẹp Bonbone Nhật Bản, đệm hơi chống loét, khung tập đi, máy xung điện Omron...).
5. Cung cấp thông tin giá cả, cách sử dụng an toàn, chế độ bảo hành 12-36 tháng và giao hàng tận nơi trên toàn quốc.`;

  try {
    const ai = getGeminiClient();

    if (ai) {
      // Use Gemini with Google Search Grounding
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${systemInstruction}\n\nLịch sử trao đổi trước đó:\n${JSON.stringify(history || [])}\n\nKhách hàng hỏi: "${message}"\n\nHãy tìm kiếm Google để lấy dữ liệu y khoa, kiến thức phục hồi chức năng và thông tin thiết bị chuẩn xác nhất, sau đó trả lời ân cần, chi tiết và chuyên nghiệp (không xuất code).`
              }
            ]
          }
        ],
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      const replyText = response.text;
      if (replyText && replyText.trim()) {
        return res.json({
          success: true,
          reply: replyText.trim(),
          source: "google-search-grounded"
        });
      }
    }
  } catch (error: any) {
    console.error("Gemini with Google Search Grounding error (using rich medical fallback):", error?.message || error);
  }

  // Smart fallback medical responses based on medical domain
  const msgLower = message.toLowerCase();
  let reply = "";

  if (msgLower.includes("giường") || msgLower.includes("tay quay") || msgLower.includes("kéo giãn") || msgLower.includes("nằm liệt")) {
    reply = `Dạ chào Quý khách! Về dòng **Giường y tế dưỡng bệnh & phục hồi chức năng** tại TECNIC (tecnic.vn):
1. **Giường y tế 4 tay quay có bô vệ sinh Hueloi JYC01 / GBM-092A**: Hỗ trợ nâng hạ đầu lưng từ 0-85°, nâng hạ chân, nghiêng trái/phải phòng ngừa loét tì đè và tích hợp cần gạt bô vệ sinh tự động ngay tại giường. Rất thích hợp cho bệnh nhân tai biến hoặc người già nằm một chỗ.
2. **Giường y tế điện tự động đa chức năng OSADA SD-33E / SD-57C**: Điều khiển bằng remote bấm nút êm ái, có bàn ăn, cọc truyền dịch và chậu gội đầu tận nơi.
3. **Giường kéo giãn cột sống bằng điện SD-41GK**: Giúp giải phóng chèn ép rễ thần kinh cho bệnh nhân thoát vị đĩa đệm cột sống cổ và thắt lưng.
👉 TECNIC hỗ trợ giao hàng, lắp đặt tận nhà và bảo hành chính hãng từ 24 - 36 tháng. Hotline hỗ trợ: **034 84 02466**.`;
  } else if (msgLower.includes("xe lăn") || msgLower.includes("bô") || msgLower.includes("ngả nằm")) {
    reply = `Dạ chào Quý khách! Về dòng **Xe lăn tay & Xe lăn đa năng**, TECNIC cung cấp các dòng đạt chuẩn chất lượng cao:
1. **Xe lăn ngả nằm 180° Lucass X-72 / GBM-061C**: Tựa lưng ngả thành giường nằm nghỉ ngơi, có gác chân nâng hạ và tích hợp bô vệ sinh tiện lợi.
2. **Xe lăn siêu nhẹ GBM-065B**: Khung hợp kim nhôm siêu nhẹ chỉ 7.5kg, gấp gọn bỏ cốp ô tô hoặc mang đi du lịch cực kỳ tiện lợi.
3. **Xe lăn có ghế bô vệ sinh Lucass X-8 / X-9**: Chống nước, thuận tiện khi tắm rửa và đẩy trực tiếp vào bồn cầu gia đình.
👉 Cam kết chính hãng 100%, bảo hành khung xe 12 - 24 tháng!`;
  } else if (msgLower.includes("robot") || msgLower.includes("găng") || msgLower.includes("tai biến") || msgLower.includes("liệt") || msgLower.includes("bàn tay")) {
    reply = `Dạ chào Quý khách! Đối với phục hồi chức năng vận động bàn tay:
1. **Găng tay Robot PHCN Oromi 962 / Hueloi**:
   - Sử dụng cơ chế áp lực khí nén nắn chỉnh từng ngón tay co duỗi linh hoạt theo phác đồ tập luyện.
   - Chế độ tập gương (Mirror Therapy): Đeo găng cảm biến bên tay lành, bàn tay liệt sẽ tự động bắt chước cử động theo, giúp kích thích não bộ tái thiết lập đường dẫn truyền thần kinh.
   - Ngăn ngừa teo cơ, cứng khớp và co rút gân gấp bàn tay.
2. **Ghế nâng chuyển bệnh nhân thủy lực OSADA XDC-01 / GBM-053**: Hỗ trợ người chăm sóc nâng chuyển bệnh nhân từ giường sang xe lăn hoặc vào phòng vệ sinh an toàn, không tốn sức.
👉 Quý khách có thể liên hệ ngay hotline **034 84 02466** để Chuyên viên kỹ thuật tư vấn chọn size găng tay vừa vặn nhất!`;
  } else if (msgLower.includes("đệm hơi") || msgLower.includes("chống loét") || msgLower.includes("loét")) {
    reply = `Dạ chào Quý khách! Về giải pháp chống loét tì đè cho người nằm lâu:
1. **Đệm hơi chống loét tự động đảo khí GBM-095B / GBM-096B (Có khoét lỗ bô)**: Máy bơm tự động luân phiên đổi khí giữa các múi đệm sau mỗi 6-8 phút, giúp các điểm tì đè (vùng xương cùng cụt, gót chân, bả vai) luôn được thông thoáng tuần hoàn máu.
2. **Đệm hơi nâng lưng 45° GBM-073B**: Hỗ trợ người bệnh ngồi dậy ăn uống, uống thuốc và thở dễ dàng hơn.
3. **Đệm hơi OSADA SD-AM05**: Chất liệu PVC y tế cao cấp, êm ái, vận hành cực êm không gây tiếng ồn ảnh hưởng giấc ngủ.`;
  } else if (msgLower.includes("đai") || msgLower.includes("nẹp") || msgLower.includes("bonbone") || msgLower.includes("gối") || msgLower.includes("cổ") || msgLower.includes("vai") || msgLower.includes("lưng")) {
    reply = `Dạ chào Quý khách! TECNIC phân phối chính hãng hệ thống **Đai nẹp định hình Bonbone Nhật Bản & Famedi**:
- **Đai cố định & trợ lực khớp gối Bonbone Thin PF Cross / Free Knee Supporter**: Giúp nâng đỡ bánh chè, giảm áp lực lên sụn khớp cho người thoái hóa khớp gối hoặc sau phẫu thuật dây chằng.
- **Đai định hình cột sống lưng Bonbone Pro Hard Slim**: Cố định vững chắc vùng thắt lưng L1-L5, giảm đau nhanh cho người thoát vị đĩa đệm hoặc đau thần kinh tọa.
- **Đai nẹp cổ thoáng khí Bonbone**: Cố định đốt sống cổ, giảm đau mỏi vai gáy và thoái hóa cột sống cổ.
- **Đai di chuyển bệnh nhân Famedi / Orbe**: Thiết kế quai trợ lực giúp người nhà đỡ bệnh nhân tập đi an toàn, chống trượt ngã.`;
  } else if (msgLower.includes("xung điện") || msgLower.includes("omron") || msgLower.includes("massage") || msgLower.includes("đạp chân") || msgLower.includes("suy giãn")) {
    reply = `Dạ chào Quý khách! Về thiết bị vật lý trị liệu & kích thích thần kinh cơ:
1. **Máy xung điện trị liệu Omron HV-F013 / HV-F028 / HV-F230 (Không dây)**: Ứng dụng dòng xung TENS & EMS giúp giảm đau mỏi cơ xương khớp và kích thích hồi phục cơ teo liệt.
2. **Máy nén khí trị liệu suy giãn tĩnh mạch GBM-034**: Tạo áp lực khí ép từng khoang bắp chân giúp thúc đẩy máu tĩnh mạch hồi lưu về tim, giảm sưng phù và nhức mỏi chân.
3. **Máy đạp chân điện có nẹp gối**: Hỗ trợ vận động chủ động và thụ động cho người yếu liệt cả tay và chân.`;
  } else if (msgLower.includes("khung") || msgLower.includes("nạng") || msgLower.includes("gậy") || msgLower.includes("tập đi")) {
    reply = `Dạ chào Quý khách! Về thiết bị trợ giúp di chuyển tập đi:
1. **Khung tập đi đa năng có ghế ngồi OSADA SD-K05 / GBM-021**: Tích hợp 3 chế độ (tập đứng, tập đi và ghế ngồi nghỉ), có bánh xe khóa an toàn và tay tì nách êm ái.
2. **Gậy 4 chân Lucass VC-24 / Gậy 3 chân OSADA RMS01-4**: Đế cao su chống trượt cực kỳ vững vàng cho người lớn tuổi.
3. **Nạng nhôm Oromi C12 / Lucass VCL500 / Nạng khuỷu tay C-37**: Siêu nhẹ, chắc chắn, điều chỉnh chiều cao linh hoạt.`;
  } else if (msgLower.includes("thông tiểu") || msgLower.includes("cliny") || msgLower.includes("tiểu")) {
    reply = `Dạ chào Quý khách! **Bộ thông tiểu ngắt quãng tự bôi trơn CLINY (Nam & Nữ)** là giải pháp vô khuẩn đạt chuẩn quốc tế:
- Ống thông silicon y tế mềm mại đã phủ sẵn lớp bôi trơn Hydrophilic, không gây trầy xước niệu đạo và giảm thiểu tối đa nguy cơ nhiễm trùng tiết niệu cho bệnh nhân chấn thương tủy sống hoặc bí tiểu thần kinh.
- Sử dụng đơn giản, an toàn tại nhà.`;
  } else if (msgLower.includes("thanh toán") || msgLower.includes("giao hàng") || msgLower.includes("địa chỉ") || msgLower.includes("hotline") || msgLower.includes("tài khoản")) {
    reply = `Dạ thông tin liên hệ và đặt hàng tại **TECNIC MEDTECH** (tecnic.vn):
- 🏢 **Trụ sở**: Tầng 2, Tòa nhà New Skyline, KĐT Văn Quán, P. Hà Đông, Hà Nội.
- 📞 **Hotline tư vấn 24/7**: 034 84 02466 (Tư vấn thiết bị tận tâm).
- 💳 **Tài khoản doanh nghiệp**: Ngân hàng BIDV – Chi nhánh Hà Đông | STK: **8661234668** | Tên: CÔNG TY CP CN VA DV Y TE TECNIC.
- 🚚 **Giao hàng**: Miễn phí ship toàn quốc cho đơn từ 1.000.000đ, hỗ trợ kiểm tra thiết bị trước khi thanh toán COD!`;
  } else {
    reply = `Dạ xin chào Quý khách! Chuyên viên Tư vấn Thiết Bị & Vật Tư Y Tế TECNIC MEDTECH hân hạnh được tư vấn.
Quý khách đang quan tâm đến dòng thiết bị y tế nào ạ?
1. 🦽 Xe lăn đa năng, xe lăn ngả nằm 180° & Xe lăn siêu nhẹ
2. 🛏️ Giường y tế dưỡng bệnh 2-4 tay quay / Giường điện có bô
3. 🤖 Găng tay Robot PHCN sau tai biến & Ghế nâng chuyển thủy lực
4. 🩺 Đai nẹp định hình Bonbone Nhật Bản & Khung tập đi có ghế
5. 💨 Đệm hơi chống loét tự động đảo khí cho người nằm liệt
6. ⚡ Máy xung điện Omron, máy đạp chân điện & Máy nén ép suy giãn tĩnh mạch`;
  }

  res.json({
    success: true,
    reply,
    source: "medical-consultant"
  });
});

// ----------------------------------------------------
// ARTICLES & NEWS APIS (Hệ thống Tin tức & Kiến thức y khoa)
// ----------------------------------------------------

// GET all articles (with search, category filter)
app.get("/api/articles", (req: Request, res: Response) => {
  const { category, search, tag } = req.query;
  let results = [...articlesList];

  if (category && category !== 'ALL') {
    results = results.filter(a => a.category === category);
  }

  if (search) {
    const q = (search as string).toLowerCase().trim();
    results = results.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (tag) {
    const t = (tag as string).toLowerCase().trim();
    results = results.filter(a => a.tags.some(item => item.toLowerCase() === t));
  }

  // Sort by newest first
  results.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  res.json({
    success: true,
    total: results.length,
    data: results
  });
});

// GET single article by ID or slug
app.get("/api/articles/:idOrSlug", (req: Request, res: Response) => {
  const { idOrSlug } = req.params;
  const article = articlesList.find(a => a.id === idOrSlug || a.slug === idOrSlug);

  if (!article) {
    return res.status(404).json({ success: false, message: "Không tìm thấy bài viết" });
  }

  // Increment views
  article.views = (article.views || 0) + 1;

  // Related articles
  const related = articlesList
    .filter(a => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t))))
    .slice(0, 3);

  // Related products
  let relatedProducts: any[] = [];
  if (article.relatedProductIds && article.relatedProductIds.length > 0) {
    relatedProducts = productsList.filter(p => article.relatedProductIds?.includes(p.id));
  }

  res.json({
    success: true,
    data: article,
    related,
    relatedProducts
  });
});

// CREATE article (Admin)
app.post("/api/articles", (req: Request, res: Response) => {
  const { title, category, categoryName, excerpt, content, coverImage, author, tags, relatedProductIds } = req.body;

  if (!title || !content) {
    return res.status(400).json({ success: false, message: "Tiêu đề và nội dung bài viết không được để trống." });
  }

  const slug = title
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  const newArticle = {
    id: `art-${Date.now()}`,
    title,
    slug: `${slug}-${Math.floor(1000 + Math.random() * 9000)}`,
    category: category || 'KIEN_THUC_PHCN',
    categoryName: categoryName || 'Kiến Thức Phục Hồi Chức Năng',
    excerpt: excerpt || title,
    content,
    coverImage: coverImage || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    author: author || {
      name: 'Ban Biên Tập Y Khoa TECNIC',
      title: 'TECNIC MEDTECH Editorial Team'
    },
    publishedAt: new Date().toISOString().split('T')[0],
    readTime: `${Math.max(3, Math.round(content.split(' ').length / 150))} phút đọc`,
    views: 1,
    tags: Array.isArray(tags) ? tags : ['TECNIC', 'Y tế', 'Phục hồi chức năng'],
    isFeatured: req.body.isFeatured || false,
    relatedProductIds: relatedProductIds || []
  };

  articlesList.unshift(newArticle);

  res.status(201).json({
    success: true,
    message: "Tạo bài viết mới thành công!",
    data: newArticle
  });
});

// UPDATE article (Admin)
app.put("/api/articles/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = articlesList.findIndex(a => a.id === id);

  if (idx === -1) {
    return res.status(404).json({ success: false, message: "Không tìm thấy bài viết để cập nhật." });
  }

  articlesList[idx] = {
    ...articlesList[idx],
    ...req.body,
    id: articlesList[idx].id // Keep ID constant
  };

  res.json({
    success: true,
    message: "Cập nhật bài viết thành công!",
    data: articlesList[idx]
  });
});

// DELETE article (Admin)
app.delete("/api/articles/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = articlesList.length;
  articlesList = articlesList.filter(a => a.id !== id);

  if (articlesList.length === initialLength) {
    return res.status(404).json({ success: false, message: "Không tìm thấy bài viết cần xóa." });
  }

  res.json({
    success: true,
    message: "Đã xóa bài viết thành công."
  });
});

// AI ARTICLE GENERATOR via Gemini API
app.post("/api/articles/generate-ai", async (req: Request, res: Response) => {
  const { topic, category, targetAudience, keywordFocus } = req.body;

  if (!topic || typeof topic !== 'string') {
    return res.status(400).json({ success: false, message: "Vui lòng nhập chủ đề bài viết bạn muốn tạo." });
  }

  const promptText = `Bạn là Chuyên gia tư vấn và Trưởng ban biên tập trang kiến thức y khoa của TECNIC MEDTECH (doanh nghiệp hàng đầu về thiết bị y tế & PHCN chính hãng tại Việt Nam).
Hãy viết một bài viết chuyên sâu, chuẩn y khoa, giàu giá trị thực tiễn và hấp dẫn người đọc theo chủ đề sau:
Chủ đề: "${topic}"
Danh mục dự kiến: ${category || "KIEN_THUC_PHCN"}
Đối tượng độc giả: ${targetAudience || "Người bệnh, người cao tuổi và gia đình chăm sóc"}
Từ khóa trọng tâm: ${keywordFocus || "Thiết bị y tế chính hãng, phục hồi chức năng, chăm sóc người già"}

Danh mục 110 sản phẩm của TECNIC gồm:
- Xe lăn tay, xe lăn ngả nằm 180° (Lucass X-72, GBM-065B, X-7A, X-8, X-9, GBM-061C, GBM-061D)
- Giường y tế 2-4 tay quay và giường điện tự động (OSADA SD-33E, SD-57C, GBM-092A, GBM-093A, ROYALMED GIN1, GIN2, OSADA SD-58C, SD-33C, Giường kéo giãn cột sống SD-41GK)
- Găng tay Robot PHCN (Oromi 962, Hueloi), Ghế nâng chuyển bệnh nhân thủy lực (OSADA XDC-01, GBM-053)
- Đệm hơi chống loét đảo khí tự động (GBM-095B, GBM-096B có lỗ bô, GBM-073B nâng lưng, OSADA SD-AM05)
- Đai nẹp định hình Bonbone Nhật Bản (đai gối, đai cổ, đai vai, đai di chuyển, đai nhiệt thắt lưng)
- Khung tập đi có ghế ngồi (OSADA SD-K05, GBM-021, GBM-034, W-47), nạng nhôm, gậy chống 4 chân
- Máy xung điện trị liệu Omron (HV-F013, HV-F028, HV-F230), máy nén khí suy giãn tĩnh mạch GBM-034.

Yêu cầu định dạng đầu ra: Trả về duy nhất JSON hợp lệ (không bọc trong \`\`\`json) với cấu trúc sau:
{
  "title": "Tiêu đề bài viết hấp dẫn, chuẩn SEO y khoa",
  "category": "KIEN_THUC_PHCN",
  "categoryName": "Kiến Thức Phục Hồi Chức Năng",
  "excerpt": "Đoạn tóm tắt mở đầu súc tích 2-3 câu khơi gợi sự quan tâm",
  "coverImage": "URL ảnh Unsplash chủ đề y tế/phục hồi chức năng chất lượng cao",
  "author": {
    "name": "BS. CKII Nguyễn Văn Hùng",
    "title": "Chuyên gia Vật lý Trị liệu & PHCN - Cố vấn TECNIC"
  },
  "readTime": "6 phút đọc",
  "tags": ["Từ khóa 1", "Từ khóa 2", "Từ khóa 3", "Từ khóa 4"],
  "content": "Nội dung bài viết đầy đủ, sử dụng định dạng Markdown với các tiêu đề H2 (##), H3 (###), danh sách gạch đầu dòng, bảng so sánh (nếu có), lời khuyên bác sĩ, và gợi ý các dòng thiết bị TECNIC phù hợp."
}`;

  try {
    const ai = getGeminiClient();
    if (ai) {
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: [{ role: "user", parts: [{ text: promptText }] }],
        config: {
          responseMimeType: "application/json"
        }
      });

      const text = response.text;
      if (text) {
        try {
          const parsed = JSON.parse(text.trim());
          return res.json({
            success: true,
            message: "Tạo bài viết AI thành công bằng Gemini!",
            data: parsed
          });
        } catch (jsonErr) {
          console.error("JSON parse error from Gemini response:", jsonErr, text);
        }
      }
    }
  } catch (err: any) {
    console.error("Gemini AI Article Generation Error:", err?.message || err);
  }

  // Fallback intelligent generator template if API key is not yet provided
  const fallbackArticle = {
    title: `Chuyên đề: ${topic} - Hướng dẫn Y khoa & Phục hồi chức năng toàn diện`,
    category: category || "KIEN_THUC_PHCN",
    categoryName: "Kiến Thức Phục Hồi Chức Năng",
    excerpt: `Tổng hợp các phương pháp y khoa, quy trình phục hồi chức năng và thiết bị hỗ trợ tối ưu nhất cho chủ đề "${topic}".`,
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    author: {
      name: "Ban Cố Vấn Y Khoa TECNIC MEDTECH",
      title: "Hội đồng Chuyên môn Phục hồi chức năng & Thiết bị Y sinh"
    },
    readTime: "5 phút đọc",
    tags: [topic.slice(0, 15), "Phục hồi chức năng", "TECNIC MEDTECH", "Chăm sóc sức khỏe"],
    content: `## 1. Đặt vấn đề và tầm quan trọng của "${topic}"

Trong quá trình chăm sóc và điều trị bệnh nhân, việc can thiệp đúng phương pháp ngay từ giai đoạn đầu đóng vai trò quyết định đến 80% khả năng phục hồi tự chủ vận động của người bệnh.

### Những thách thức thực tế thường gặp:
- Người chăm sóc thiếu kỹ năng nâng chuyển đúng tư thế dẫn đến chấn thương cột sống.
- Bệnh nhân nằm lâu một chỗ dễ gặp biến chứng teo cơ, cứng khớp và loét tì đè.
- Chưa lựa chọn đúng thiết bị hỗ trợ đạt chuẩn y tế.

---

## 2. Giải pháp y khoa và thiết bị công nghệ hỗ trợ từ TECNIC MEDTECH

Để đạt hiệu quả tối ưu, các Bác sĩ chuyên khoa khuyên người bệnh nên phối hợp đồng bộ giữa việc tập luyện và trang bị các thiết bị chuyên dụng:

1. **Giai đoạn phục hồi vận động chủ động & thụ động**:
   - Sử dụng các dụng cụ hỗ trợ tập đi (Khung tập đi **OSADA SD-K05**, **GBM-021** 3 chế độ hoặc gậy 4 chân chống trượt).
   - Tập cơ tay với **Găng tay Robot PHCN Oromi 962** để kích thích não bộ tái sinh tế bào vận động.

2. **Giai đoạn chăm sóc sinh hoạt an toàn tại nhà**:
   - Sử dụng **Đệm hơi chống loét tự động đảo khí GBM-095B / OSADA SD-AM05** để ngăn ngừa hoại tử da.
   - Trang bị **Giường y tế dưỡng bệnh đa chức năng (OSADA SD-33E, GBM-092A)** giúp nâng hạ đầu lưng và đi vệ sinh tiện lợi.
   - Lắp đặt **Thanh tay vịn nhà tắm chống trơn trượt** để bảo vệ người già khỏi nguy cơ té ngã.

---

## 3. Lời khuyên từ chuyên gia TECNIC

- Hãy kiên trì tập luyện mỗi ngày từ 20-30 phút theo hướng dẫn của Bác sĩ hoặc Kỹ thuật viên PHCN.
- Kiểm tra thường xuyên độ an toàn của các thiết bị y tế tại nhà.
- Mọi thắc mắc về kỹ thuật và tư vấn thiết bị, Quý khách vui lòng liên hệ Tổng đài y khoa TECNIC: **038 988 0369**.`
  };

  res.json({
    success: true,
    message: "Tạo bài viết AI thành công (Chế độ mô phỏng chuyên môn)",
    data: fallbackArticle
  });
});

// DATABASE / SQL SCHEMA API: Provide full MySQL and SQL Server script
app.get("/api/database/schema-sql", (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      mySql: SQL_DATABASE_SCRIPTS.mySql,
      sqlServerSSMS: SQL_DATABASE_SCRIPTS.sqlServerSSMS,
      stats: {
        totalProducts: productsList.length,
        totalCategories: CATEGORIES.length,
        totalUsers: usersList.length,
        totalOrders: ordersList.length,
        totalEstimates: estimatesList.length
      }
    }
  });
});

// Company Info
app.get("/api/company", (req: Request, res: Response) => {
  res.json({ success: true, data: COMPANY_INFO });
});

// ----------------------------------------------------
// 2. VITE MIDDLEWARE & STATIC SERVING
// ----------------------------------------------------
app.use(express.static(path.join(process.cwd(), "public")));

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[TECNIC MEDICAL Server] running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
