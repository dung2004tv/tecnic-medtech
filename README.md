# Hệ thống dựng video tự động — Tecnic Medtech

Dựng bằng [Remotion](https://remotion.dev) (miễn phí cho công ty ≤ 3 người) + GitHub Actions (render miễn phí trên cloud).

**Không cần AI tạo video, không cần GPU.** Hệ thống dùng ảnh tĩnh (bạn tự tìm/tạo bằng bất kỳ công cụ ảnh AI miễn phí nào, hoặc ảnh chụp/minh họa có sẵn) rồi tự động tạo chuyển động zoom/pan/nhấn (Ken Burns effect) — chạy nhẹ, phù hợp máy cấu hình thường (i3/8GB không có card đồ họa rời vẫn dùng được).

## Cấu trúc dự án

```
public/
  script.txt        <- DOI FILE NAY cho moi video moi (tieu de, tung canh, hieu ung, phu de)
  images/            <- Anh tinh theo tung canh (scene01.jpg, scene02.jpg, ...) - THAY MOI VIDEO
  audio/
    voiceover.mp3    <- File giong doc - THAY MOI VIDEO
  assets/            <- Banner + logo thuong hieu (giu nguyen, khong can doi)
src/                 <- Code he thong (khong can dung vao)
.github/workflows/render.yml   <- Cau hinh render tu dong tren GitHub Actions
```

## Định dạng file `public/script.txt`

```
title: Tên video
voiceover: audio/voiceover.mp3

[SCENE 1]
image: scene01.jpg
duration: 6
effect: zoom-in
caption: Vì sao người nằm lâu dễ bị teo cơ?

[SCENE 2]
image: scene02.jpg
duration: 9
effect: pan-right
caption: Khi nằm lâu, cơ thể ít vận động hơn bình thường
```

Đây là file text thường, không phải code — bạn chỉ cần copy-dán và sửa chữ, không cần biết lập trình.

**Các `effect` hỗ trợ sẵn:**

| Effect | Hiệu ứng |
|---|---|
| `zoom-in` | Phóng to dần vào ảnh |
| `zoom-out` | Thu nhỏ dần ra |
| `pan-left` / `pan-right` | Lia ngang trái/phải |
| `pan-up` / `pan-down` | Lia dọc lên/xuống |
| `highlight` | Nhấn nhẹ (phóng to nhấp nháy) để gây chú ý giữa cảnh |
| `static` | Đứng yên, không hiệu ứng |

Lưu ý: đây là hiệu ứng chuyển động camera trên 1 ảnh tĩnh (giống video du lịch/tài liệu hay dùng), **không phải hoạt hình 3D hay minh họa mũi tên/chuyển động phức tạp**. Nếu một cảnh cụ thể cần hiệu ứng đặc biệt hơn (ví dụ mô hình cơ 3D thu nhỏ, mũi tên chỉ hướng chuyển động), báo lại để làm riêng cảnh đó bằng code tùy chỉnh.

## Làm video mới — quy trình 3 bước

1. **Chuẩn bị ảnh**: tìm/tạo ảnh minh họa cho từng cảnh (ảnh y khoa, ảnh minh họa cơ thể, ảnh người bệnh...), đặt tên `scene01.jpg`, `scene02.jpg`... thả vào `public/images/`.
2. **Viết script.txt**: liệt kê từng cảnh (ảnh nào, mấy giây, hiệu ứng gì, phụ đề gì) theo mẫu ở trên trong `public/script.txt`. Không tự tin viết đúng định dạng thì gửi kịch bản dạng chữ thường cho Claude soạn sẵn, chỉ việc copy-dán.
3. **Giọng đọc**: tạo bằng TTSMaker (miễn phí) theo lời thoại đầy đủ, đặt vào `public/audio/voiceover.mp3`.

Push code lên GitHub (qua GitHub Desktop, không cần dòng lệnh) → tab Actions tự render → tải `video.mp4` trong Artifacts.

## Chạy thử xem trước trên máy (không bắt buộc)

```
npm install
npm start
```

Mở Remotion Studio tại http://localhost:3000 để xem trước, tua thời gian, không cần render thật.

## Render thành video hoàn chỉnh

**Cách 1 — GitHub Actions (khuyên dùng, không cần máy mạnh):** push code lên GitHub → tab Actions tự chạy → tải video trong mục Artifacts (xem chi tiết hướng dẫn GitHub Desktop đã gửi ở tin nhắn trước).

**Cách 2 — Trên máy tính của bạn:**
```
npm run build
```
File xuất ra tại `out/video.mp4`. Lần đầu chạy sẽ tự tải Chrome headless (~200MB, cần mạng).

## Lưu ý giấy phép & chi phí

- **Remotion**: công ty ≤ 3 người dùng miễn phí hoàn toàn, kể cả thương mại.
- **GitHub Actions**: Public repo chạy render miễn phí không giới hạn phút.
- **Artifacts**: giới hạn 500MB lưu trữ trên gói Free — tải video về và xoá artifact cũ định kỳ nếu làm nhiều video liên tục.
- Ảnh/giọng đọc: dùng ảnh bạn tự chụp/vẽ, ảnh AI miễn phí, hoặc kho ảnh free-license (Pexels, Unsplash...) để tránh vi phạm bản quyền.
