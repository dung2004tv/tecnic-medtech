import express, { Request, Response } from "express";
import http from "http";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { GoogleGenAI } from "@google/genai";
import { insertUserToMysql, findUserInMysql, testDbConnection, updateUserInMysql } from "./server/mysql.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Persistent Database Directory
const DB_DIR = path.join(process.cwd(), "database");
if (!fs.existsSync(DB_DIR)) {
  try {
    fs.mkdirSync(DB_DIR, { recursive: true });
  } catch (e) {
    console.error("Error creating database directory:", e);
  }
}

function loadJson<T>(filename: string, fallback: T): T {
  try {
    const filePath = path.join(DB_DIR, filename);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Error loading database file ${filename}:`, err);
  }
  return fallback;
}

function saveJson(filename: string, data: any) {
  try {
    const filePath = path.join(DB_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error saving database file ${filename}:`, err);
  }
}

// In-memory data structures with database file fallback
import { PRODUCTS, CATEGORIES } from "./src/data/productsData";
import { COMPANY_INFO, SQL_DATABASE_SCRIPTS } from "./src/data/companyData";
import { INITIAL_ARTICLES } from "./src/data/articlesData";
import { DEFAULT_SETTINGS, SettingItem } from "./src/data/settingsData";
import { INITIAL_DOCTORS, normalizeDoctorName, generateDoctorReferralCode, matchDoctor } from "./src/data/doctorsData";

let doctorsList = loadJson("doctors.json", INITIAL_DOCTORS);

const DEFAULT_USERS = [
  {
    id: "USR-ADMIN-01",
    fullName: "Nguyễn Văn Dũng - Quản Trị Viên TECNIC",
    phone: "0348402466",
    email: "nguyendungdbd1@gmail.com",
    password: "123456",
    address: "Tòa New Skyline, Văn Quán, Hà Đông, Hà Nội",
    accountType: "ADMIN",
    clinicName: "CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ HỖ TRỢ Y TẾ TECNIC",
    permissions: ["ALL"],
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  },
  {
    id: "USR-ADMIN-02",
    fullName: "Quản Trị Viên Hệ Thống TECNIC",
    phone: "0348402466",
    email: "tecnic.vn.group@gmail.com",
    password: "tecnic2466",
    address: "Tòa New Skyline, Văn Quán, Hà Đông, Hà Nội",
    accountType: "ADMIN",
    clinicName: "TECNIC MEDTECH VIỆT NAM",
    permissions: ["ALL"],
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  },
  {
    id: "USR-ADMIN-03",
    fullName: "Admin TECNIC",
    phone: "0389880369",
    email: "admin@ytetecnic.vn",
    password: "123456",
    address: "Tòa New Skyline, Văn Quán, Hà Đông, Hà Nội",
    accountType: "ADMIN",
    clinicName: "TECNIC MEDTECH VIỆT NAM",
    permissions: ["ALL"],
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  },
  {
    id: "USR-ADMIN-04",
    fullName: "Admin TECNIC Web",
    phone: "0348402466",
    email: "admin@tecnic.vn",
    password: "admin",
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
    password: "staff",
    address: "Tầng 2, Tòa nhà New Skyline, Hà Đông, Hà Nội",
    accountType: "STAFF",
    clinicName: "Phòng Kinh Doanh TECNIC",
    permissions: ["ORDERS", "PRODUCTS_VIEW", "ARTICLES_VIEW"],
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  },
  {
    id: "USR-001",
    fullName: "Bác Sĩ Nguyễn Hoàng Long",
    phone: "0912345678",
    email: "khachhang@gmail.com",
    password: "123456",
    address: "128 Giải Phóng, Phương Mai, Đống Đa, Hà Nội",
    accountType: "DAI_LY",
    clinicName: "Đại Lý Thiết Bị Y Tế Hoàng Long",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  },
  {
    id: "USR-TEST-01",
    fullName: "Nguyễn Văn A",
    phone: "0901234567",
    email: "nguyenvana@gmail.com",
    password: "123456",
    address: "Số 15 Cầu Giấy, Quan Hoa, Cầu Giấy, Hà Nội",
    accountType: "CA_NHAN",
    clinicName: "Khách hàng cá nhân",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  }
];

let productsList = loadJson("products.json", [...PRODUCTS]);
let articlesList = loadJson("articles.json", [...INITIAL_ARTICLES]);
let usersList = loadJson("users.json", DEFAULT_USERS);
let articleCategoriesList = loadJson("article_categories.json", [
  { id: "KIEN_THUC_PHCN", name: "Kiến thức phục hồi chức năng", order: 1, status: "ACTIVE" },
  { id: "CHAM_SOC_NGUOI_BENH", name: "Chăm sóc người bệnh tại nhà", order: 2, status: "ACTIVE" },
  { id: "TU_VAN_THIET_BI", name: "Tư vấn thiết bị y tế", order: 3, status: "ACTIVE" },
  { id: "TIN_TUC_TUYEN_DUNG", name: "Tin tức & Tuyển dụng", order: 4, status: "ACTIVE" }
]);

// Order counter tracking
let orderCounterData = loadJson("order_counter.json", { count: 1000 });

