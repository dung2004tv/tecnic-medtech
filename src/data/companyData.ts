export const COMPANY_INFO = {
  name: 'CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ HỖ TRỢ Y TẾ TECNIC (TECNIC Medtech)',
  shortName: 'TECNIC Medtech',
  brandName: 'TECNIC Medtech',
  slogan: 'Kiến tạo để phụng sự',
  mission: 'Kiến tạo để phụng sự',
  vision: 'TECNIC hướng tới thuộc nhóm VNR 500, sản phẩm/dịch vụ nằm trong nhóm dẫn đầu thị trường. Là doanh nghiệp nằm trong nhóm dẫn đầu về các chỉ số mang lại sự hạnh phúc và cơ hội phát triển cho người lao động trong doanh nghiệp.',
  coreValues: [
    'Phụng sự: Khách hàng, Bệnh nhân',
    'Phụng sự: Người lao động',
    'Phụng sự: Cổ đông',
    'Phụng sự: Cộng đồng, xã hội'
  ],
  taxId: '0110887948',
  address: 'Tầng 2, Tòa nhà New Skyline, KĐT mới Văn Quán - Yên Phúc, Phường Hà Đông, TP. Hà Nội, Việt Nam',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tầng+2+Tòa+nhà+New+Skyline+Văn+Quán+Yên+Phúc+Hà+Đông+Hà+Nội',
  googleMapsEmbed: 'https://www.google.com/maps?q=Tầng+2+Tòa+nhà+New+Skyline+Văn+Quán+Yên+Phúc+Hà+Đông+Hà+Nội&output=embed',
  hotlines: ['034 84 02466', '038 988 0369'],
  emails: ['tecnic.medtech@gmail.com', 'nguyendungdbd1@gmail.com'],
  website: 'https://tecnic.vn/',
  bankAccount: {
    bankName: 'Ngân hàng MB Bank',
    branch: '',
    accountNumber: '787216666',
    accountHolder: 'CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ HỖ TRỢ Y TẾ TECNIC',
    qrCodeImage: 'https://img.vietqr.io/image/mb-787216666-compact2.png',
    note: 'TECNIC Medtech không yêu cầu chuyển tiền vào tài khoản cá nhân.'
  },
  workingHours: {
    weekday: 'Thứ 2 – Thứ 6: sáng 08:00 – 12:00 , chiều 14h30 – 17h30',
    weekend: 'Thứ 7 – Chủ nhật: Nghỉ (Hotline hỗ trợ 24/7)'
  },
  coreFields: [
    {
      step: '01',
      title: 'Công nghệ Phục hồi chức năng',
      desc: 'Thiết bị công nghệ cao giúp kích thích, tập vận động và khôi phục khả năng đi lại, sinh hoạt cho người tai biến, đột quỵ.'
    },
    {
      step: '02',
      title: 'Hỗ trợ Di chuyển & Sinh hoạt',
      desc: 'Hệ thống xe lăn, khung tập đi, nạng, ghế bô vệ sinh, đệm hơi chống loét và ghế nâng chuyển trợ lực giữ thăng bằng an toàn.'
    },
    {
      step: '03',
      title: 'Đai nẹp & Cơ xương khớp',
      desc: 'Dụng cụ cố định Bonbone Nhật Bản, nẹp chỉnh khớp gối, cổ chân, vai và đệm kéo giãn cột sống giảm đau chuyên sâu.'
    },
    {
      step: '04',
      title: 'Cải tạo Không gian sống',
      desc: 'Khảo sát và nâng cấp hệ thống thanh tay vịn nhà tắm, bồn cầu, phòng chống té ngã cho người cao tuổi và người bệnh.'
    }
  ],
  policies: [
    {
      title: 'Chính sách bán hàng & chất lượng hàng hóa',
      url: 'https://ytetecnic.vn/chinh-sach-ban-hang-va-chat-luong-hang-hoa',
      desc: 'Cam kết 100% thiết bị y tế chính hãng, có hóa đơn VAT điện tử, đầy đủ giấy chứng nhận y khoa.'
    },
    {
      title: 'Chính sách bảo vệ dữ liệu cá nhân',
      url: 'https://ytetecnic.vn/chinh-sach-quyen-rieng-tu-va-bao-mat-du-lieu-ca-nhan',
      desc: 'Bảo mật tuyệt đối hồ sơ bệnh án, thông tin đơn hàng và thông số sức khỏe người dùng theo chuẩn y khoa.'
    },
    {
      title: 'Chính sách vận chuyển & giao nhận',
      url: 'https://ytetecnic.vn/chinh-sach-van-chuyen-giao-nhan-hang-hoa-tai-tecnic',
      desc: 'Giao hàng hỏa tốc trong 2h tại Hà Nội & TP.HCM, giao hàng toàn quốc từ 1-2 ngày, hỗ trợ kiểm tra hàng trước khi thanh toán.'
    },
    {
      title: 'Chính sách đổi - trả & bảo hành',
      url: 'https://ytetecnic.vn/chinh-sach-doi-tra-hang-hoa-tai-tecnic-medical',
      desc: 'Đổi mới trong 30 ngày nếu lỗi do nhà sản xuất. Bảo hành chính hãng tận nơi chu đáo.'
    }
  ]
};

