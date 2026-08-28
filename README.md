# HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY DỰ ÁN TECNIC MEDICAL TRÊN MÁY TÍNH

Khi bạn tải mã nguồn dạng file ZIP về máy tính (ví dụ ổ `D:/tecnic-medical...`), hãy làm theo các bước đơn giản sau để cài đặt và chạy ứng dụng:

---

## 1. Yêu cầu hệ thống
- Đã cài đặt **Node.js** (khuyến nghị phiên bản LTS từ 18.x, 20.x trở lên): [Tải Node.js tại đây](https://nodejs.org/)

---

## 2. Các bước khởi chạy

### Bước 1: Mở thư mục dự án trong Terminal / Command Prompt / VS Code
Mở VS Code, chọn **File -> Open Folder...** và chọn thư mục vừa giải nén.

Mở Terminal trong VS Code (`Ctrl + \`` hoặc **Terminal -> New Terminal**).

### Bước 2: Cài đặt toàn bộ thư viện (Dependencies)
Chạy lệnh sau:
```bash
npm install
```
*(Lệnh này sẽ tự động tải các gói React, Lucide-React, TypeScript types, Express, Vite, Motion,... vào thư mục `node_modules` và hết lỗi báo đỏ ở VS Code)*.

---

### Bước 3: Khởi chạy dự án ở chế độ Phát triển (Dev Mode)
Chạy lệnh:
```bash
npm run dev
```

Sau khi chạy lệnh, mở trình duyệt và truy cập:
👉 **http://localhost:3000**

---

### Bước 4: Đóng gói và chạy Production (Tuỳ chọn)
Nếu bạn muốn build ra bản hoàn thiện:
```bash
npm run build
npm start
```
