-- ==========================================================
-- CƠ SỞ DỮ LIỆU CHUẨN CHO HỆ THỐNG Y TẾ TECNIC MEDTECH
-- TÊN MIỀN: ytetecnic.vn | HOSTING: cPanel / DirectAdmin / MySQL Workbench
-- NGÀY TẠO: 2026
-- BẢN MÃ: utf8mb4 / utf8mb4_unicode_ci (Hỗ trợ tiếng Việt 100%)
-- ==========================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. KHỞI TẠO DATABASE
CREATE DATABASE IF NOT EXISTS `tecnic_medical_db` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `tecnic_medical_db`;

-- ==========================================================
-- 2. BẢNG TÀI KHOẢN NGƯỜI DÙNG & QUẢN TRỊ VIÊN (users)
-- ==========================================================
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(150) NOT NULL COMMENT 'Họ và tên người dùng',
    `phone` VARCHAR(20) NOT NULL UNIQUE COMMENT 'Số điện thoại đăng nhập',
    `email` VARCHAR(150) NOT NULL UNIQUE COMMENT 'Địa chỉ email',
    `password_hash` VARCHAR(255) NOT NULL COMMENT 'Mật khẩu đã mã hóa Bcrypt/SHA256',
    `role` ENUM('ADMIN', 'STAFF', 'BAC_SI', 'DAI_LY', 'CA_NHAN') NOT NULL DEFAULT 'CA_NHAN' COMMENT 'Phân quyền',
    `clinic_name` VARCHAR(255) NULL COMMENT 'Tên phòng khám / Đại lý',
    `address` TEXT NULL COMMENT 'Địa chỉ giao hàng',
    `status` ENUM('ACTIVE', 'BLOCKED', 'PENDING') NOT NULL DEFAULT 'ACTIVE' COMMENT 'Trạng thái hoạt động',
    `avatar` VARCHAR(500) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_users_email` (`email`),
    INDEX `idx_users_phone` (`phone`),
    INDEX `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dữ liệu mẫu tài khoản quản trị viên và khách hàng
INSERT INTO `users` (`id`, `full_name`, `phone`, `email`, `password_hash`, `role`, `clinic_name`, `address`, `status`) VALUES
(1, 'Quản Trị Viên Hệ Thống TECNIC', '0348402466', 'tecnic.vn.group@gmail.com', '$2a$12$eXampLeHashTecnicAdmin2466Pass', 'ADMIN', 'TECNIC MEDTECH VIỆT NAM', 'Tầng 2, Tòa New Skyline, Văn Quán, Hà Đông, Hà Nội', 'ACTIVE'),
(2, 'Admin TECNIC', '0389880369', 'admin@tecnic.vn', '$2a$12$eXampLeHashAdminTecnic123Pass', 'ADMIN', 'TECNIC MEDTECH VIỆT NAM', 'Tòa New Skyline, Văn Quán, Hà Đông, Hà Nội', 'ACTIVE'),
(3, 'Nguyễn Hoàng Long', '0912345678', 'khachhang@gmail.com', '$2a$12$eXampLeHashKhachHangPass12345', 'DAI_LY', 'Đại Lý Y Tế Hoàng Long', '128 Giải Phóng, Phương Mai, Đống Đa, Hà Nội', 'ACTIVE');