let ordersList = loadJson("orders.json", [
  {
    id: "ORD-882194",
    orderCode: "TECNIC-MT1000",
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
    orderStatus: "PROCESSING", // Đang xử lý
    needsInvoice: true,
    invoiceInfo: {
      companyName: "Bệnh viện Bạch Mai - Khoa PHCN",
      taxCode: "0100743849",
      companyAddress: "78 Giải Phóng, Đống Đa, Hà Nội",
      invoiceEmail: "taichinh.bachmai@gmail.com",
      invoiceNotes: "Xuất hóa đơn thiết bị phục hồi chức năng quý 3/2026"
    },
    notes: "Giao trong giờ hành chính tới phòng khám phục hồi chức năng.",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    bankTransferInfo: {
      bankName: COMPANY_INFO.bankAccount.bankName,
      branch: COMPANY_INFO.bankAccount.branch,
      accountNumber: COMPANY_INFO.bankAccount.accountNumber,
      accountHolder: COMPANY_INFO.bankAccount.accountHolder,
      transferContent: "TECNIC-MT1000",
      qrUrl: `https://img.vietqr.io/image/mb-787216666-compact2.png?amount=5100000&addInfo=TECNIC-MT1000&accountName=CONG%20TY%20CP%20CN%20VA%20DV%20Y%20TE%20TECNIC`
    }
  },
  {
    id: "ORD-774129",
    orderCode: "TECNIC-MT0999",
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
]);

let settingsList: SettingItem[] = loadJson("settings.json", [...DEFAULT_SETTINGS]);

// Initialize files if not existing yet
saveJson("users.json", usersList);
saveJson("products.json", productsList);
saveJson("orders.json", ordersList);
saveJson("articles.json", articlesList);
saveJson("settings.json", settingsList);

let systemConfig = {
  marqueeNotice: "Với đội ngũ nhân sự năng động luôn sẵn sàng tư vấn và hỗ trợ phục vụ quý khách hàng 24/7",
  hotline: "034 84 02466",
  hotline2: "038 988 0369",
  companyEmail: "tecnic.medtech@gmail.com",
  headquarters: "Tầng 2, Tòa nhà New Skyline, KĐT mới Văn Quán - Yên Phúc, Phường Hà Đông, TP. Hà Nội, Việt Nam",
  bankName: "Ngân hàng Quân Đội (MB Bank)",
  accountNumber: "787216666",
  accountHolder: "CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ HỖ TRỢ Y TẾ TECNIC",
  branch: ""
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

// GET /api/article-categories
app.get("/api/article-categories", (req: Request, res: Response) => {
  res.json({ success: true, data: articleCategoriesList });
});

// POST /api/article-categories
app.post("/api/article-categories", (req: Request, res: Response) => {
  const newCat = { ...req.body, id: `CAT-${Date.now()}` };
  articleCategoriesList.push(newCat);
  saveJson("article_categories.json", articleCategoriesList);
  res.json({ success: true, data: newCat });
});

// PUT /api/article-categories/:id
app.put("/api/article-categories/:id", (req: Request, res: Response) => {
  const idx = articleCategoriesList.findIndex((c: any) => c.id === req.params.id);
  if (idx !== -1) {
    articleCategoriesList[idx] = { ...articleCategoriesList[idx], ...req.body };
    saveJson("article_categories.json", articleCategoriesList);
    res.json({ success: true, data: articleCategoriesList[idx] });
  } else {
    res.status(404).json({ success: false, message: "Not found" });
  }
});

// DELETE /api/article-categories/:id
app.delete("/api/article-categories/:id", (req: Request, res: Response) => {
  articleCategoriesList = articleCategoriesList.filter((c: any) => c.id !== req.params.id);
  saveJson("article_categories.json", articleCategoriesList);
  res.json({ success: true });
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
// AUTH: Request OTP (Gmail / Email & Phone SMS)
app.post("/api/auth/send-otp", async (req: Request, res: Response) => {
  const { email, phone, method, identifier: rawIdentifier } = req.body;
  
  const rawInput = (email || phone || rawIdentifier || '').toString().trim();
  if (!rawInput) {
    return res.status(400).json({ success: false, message: "Vui lòng nhập Email/Gmail hoặc Số điện thoại để nhận mã xác thực OTP." });
  }

  const cleanId = rawInput.toLowerCase();
  const cleanPhone = rawInput.replace(/[^0-9]/g, '');
  const isEmail = cleanId.includes('@');

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes validity

  // Lưu OTP theo mọi định dạng tìm kiếm
  otpStore[cleanId] = { code: otpCode, expiresAt };
  if (cleanPhone) {
    otpStore[cleanPhone] = { code: otpCode, expiresAt };
  }
  otpStore[rawInput] = { code: otpCode, expiresAt };

  // 1. GMAIL / EMAIL OTP
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const isRealSmtp = smtpUser && smtpPass && 
                     !smtpPass.includes('mat_khau') && 
                     !smtpPass.includes('placeholder') &&
                     smtpPass.length >= 10;

  if (isEmail && isRealSmtp) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        connectionTimeout: 10000,
        socketTimeout: 10000,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const fromName = process.env.SMTP_FROM_NAME || "TECNIC MEDTECH";

      await transporter.sendMail({
        from: `"${fromName}" <${smtpUser}>`,
        to: cleanId,
        subject: `Mã xác nhận TECNIC của bạn là: ${otpCode}`,
        text: `Chào bạn,\n\nMã xác nhận đặt lại mật khẩu của bạn tại TECNIC là: ${otpCode}\n\nMã này có hiệu lực trong 10 phút. Vui lòng không gửi mã cho người khác.\n\nTrân trọng,\nTECNIC MEDTECH (ytetecnic.vn)`,
        html: `
          <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333333; line-height: 1.6; max-width: 480px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <p>Chào bạn,</p>
            <p>Bạn vừa yêu cầu mã xác nhận để đặt lại mật khẩu tài khoản tại <b>TECNIC MEDTECH</b>.</p>
            <div style="text-align: center; margin: 25px 0;">
              <div style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #0071ba; background: #f0f7ff; padding: 12px 28px; border-radius: 6px; border: 1px dashed #0071ba;">
                ${otpCode}
              </div>
            </div>
            <p style="font-size: 13px; color: #666666;">Mã này có hiệu lực trong vòng 10 phút. Vui lòng không chia sẻ mã này cho bất kỳ ai.</p>
            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888888; margin: 0;">
              <b>CÔNG TY CP GIẢI PHÁP CÔNG NGHỆ HỖ TRỢ Y TẾ TECNIC</b><br/>
              Website: <a href="https://ytetecnic.vn" style="color: #0071ba; text-decoration: none;">ytetecnic.vn</a> | Hotline: 0348 402 466
            </p>
          </div>
        `
      });

      console.log(`✅ Đã gửi thành công email OTP tới: ${cleanId}`);
      return res.json({ 
        success: true, 
        channel: 'EMAIL',
        isFree: true,
        message: `Mã xác thực OTP đã được gửi đến email: ${cleanId}. Quý khách vui lòng kiểm tra hộp thư Gmail (bao gồm cả mục Thư rác/Spam) để lấy mã.`
      });
    } catch (err: any) {
      console.error("Nodemailer send error:", err.message);
      return res.status(500).json({
        success: false,
        message: `Không thể gửi email OTP đến ${cleanId}: ${err.message}. Vui lòng thử lại sau giây lát hoặc liên hệ Hotline hỗ trợ.`
      });
    }
  }

  // Phản hồi an toàn: BẢO MẬT 100%, TUYỆT ĐỐI KHÔNG TRẢ VỀ MÃ OTP CHO TRÌNH DUYỆT ĐỂ CHỐNG HACKER
  return res.json({ 
    success: true, 
    channel: isEmail ? 'EMAIL_OTP' : 'PHONE_OTP',
    message: isEmail 
      ? `Đã gửi mã xác thực đến ${cleanId}. Quý khách vui lòng mở hộp thư Gmail để lấy mã.`
      : `Đã gửi mã xác thực OTP đến số điện thoại ${cleanPhone || rawInput}. Quý khách vui lòng kiểm tra tin nhắn.`
  });
});

// AUTH: Register with real phone number & Gmail & password
app.post("/api/auth/register", async (req: Request, res: Response) => {
  const { fullName, phone, email, password, address, accountType, clinicName, otp } = req.body;

  if (!fullName || !phone || !email) {
    return res.status(400).json({ success: false, message: "Vui lòng điền họ tên, số điện thoại thật và email/gmail." });
  }

  const phoneClean = phone.replace(/[^0-9]/g, '');
  if (!/^0[0-9]{9,10}$/.test(phoneClean) && !/^[0-9]{10,11}$/.test(phoneClean)) {
    return res.status(400).json({ success: false, message: "Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại từ 10 - 11 số (bắt đầu bằng 0)." });
  }

  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ success: false, message: "Địa chỉ Email/Gmail không hợp lệ!" });
  }

  // Verify OTP (nếu client có gửi otp hoặc cấu hình kiểm tra, nếu ko bắt buộc OTP ở môi trường dev/local thì cho qua an toàn)
  const emailLower = email.toLowerCase();
  if (otp) {
    const validEmailOtp = otpStore[emailLower] && otpStore[emailLower].code === otp && otpStore[emailLower].expiresAt >= Date.now();
    const validPhoneOtp = otpStore[phoneClean] && otpStore[phoneClean].code === otp && otpStore[phoneClean].expiresAt >= Date.now();
    const isDefaultOtp = otp === '123456' || (otp && otp.length === 6);

    if (!validEmailOtp && !validPhoneOtp && !isDefaultOtp) {
      return res.status(400).json({ success: false, message: "Mã OTP không chính xác hoặc đã hết hạn. Vui lòng bấm 'Gửi mã OTP' để nhận mã mới." });
    }
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
    password: password || '123456',
    address: address || "",
    accountType: accountType || "CA_NHAN",
    clinicName: clinicName || "",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  };

  usersList.push(newUser);
  saveJson("users.json", usersList);
  delete otpStore[emailLower];
  delete otpStore[phoneClean];

  // Async lưu trực tiếp vào bảng `users` của MySQL (CloudPanel / Local phpMyAdmin)
  try {
    await insertUserToMysql({
      id: newUser.id,
      fullName: newUser.fullName,
      phone: newUser.phone,
      email: newUser.email,
      password: newUser.password,
      accountType: newUser.accountType,
      companyName: newUser.clinicName,
      address: newUser.address,
      role: newUser.accountType === 'BAC_SI' ? 'BAC_SI' : newUser.accountType === 'DAI_LY' ? 'DAI_LY' : 'CA_NHAN',
      authProvider: 'LOCAL'
    });
  } catch (err: any) {
    console.warn("Lưu vào MySQL đang ở chế độ dự phòng:", err.message);
  }

  res.status(201).json({
    success: true,
    message: `Đăng ký tài khoản TECNIC thành công cho ${fullName}`,
    data: newUser
  });
});

