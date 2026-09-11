# HƯỚNG DẪN ĐÓNG GÓI ỨNG DỤNG THẬT (APK CHO ANDROID & APP CHO IOS)
**Dự án:** TECNIC MEDTECH  
**Công nghệ tích hợp sẵn:** Capacitor 8 + React + Vite

Dự án hiện tại đã được cấu hình đầy đủ `capacitor.config.ts` và các thư viện `@capacitor/core`, `@capacitor/cli`, `@capacitor/android`, `@capacitor/ios`. Bạn có thể dễ dàng xuất ra file cài đặt `.apk` cho Android hoặc đưa lên App Store cho iOS.

---

## BƯỚC 1: Tải mã nguồn về máy tính
1. Trong giao diện AI Studio, vào menu **Settings** $\rightarrow$ chọn **Export to ZIP** (hoặc tải toàn bộ mã nguồn về máy tính của bạn).
2. Giải nén thư mục dự án và mở bằng Visual Studio Code (hoặc Terminal).

---

## BƯỚC 2: Cài đặt môi trường (Chỉ làm lần đầu)
Mở Terminal tại thư mục dự án và chạy:
```bash
npm install
```

---

## BƯỚC 3: ĐÓNG GÓI RA FILE APK CHO ANDROID (Dễ nhất & Phổ biến nhất)

### Yêu cầu:
- Đã cài đặt [Android Studio](https://developer.android.com/studio) (miễn phí) trên máy tính (Windows hoặc Mac).

### Các lệnh thực hiện:
1. **Khởi tạo thư mục Android gốc**:
   ```bash
   npx cap add android
   ```
2. **Biên dịch mã nguồn và đồng bộ vào Android**:
   ```bash
   npm run build:app
   ```
3. **Mở dự án trong Android Studio**:
   ```bash
   npx cap open android
   ```
4. **Xuất file APK để cài trực tiếp lên điện thoại**:
   - Trong Android Studio, vào thanh menu trên cùng: **Build** $\rightarrow$ **Build Bundle(s) / APK(s)** $\rightarrow$ **Build APK(s)**.
   - Khi hoàn thành, Android Studio sẽ hiện thông báo `locate`. Bấm vào đó bạn sẽ thấy file **`app-debug.apk`**.
   - Gửi file này qua Zalo/Drive lên điện thoại Android, bấm vào là cài đặt ngay thành App thật 100%!
   - Nếu muốn đưa lên Google Play Store: Chọn **Build** $\rightarrow$ **Generate Signed Bundle / APK** $\rightarrow$ chọn **Android App Bundle (.aab)**.

---

## BƯỚC 4: ĐÓNG GÓI RA ỨNG DỤNG CHO IPHONE (iOS)

### Yêu cầu:
- Cần có máy tính **Mac (macOS)** và đã cài đặt **Xcode** (tải từ Mac App Store).

### Các lệnh thực hiện:
1. **Khởi tạo thư mục iOS**:
   ```bash
   npx cap add ios
   ```
2. **Biên dịch và đồng bộ**:
   ```bash
   npm run build:app
   ```
3. **Mở dự án trong Xcode**:
   ```bash
   npx cap open ios
   ```
4. **Cài lên iPhone thử nghiệm hoặc đưa lên App Store**:
   - Cắm cáp iPhone vào máy Mac.
   - Trong Xcode, chọn thiết bị là iPhone của bạn và bấm nút **Play (Run)**: App sẽ tự động cài vào iPhone.
   - Để phát hành rộng rãi lên App Store: Cần tài khoản Apple Developer ($99/năm) $\rightarrow$ Chọn **Product** $\rightarrow$ **Archive** để tải lên App Store Connect.

---

## TỔNG KẾT CÁC LỆNH NHANH
- `npm run build:app`: Biên dịch web và đồng bộ code mới nhất vào cả thư mục Android & iOS.
- `npx cap open android`: Mở dự án bằng Android Studio để build file APK.
- `npx cap open ios`: Mở dự án bằng Xcode trên máy Mac.
