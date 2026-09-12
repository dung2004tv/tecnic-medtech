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

## BƯỚC TỰ ĐỘNG: BUILD APK & IOS BẰNG GITHUB ACTIONS (KHÔNG CẦN CÀI ANDROID STUDIO HAY MÁY MAC)

Nếu bạn không có máy tính Mac hoặc không muốn cài đặt Android Studio nặng hàng chục GB, bạn có thể để **GitHub tự động build** trên máy chủ ảo của họ hoàn toàn miễn phí.

### Cách tạo file kịch bản trên GitHub trong 1 phút:
1. Mở trang kho lưu trữ của bạn trên GitHub (ví dụ: `https://github.com/nguyendungdbd1/tecnic-app`).
2. Nhấn nút **Add file** $\rightarrow$ chọn **Create new file**.
3. Tại ô đặt tên file, gõ chính xác:
   ```text
   .github/workflows/build.yml
   ```
   *(Khi bạn gõ dấu `/`, GitHub sẽ tự động tạo thư mục `.github` và `workflows`)*
4. Dán toàn bộ đoạn mã kịch bản YAML bên dưới vào ô soạn thảo:

```yaml
name: Build iOS & Android Apps (Capacitor)

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  build-android:
    name: Build Android APK
    runs-on: ubuntu-latest
    steps:
      - name: Checkout mã nguồn
        uses: actions/checkout@v4

      - name: Cài đặt JDK 17 (Java)
        uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: '17'

      - name: Cài đặt Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Cài đặt dependencies
        run: npm install --legacy-peer-deps

      - name: Build ứng dụng Web (Vite)
        run: npm run build

      - name: Khởi tạo & Đồng bộ Capacitor Android
        run: |
          npx cap add android || true
          npx cap sync android

      - name: Cấp quyền chạy Gradle
        run: |
          cd android
          chmod +x gradlew

      - name: Biên dịch file APK Android
        run: |
          cd android
          ./gradlew assembleDebug --no-daemon

      - name: Tải file APK Android lên GitHub Artifacts để tải về cài máy
        uses: actions/upload-artifact@v4
        with:
          name: TECNIC-MEDTECH-Android-APK
          path: android/app/build/outputs/apk/debug/*.apk
          retention-days: 14

  build-ios:
    name: Build iOS App (macOS Cloud)
    runs-on: macos-14
    steps:
      - name: Checkout mã nguồn
        uses: actions/checkout@v4

      - name: Cài đặt Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Cài đặt dependencies
        run: npm install --legacy-peer-deps

      - name: Build ứng dụng Web (Vite)
        run: npm run build

      - name: Khởi tạo & Đồng bộ Capacitor iOS
        run: |
          npx cap add ios || true
          npx cap sync ios

      - name: Cài đặt CocoaPods dependencies cho iOS
        run: |
          cd ios/App
          pod install

      - name: Biên dịch ứng dụng iOS (Xcode build)
        run: |
          xcodebuild -workspace ios/App/App.xcworkspace \
            -scheme App \
            -configuration Release \
            -destination 'generic/platform=iOS' \
            -archivePath build/TECNIC-MEDTECH.xcarchive \
            archive \
            CODE_SIGNING_ALLOWED=NO \
            CODE_SIGNING_REQUIRED=NO \
            CODE_SIGN_IDENTITY=""

      - name: Đóng gói file App iOS
        run: |
          mkdir -p output-ios
          ditto -c -k --keepParent build/TECNIC-MEDTECH.xcarchive output-ios/TECNIC-MEDTECH-iOS.zip
          if [ -d "build/TECNIC-MEDTECH.xcarchive/Products/Applications/App.app" ]; then
            cd build/TECNIC-MEDTECH.xcarchive/Products/Applications
            zip -r -q ../../../../output-ios/TECNIC-MEDTECH.app.zip App.app
          fi

      - name: Tải file iOS App lên GitHub Artifacts để người dùng tải về
        uses: actions/upload-artifact@v4
        with:
          name: TECNIC-MEDTECH-iOS-Build
          path: output-ios/
          retention-days: 14
```

5. Kéo xuống cuối trang, nhấn **Commit changes...** rồi bấm **Commit changes**.
6. Ngay lập tức, bạn bấm vào tab **Actions** trên GitHub:
   - Bạn sẽ thấy vòng tròn màu vàng **đang xoay xoay** (GitHub đang tiến hành build app).
   - Sau khoảng 4-7 phút, khi chuyển sang màu xanh lá tích kiểm `✔`, bạn bấm vào đợt chạy đó và kéo xuống mục **Artifacts** để tải file `.apk` (cho Android) hoặc file zip `.app` (cho iOS) về máy để cài đặt!

---

## TỔNG KẾT CÁC LỆNH NHANH
- `npm run build:app`: Biên dịch web và đồng bộ code mới nhất vào cả thư mục Android & iOS.
- `npx cap open android`: Mở dự án bằng Android Studio để build file APK.
- `npx cap open ios`: Mở dự án bằng Xcode trên máy Mac.
