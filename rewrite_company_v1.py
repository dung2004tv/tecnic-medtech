import os

footer_path = 'src/components/Footer.tsx'
with open(footer_path, 'r') as f:
    content = f.read()

content = content.replace("CÔNG TY CỔ PHẦN THIẾT BỊ VÀ CÔNG NGHỆ Y TẾ TECNIC", "CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ HỖ TRỢ Y TẾ TECNIC (TECNIC Medtech)")
content = content.replace("Số 9, Ngõ 198 Lê Trọng Tấn, Khương Mai, Thanh Xuân, Hà Nội", "Tầng 2, Tòa nhà New Skyline, KĐT mới Văn Quán - Yên Phúc, Phường Hà Đông, TP. Hà Nội, Việt Nam")
content = content.replace("0981 123 456", "034 84 02466 / 038 988 0369")
content = content.replace("info@tecnic.vn", "tecnic.medtech@gmail.com")

with open(footer_path, 'w') as f:
    f.write(content)

index_path = 'index.html'
with open(index_path, 'r') as f:
    content = f.read()

content = content.replace('TECNIC MEDTECH - Hệ thống phân phối thiết bị y tế, giường bệnh, xe lăn, đai nẹp Bonbone Nhật Bản chính hãng.', 'TECNIC MEDTECH - Hệ thống phân phối thiết bị y tế, giường bệnh, xe lăn, robot PHCN, đai nẹp Bonbone Nhật Bản chính hãng.')
content = content.replace('TECNIC MEDTECH - Hệ thống phân phối thiết bị y tế, giường bệnh, xe lăn, robot PHCN, đai nẹp Bonbone Nhật Bản chính hãng.', 'TECNIC MEDTECH - Hệ thống phân phối thiết bị y tế, giường bệnh, xe lăn, robot PHCN, đai nẹp chính hãng.')
content = content.replace('<meta property="og:description" content="Hệ thống cung cấp thiết bị y tế chính hãng, xe lăn, giường bệnh, đai nẹp và giải pháp phục hồi chức năng chuyên sâu." />', '<meta property="og:description" content="TECNIC MEDTECH - Hệ thống phân phối thiết bị y tế, giường bệnh, xe lăn, robot PHCN, đai nẹp chính hãng." />')

with open(index_path, 'w') as f:
    f.write(content)