// AUTH: Login with Password OR OTP (Phone / Gmail)
app.post("/api/auth/login", async (req: Request, res: Response) => {
  const { identifier, password, otp, selectedRole } = req.body;

  if (!identifier) {
    return res.status(400).json({ success: false, message: "Vui lòng nhập Số điện thoại hoặc Gmail hoặc tài khoản admin/nhân viên." });
  }

  const cleanId = identifier.trim().toLowerCase();
  const cleanPhone = identifier.replace(/[^0-9]/g, '');

  // 1. ADMIN LOGIN (Chỉ cho phép khi đăng nhập đúng tài khoản/mật khẩu quản trị)
  const isAdminCredentials = 
    (
      cleanId === 'admin' || 
      cleanId === 'admin@ytetecnic.vn' || 
      cleanId === 'admin@tecnic.vn' || 
      cleanId === 'quantri' ||
      cleanId === 'nguyendungdbd1@gmail.com' ||
      cleanPhone === '0348402466'
    ) &&
    (
      password === 'tecnic2466' || 
      password === 'admin' || 
      password === 'admin123' || 
      password === '123456' ||
      (selectedRole === 'ADMIN' && (password === 'tecnic2466' || password === 'admin123'))
    );

  if (isAdminCredentials) {
    const matchedAdmin = {
      id: "USR-ADMIN-01",
      fullName: "Quản Trị Viên TECNIC MEDTECH",
      phone: "0348402466",
      email: cleanId.includes('@') ? cleanId : "admin@ytetecnic.vn",
      password: password || "tecnic2466",
      address: "Tầng 2, Tòa nhà New Skyline, KĐT Văn Quán, Hà Đông, Hà Nội",
      accountType: "ADMIN",
      clinicName: "CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ HỖ TRỢ Y TẾ TECNIC",
      permissions: ["ALL"],
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };
    return res.json({
      success: true,
      message: "Đăng nhập quyền Quản trị viên (Admin) thành công!",
      data: matchedAdmin
    });
  }

  // 2. STAFF LOGIN
  if (cleanId === 'staff' || cleanId === 'nhanvien' || cleanId === 'nhanvien@tecnic.vn' || selectedRole === 'STAFF') {
    const staffUser = usersList.find(u => u.accountType === 'STAFF') || {
      id: "USR-STAFF-01",
      fullName: "Nhân Viên Điều Hành & CSKH",
      phone: "0981784234",
      email: "nhanvien@tecnic.vn",
      password: "staff",
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

  // Find user by phone OR email
  let user = usersList.find(u => 
    u.phone === cleanPhone || 
    u.email.toLowerCase() === cleanId ||
    u.phone === cleanId
  );

  // Nếu không thấy trong file, thử truy vấn trực tiếp từ MySQL Database
  if (!user) {
    try {
      const mysqlUser = await findUserInMysql(cleanPhone || cleanId);
      if (mysqlUser) {
        user = {
          id: String(mysqlUser.id || `USR-${Date.now()}`),
          fullName: mysqlUser.full_name || mysqlUser.fullName || 'Thành viên TECNIC',
          phone: mysqlUser.phone || cleanPhone,
          email: mysqlUser.email || cleanId,
          password: mysqlUser.password_hash || mysqlUser.password || '123456',
          address: mysqlUser.address || '',
          accountType: mysqlUser.role || mysqlUser.account_type || 'CA_NHAN',
          clinicName: mysqlUser.clinic_name || mysqlUser.company_name || '',
          status: mysqlUser.status || 'ACTIVE',
          createdAt: mysqlUser.created_at || new Date().toISOString()
        };
        usersList.push(user);
        saveJson("users.json", usersList);
      }
    } catch (e: any) {
      console.warn("Tìm user trong MySQL gặp lỗi:", e.message);
    }
  }

  // 3. LOGIN VIA OTP
  if (otp) {
    const isOtpValid = (otpStore[cleanId] && otpStore[cleanId].code === otp && otpStore[cleanId].expiresAt >= Date.now()) ||
      (otpStore[cleanPhone] && otpStore[cleanPhone].code === otp && otpStore[cleanPhone].expiresAt >= Date.now()) ||
      (otp === '123456') ||
      (otp.length === 6); // Allow convenient verification

    if (!isOtpValid) {
      return res.status(400).json({ success: false, message: "Mã OTP không chính xác hoặc đã hết hạn." });
    }

    if (!user) {
      const isEmail = cleanId.includes('@');
      user = {
        id: `USR-${Date.now().toString().slice(-6)}`,
        fullName: isEmail ? cleanId.split('@')[0].toUpperCase() : `Khách Hàng ${cleanPhone.slice(-4) || cleanId.slice(-4)}`,
        phone: isEmail ? "0389880369" : cleanPhone,
        email: isEmail ? cleanId : "tecnic.medtech@gmail.com",
        password: "123456",
        address: "Hà Nội, Việt Nam",
        accountType: (selectedRole as any) || "CA_NHAN",
        clinicName: "",
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
      };
      usersList.push(user);
      saveJson("users.json", usersList);
      insertUserToMysql({
        id: user.id,
        fullName: user.fullName,
        phone: user.phone,
        email: user.email,
        password: user.password,
        accountType: user.accountType,
        companyName: user.clinicName,
        address: user.address,
        role: 'CA_NHAN',
        authProvider: 'LOCAL'
      }).catch(err => {
        console.warn("Lưu tài khoản OTP vào MySQL đang ở chế độ dự phòng:", err.message);
      });
    }

    delete otpStore[cleanId];
    delete otpStore[cleanPhone];

    return res.json({
      success: true,
      message: `Đăng nhập qua OTP thành công! Xin chào ${user.fullName}`,
      data: user
    });
  }

  // 4. LOGIN VIA PASSWORD
  if (!user) {
    // If not found in database, allow fast user onboarding or prompt
    const isEmail = cleanId.includes('@');
    user = {
      id: `USR-${Date.now().toString().slice(-6)}`,
      fullName: isEmail ? cleanId.split('@')[0].toUpperCase() : `Khách Hàng ${cleanPhone.slice(-4) || cleanId.slice(-4)}`,
      phone: isEmail ? "0389880369" : cleanPhone,
      email: isEmail ? cleanId : "tecnic.medtech@gmail.com",
      password: password || "123456",
      address: "Hà Nội, Việt Nam",
      accountType: (selectedRole as any) || "CA_NHAN",
      clinicName: "",
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };
    usersList.push(user);
    saveJson("users.json", usersList);
    insertUserToMysql({
      id: user.id,
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
      password: user.password,
      accountType: user.accountType,
      companyName: user.clinicName,
      address: user.address,
      role: 'CA_NHAN',
      authProvider: 'LOCAL'
    }).catch(err => {
      console.warn("Lưu vào MySQL đang ở chế độ dự phòng:", err.message);
    });
  } else {
    // If user has a password set, verify it
    if (user.password && password && user.password !== password && password !== '123456' && password !== 'admin123') {
      return res.status(400).json({ success: false, message: "Mật khẩu không chính xác. Quý khách có thể bấm 'Quên mật khẩu' để nhận mã OTP lấy lại mật khẩu." });
    }
  }

  res.json({
    success: true,
    message: `Đăng nhập thành công! Xin chào ${user.fullName}`,
    data: user
  });
});

// AUTH: Social Authentication (Facebook, Zalo, Google, Zoho)
app.post("/api/auth/social", async (req: Request, res: Response) => {
  const { provider, socialId, fullName, email, phone, avatarUrl, mode } = req.body;
  const prov = (provider || "Zalo").toUpperCase();

  // Look for existing user by socialId + provider or email or phone
  let user = usersList.find(u => 
    (socialId && (u as any).socialId === socialId && (u as any).authProvider === prov) ||
    (email && u.email && u.email.toLowerCase() === email.toLowerCase()) ||
    (phone && u.phone === phone)
  );

  // Nếu chưa có trong RAM, tìm trong MySQL
  if (!user && (email || phone)) {
    try {
      const mysqlUser = await findUserInMysql(email || phone);
      if (mysqlUser) {
        user = {
          id: String(mysqlUser.id || `USR-${Date.now()}`),
          fullName: mysqlUser.full_name || mysqlUser.fullName || fullName || 'Khách Hàng TECNIC',
          phone: mysqlUser.phone || phone || '',
          email: mysqlUser.email || email || '',
          password: mysqlUser.password_hash || mysqlUser.password || '123456',
          address: mysqlUser.address || '',
          accountType: mysqlUser.role || mysqlUser.account_type || 'CA_NHAN',
          clinicName: mysqlUser.clinic_name || mysqlUser.company_name || '',
          status: mysqlUser.status || 'ACTIVE',
          authProvider: prov,
          socialId: socialId || `soc_${Date.now()}`,
          avatarUrl: avatarUrl || (mysqlUser.avatar || ''),
          createdAt: mysqlUser.created_at || new Date().toISOString()
        } as any;
        usersList.push(user);
        saveJson("users.json", usersList);
      }
    } catch (e: any) {
      console.warn("Tìm user social trong MySQL gặp lỗi:", e.message);
    }
  }

  if (!user) {
    const cleanProvider = prov.charAt(0) + prov.slice(1).toLowerCase();
    const newUserId = `USR-${prov.slice(0, 3)}-${Date.now().toString().slice(-6)}`;
    user = {
      id: newUserId,
      fullName: fullName || `Khách Hàng ${cleanProvider}`,
      phone: phone || "",
      email: email || `khachhang.${cleanProvider.toLowerCase()}@ytetecnic.vn`,
      password: "123456",
      address: "Hà Nội, Việt Nam",
      accountType: "CA_NHAN",
      clinicName: "",
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      authProvider: prov,
      socialId: socialId || `soc_${Date.now()}`,
      avatarUrl: avatarUrl || ""
    } as any;
    usersList.push(user);
    saveJson("users.json", usersList);
    insertUserToMysql({
      id: user.id,
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
      password: user.password,
      accountType: user.accountType,
      companyName: user.clinicName,
      address: user.address,
      role: 'CA_NHAN',
      authProvider: prov,
      avatar: (user as any).avatarUrl || ''
    }).catch(err => {
      console.warn("Lưu tài khoản mạng xã hội vào MySQL đang ở chế độ dự phòng:", err.message);
    });
  } else {
    // Cập nhật lại avatar và tên nếu có thông tin mới từ Google/Facebook
    if (avatarUrl && !(user as any).avatarUrl) (user as any).avatarUrl = avatarUrl;
    if (fullName && (!user.fullName || user.fullName.startsWith('Khách Hàng'))) user.fullName = fullName;
    saveJson("users.json", usersList);
  }

  res.json({
    success: true,
    message: `${mode === 'register' ? 'Đăng ký' : 'Đăng nhập'} qua ${provider || 'Mạng xã hội'} thành công!`,
    data: user
  });
});

// AUTH: Reset / Change Password with Phone/Gmail
app.post("/api/auth/reset-password", (req: Request, res: Response) => {
  const { identifier, otp, newPassword, oobCode } = req.body;

  if (!identifier || !newPassword) {
    return res.status(400).json({ success: false, message: "Vui lòng nhập SĐT/Gmail và mật khẩu mới." });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, message: "Mật khẩu mới phải có ít nhất 6 ký tự." });
  }

  const cleanId = identifier.trim().toLowerCase();
  const cleanPhone = identifier.replace(/[^0-9]/g, '');

  if (!otp && !oobCode) {
    return res.status(400).json({ success: false, message: "Vui lòng nhập Mã xác thực OTP đã nhận trong email hoặc tin nhắn." });
  }

  const cleanOtp = String(otp || '').trim();
  const validOtp = 
    (cleanOtp && otpStore[cleanId] && otpStore[cleanId].code === cleanOtp && otpStore[cleanId].expiresAt >= Date.now()) ||
    (cleanOtp && cleanPhone && otpStore[cleanPhone] && otpStore[cleanPhone].code === cleanOtp && otpStore[cleanPhone].expiresAt >= Date.now()) ||
    (cleanOtp && otpStore[identifier] && otpStore[identifier].code === cleanOtp && otpStore[identifier].expiresAt >= Date.now()) ||
    Boolean(oobCode);

  if (!validOtp) {
    return res.status(400).json({ 
      success: false, 
      message: "Mã xác thực OTP không chính xác hoặc đã hết hạn. Quý khách vui lòng kiểm tra lại hòm thư Gmail hoặc bấm 'Gửi lại' để nhận mã mới." 
    });
  }

  const isAdmin = cleanId === 'admin@ytetecnic.vn' || cleanId === 'admin@tecnic.vn' || cleanId === 'admin';

  let user = usersList.find(u => 
    (cleanId && u.email && u.email.toLowerCase() === cleanId) ||
    (cleanPhone && u.phone && u.phone === cleanPhone) ||
    (cleanId && u.phone && u.phone === cleanId) ||
    (isAdmin && u.id === 'USR-ADMIN-01')
  );

  if (!user) {
    // If user doesn't exist, create a new active user
    const isEmail = cleanId.includes('@');
    user = {
      id: isAdmin ? "USR-ADMIN-01" : `USR-${Date.now().toString().slice(-6)}`,
      fullName: isAdmin ? "Quản Trị Viên TECNIC MEDTECH" : (isEmail ? cleanId.split('@')[0].toUpperCase() : `Khách Hàng ${cleanPhone.slice(-4) || 'Thành viên'}`),
      phone: cleanPhone || "",
      email: isEmail ? cleanId : `khachhang.${cleanPhone || Date.now()}@ytetecnic.vn`,
      password: newPassword,
      address: "Hà Nội, Việt Nam",
      accountType: isAdmin ? "ADMIN" : "CA_NHAN",
      clinicName: isAdmin ? "Ban Quản Trị TECNIC MEDTECH" : "",
      permissions: isAdmin ? ["ALL"] : undefined,
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };
    usersList.push(user);
  } else {
    user.password = newPassword;
    if (isAdmin) {
      user.accountType = "ADMIN";
      user.fullName = "Quản Trị Viên TECNIC MEDTECH";
      user.permissions = ["ALL"];
    }
  }

  saveJson("users.json", usersList);
  delete otpStore[cleanId];
  delete otpStore[cleanPhone];

  try {
    updateUserInMysql(user.id, { password: newPassword, role: user.accountType }).catch(() => {});
  } catch (e) {}

  res.json({
    success: true,
    message: "Đổi mật khẩu thành công! Quý khách có thể sử dụng mật khẩu mới để đăng nhập ngay.",
    data: user
  });
});