// SQL SCHEMA FOR MYSQL & SQL SERVER (SSMS)
export const SQL_DATABASE_SCRIPTS = {
  mySql: `
-- ==========================================================
-- CƠ SỞ DỮ LIỆU TECNIC (CHUẨN MYSQL 8.0+)
-- WEBSITE: ytetecnic.vn | PHONG CÁCH FPT LONG CHÂU
-- ==========================================================

CREATE DATABASE IF NOT EXISTS tecnic_medical_db 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE tecnic_medical_db;

-- 1. BẢNG NGƯỜI DÙNG & BÁC SĨ (USERS)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    district VARCHAR(100),
    account_type ENUM('CA_NHAN', 'BAC_SI', 'PHONG_KHAM', 'DAI_LY') DEFAULT 'CA_NHAN',
    clinic_name VARCHAR(200),
    tax_code VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. BẢNG DANH MỤC THIẾT BỊ (CATEGORIES)
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    short_name VARCHAR(100) NOT NULL,
    slug VARCHAR(200) NOT NULL,
    icon VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. BẢNG SẢN PHẨM & THIẾT BỊ Y TẾ (PRODUCTS)
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    category_id VARCHAR(50),
    market_price DECIMAL(15, 2) NOT NULL,
    tecnic_price DECIMAL(15, 2) NOT NULL,
    stock INT DEFAULT 0,
    sold_count INT DEFAULT 0,
    rating DECIMAL(2, 1) DEFAULT 5.0,
    brand VARCHAR(100),
    origin VARCHAR(100),
    warranty_months INT DEFAULT 12,
    image_url TEXT,
    short_description TEXT,
    full_description LONGTEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- 4. BẢNG ĐƠN HÀNG (ORDERS)
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_code VARCHAR(50) NOT NULL UNIQUE,
    user_id INT NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(150),
    shipping_address TEXT NOT NULL,
    total_market_price DECIMAL(15, 2) NOT NULL,
    total_tecnic_price DECIMAL(15, 2) NOT NULL,
    total_saved DECIMAL(15, 2) NOT NULL,
    final_total DECIMAL(15, 2) NOT NULL,
    payment_method ENUM('COD', 'BANK_TRANSFER', 'CREDIT_CARD', 'STORE_PAYMENT') DEFAULT 'COD',
    payment_status ENUM('UNPAID', 'PAID') DEFAULT 'UNPAID',
    order_status ENUM('PENDING', 'CONFIRMED', 'PACKING', 'SHIPPING', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
    needs_invoice BOOLEAN DEFAULT FALSE,
    company_name VARCHAR(255),
    company_tax_code VARCHAR(50),
    company_address TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 5. BẢNG CHI TIẾT ĐƠN HÀNG (ORDER_ITEMS)
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    quantity INT NOT NULL,
    subtotal DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 6. BẢNG LƯU BÁO GIÁ DỰ TOÁN (ESTIMATES)
CREATE TABLE IF NOT EXISTS estimates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estimate_code VARCHAR(50) NOT NULL UNIQUE,
    client_name VARCHAR(150) NOT NULL,
    client_phone VARCHAR(20) NOT NULL,
    client_org VARCHAR(255),
    total_amount DECIMAL(15, 2) NOT NULL,
    vat_amount DECIMAL(15, 2) NOT NULL,
    grand_total DECIMAL(15, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`,
  sqlServerSSMS: `
-- ==========================================================
-- CƠ SỞ DỮ LIỆU TECNIC TRÊN MICROSOFT SQL SERVER (SSMS)
-- ==========================================================

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'TECNIC_MEDICAL_DB')
BEGIN
    CREATE DATABASE [TECNIC_MEDICAL_DB];
END
GO

USE [TECNIC_MEDICAL_DB];
GO

-- 1. BẢNG USERS
IF OBJECT_ID(N'dbo.Users', N'U') IS NULL
CREATE TABLE dbo.Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(150) NOT NULL,
    Phone VARCHAR(20) NOT NULL UNIQUE,
    Email VARCHAR(150) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Address NVARCHAR(MAX),
    City NVARCHAR(100),
    District NVARCHAR(100),
    AccountType NVARCHAR(50) DEFAULT 'CA_NHAN',
    ClinicName NVARCHAR(200),
    TaxCode VARCHAR(50),
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);
GO

-- 2. BẢNG CATEGORIES
IF OBJECT_ID(N'dbo.Categories', N'U') IS NULL
CREATE TABLE dbo.Categories (
    Id VARCHAR(50) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    ShortName NVARCHAR(100) NOT NULL,
    Slug VARCHAR(200) NOT NULL,
    Icon VARCHAR(50),
    Description NVARCHAR(MAX),
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);
GO

-- 3. BẢNG PRODUCTS
IF OBJECT_ID(N'dbo.Products', N'U') IS NULL
CREATE TABLE dbo.Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Code VARCHAR(50) NOT NULL UNIQUE,
    Name NVARCHAR(255) NOT NULL,
    CategoryId VARCHAR(50) FOREIGN KEY REFERENCES dbo.Categories(Id),
    MarketPrice DECIMAL(18, 2) NOT NULL,
    TecnicPrice DECIMAL(18, 2) NOT NULL,
    Stock INT DEFAULT 0,
    SoldCount INT DEFAULT 0,
    Rating DECIMAL(2, 1) DEFAULT 5.0,
    Brand NVARCHAR(100),
    Origin NVARCHAR(100),
    WarrantyMonths INT DEFAULT 12,
    ImageUrl NVARCHAR(MAX),
    ShortDescription NVARCHAR(MAX),
    FullDescription NVARCHAR(MAX),
    IsFeatured BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);
GO

-- 4. BẢNG ORDERS
IF OBJECT_ID(N'dbo.Orders', N'U') IS NULL
CREATE TABLE dbo.Orders (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    OrderCode VARCHAR(50) NOT NULL UNIQUE,
    UserId INT NULL FOREIGN KEY REFERENCES dbo.Users(Id),
    CustomerName NVARCHAR(150) NOT NULL,
    CustomerPhone VARCHAR(20) NOT NULL,
    CustomerEmail VARCHAR(150),
    ShippingAddress NVARCHAR(MAX) NOT NULL,
    TotalMarketPrice DECIMAL(18, 2) NOT NULL,
    TotalTecnicPrice DECIMAL(18, 2) NOT NULL,
    TotalSaved DECIMAL(18, 2) NOT NULL,
    FinalTotal DECIMAL(18, 2) NOT NULL,
    PaymentMethod NVARCHAR(50) DEFAULT 'COD',
    PaymentStatus NVARCHAR(50) DEFAULT 'UNPAID',
    OrderStatus NVARCHAR(50) DEFAULT 'PENDING',
    NeedsInvoice BIT DEFAULT 0,
    CompanyName NVARCHAR(255),
    CompanyTaxCode VARCHAR(50),
    CompanyAddress NVARCHAR(MAX),
    Notes NVARCHAR(MAX),
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);
GO
`
};
