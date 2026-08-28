-- ==========================================================
-- TECNIC MEDICAL - DATABASE SCHEMA (MYSQL / MYSQL WORKBENCH)
-- Dành cho Hosting ytetecnic.vn hoặc nhập vào MySQL Workbench / phpMyAdmin
-- Mã hóa: utf8mb4_unicode_ci
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `ytetecnic_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ytetecnic_db`;

-- --------------------------------------------------------
-- 1. BẢNG NGƯỜI DÙNG & QUẢN TRỊ (users)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(64) NOT NULL,
  `email` varchar(191) NOT NULL,
  `displayName` varchar(255) DEFAULT '',
  `phoneNumber` varchar(30) DEFAULT '',
  `role` enum('admin','staff','customer') DEFAULT 'customer',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Thêm tài khoản Admin mặc định
INSERT INTO `users` (`id`, `email`, `displayName`, `phoneNumber`, `role`) VALUES
('admin-01', 'nguyendungdbd1@gmail.com', 'Nguyễn Văn Dũng (Admin)', '0369483469', 'admin'),
('admin-02', 'admin@tecnic.vn', 'Quản trị viên TECNIC', '0912345678', 'admin');

-- --------------------------------------------------------
-- 2. BẢNG DANH MỤC SẢN PHẨM (categories)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` varchar(64) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `icon` varchar(100) DEFAULT 'Activity',
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_cat_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`id`, `name`, `slug`, `icon`, `description`) VALUES
('cat-01', 'Thiết bị Phục hồi chức năng', 'phuc-hoi-chuc-nang', 'Activity', 'Thiết bị tập vận động, máy tập phục hồi sau đột quỵ, tai biến'),
('cat-02', 'Vật lý trị liệu & Giảm đau', 'vat-ly-tri-lieu', 'Zap', 'Máy điện xung, siêu âm trị liệu, sóng ngắn, kéo giãn cột sống'),
('cat-03', 'Thiết bị Chẩn đoán & Theo dõi', 'chan-doan-theo-doi', 'Stethoscope', 'Máy đo huyết áp, SpO2, đo đường huyết, máy điện tim'),
('cat-04', 'Dụng cụ Chăm sóc & Hỗ trợ', 'cham-soc-ho-tro', 'HeartHandshake', 'Xe lăn y tế, giường bệnh đa năng, đệm chống loét');

-- --------------------------------------------------------
-- 3. BẢNG SẢN PHẨM (products)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` varchar(64) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `categoryId` varchar(64) DEFAULT NULL,
  `price` bigint(20) NOT NULL DEFAULT 0,
  `originalPrice` bigint(20) DEFAULT 0,
  `rating` decimal(2,1) DEFAULT 5.0,
  `reviewsCount` int(11) DEFAULT 0,
  `stock` int(11) DEFAULT 100,
  `image` text,
  `description` text,
  `featured` tinyint(1) DEFAULT 0,
  `inStock` tinyint(1) DEFAULT 1,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_prod_slug` (`slug`),
  KEY `idx_prod_cat` (`categoryId`),
  CONSTRAINT `fk_prod_cat` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 4. BẢNG ĐƠN HÀNG (orders)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` varchar(64) NOT NULL,
  `orderCode` varchar(50) NOT NULL,
  `customerName` varchar(255) NOT NULL,
  `customerPhone` varchar(30) NOT NULL,
  `customerEmail` varchar(191) DEFAULT '',
  `shippingAddress` text NOT NULL,
  `paymentMethod` varchar(50) DEFAULT 'cod',
  `paymentStatus` enum('pending','paid','failed') DEFAULT 'pending',
  `orderStatus` enum('pending','processing','shipping','completed','cancelled') DEFAULT 'pending',
  `totalAmount` bigint(20) NOT NULL DEFAULT 0,
  `notes` text,
  `itemsJson` longtext,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_order_code` (`orderCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 5. BẢNG BÀI VIẾT & TIN TỨC Y KHOA (articles)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` varchar(64) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT 'Y học & Đời sống',
  `author` varchar(100) DEFAULT 'Ban Biên tập TECNIC',
  `readTime` varchar(50) DEFAULT '5 phút đọc',
  `image` text,
  `summary` text,
  `content` longtext,
  `publishedAt` date DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_article_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