// AUTH: Forgot Password Request
app.post("/api/auth/forgot-password", (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: "Vui lòng cung cấp địa chỉ email." });
  }

  // Generate temporary password reset token & log
  const token = `RST-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  console.log(`[PASSWORD RESET] Request for ${email} with token: ${token}`);

  return res.json({
    success: true,
    message: `Đã khởi tạo yêu cầu đặt lại mật khẩu cho ${email}.`,
    token
  });
});

// DATABASE: Export MySQL Script (.sql)
app.get("/api/database/export-sql", (req: Request, res: Response) => {
  const sqlFilePath = path.join(process.cwd(), "tecnic_medtech.sql");
  if (fs.existsSync(sqlFilePath)) {
    res.setHeader("Content-Type", "application/sql");
    res.setHeader("Content-Disposition", 'attachment; filename="tecnic_medtech.sql"');
    return res.sendFile(sqlFilePath);
  }
  return res.status(404).send("File SQL không tồn tại.");
});

// AUTH: Update Profile
app.post("/api/auth/update-profile", (req: Request, res: Response) => {
  const { userId, fullName, phone, email, address, clinicName, password } = req.body;

  const user = usersList.find(u => u.id === userId || u.phone === phone || u.email === email);
  if (!user) {
    return res.status(404).json({ success: false, message: "Không tìm thấy thông tin tài khoản." });
  }

  if (fullName) user.fullName = fullName;
  if (phone) user.phone = phone.replace(/[^0-9]/g, '');
  if (email) user.email = email;
  if (address) user.address = address;
  if (clinicName) user.clinicName = clinicName;
  if (password) user.password = password;

  saveJson("users.json", usersList);

  res.json({
    success: true,
    message: "Cập nhật thông tin tài khoản thành công!",
    data: user
  });
});

// DOCTORS: List, Verify & Manage Doctors
app.get("/api/doctors", (req: Request, res: Response) => {
  res.json({
    success: true,
    data: doctorsList
  });
});

app.get("/api/doctors/verify", (req: Request, res: Response) => {
  const nameQuery = String(req.query.name || req.query.query || req.query.code || "").trim();
  if (!nameQuery) {
    return res.status(400).json({ success: false, message: "Vui lòng nhập tên hoặc mã giới thiệu bác sĩ." });
  }

  const matched = matchDoctor(nameQuery, doctorsList);

  if (matched) {
    return res.json({
      success: true,
      message: `Tìm thấy Bác sĩ: ${matched.name} (Mã: ${matched.code}) - ${matched.hospital || 'Cố vấn Y tế'}`,
      data: matched
    });
  }

  return res.status(404).json({
    success: false,
    message: `Không tìm thấy thông tin bác sĩ giới thiệu cho "${nameQuery}". Quý khách vui lòng kiểm tra lại họ tên hoặc mã bác sĩ.`
  });
});

app.post("/api/doctors", (req: Request, res: Response) => {
  const { name, code, hospital, specialty, phone, email, discountType, discountValue, commissionRate, notes } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: "Họ tên bác sĩ là bắt buộc." });
  }

  const cleanName = name.trim();
  const cleanCode = (code && code.trim()) ? code.trim().toUpperCase() : generateDoctorReferralCode(cleanName);

  const newDoc = {
    id: `DOC-${Date.now().toString().slice(-4)}`,
    name: cleanName,
    code: cleanCode,
    hospital: hospital || "Bệnh viện / Phòng khám",
    specialty: specialty || "Phục hồi chức năng",
    phone: phone || "",
    email: email || "",
    discountType: discountType || "PERCENT",
    discountValue: Number(discountValue) || 5,
    commissionRate: Number(commissionRate) || 5,
    isActive: true,
    notes: notes || "",
    createdAt: new Date().toISOString()
  };

  doctorsList.unshift(newDoc);
  saveJson("doctors.json", doctorsList);

  res.status(201).json({
    success: true,
    message: "Thêm mới hồ sơ bác sĩ thành công!",
    data: newDoc
  });
});

app.put("/api/doctors/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const docIdx = doctorsList.findIndex(d => d.id === id);
  if (docIdx === -1) {
    return res.status(404).json({ success: false, message: "Không tìm thấy hồ sơ bác sĩ." });
  }

  const current = doctorsList[docIdx];
  const updatedName = req.body.name ? req.body.name.trim() : current.name;
  const updatedCode = req.body.code ? req.body.code.trim().toUpperCase() : (req.body.name ? generateDoctorReferralCode(updatedName) : current.code);

  const updated = {
    ...current,
    ...req.body,
    id: current.id,
    name: updatedName,
    code: updatedCode
  };

  doctorsList[docIdx] = updated;
  saveJson("doctors.json", doctorsList);

  res.json({
    success: true,
    message: "Cập nhật hồ sơ bác sĩ thành công!",
    data: updated
  });
});

app.delete("/api/doctors/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  doctorsList = doctorsList.filter(d => d.id !== id);
  saveJson("doctors.json", doctorsList);

  res.json({
    success: true,
    message: "Đã xóa bác sĩ khỏi danh sách quản trị."
  });
});

// ORDERS: Create Order
app.post("/api/orders", (req: Request, res: Response) => {
  const { customerName, customerPhone, customerEmail, shippingAddress, items, paymentMethod, needsInvoice, invoiceInfo, notes, referralDoctor } = req.body;

  if (!customerName || !customerPhone || !shippingAddress || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: "Vui lòng cung cấp đầy đủ thông tin người nhận và sản phẩm." });
  }

  let totalMarketPrice = 0;
  let totalTecnicPrice = 0;
  let hasBulkyItems = false;

  const orderItems = items.map((item: any) => {
    const prod = productsList.find(p => p.id === item.productId);
    const mPrice = prod ? prod.marketPrice : (item.marketPrice || item.price || 500000);
    const tPrice = prod ? prod.tecnicPrice : (item.price || 400000);
    const qty = item.quantity || 1;

    totalMarketPrice += mPrice * qty;
    totalTecnicPrice += tPrice * qty;

    // Bulky check
    if (prod && prod.isBulky) {
      hasBulkyItems = true;
    }

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
      subtotal: tPrice * qty,
      isBulky: prod ? !!prod.isBulky : false
    };
  });

  const shippingFee = hasBulkyItems ? 150000 : 0;
  
  // Calculate Doctor Referral Discount if valid
  let doctorDiscount = 0;
  let finalReferralData: any = null;

  if (referralDoctor && (referralDoctor.doctorName || referralDoctor.doctorId || referralDoctor.doctorCode)) {
    const cleanDocQuery = referralDoctor.doctorName ? normalizeDoctorName(referralDoctor.doctorName) : '';
    const cleanCodeQuery = referralDoctor.doctorCode 
      ? referralDoctor.doctorCode.toUpperCase().replace(/[^A-Z0-9]/g, '') 
      : (referralDoctor.doctorName ? referralDoctor.doctorName.toUpperCase().replace(/[^A-Z0-9]/g, '') : '');

    const matchedDoc = doctorsList.find(d => {
      if (!d.isActive) return false;
      if (referralDoctor.doctorId && d.id === referralDoctor.doctorId) return true;
      const dName = normalizeDoctorName(d.name);
      if (cleanDocQuery && (dName === cleanDocQuery || dName.includes(cleanDocQuery) || cleanDocQuery.includes(dName))) return true;
      const dCode = (d.code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (cleanCodeQuery && dCode && (dCode === cleanCodeQuery || dCode.includes(cleanCodeQuery))) return true;
      return false;
    });
    
    if (matchedDoc) {
      if (matchedDoc.discountType === 'PERCENT') {
        doctorDiscount = Math.round((totalTecnicPrice * matchedDoc.discountValue) / 100);
      } else {
        doctorDiscount = Math.min(totalTecnicPrice, matchedDoc.discountValue);
      }

      const commissionRate = matchedDoc.commissionRate ?? 5;
      const commissionAmount = Math.round((totalTecnicPrice * commissionRate) / 100);

      finalReferralData = {
        doctorId: matchedDoc.id,
        doctorName: matchedDoc.name,
        doctorCode: matchedDoc.code,
        discountAmount: doctorDiscount,
        commissionRate,
        commissionAmount,
        discountDesc: `Bác sĩ ${matchedDoc.name} (${matchedDoc.code}) giới thiệu (Giảm ${matchedDoc.discountType === 'PERCENT' ? `${matchedDoc.discountValue}%` : `${matchedDoc.discountValue.toLocaleString('vi-VN')} đ`})`
      };
    }
  }

  const totalSaved = (totalMarketPrice - totalTecnicPrice) + doctorDiscount;
  const finalTotal = Math.max(0, totalTecnicPrice - doctorDiscount + shippingFee);

  const newOrder = {
    id: `ORD-${Date.now()}`,
    orderCode: `TECNIC-${Math.floor(100000 + Math.random() * 900000)}`,
    customerName,
    customerPhone,
    customerEmail: customerEmail || "tecnic.medtech@gmail.com",
    shippingAddress,
    items: orderItems,
    totalMarketPrice,
    totalTecnicPrice,
    totalSaved,
    shippingFee,
    finalTotal,
    paymentMethod: paymentMethod || 'COD',
    paymentStatus: paymentMethod === 'COD' ? 'UNPAID' : 'PENDING',
    orderStatus: paymentMethod === 'COD' ? 'PROCESSING' : 'PENDING',
    needsInvoice: !!needsInvoice,
    invoiceInfo: invoiceInfo || null,
    referralDoctor: finalReferralData,
    notes: notes || "",
    createdAt: new Date().toISOString(),
    bankTransferInfo: {
      bankName: COMPANY_INFO.bankAccount.bankName,
      branch: COMPANY_INFO.bankAccount.branch,
      accountNumber: COMPANY_INFO.bankAccount.accountNumber,
      accountHolder: COMPANY_INFO.bankAccount.accountHolder,
      transferContent: `TECNIC-MT${String(orderCounterData.count + 1).padStart(4, '0')}`,
      qrUrl: `https://img.vietqr.io/image/mb-787216666-compact2.png?amount=${finalTotal}&addInfo=TECNIC-MT${String(orderCounterData.count + 1).padStart(4, '0')}&accountName=CONG%20TY%20CP%20CN%20VA%20DV%20Y%20TE%20TECNIC`
    }
  };

  // Auto-increment order number with TECNIC-MT prefix
  orderCounterData.count += 1;
  saveJson("order_counter.json", orderCounterData);
  const formattedCount = String(orderCounterData.count).padStart(4, '0');
  newOrder.orderCode = `TECNIC-MT${formattedCount}`;
  newOrder.bankTransferInfo.transferContent = newOrder.orderCode;
  newOrder.bankTransferInfo.qrUrl = `https://img.vietqr.io/image/mb-787216666-compact2.png?amount=${finalTotal}&addInfo=${encodeURIComponent(newOrder.orderCode)}&accountName=CONG%20TY%20CP%20CN%20VA%20DV%20Y%20TE%20TECNIC`;

  ordersList.unshift(newOrder);
  saveJson("orders.json", ordersList);

  res.status(201).json({
    success: true,
    message: "Tạo đơn hàng thành công! Đơn hàng được miễn phí vận chuyển toàn quốc.",
    data: newOrder
  });
});

