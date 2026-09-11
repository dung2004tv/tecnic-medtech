export interface SettingItem {
  id: string;
  name: string;
  slug?: string;
  subtitle?: string;
  value?: string;
  description: string;
  content1?: string;
  content2?: string;
  
  parentId?: string; // 'root' hoặc id của folder cha
  isFolder: boolean;
  category?: string;
  
  bgColor?: string;
  avatar?: string;
  backgroundImage?: string;
  icon1?: string;
  icon2?: string;
  icon3?: string;
  icon4?: string;
  icon5?: string;
  icon6?: string;
  
  order: number;
  isVisible: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const DEFAULT_SETTINGS: SettingItem[] = [
  // CẤP ROOT (Ảnh 1)
  {
    id: "1",
    name: "Quản lý nội dung đầu trang",
    slug: "/dau-trang",
    subtitle: "Hotline, logo, slogan, mạng xã hội header",
    value: "",
    description: "<p>Nội dung cấu hình đầu trang: Hotline hỗ trợ 24/7, logo thương hiệu TECNIC MEDTECH, thông điệp cam kết phục vụ ngành y tế.</p>",
    content1: "",
    content2: "",
    parentId: "root",
    isFolder: false,
    category: "Root",
    bgColor: "#000000",
    avatar: "/logo-tecnic.jpg",
    order: 1,
    isVisible: true
  },
  {
    id: "2",
    name: "Quản lý nội dung giao diện trang chủ",
    slug: "/trang-chu",
    subtitle: "Khối giới thiệu TECNIC, cam kết chất lượng, chứng nhận y tế",
    value: "",
    description: "<p>Cấu hình tổng thể giao diện trang chủ: Các khối banner, thông điệp bác sĩ, danh mục thiết bị gia đình, lý do chọn TECNIC, tin tức nổi bật.</p>",
    content1: "",
    content2: "",
    parentId: "root",
    isFolder: true,
    category: "Root",
    bgColor: "#000000",
    order: 2,
    isVisible: true
  },
  {
    id: "3",
    name: "Quản lý nội dung cuối trang",
    slug: "/cuoi-trang",
    subtitle: "Địa chỉ trụ sở, chi nhánh Hà Nội & TP.HCM, giấy phép kinh doanh TTBYT",
    value: "",
    description: "<p>Cấu hình thông tin pháp lý doanh nghiệp, danh sách showroom, giấy chứng nhận công bố đủ điều kiện mua bán TTBYT và bản đồ chỉ đường.</p>",
    content1: "",
    content2: "",
    parentId: "root",
    isFolder: true,
    category: "Root",
    bgColor: "#000000",
    avatar: "/logo-tecnic.jpg",
    order: 3,
    isVisible: true
  },
  {
    id: "4",
    name: "Thông tin trang chi tiết tin tức",
    slug: "/lien-he",
    subtitle: "Hỗ trợ tư vấn y khoa",
    value: "Thông tin liên hệ",
    description: "<p>Khung liên hệ nhanh xuất hiện bên dưới mỗi bài viết tin tức: Đội ngũ bác sĩ cố vấn, hotline giải đáp thắc mắc và hướng dẫn sử dụng thiết bị.</p>",
    content1: "",
    content2: "",
    parentId: "root",
    isFolder: false,
    category: "Root",
    bgColor: "#000000",
    order: 4,
    isVisible: true
  },

  // CẤP CON CỦA "Quản lý nội dung giao diện trang chủ" (id: "2") (Ảnh 2 & Ảnh 3)
  {
    id: "102",
    name: "Thông điệp",
    slug: "/gioi-thieu",
    subtitle: "TỪ TECNIC MEDICAL",
    value: "TỪ TECNIC MEDICAL",
    description: `<ul>
  <li><span style="color: #0073b7; font-weight: bold;">Sức khỏe và tính mạng là tài sản quý giá nhất !</span></li>
  <li><span style="color: #0073b7; font-weight: bold;">Hãy kiểm tra, theo dõi và chăm sóc cơ thể ngay từ khi còn khoẻ mạnh để phòng tránh các rủi ro đến từ sức khoẻ và để có một cuộc sống khỏe mạnh, trọn vẹn</span></li>
</ul>`,
    content1: "<p>TECNIC MEDICAL tiên phong phân phối thiết bị y tế và phục hồi chức năng đạt chuẩn Bộ Y Tế, phục vụ các bệnh viện, phòng khám và gia đình trên toàn quốc.</p>",
    content2: "",
    parentId: "2",
    isFolder: false,
    category: "Quản lý nội dung giao diện trang chủ",
    bgColor: "#000000",
    avatar: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80",
    order: 1,
    isVisible: true
  },
  {
    id: "103",
    name: "Chăm sóc sức khoẻ cho người khỏe",
    slug: "/cham-soc-suc-khoe",
    subtitle: "Giải pháp phòng ngừa bệnh sớm",
    value: "",
    description: "<p>Chiến lược y tế dự phòng: Tầm soát và theo dõi chỉ số sinh tồn định kỳ bằng các thiết bị y tế độ chính xác cao tại nhà.</p>",
    content1: "",
    content2: "",
    parentId: "2",
    isFolder: false,
    category: "Quản lý nội dung giao diện trang chủ",
    bgColor: "#000000",
    order: 2,
    isVisible: true
  },
  {
    id: "104",
    name: "THIẾT BỊ Y TẾ GIA ĐÌNH",
    slug: "/thiet-bi-y-te-gia-dinh",
    subtitle: "Sản phẩm thiết yếu cho gia đình",
    value: "",
    description: "<p>Cung cấp giường y tế tay quay đa năng, máy tạo oxy 7L-10L chuẩn bệnh viện, máy đo huyết áp bắp tay và máy xông khí dung cao cấp.</p>",
    content1: "",
    content2: "",
    parentId: "2",
    isFolder: false,
    category: "Quản lý nội dung giao diện trang chủ",
    bgColor: "#000000",
    order: 3,
    isVisible: true
  },
  {
    id: "105",
    name: "Lý do",
    slug: "/ly-do",
    subtitle: "TẠI SAO BẠN NÊN CHỌN TECNIC MEDICAL?",
    value: "TẠI SAO BẠN NÊN CHỌN TECNIC MEDICAL?",
    description: `<ul>
  <li>100% Sản phẩm chính hãng, đầy đủ CO-CQ và giấy phép lưu hành của Bộ Y Tế.</li>
  <li>Đội ngũ kỹ sư y sinh và bác sĩ chuyên khoa tư vấn giải pháp chuẩn xác.</li>
  <li>Bảo hành tận nơi từ 12 - 36 tháng, hỗ trợ kỹ thuật và phụ kiện trọn đời.</li>
</ul>`,
    content1: "",
    content2: "",
    parentId: "2",
    isFolder: false,
    category: "Quản lý nội dung giao diện trang chủ",
    bgColor: "#000000",
    order: 4,
    isVisible: true
  },
  {
    id: "106",
    name: "Tin tức nổi bật",
    slug: "/tin-tuc",
    subtitle: "TECNIC MEDICAL",
    value: "TECNIC MEDICAL",
    description: "<p>Khối hiển thị các bài viết y khoa mới nhất về phục hồi chức năng, bài tập vật lý trị liệu cho người tai biến và kiến thức chăm sóc bệnh nhân.</p>",
    content1: "",
    content2: "",
    parentId: "2",
    isFolder: false,
    category: "Quản lý nội dung giao diện trang chủ",
    bgColor: "#000000",
    order: 5,
    isVisible: true
  },
  {
    id: "107",
    name: "Câu hỏi thường gặp",
    slug: "/cau-hoi-thuong-gap",
    subtitle: "Giải đáp thắc mắc khách hàng",
    value: "",
    description: "<p>Tập hợp các câu hỏi về chính sách bảo hành, đổi trả, hình thức vận chuyển và hướng dẫn thanh toán khi mua thiết bị y tế.</p>",
    content1: "",
    content2: "",
    parentId: "2",
    isFolder: true,
    category: "Quản lý nội dung giao diện trang chủ",
    bgColor: "#000000",
    order: 6,
    isVisible: true
  },
  {
    id: "108",
    name: "ĐĂNG KÝ TƯ VẤN",
    slug: "/dang-ky-tu-van",
    subtitle: "Nhận báo giá dự án & đại lý",
    value: "",
    description: "<p>Form liên hệ trực tiếp dành cho các cơ sở y tế, phòng khám và đối tác phân phối thiết bị y tế trên cả nước.</p>",
    content1: "",
    content2: "",
    parentId: "2",
    isFolder: false,
    category: "Quản lý nội dung giao diện trang chủ",
    bgColor: "#000000",
    order: 7,
    isVisible: true
  },

  // CẤP CON CỦA "Quản lý nội dung cuối trang" (id: "3") (Ảnh 5 & Ảnh 6)
  {
    id: "25",
    name: "Quản lý nội dung cuối trang",
    slug: "/thong-tin-cong-ty",
    subtitle: "",
    value: "CÔNG TY CỔ PHẦN CÔNG NGHỆ VÀ DỊCH VỤ Y TẾ TECNIC",
    description: `<p><strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ VÀ DỊCH VỤ Y TẾ TECNIC</strong></p>
<ul>
  <li><strong>Địa chỉ đăng ký kinh doanh:</strong> Tầng 2, Tòa nhà New Skyline, KĐT mới Văn Quán - Yên Phúc, Phường Hà Đông, Thành phố Hà Nội, Việt Nam.</li>
  <li><strong>Mã số thuế:</strong> 0110912898</li>
  <li><strong>Email liên hệ:</strong> tecnic.vn.medical@gmail.com</li>
  <li><strong>Điện thoại liên hệ:</strong> 038 988 0369 Hoặc 034 84 02466</li>
  <li><strong>Website:</strong> tecnic.vn</li>
</ul>`,
    content1: `<ul>
  <li>Thiết bị y tế gia đình</li>
  <li>Công nghệ & Dịch vụ</li>
  <li>Tin tức & Tuyển dụng</li>
</ul>
<p><strong>HỖ TRỢ KHÁCH HÀNG</strong></p>
<ul>
  <li>Chính sách và Quy định chung</li>
  <li>Thông tin chăm sóc khách hàng</li>
  <li>Hướng dẫn thanh toán</li>
  <li>Chính sách Đổi - Trả hàng hóa</li>
  <li>Chính sách bảo hành</li>
  <li>Chính sách bảo mật dữ liệu</li>
  <li>Chính sách vận chuyển</li>
</ul>`,
    content2: `<p><strong>BẢN ĐỒ CHỈ ĐƯỜNG</strong></p>
<div style="width: 100%; height: 200px; background: #e2e8f0; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
  <p style="color: #475569; font-weight: bold;">Tòa nhà New Skyline, KĐT Văn Quán, Hà Đông, Hà Nội</p>
</div>`,
    parentId: "3",
    isFolder: false,
    category: "Quản lý nội dung cuối trang",
    bgColor: "#000000",
    avatar: "/logo-tecnic.jpg",
    order: 3,
    isVisible: true
  }
];