-- ==========================================================
-- 3. BẢNG KHÔI PHỤC MẬT KHẨU / QUÊN MẬT KHẨU (password_resets)
-- ==========================================================
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(150) NOT NULL COMMENT 'Email nhận link đặt lại mật khẩu',
    `token` VARCHAR(255) NOT NULL COMMENT 'Mã xác thực ngẫu nhiên an toàn',
    `otp_code` VARCHAR(10) NULL COMMENT 'Mã OTP 6 số gửi qua SMS/Email',
    `is_used` BOOLEAN NOT NULL DEFAULT 0 COMMENT '0: Chưa dùng, 1: Đã dùng',
    `expires_at` DATETIME NOT NULL COMMENT 'Thời gian hết hạn (thường 30 phút)',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_pw_email` (`email`),
    INDEX `idx_pw_token` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ==========================================================
-- 4. BẢNG DANH MỤC SẢN PHẨM (categories)
-- ==========================================================
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
    `id` VARCHAR(50) PRIMARY KEY COMMENT 'Mã định danh danh mục (ví dụ: giuong-y-te)',
    `name` VARCHAR(255) NOT NULL COMMENT 'Tên danh mục tiếng Việt',
    `slug` VARCHAR(255) NOT NULL UNIQUE,
    `icon` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `sort_order` INT NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`id`, `name`, `slug`, `icon`, `description`, `sort_order`) VALUES
('all', 'Tất cả sản phẩm', 'tat-ca-san-pham', 'LayoutGrid', 'Toàn bộ danh mục thiết bị y tế TECNIC', 0),
('robot-phcn', 'Robot Phục Hồi Chức Năng', 'robot-phuc-hoi-chuc-nang', 'Bot', 'Robot tập tay, chân, tập đi chuyên sâu cho bệnh nhân tai biến', 1),
('giuong-y-te', 'Giường Y Tế Đa Năng', 'giuong-y-te-da-nang', 'Bed', 'Giường bệnh nhân tay quay, giường điện cao cấp', 2),
('xe-lan', 'Xe Lăn & Khung Tập Đi', 'xe-lan-khung-tap-di', 'Accessibility', 'Xe lăn điện, xe lăn tay, khung tập đi có ghế ngồi', 3),
('dem-chong-loet', 'Đệm Hơi Chống Loét', 'dem-hoi-chong-loet', 'ShieldAlert', 'Đệm hơi y tế thông minh chống lở loét tỳ đè', 4),
('dai-nep', 'Đai Nẹp Y Tế Bonbone', 'dai-nep-y-te-bonbone', 'Activity', 'Đai cố định khớp, đai lưng kéo giãn nhập khẩu Nhật Bản', 5);


-- ==========================================================
-- 5. BẢNG SẢN PHẨM & THIẾT BỊ Y TẾ (products)
-- ==========================================================
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
    `id` VARCHAR(50) PRIMARY KEY COMMENT 'Mã ID sản phẩm (ví dụ: sp-01)',
    `code` VARCHAR(50) NOT NULL UNIQUE COMMENT 'Mã SKU sản phẩm (ví dụ: TEC-ROBOT-01)',
    `name` VARCHAR(255) NOT NULL COMMENT 'Tên sản phẩm',
    `slug` VARCHAR(255) NOT NULL UNIQUE,
    `category_id` VARCHAR(50) NOT NULL,
    `price` DECIMAL(15, 2) NOT NULL DEFAULT 0 COMMENT 'Giá bán TECNIC (VNĐ)',
    `original_price` DECIMAL(15, 2) NOT NULL DEFAULT 0 COMMENT 'Giá niêm yết thị trường (VNĐ)',
    `image` VARCHAR(500) NOT NULL COMMENT 'Đường dẫn ảnh chính',
    `gallery_json` JSON NULL COMMENT 'Mảng JSON danh sách ảnh chi tiết',
    `short_description` TEXT NULL COMMENT 'Mô tả ngắn hiển thị ở card & Google SEO',
    `full_description` LONGTEXT NULL COMMENT 'Bài viết mô tả chi tiết, hướng dẫn sử dụng',
    `warranty` VARCHAR(100) DEFAULT '12 tháng chính hãng',
    `origin` VARCHAR(100) DEFAULT 'Chính Hãng TECNIC',
    `in_stock` BOOLEAN DEFAULT 1 COMMENT '1: Còn hàng, 0: Hết hàng',
    `rating` DECIMAL(2,1) DEFAULT 5.0,
    `review_count` INT DEFAULT 18,
    `sold_count` INT DEFAULT 45,
    `views` INT DEFAULT 1200,
    `is_featured` BOOLEAN DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_products_category` (`category_id`),
    INDEX `idx_products_price` (`price`),
    INDEX `idx_products_stock` (`in_stock`),
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `products` (`id`, `code`, `name`, `slug`, `category_id`, `price`, `original_price`, `image`, `short_description`, `warranty`, `origin`, `in_stock`, `rating`, `is_featured`) VALUES
('sp-01', 'TEC-ROBOT-01', 'Găng Tay Robot Phục Hồi Chức Năng Bàn Tay Bán Thân', 'gang-tay-robot-phuc-hoi-chuc-nang-ban-tay', 'robot-phcn', 3850000, 4800000, 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80', 'Hỗ trợ phục hồi vận động bàn tay cho bệnh nhân sau tai biến đột quỵ, chấn thương tủy sống.', '24 tháng', 'TECNIC Medtech', 1, 5.0, 1),
('sp-02', 'TEC-BED-04', 'Giường Y Tế 4 Tay Quay Đa Năng Cao Cấp Có Bô Vệ Sinh', 'giuong-y-te-4-tay-quay-da-nang-co-bo', 'giuong-y-te', 8200000, 10500000, 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80', 'Nâng lưng 0-85 độ, hạ chân, có cần gạt bô vệ sinh tại giường và chậu gội đầu tiện lợi.', '36 tháng', 'Chính Hãng TECNIC', 1, 4.9, 1),
('sp-03', 'TEC-WHEEL-E1', 'Xe Lăn Điện Tự Động Gấp Gọn Khung Nhôm Siêu Nhẹ', 'xe-lan-dien-tu-dong-gap-gon-sieu-nhe', 'xe-lan', 14500000, 18000000, 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80', 'Cần điều khiển 360 độ siêu nhạy, động cơ kép êm ái, pin Lithium chạy 20km mỗi lần sạc.', '24 tháng', 'TECNIC Medtech', 1, 5.0, 1),
('sp-04', 'TEC-MAT-01', 'Đệm Hơi Chống Loét Cao Cấp Kèm Máy Bơm Đảo Khí Tự Động', 'dem-hoi-chong-loet-kem-may-bom-dao-khi', 'dem-chong-loet', 950000, 1350000, 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80', 'Cơ chế đảo múi khí luân phiên 6 phút/lần chống hoại tử tỳ đè cho người nằm liệt giường.', '12 tháng', 'TECNIC', 1, 4.8, 0);


-- ==========================================================
-- 6. BẢNG BÀI VIẾT & KIẾN THỨC Y KHOA (articles)
-- ==========================================================
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
    `id` VARCHAR(50) PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL COMMENT 'Tiêu đề bài viết',
    `slug` VARCHAR(255) NOT NULL UNIQUE,
    `category` VARCHAR(100) NOT NULL COMMENT 'Danh mục bài viết',
    `excerpt` TEXT NOT NULL COMMENT 'Tóm tắt bài viết hiển thị ở danh sách & SEO',
    `content` LONGTEXT NOT NULL COMMENT 'Nội dung chi tiết chuẩn Markdown / HTML',
    `cover_image` VARCHAR(500) NOT NULL,
    `author` VARCHAR(100) DEFAULT 'Bác sĩ Chuyên khoa TECNIC',
    `views` INT DEFAULT 350,
    `is_published` BOOLEAN DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_articles_category` (`category`),
    INDEX `idx_articles_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `articles` (`id`, `title`, `slug`, `category`, `excerpt`, `content`, `cover_image`, `author`) VALUES
('art-01', 'Thời Điểm Vàng Phục Hồi Chức Năng Cho Bệnh Nhân Tai Biến Đột Quỵ', 'thoi-diem-vang-phuc-hoi-chuc-nang-tai-bien-dot-quy', 'Kiến thức phục hồi chức năng', 'Giai đoạn 3-6 tháng đầu là thời điểm vàng để phục hồi chức năng vận động tay chân cho người tai biến.', 'Nội dung bài viết chuyên sâu về phục hồi chức năng sau tai biến...', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80', 'BS. Nguyễn Văn Dũng - TECNIC Medtech'),
('art-02', 'Hướng Dẫn Lựa Chọn Giường Y Tế Phù Hợp Cho Người Bệnh Tại Nhà', 'huong-dan-lua-chon-giuong-y-te-phu-hop-cho-nguoi-benh', 'Tư vấn thiết bị y tế', 'Cách chọn giường 1 tay quay, 2 tay quay, 4 tay quay hoặc giường điện theo mức độ vận động của bệnh nhân.', 'Nội dung phân tích các loại giường y tế...', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80', 'Chuyên gia Thiết bị TECNIC');


-- ==========================================================
-- 7. BẢNG ĐƠN HÀNG & MUA SẮM (orders & order_items)
-- ==========================================================
DROP TABLE IF EXISTS `order_items`;
DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_code` VARCHAR(50) NOT NULL UNIQUE COMMENT 'Mã đơn hàng hiển thị (ví dụ: TEC-1001)',
    `user_id` INT NULL,
    `customer_name` VARCHAR(150) NOT NULL,
    `customer_phone` VARCHAR(20) NOT NULL,
    `customer_email` VARCHAR(150) NULL,
    `shipping_address` TEXT NOT NULL,
    `payment_method` ENUM('COD', 'BANK_TRANSFER', 'STORE_PAYMENT') NOT NULL DEFAULT 'COD',
    `payment_status` ENUM('UNPAID', 'PAID') NOT NULL DEFAULT 'UNPAID',
    `order_status` ENUM('PENDING', 'CONFIRMED', 'SHIPPING', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `total_amount` DECIMAL(15, 2) NOT NULL DEFAULT 0,
    `total_market_price` DECIMAL(15, 2) NOT NULL DEFAULT 0,
    `total_saved` DECIMAL(15, 2) NOT NULL DEFAULT 0,
    `notes` TEXT NULL,
    `needs_vat` BOOLEAN DEFAULT 0,
    `company_name` VARCHAR(255) NULL,
    `company_tax_code` VARCHAR(50) NULL,
    `company_address` TEXT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_orders_code` (`order_code`),
    INDEX `idx_orders_phone` (`customer_phone`),
    INDEX `idx_orders_status` (`order_status`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `order_items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NOT NULL,
    `product_id` VARCHAR(50) NOT NULL,
    `product_name` VARCHAR(255) NOT NULL,
    `price` DECIMAL(15, 2) NOT NULL,
    `quantity` INT NOT NULL DEFAULT 1,
    `subtotal` DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ==========================================================
-- 8. BẢNG LIÊN HỆ & YÊU CẦU TƯ VẤN (contacts)
-- ==========================================================
DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(150) NULL,
    `location` VARCHAR(255) NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('PENDING', 'CONTACTED', 'RESOLVED') DEFAULT 'PENDING',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_contacts_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ==========================================================
-- 9. BẢNG CẤU HÌNH HỆ THỐNG & SEO (site_settings)
-- ==========================================================
DROP TABLE IF EXISTS `site_settings`;
CREATE TABLE `site_settings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `setting_key` VARCHAR(100) NOT NULL UNIQUE,
    `setting_value` LONGTEXT NOT NULL,
    `description` VARCHAR(255) NULL,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `site_settings` (`setting_key`, `setting_value`, `description`) VALUES
('HOTLINE_1', '034 84 02466', 'Số hotline chính TECNIC'),
('HOTLINE_2', '038 988 0369', 'Số hotline phụ'),
('EMAIL_CONTACT', 'tecnic.medtech@gmail.com', 'Email nhận liên hệ'),
('COMPANY_ADDRESS', 'Tầng 2, Tòa nhà New Skyline, KĐT mới Văn Quán - Yên Phúc, Hà Đông, Hà Nội', 'Địa chỉ trụ sở chính'),
('BANK_ACCOUNT_NUMBER', '787216666', 'Số tài khoản MB Bank'),
('BANK_ACCOUNT_NAME', 'CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ HỖ TRỢ Y TẾ TECNIC', 'Tên chủ tài khoản'),
('GA4_TAG', 'G-TECNIC123', 'Mã Google Analytics 4');

SET FOREIGN_KEY_CHECKS = 1;

-- ==========================================================
-- 10. CÁC CÂU LỆNH SQL HỮU ÍCH DÀNH CHO ADMIN / QUÊN MẬT KHẨU
-- ==========================================================
-- [Cách 1]: Cấp lại mật khẩu mới cho tài khoản qua SQL Workbench:
-- UPDATE users SET password_hash = '$2a$12$eXampLeHashTecnicAdmin2466Pass' WHERE email = 'tecnic.vn.group@gmail.com';

-- [Cách 2]: Tìm kiếm toàn bộ đơn hàng của khách hàng theo số điện thoại:
-- SELECT * FROM orders WHERE customer_phone = '0348402466' ORDER BY created_at DESC;

-- [Cách 3]: Tra cứu doanh thu theo ngày:
-- SELECT DATE(created_at) as ngay, COUNT(id) as tong_don, SUM(total_amount) as doanh_thu FROM orders GROUP BY DATE(created_at);