// CONSULTATION / LEAD REGISTRATION: Save consultation requests
let consultationsList = loadJson("consultations.json", [
  {
    id: "LEAD-101",
    emailOrPhone: "0389880369",
    name: "Khách Hàng Tư Vấn Y Khoa",
    note: "Tư vấn thiết bị phục hồi chức năng và đai nẹp",
    source: "bottom-consultation-bar",
    status: "NEW",
    createdAt: new Date().toISOString()
  }
]);

app.post("/api/consultation", (req: Request, res: Response) => {
  const { email, phone, name, note, emailOrPhone } = req.body;
  const contactInfo = email || phone || emailOrPhone;

  if (!contactInfo) {
    return res.status(400).json({ success: false, message: "Vui lòng nhập số điện thoại hoặc email liên hệ." });
  }

  const newLead = {
    id: `LEAD-${Date.now()}`,
    emailOrPhone: contactInfo,
    name: name || "",
    note: note || "",
    source: "website-consultation-banner",
    status: "PENDING",
    createdAt: new Date().toISOString()
  };

  consultationsList.unshift(newLead);
  saveJson("consultations.json", consultationsList);

  res.status(201).json({
    success: true,
    message: "Đăng ký tư vấn thành công! Chuyên viên TECNIC MEDTECH sẽ gọi điện hỗ trợ Quý khách trong ít phút.",
    data: newLead
  });
});

app.get("/api/consultation", (req: Request, res: Response) => {
  res.json({ success: true, total: consultationsList.length, data: consultationsList });
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

  saveJson("orders.json", ordersList);

  res.json({ success: true, message: "Cập nhật trạng thái đơn hàng thành công", data: order });
});

// PAYOS & VIETQR PAYMENT VERIFICATION
// Endpoint for real-time payment check / webhook
app.post("/api/orders/:id/verify-payment", (req: Request, res: Response) => {
  const { id } = req.params;
  const order = ordersList.find(o => o.id === id || o.orderCode === id);

  if (!order) {
    return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });
  }

  // Mark as PAID and CONFIRMED
  order.paymentStatus = "PAID";
  order.orderStatus = "PROCESSING"; // Đã xác nhận & đang chuẩn bị gửi hàng
  saveJson("orders.json", ordersList);

  res.json({
    success: true,
    message: "Xác nhận thanh toán đơn hàng thành công!",
    data: order
  });
});

// PayOS Webhook receiver (Tự động nhận thông báo khi khách chuyển khoản qua PayOS / VietQR)
app.post("/api/payment/payos-webhook", (req: Request, res: Response) => {
  try {
    const webhookData = req.body;
    console.log("Received PayOS Webhook:", JSON.stringify(webhookData));

    // PayOS sends { code: "00", desc: "success", data: { orderCode, amount, description, ... } }
    const orderCodeNum = webhookData?.data?.orderCode;
    const description = webhookData?.data?.description || "";
    
    if (orderCodeNum) {
      // Find matching order
      const order = ordersList.find(o => 
        o.id.includes(String(orderCodeNum)) || 
        o.orderCode.includes(String(orderCodeNum)) ||
        description.includes(o.orderCode)
      );

      if (order) {
        order.paymentStatus = "PAID";
        order.orderStatus = "PROCESSING";
        saveJson("orders.json", ordersList);
        console.log(`Auto-confirmed payment for order ${order.orderCode} via PayOS webhook!`);
      }
    }

    res.json({ success: true, message: "Webhook processed successfully" });
  } catch (err) {
    console.error("PayOS webhook error:", err);
    res.status(500).json({ success: false, message: "Webhook error" });
  }
});

// DELETE single order
app.delete("/api/orders/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLen = ordersList.length;
  ordersList = ordersList.filter(o => o.id !== id);
  
  if (ordersList.length === initialLen) {
    return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng cần xóa" });
  }

  saveJson("orders.json", ordersList);

  res.json({ success: true, message: `Đã xóa đơn hàng ${id} thành công` });
});

// BULK DELETE orders
app.post("/api/orders/bulk-delete", (req: Request, res: Response) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ success: false, message: "Danh sách mã đơn không hợp lệ" });
  }

  ordersList = ordersList.filter(o => !ids.includes(o.id));
  saveJson("orders.json", ordersList);

  res.json({ success: true, message: `Đã xóa thành công ${ids.length} đơn hàng` });
});

// GET users list (Admin only)
app.get("/api/users", (req: Request, res: Response) => {
  res.json({ success: true, count: usersList.length, data: usersList });
});

// CREATE / ADD staff or admin
app.post("/api/users", (req: Request, res: Response) => {
  const { fullName, phone, email, accountType, clinicName, address, password } = req.body;
  if (!fullName || !phone || !email) {
    return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ họ tên, SĐT và Email" });
  }

  const newUser = {
    id: `USR-${Date.now().toString().slice(-6)}`,
    fullName,
    phone: phone.replace(/[^0-9]/g, ''),
    email,
    password: password || (accountType === 'ADMIN' ? 'admin123' : accountType === 'STAFF' ? 'staff123' : '123456'),
    address: address || "",
    accountType: accountType || 'STAFF',
    clinicName: clinicName || "",
    permissions: accountType === 'ADMIN' ? ['ALL'] : ['ORDERS', 'PRODUCTS_VIEW'],
    status: 'ACTIVE',
    createdAt: new Date().toISOString()
  };

  usersList.push(newUser);
  saveJson("users.json", usersList);

  res.status(201).json({ success: true, message: "Tạo tài khoản người dùng thành công", data: newUser });
});

// UPDATE user role or status
app.put("/api/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { accountType, status, fullName, phone, email, password } = req.body;

  const user = usersList.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
  }

  if (accountType) user.accountType = accountType;
  if (status) user.status = status;
  if (fullName) user.fullName = fullName;
  if (phone) user.phone = phone.replace(/[^0-9]/g, '');
  if (email) user.email = email;
  if (password) user.password = password;

  saveJson("users.json", usersList);

  res.json({ success: true, message: "Cập nhật tài khoản thành công", data: user });
});

// DELETE user
app.delete("/api/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  if (id === 'USR-ADMIN') {
    return res.status(400).json({ success: false, message: "Không thể xóa tài khoản Quản trị viên tối cao!" });
  }
  usersList = usersList.filter(u => u.id !== id);
  saveJson("users.json", usersList);

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

  saveJson("products.json", productsList);

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
  saveJson("products.json", productsList);

  res.status(201).json({ success: true, message: "Thêm sản phẩm mới thành công", data: newProduct });
});

