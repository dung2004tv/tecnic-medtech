-- ==============================================================================
-- CƠ SỞ DỮ LIỆU CHUẨN DUY NHẤT: TECNIC MEDTECH (tecnicdb)
-- TƯƠNG THÍCH 100% VỚI PHPMYADMIN & PHP BACKEND
-- ==============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS `tecnicdb` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `tecnicdb`;

-- ==============================================================================
-- 1. BẢNG TÀI KHOẢN & PHÂN QUYỀN (users)
-- ==============================================================================
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` VARCHAR(50) NOT NULL PRIMARY KEY,
    `full_name` VARCHAR(150) NOT NULL COMMENT 'Họ và tên',
    `phone` VARCHAR(20) NOT NULL UNIQUE COMMENT 'Số điện thoại',
    `email` VARCHAR(150) NULL UNIQUE COMMENT 'Địa chỉ email',
    `password_hash` VARCHAR(255) NULL COMMENT 'Mật khẩu',
    `auth_provider` ENUM('LOCAL', 'GOOGLE', 'FACEBOOK') NOT NULL DEFAULT 'LOCAL',
    `role` ENUM('ADMIN', 'STAFF', 'BAC_SI', 'DAI_LY', 'CA_NHAN') NOT NULL DEFAULT 'CA_NHAN',
    `clinic_name` VARCHAR(255) NULL COMMENT 'Tên cơ sở / Bệnh viện / Phòng khám',
    `address` TEXT NULL COMMENT 'Địa chỉ liên hệ',
    `status` ENUM('ACTIVE', 'BLOCKED', 'PENDING') NOT NULL DEFAULT 'ACTIVE',
    `avatar` VARCHAR(500) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_users_email` (`email`),
    INDEX `idx_users_phone` (`phone`),
    INDEX `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dữ liệu mẫu chuẩn khớp phpMyAdmin
INSERT INTO `users` (`id`, `full_name`, `phone`, `email`, `password_hash`, `auth_provider`, `role`, `clinic_name`, `address`, `status`) VALUES
('USR-ADMIN-01', 'Quản Trị Viên TECNIC MEDTECH', '0348402466', 'tecnic.vn.group@gmail.com', '$2a$12$eXampLeHashTecnicAdmin2466Pass', 'LOCAL', 'ADMIN', 'CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ HỖ TRỢ Y TẾ TECNIC', 'Tầng 2, Tòa nhà New Skyline, KĐT Văn Quán, Hà Đông, Hà Nội', 'ACTIVE'),
('USR-02', 'Nguyễn Văn A', '0369483469', '2255010038@kientruchanoi.edu.vn', '123456', 'LOCAL', 'CA_NHAN', 'Khách hàng cá nhân', 'Hà Nội', 'ACTIVE');


-- ==============================================================================
-- 2. BẢNG DANH MỤC SẢN PHẨM (categories)
-- ==============================================================================
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
    `id` VARCHAR(50) PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL UNIQUE,
    `icon` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `sort_order` INT NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`id`, `name`, `slug`, `icon`, `description`, `sort_order`) VALUES
('all', 'Tất cả sản phẩm', 'tat-ca-san-pham', 'LayoutGrid', 'Toàn bộ thiết bị y tế TECNIC MEDTECH', 0),
('robot-phcn', 'Robot Phục Hồi Chức Năng', 'robot-phuc-hoi-chuc-nang', 'Bot', 'Robot phục hồi vận động bàn tay, chi dưới, tập đi sau tai biến', 1),
('giuong-y-te', 'Giường Y Tế Đa Năng', 'giuong-y-te-da-nang', 'Bed', 'Giường bệnh nhân tay quay, giường y tế điều khiển điện cao cấp', 2),
('xe-lan', 'Xe Lăn & Khung Tập Đi', 'xe-lan-khung-tap-di', 'Accessibility', 'Xe lăn điện tự động, xe lăn tay có bô, khung tập đi có ghế ngồi', 3),
('dem-chong-loet', 'Đệm Hơi Chống Loét', 'dem-hoi-chong-loet', 'ShieldAlert', 'Đệm khí y tế đảo múi tự động chống loét tỳ đè cho người nằm liệt', 4),
('dai-nep', 'Đai Nẹp Y Tế Bonbone', 'dai-nep-y-te-bonbone', 'Activity', 'Đai cố định khớp, đai lưng kéo giãn cột sống nhập khẩu Nhật Bản', 5);


-- ==============================================================================
-- 3. BẢNG SẢN PHẨM & THIẾT BỊ Y TẾ (products)
-- ==============================================================================
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
    `id` VARCHAR(50) PRIMARY KEY,
    `code` VARCHAR(50) NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL UNIQUE,
    `category_id` VARCHAR(50) NOT NULL,
    `price` DECIMAL(15, 2) NOT NULL DEFAULT 0,
    `original_price` DECIMAL(15, 2) NOT NULL DEFAULT 0,
    `image` VARCHAR(500) NOT NULL,
    `short_description` TEXT NULL,
    `full_description` LONGTEXT NULL,
    `warranty` VARCHAR(100) DEFAULT '12 - 36 tháng chính hãng',
    `origin` VARCHAR(100) DEFAULT 'TECNIC MEDTECH',
    `in_stock` BOOLEAN DEFAULT 1,
    `rating` DECIMAL(2,1) DEFAULT 5.0,
    `review_count` INT DEFAULT 24,
    `sold_count` INT DEFAULT 68,
    `is_featured` BOOLEAN DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_products_category` (`category_id`),
    INDEX `idx_products_price` (`price`),
    INDEX `idx_products_stock` (`in_stock`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ==============================================================================
-- 4. BẢNG BÀI VIẾT & KIẾN THỨC Y KHOA (articles)
-- ==============================================================================
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
    `id` VARCHAR(50) PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL UNIQUE,
    `category` VARCHAR(100) NOT NULL,
    `excerpt` TEXT NOT NULL,
    `content` LONGTEXT NOT NULL,
    `cover_image` VARCHAR(500) NOT NULL,
    `author` VARCHAR(150) NOT NULL DEFAULT 'Bác sĩ chuyên khoa TECNIC',
    `views` INT DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ==============================================================================
-- 5. BẢNG ĐƠN ĐẶT HÀNG (orders)
-- ==============================================================================
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_code` VARCHAR(50) NOT NULL UNIQUE,
    `user_id` VARCHAR(50) NULL,
    `customer_name` VARCHAR(150) NOT NULL,
    `customer_phone` VARCHAR(20) NOT NULL,
    `customer_email` VARCHAR(150) NULL,
    `shipping_address` TEXT NOT NULL,
    `payment_method` ENUM('COD', 'BANK_TRANSFER', 'STORE_PAYMENT') NOT NULL DEFAULT 'COD',
    `payment_status` ENUM('UNPAID', 'PAID') NOT NULL DEFAULT 'UNPAID',
    `order_status` ENUM('PENDING', 'CONFIRMED', 'SHIPPING', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `total_amount` DECIMAL(15, 2) NOT NULL DEFAULT 0,
    `items_json` LONGTEXT NULL COMMENT 'Chi tiết danh sách sản phẩm mua',
    `notes` TEXT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_orders_code` (`order_code`),
    INDEX `idx_orders_phone` (`customer_phone`),
    INDEX `idx_orders_status` (`order_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ==============================================================================
-- 6. BẢNG CẤU HÌNH HỆ THỐNG & HOTLINE (site_settings)
-- ==============================================================================
DROP TABLE IF EXISTS `site_settings`;
CREATE TABLE `site_settings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `setting_key` VARCHAR(100) NOT NULL UNIQUE,
    `setting_value` LONGTEXT NOT NULL,
    `description` VARCHAR(255) NULL,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `site_settings` (`setting_key`, `setting_value`, `description`) VALUES
('COMPANY_BRAND_NAME', 'TECNIC MEDTECH', 'Tên thương hiệu chính thức'),
('COMPANY_LEGAL_NAME', 'CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ HỖ TRỢ Y TẾ TECNIC', 'Tên pháp nhân công ty'),
('HOTLINE_1', '034 84 02466', 'Hotline tư vấn thiết bị y tế (24/7)'),
('HOTLINE_2', '038 988 0369', 'Hotline hỗ trợ kỹ thuật và bảo hành'),
('EMAIL_CONTACT', 'tecnic.vn.group@gmail.com', 'Email nhận thư và báo giá'),
('COMPANY_ADDRESS', 'Tầng 2, Tòa nhà New Skyline, KĐT mới Văn Quán - Yên Phúc, P. Văn Quán, Q. Hà Đông, TP. Hà Nội', 'Địa chỉ trụ sở chính');

SET FOREIGN_KEY_CHECKS = 1;