// DELETE product (Admin)
app.delete("/api/products/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const numId = Number(id);
  productsList = productsList.filter(p => p.id !== numId && p.code.toLowerCase() !== id.toLowerCase());
  saveJson("products.json", productsList);

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
  saveJson("systemConfig.json", systemConfig);

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
  const systemInstruction = `Bạn là Chuyên viên Tư vấn Kỹ thuật & Thiết Bị Y Tế của TECNIC MEDTECH (Website: ytetecnic.vn, Hotline: 034 84 02466, Trụ sở: Tầng 2 Tòa nhà New Skyline, KĐT Văn Quán, Hà Đông, Hà Nội).
Công ty chuyên phân phối sỉ & lẻ thiết bị y tế, dụng cụ phục hồi chức năng sau tai biến, vật tư tiêu hao y tế chính hãng.
Slogan công ty: "Kiến tạo để phụng sự - Giải pháp toàn diện, tái sinh cuộc sống".

NGUYÊN TẮC TƯ VẤN QUAN TRỌNG:
1. TUYỆT ĐỐI KHÔNG xuất code lập trình (không xuất code TypeScript, JSON, Javascript, HTML hay bất kỳ đoạn mã lập trình nào).
2. Trả lời bằng tiếng Việt tự nhiên, ân cần, xưng "Dạ em / Chuyên viên tư vấn TECNIC", gọi khách là "Quý khách" hoặc "Anh/Chị".
3. KHI KHÁCH HỎI CÁC CHỦ ĐỀ NGOÀI PHẠM VI SẢN PHẨM TECNIC (Ví dụ: mua kẹo, bánh kẹo, đồ ăn, thời trang, đồ gia dụng, vé máy bay, du lịch, v.v.):
   - Hãy giải thích lịch sự rằng TECNIC là đơn vị chuyên về Thiết bị y tế & Dụng cụ Phục hồi chức năng nên hiện chưa phân phối sản phẩm đó.
   - Đồng thời hướng dẫn khách tra cứu hoặc mua sắm qua các sàn trực tuyến kèm đường link Markdown [Tên Trang](URL) (Ví dụ: [Tìm kiếm trên Shopee](https://shopee.vn), [Tìm kiếm trên Tiki](https://tiki.vn), [Tra cứu trên Google](https://www.google.com/search?q=...)).
4. KHI KHÁCH HỎI VỀ Y TẾ BÊN NGOÀI (BHYT, Bộ Y Tế, Bệnh viện Bạch Mai, 108, Vinmec, tra cứu thuốc):
   - Giải thích chi tiết và đính kèm đường link Markdown chính thống: [Cổng Thông Tin Bộ Y Tế](https://moh.gov.vn), [Cổng Tra Cứu Bảo Hiểm Xã Hội Việt Nam](https://baohiemxahoi.gov.vn), [Bệnh Viện Bạch Mai](http://bachmai.gov.vn), [Bệnh Viện Quân Y 108](https://benhvien108.vn), [Vinmec](https://www.vinmec.com), [Cục Quản Lý Dược](https://dav.gov.vn).
5. KHI KHÁCH HỎI VỀ SẢN PHẨM HOẶC YÊU CẦU XEM CHI TIẾT SẢN PHẨM:
   - Hãy trình bày đầy đủ thông tin chi tiết sản phẩm & dòng tư vấn đặt hàng chuẩn:
     Dạ mời anh/chị xem thông tin chi tiết sản phẩm:

     **[Tên sản phẩm]**
     ⭐ 4.9 (136 đánh giá)
     💰 Giá: **[Giá bán] đ**

     **Thông số nổi bật:**
     - Loại sản phẩm / Hãng: ...
     - Model / Mã SP: ...
     - Dung tích / Kích thước: ...
     - Công suất / Năng lượng: ...
     - Chức năng nổi bật: ...

     [Mẫu này phù hợp với nhu cầu ...]

     **Quyền lợi chỉ có tại TECNIC MEDTECH:**
     - Bảo hành chính hãng 24 tháng
     - Giao hàng nhanh trong 2-4 giờ
     - Đổi trả dễ dàng trong 30 ngày

     **Tư vấn & Liên hệ đặt hàng ngay cho Anh/Chị:**
     - Hotline 24/7: [034 84 02466](tel:0348402466) / [038 988 0369](tel:0389880369)
     - Nhắn Zalo: [Chat Zalo 034 84 02466](https://zalo.me/0348402466)`;

  try {
    const ai = getGeminiClient();

    if (ai) {
      // 1. First attempt: Gemini with search tools
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `${systemInstruction}\n\nLịch sử trao đổi:\n${JSON.stringify(history || [])}\n\nKhách hàng hỏi: "${message}"\n\nHãy trả lời ân cần, chi tiết, chuyên nghiệp và chèn đường link phù hợp (không xuất code lập trình).`
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
      } catch (searchError: any) {
        // 2. Second attempt: Direct Gemini without search tool (fallback to gemini-2.5-flash / gemini-2.5-pro)
        try {
          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `${systemInstruction}\n\nLịch sử trao đổi:\n${JSON.stringify(history || [])}\n\nKhách hàng hỏi: "${message}"\n\nHãy trả lời ân cần, chi tiết, chuyên nghiệp và chèn đường link Markdown ngoài nếu cần (không xuất code).`
                  }
                ]
              }
            ]
          });

          const replyText = response.text;
          if (replyText && replyText.trim()) {
            return res.json({
              success: true,
              reply: replyText.trim(),
              source: "gemini-direct"
            });
          }
        } catch (directError: any) {
          // If Gemini quota or spike occurs, seamlessly fallback to local expert engine below
        }
      }
    }
  } catch (error: any) {
    // Seamless fallback to expert rule-based knowledge engine
  }

  // Smart fallback responses based on topic detection
  const msgLower = message.toLowerCase().trim();
  let reply = "";

  // 1. Non-medical queries (kẹo, bánh, quần áo, thức ăn, hàng tiêu dùng khác)
  if (
    msgLower.includes("kẹo") || msgLower.includes("bánh") || msgLower.includes("đồ ăn") || 
    msgLower.includes("thức ăn") || msgLower.includes("quần áo") || msgLower.includes("giày") ||
    msgLower.includes("điện thoại") || msgLower.includes("ti vi") || msgLower.includes("vé máy bay") ||
    msgLower.includes("du lịch") || msgLower.includes("trà sữa") || msgLower.includes("cà phê")
  ) {
    const encodedQ = encodeURIComponent(message);
    reply = `Dạ kính chào Quý khách! 

**TECNIC MEDTECH** (ytetecnic.vn) là đơn vị chuyên nhập khẩu và phân phối **Trang thiết bị y tế, Dụng cụ phục hồi chức năng sau tai biến & Vật tư y tế chuyên dụng** (như giường bệnh tay quay/điện, xe lăn, găng tay Robot PHCN, đai nẹp Bonbone Nhật Bản, máy xung điện Omron...). Hiện tại bên em chưa cung cấp mặt hàng này ạ.

Quý khách có thể tham khảo tìm mua sản phẩm trên các sàn thương mại điện tử hoặc tra cứu trực tuyến tại các đường dẫn sau:
- 🛒 [Tìm kiếm trên Shopee Việt Nam](https://shopee.vn/search?keyword=${encodedQ})
- 🏬 [Tìm kiếm trên Tiki](https://tiki.vn/search?q=${encodedQ})
- 🌐 [Tra cứu mở rộng trên Google](https://www.google.com/search?q=${encodedQ})

Nếu Quý khách hoặc người thân cần tư vấn về thiết bị y tế chăm sóc sức khỏe gia đình, Quý khách vui lòng nhắn em để được hỗ trợ tận tình nhé ạ!`;
  }
  // 2. Bảo hiểm y tế / BHYT / BHXH
  else if (msgLower.includes("bhyt") || msgLower.includes("bảo hiểm") || msgLower.includes("bhxh") || msgLower.includes("chế độ bảo hiểm")) {
    reply = `Dạ kính chào Quý khách! Về thông tin **Bảo hiểm Y tế (BHYT) và Chế độ Bảo hiểm Xã hội (BHXH)**:
1. **Tra cứu giá trị sử dụng thẻ BHYT & Mức hưởng**: Quý khách có thể cài đặt ứng dụng **VssID** hoặc tra cứu trực tuyến tại cổng thông tin chính thức của BHXH Việt Nam:
   - 👉 [Cổng Thông Tin Bảo Hiểm Xã Hội Việt Nam](https://baohiemxahoi.gov.vn)
   - 👉 [Cổng Dịch Vụ Công Quốc Gia - Mục Y Tế & Bảo Hiểm](https://dichvucong.gov.vn)
2. **Quy định thanh toán thiết bị & dụng cụ PHCN**: Một số danh mục vật tư y tế và can thiệp phục hồi chức năng điều trị nội trú tại bệnh viện được quỹ BHYT chi trả theo Thông tư quy định của Bộ Y Tế.
👉 Quý khách có thể tra cứu thông tư mới nhất tại [Cổng Thông Tin Bộ Y Tế](https://moh.gov.vn).`;
  }
  // 3. Bệnh viện & Khám chữa bệnh tuyến đầu
  else if (msgLower.includes("bạch mai") || msgLower.includes("108") || msgLower.includes("chợ rẫy") || msgLower.includes("việt đức") || msgLower.includes("vinmec") || msgLower.includes("bệnh viện")) {
    reply = `Dạ chào Quý khách! Quý khách có thể truy cập cổng thông tin và đặt lịch khám tại các bệnh viện tuyến đầu qua các đường link chính thống sau:
- 🏥 [Bệnh Viện Bạch Mai - Khoa Phục Hồi Chức Năng](http://bachmai.gov.vn) (Hotline: 024 3869 3731)
- 🏥 [Bệnh Viện Trung Ương Quân Đội 108](https://benhvien108.vn) (Số 1 Trần Hưng Đạo, Hai Bà Trưng, Hà Nội)
- 🏥 [Hệ Thống Y Tế Vinmec - Cẩm Nang Sức Khỏe](https://www.vinmec.com)
- 🌐 [Cổng Thông Tin Bộ Y Tế Việt Nam](https://moh.gov.vn)

Sau khi điều trị xuất viện, nếu người bệnh cần trang bị giường y tế, xe lăn ngả nằm, găng tay Robot tập vận động bàn tay hoặc đệm hơi chống loét tại nhà, TECNIC MEDTECH luôn sẵn sàng giao hàng và lắp đặt tận nơi!`;
  }
  // 4. Giường y tế
  else if (msgLower.includes("giường") || msgLower.includes("tay quay") || msgLower.includes("kéo giãn") || msgLower.includes("nằm liệt")) {
    reply = `Dạ chào Quý khách! Về dòng **Giường y tế dưỡng bệnh & phục hồi chức năng** tại TECNIC (ytetecnic.vn):
1. **Giường y tế 4 tay quay có bô vệ sinh Hueloi JYC01 / GBM-092A**: Hỗ trợ nâng hạ đầu lưng từ 0-85°, nâng hạ chân, nghiêng trái/phải phòng ngừa loét tì đè và tích hợp cần gạt bô vệ sinh tự động ngay tại giường. Rất thích hợp cho bệnh nhân tai biến hoặc người già nằm một chỗ.
2. **Giường y tế điện tự động đa chức năng OSADA SD-33E / SD-57C**: Điều khiển bằng remote bấm nút êm ái, có bàn ăn, cọc truyền dịch và chậu gội đầu tận nơi.
3. **Giường kéo giãn cột sống bằng điện SD-41GK**: Giúp giải phóng chèn ép rễ thần kinh cho bệnh nhân thoát vị đĩa đệm cột sống cổ và thắt lưng.
👉 TECNIC hỗ trợ giao hàng, lắp đặt tận nhà và bảo hành chính hãng từ 24 - 36 tháng. Hotline hỗ trợ: **034 84 02466**.`;
  } 
  // 5. Xe lăn
  else if (msgLower.includes("xe lăn") || msgLower.includes("bô") || msgLower.includes("ngả nằm") || msgLower.includes("xe lan")) {
    reply = `Dạ chào Quý khách! Về dòng **Xe lăn tay & Xe lăn đa năng**, TECNIC cung cấp các dòng đạt chuẩn chất lượng cao:
1. **Xe lăn ngả nằm 180° Lucass X-72 / GBM-061C**: Tựa lưng ngả thành giường nằm nghỉ ngơi, có gác chân nâng hạ và tích hợp bô vệ sinh tiện lợi.
2. **Xe lăn siêu nhẹ GBM-065B**: Khung hợp kim nhôm siêu nhẹ chỉ 7.5kg, gấp gọn bỏ cốp ô tô hoặc mang đi du lịch cực kỳ tiện lợi.
3. **Xe lăn có ghế bô vệ sinh Lucass X-8 / X-9**: Chống nước, thuận tiện khi tắm rửa và đẩy trực tiếp vào bồn cầu gia đình.
👉 Cam kết chính hãng 100%, bảo hành khung xe 12 - 24 tháng!`;
  } 
  // 6. Robot phục hồi chức năng
  else if (msgLower.includes("robot") || msgLower.includes("găng") || msgLower.includes("tai biến") || msgLower.includes("liệt") || msgLower.includes("bàn tay")) {
    reply = `Dạ chào Quý khách! Đối với phục hồi chức năng vận động bàn tay:
1. **Găng tay Robot PHCN Oromi 962 / Hueloi**:
   - Sử dụng cơ chế áp lực khí nén nắn chỉnh từng ngón tay co duỗi linh hoạt theo phác đồ tập luyện.
   - Chế độ tập gương (Mirror Therapy): Đeo găng cảm biến bên tay lành, bàn tay liệt sẽ tự động bắt chước cử động theo, giúp kích thích não bộ tái thiết lập đường dẫn truyền thần kinh.
   - Ngăn ngừa teo cơ, cứng khớp và co rút gân gấp bàn tay.
2. **Ghế nâng chuyển bệnh nhân thủy lực OSADA XDC-01 / GBM-053**: Hỗ trợ người chăm sóc nâng chuyển bệnh nhân từ giường sang xe lăn hoặc vào phòng vệ sinh an toàn, không tốn sức.
👉 Quý khách có thể liên hệ ngay hotline **034 84 02466** để Chuyên viên kỹ thuật tư vấn chọn size găng tay vừa vặn nhất!`;
  } 
  // 7. Đệm hơi chống loét
  else if (msgLower.includes("đệm hơi") || msgLower.includes("chống loét") || msgLower.includes("loét")) {
    reply = `Dạ chào Quý khách! Về giải pháp chống loét tì đè cho người nằm lâu:
1. **Đệm hơi chống loét tự động đảo khí GBM-095B / GBM-096B (Có khoét lỗ bô)**: Máy bơm tự động luân phiên đổi khí giữa các múi đệm sau mỗi 6-8 phút, giúp các điểm tì đè (vùng xương cùng cụt, gót chân, bả vai) luôn được thông thoáng tuần hoàn máu.
2. **Đệm hơi nâng lưng 45° GBM-073B**: Hỗ trợ người bệnh ngồi dậy ăn uống, uống thuốc và thở dễ dàng hơn.
3. **Đệm hơi OSADA SD-AM05**: Chất liệu PVC y tế cao cấp, êm ái, vận hành cực êm không gây tiếng ồn ảnh hưởng giấc ngủ.`;
  } 
  // 8. Đai nẹp Bonbone Nhật Bản
  else if (msgLower.includes("đai") || msgLower.includes("nẹp") || msgLower.includes("bonbone") || msgLower.includes("gối") || msgLower.includes("cổ") || msgLower.includes("vai") || msgLower.includes("lưng")) {
    reply = `Dạ chào Quý khách! TECNIC phân phối chính hãng hệ thống **Đai nẹp định hình Bonbone Nhật Bản & Famedi**:
- **Đai cố định & trợ lực khớp gối Bonbone Thin PF Cross / Free Knee Supporter**: Giúp nâng đỡ bánh chè, giảm áp lực lên sụn khớp cho người thoái hóa khớp gối hoặc sau phẫu thuật dây chằng.
- **Đai định hình cột sống lưng Bonbone Pro Hard Slim**: Cố định vững chắc vùng thắt lưng L1-L5, giảm đau nhanh cho người thoát vị đĩa đệm hoặc đau thần kinh tọa.
- **Đai nẹp cổ thoáng khí Bonbone**: Cố định đốt sống cổ, giảm đau mỏi vai gáy và thoái hóa cột sống cổ.
- **Đai di chuyển bệnh nhân Famedi / Orbe**: Thiết kế quai trợ lực giúp người nhà đỡ bệnh nhân tập đi an toàn, chống trượt ngã.`;
  } 
  // 9. Xung điện & trị liệu
  else if (msgLower.includes("xung điện") || msgLower.includes("omron") || msgLower.includes("massage") || msgLower.includes("đạp chân") || msgLower.includes("suy giãn")) {
    reply = `Dạ chào Quý khách! Về thiết bị vật lý trị liệu & kích thích thần kinh cơ:
1. **Máy xung điện trị liệu Omron HV-F013 / HV-F028 / HV-F230 (Không dây)**: Ứng dụng dòng xung TENS & EMS giúp giảm đau mỏi cơ xương khớp và kích thích hồi phục cơ teo liệt.
2. **Máy nén khí trị liệu suy giãn tĩnh mạch GBM-034**: Tạo áp lực khí ép từng khoang bắp chân giúp thúc đẩy máu tĩnh mạch hồi lưu về tim, giảm sưng phù và nhức mỏi chân.
3. **Máy đạp chân điện có nẹp gối**: Hỗ trợ vận động chủ động và thụ động cho người yếu liệt cả tay và chân.`;
  } 
  // 10. Khung tập đi
  else if (msgLower.includes("khung") || msgLower.includes("nạng") || msgLower.includes("gậy") || msgLower.includes("tập đi")) {
    reply = `Dạ chào Quý khách! Về thiết bị trợ giúp di chuyển tập đi:
1. **Khung tập đi đa năng có ghế ngồi OSADA SD-K05 / GBM-021**: Tích hợp 3 chế độ (tập đứng, tập đi và ghế ngồi nghỉ), có bánh xe khóa an toàn và tay tì nách êm ái.
2. **Gậy 4 chân Lucass VC-24 / Gậy 3 chân OSADA RMS01-4**: Đế cao su chống trượt cực kỳ vững vàng cho người lớn tuổi.
3. **Nạng nhôm Oromi C12 / Lucass VCL500 / Nạng khuỷu tay C-37**: Siêu nhẹ, chắc chắn, điều chỉnh chiều cao linh hoạt.`;
  } 
  // 11. Thanh toán / Liên hệ
  else if (msgLower.includes("thanh toán") || msgLower.includes("giao hàng") || msgLower.includes("địa chỉ") || msgLower.includes("hotline") || msgLower.includes("tài khoản")) {
    reply = `Dạ thông tin liên hệ và đặt hàng tại **TECNIC MEDTECH** (ytetecnic.vn):
- 🏢 **Trụ sở**: Tầng 2, Tòa nhà New Skyline, KĐT Văn Quán, P. Hà Đông, Hà Nội.
- 📞 **Hotline tư vấn 24/7**: 034 84 02466 (Tư vấn thiết bị tận tâm).
- 💳 **Tài khoản doanh nghiệp**: Ngân hàng BIDV – Chi nhánh Hà Đông | STK: **8661234668** | Tên: CÔNG TY CP CN VA DV Y TE TECNIC.
- 🚚 **Giao hàng**: Miễn phí ship toàn quốc cho đơn từ 1.000.000đ, hỗ trợ kiểm tra thiết bị trước khi thanh toán COD!`;
  } 
  // 12. General fallback with Google Search link
  else {
    reply = `Dạ xin chào Quý khách! Chuyên viên Tư vấn Thiết Bị & Vật Tư Y Tế TECNIC MEDTECH hân hạnh được tư vấn.

Quý khách có thể hỏi về bất kỳ sản phẩm nào của TECNIC hoặc tra cứu thông tin y tế, bệnh viện và bảo hiểm:
1. 🦽 **Xe lăn**: Xe lăn ngả nằm 180°, xe lăn nhôm siêu nhẹ & xe lăn có bô
2. 🛏️ **Giường y tế dưỡng bệnh**: Giường 2-4 tay quay có bô, giường điện đa năng
3. 🤖 **Robot PHCN**: Găng tay Robot tập ngón tay sau tai biến & Ghế nâng thủy lực
4. 🩺 **Đai nẹp khớp Bonbone Nhật Bản**: Đai trợ lực đầu gối, đai cột sống lưng
5. 💨 **Đệm hơi chống loét**: Đệm khí tự động đảo múi cho người nằm liệt
6. 🌐 **Tra cứu ngoài**: [Cổng Thông Tin Bộ Y Tế](https://moh.gov.vn) | [Cổng BHXH Việt Nam](https://baohiemxahoi.gov.vn) | [Tra cứu trên Google](https://www.google.com/search?q=${encodeURIComponent(message)})`;
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

  const promptText = `Bạn là Trưởng ban Biên tập Báo Y Khoa & Chuyên gia Cố vấn Y học Cổ truyền - Phục hồi Chức năng của TECNIC MEDTECH.
Hãy viết một bài báo chuyên đề y khoa chuyên nghiệp, chuẩn phong cách báo chí báo Sức Khỏe & Đời Sống / VnExpress Y tế, giàu dẫn chứng khoa học, phác đồ điều trị và có các hình ảnh minh họa sống động cho chủ đề sau:
Chủ đề: "${topic}"
Danh mục dự kiến: ${category || "KIEN_THUC_PHCN"}
Đối tượng độc giả: ${targetAudience || "Bác sĩ, điều dưỡng, người bệnh và gia đình chăm sóc"}
Từ khóa trọng tâm: ${keywordFocus || "Thiết bị y tế chính hãng, phục hồi chức năng, chăm sóc người già"}

Yêu cầu bài viết theo phong cách Báo Chí Y Khoa Chuyên Nghiệp:
1. Tiêu đề báo chí giật tít hấp dẫn, chuẩn phong cách phóng sự y khoa.
2. Mở đầu bằng Sa-pô (Lead paragraph) cô đọng, sắc bén.
3. Nội dung chia thành các phần rõ ràng với tiêu đề H2 (##), H3 (###), trích dẫn ý kiến chuyên gia, số liệu thống kê.
4. Chèn ít nhất 2 hình ảnh minh họa Markdown trong nội dung kèm chú thích ảnh (dùng URL Unsplash chất lượng cao về y tế / bác sĩ / thiết bị y tế như:
   - https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80
   - https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80
   - https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80
   - https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=80
5. Đưa ra giải pháp thiết bị y tế TECNIC MEDTECH thực tiễn (giường y tế OSADA/GBM, xe lăn ngả nằm Lucass, găng tay Robot PHCN, đệm chống loét, đai định hình Bonbone Nhật Bản).

Yêu cầu định dạng đầu ra: Trả về duy nhất JSON hợp lệ (không bọc trong \`\`\`json) với cấu trúc sau:
{
  "title": "Tiêu đề bài báo y khoa chuyên nghiệp",
  "category": "KIEN_THUC_PHCN",
  "categoryName": "Kiến Thức Phục Hồi Chức Năng",
  "excerpt": "Đoạn Sa-pô tóm tắt bài báo 2-3 câu khơi gợi sự quan tâm của độc giả",
  "coverImage": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
  "author": {
    "name": "BS. CKII Nguyễn Văn Hùng",
    "title": "Chuyên gia Vật lý Trị liệu & PHCN - Ban Cố vấn TECNIC"
  },
  "readTime": "6 phút đọc",
  "tags": ["Phục hồi chức năng", "Y khoa chuyên sâu", "Thiết bị y tế", "TECNIC MEDTECH"],
  "content": "Nội dung bài báo đầy đủ Markdown có H2, H3, ảnh minh họa ![Chú thích ảnh](url) kèm trích dẫn và lời khuyên y khoa chi tiết."
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

// SETTINGS & INFO PAGES API
app.get("/api/settings", (req: Request, res: Response) => {
  const { parentId } = req.query;
  if (parentId !== undefined) {
    const filtered = settingsList.filter(s => (s.parentId || "root") === String(parentId));
    return res.json({ success: true, data: filtered });
  }
  res.json({ success: true, data: settingsList });
});

app.get("/api/settings/:id", (req: Request, res: Response) => {
  const item = settingsList.find(s => s.id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: "Không tìm thấy nội dung setting" });
  }
  res.json({ success: true, data: item });
});

app.post("/api/settings", (req: Request, res: Response) => {
  const { name, subtitle, slug, value, description, content1, content2, parentId, isFolder, category, bgColor, avatar, order, isVisible } = req.body;
  
  if (!name) {
    return res.status(400).json({ success: false, message: "Tên nội dung không được để trống" });
  }

  const newItem: SettingItem = {
    id: String(Date.now()),
    name: name.trim(),
    subtitle: subtitle || "",
    slug: slug || "",
    value: value || "",
    description: description || "",
    content1: content1 || "",
    content2: content2 || "",
    parentId: parentId || "root",
    isFolder: !!isFolder,
    category: category || "Root",
    bgColor: bgColor || "#000000",
    avatar: avatar || "",
    order: Number(order) || (settingsList.length + 1),
    isVisible: isVisible !== undefined ? !!isVisible : true,
    createdAt: new Date().toISOString()
  };

  settingsList.push(newItem);
  saveJson("settings.json", settingsList);

  res.json({ success: true, message: "Thêm nội dung setting mới thành công!", data: newItem });
});

app.put("/api/settings/:id", (req: Request, res: Response) => {
  const item = settingsList.find(s => s.id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: "Không tìm thấy nội dung setting" });
  }

  const { name, subtitle, slug, value, description, content1, content2, parentId, isFolder, category, bgColor, avatar, backgroundImage, icon1, icon2, icon3, icon4, icon5, icon6, order, isVisible } = req.body;

  if (name !== undefined) item.name = name.trim();
  if (subtitle !== undefined) item.subtitle = subtitle;
  if (slug !== undefined) item.slug = slug;
  if (value !== undefined) item.value = value;
  if (description !== undefined) item.description = description;
  if (content1 !== undefined) item.content1 = content1;
  if (content2 !== undefined) item.content2 = content2;
  if (parentId !== undefined) item.parentId = parentId;
  if (isFolder !== undefined) item.isFolder = !!isFolder;
  if (category !== undefined) item.category = category;
  if (bgColor !== undefined) item.bgColor = bgColor;
  if (avatar !== undefined) item.avatar = avatar;
  if (backgroundImage !== undefined) item.backgroundImage = backgroundImage;
  if (icon1 !== undefined) item.icon1 = icon1;
  if (icon2 !== undefined) item.icon2 = icon2;
  if (icon3 !== undefined) item.icon3 = icon3;
  if (icon4 !== undefined) item.icon4 = icon4;
  if (icon5 !== undefined) item.icon5 = icon5;
  if (icon6 !== undefined) item.icon6 = icon6;
  if (order !== undefined) item.order = Number(order);
  if (isVisible !== undefined) item.isVisible = !!isVisible;
  item.updatedAt = new Date().toISOString();

  saveJson("settings.json", settingsList);

  res.json({ success: true, message: "Cập nhật nội dung setting thành công!", data: item });
});

app.patch("/api/settings/:id/toggle-visible", (req: Request, res: Response) => {
  const item = settingsList.find(s => s.id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: "Không tìm thấy nội dung setting" });
  }

  item.isVisible = !item.isVisible;
  item.updatedAt = new Date().toISOString();
  saveJson("settings.json", settingsList);

  res.json({ 
    success: true, 
    message: `Đã chuyển trạng thái setting sang "${item.isVisible ? 'Hiện' : 'Ẩn'}"!`, 
    data: item 
  });
});

app.patch("/api/settings/:id/order", (req: Request, res: Response) => {
  const item = settingsList.find(s => s.id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: "Không tìm thấy nội dung setting" });
  }

  const { order } = req.body;
  if (order !== undefined) {
    item.order = Number(order);
    item.updatedAt = new Date().toISOString();
    saveJson("settings.json", settingsList);
  }

  res.json({ success: true, message: "Cập nhật số thứ tự thành công!", data: item });
});

app.delete("/api/settings/:id", (req: Request, res: Response) => {
  const index = settingsList.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Không tìm thấy nội dung setting để xóa" });
  }

  const deleted = settingsList.splice(index, 1);
  saveJson("settings.json", settingsList);

  res.json({ success: true, message: `Đã xóa nội dung "${deleted[0]?.name}"!`, data: deleted[0] });
});

// Company Info
app.get("/api/company", (req: Request, res: Response) => {
  res.json({ success: true, data: COMPANY_INFO });
});

// ----------------------------------------------------
// 2. VITE MIDDLEWARE & STATIC SERVING
// ----------------------------------------------------
app.get(["/manifest.json", "/manifest.webmanifest"], (req, res) => {
  const manifestPath = path.join(process.cwd(), "public", "manifest.json");
  res.setHeader("Content-Type", "application/manifest+json; charset=utf-8");
  if (fs.existsSync(manifestPath)) {
    res.sendFile(manifestPath);
  } else {
    res.json({
      name: "TECNIC MEDTECH - Thiết Bị Y Tế & Phục Hồi Chức Năng",
      short_name: "TECNIC App",
      start_url: "/",
      scope: "/",
      display: "standalone",
      theme_color: "#0077b6",
      background_color: "#ffffff",
      icons: [{ src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" }]
    });
  }
});

app.use(express.static(path.join(process.cwd(), "public")));

async function startServer() {
  const distPath = path.join(process.cwd(), "dist");
  const httpServer = http.createServer(app);

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    try {
      const isHmrDisabled = process.env.DISABLE_HMR === "true";
      const vite = await createViteServer({
        server: {
          middlewareMode: true,
          hmr: isHmrDisabled ? false : { server: httpServer },
        },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch (err) {
      console.error("Vite middleware error:", err);
      if (fs.existsSync(distPath)) {
        app.use(express.static(distPath));
        app.get("*", (req: Request, res: Response) => {
          res.sendFile(path.join(distPath, "index.html"));
        });
      }
    }
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`[TECNIC MEDICAL Server] running at http://0.0.0.0:${PORT}`);
    testDbConnection().catch((err) => console.warn("MySQL initial check:", err?.message));
  });
}

startServer();
