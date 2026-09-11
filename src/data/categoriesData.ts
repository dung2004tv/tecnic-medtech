import { Category, BannerSlide } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'ALL',
    name: 'Tất Cả Thiết Bị Y Tế',
    shortName: 'Tất cả',
    slug: 'tat-ca',
    icon: 'Layers',
    count: 110,
    description: 'Hệ sinh thái thiết bị y tế, dụng cụ tập & phục hồi chức năng toàn diện TECNIC MEDTECH',
    popularKeywords: ['Nạng & Gậy', 'Khung tập đi', 'Xe lăn', 'Giường y tế', 'Đai Bonbone', 'Găng robot']
  },
  {
    id: 'ROBOT_NANG_HA',
    name: 'Robot PHCN & Hỗ Trợ Nâng Hạ',
    shortName: 'Robot & Nâng Hạ',
    slug: 'robot-va-nang-ha',
    icon: 'Bot',
    count: 6,
    description: 'Găng tay Robot phục hồi cử động bàn tay, ghế nâng chuyển bệnh nhân có tay đòn trợ lực thủy lực',
    popularKeywords: ['Găng tay Robot 962', 'Găng PHCN Hueloi', 'Ghế nâng chuyển GBM-053', 'OSADA XDC-01/02']
  },
  {
    id: 'TAP_VLTL_PHCN',
    name: 'Dụng Cụ Tập Vật Lý Trị Liệu & PHCN',
    shortName: 'Tập VLTL & PHCN',
    slug: 'tap-vltl-phcn',
    icon: 'Dumbbell',
    count: 8,
    description: 'Xe đạp tập tay chân tại chỗ, dụng cụ tập phục hồi cử động khớp & cơ bắp chuyên sâu',
    popularKeywords: ['Xe đạp tập PHCN', 'Dụng cụ tập tay', 'Bóng gai PHCN', 'Con lăn tập chân']
  },
  {
    id: 'TRI_LIEU_XUNG_DIEN',
    name: 'Máy Vật Lý Trị Liệu & Xung Điện',
    shortName: 'Máy Vật Lý Trị Liệu',
    slug: 'may-vat-ly-tri-lieu',
    icon: 'Zap',
    count: 12,
    description: 'Máy xung điện Omron TENS Nhật Bản, máy nén khí suy giãn tĩnh mạch, súng massage trị liệu sâu',
    popularKeywords: ['Omron HV-F013', 'Omron HV-F028', 'Omron HV-F230', 'Trị liệu tĩnh mạch GBM-034', 'Súng massage']
  },
  {
    id: 'THIET_BI_DONG_Y',
    name: 'Thiết Bị Y Học Cổ Truyền & Đông Y',
    shortName: 'Y Học Cổ Truyền',
    slug: 'thiet-bi-dong-y',
    icon: 'Sparkles',
    count: 5,
    description: 'Thiết bị chườm nóng ngải cứu, đèn hồng ngoại trị liệu, dụng cụ điện châm & giác hơi y khoa',
    popularKeywords: ['Đèn hồng ngoại', 'Máy điện châm', 'Nồi đun ngải cứu', 'Đai chườm thảo dược']
  },
  {
    id: 'GIUONG_Y_TE',
    name: 'Giường Y Tế Bệnh Nhân & Kéo Giãn',
    shortName: 'Giường Y Tế & Kéo Giãn',
    slug: 'giuong-y-te',
    icon: 'Bed',
    count: 16,
    description: 'Giường y tế tay quay/điện đa năng có bô, lật nghiêng, giường kéo giãn cột sống lưng cổ bằng điện',
    popularKeywords: ['OSADA SD-11TC', 'Giường 4 tay quay GBM-092A', 'OSADA SD-33E điện', 'Kéo giãn SD-41GK']
  },
  {
    id: 'DAI_NEP_KHOP',
    name: 'Đai - Nẹp Chỉnh Hình Xương Khớp',
    shortName: 'Đai & Nẹp Chỉnh Hình',
    slug: 'dai-nep-chinh-hinh',
    icon: 'ShieldCheck',
    count: 17,
    description: 'Đai nẹp khớp cổ, vai, khuỷu tay, đầu gối, mắt cá chân Bonbone Nhật Bản & đai nhiệt Famedi',
    popularKeywords: ['Đai nẹp cổ Bonbone', 'Đai nâng vai', 'Nẹp mắt cá chân', 'Đai gối Bonbone', 'Đai nhiệt lưng']
  },
  {
    id: 'XE_LAN',
    name: 'Xe Lăn Y Tế & Xe Đẩy Chuyên Dụng',
    shortName: 'Xe Lăn Y Tế',
    slug: 'xe-lan',
    icon: 'Accessibility',
    count: 10,
    description: 'Xe lăn du lịch siêu nhẹ, xe lăn ngả nằm 180°, xe lăn có bô vệ sinh, vành đúc bánh béo',
    popularKeywords: ['Xe lăn GBM-065B', 'Xe lăn Lucass X-7A', 'Xe lăn ngả nằm X-72', 'Xe lăn ghế bô X-8']
  },
  {
    id: 'KHUNG_TAP_DI',
    name: 'Khung Tập Đi & Hỗ Trợ Di Chuyển',
    shortName: 'Khung Tập Đi',
    slug: 'khung-tap-di',
    icon: 'Activity',
    count: 8,
    description: 'Khung tập đi gấp gọn, có bánh xe, ghế ngồi nghỉ ngơi và đai nâng đỡ cho người tai biến',
    popularKeywords: ['Khung W-47', 'Khung bánh xe VK157', 'GBM-033A', 'GBM-037', 'GBM-021 3 chế độ']
  },
  {
    id: 'GAY_NANG',
    name: 'Gậy Chống & Nạng Y Tế Chuyên Dụng',
    shortName: 'Gậy & Nạng Y Tế',
    slug: 'gay-va-nang',
    icon: 'Footprints',
    count: 7,
    description: 'Gậy 3 chân, 4 chân chống trượt, nạng nhôm nách và nạng khuỷu trợ lực đi lại',
    popularKeywords: ['Gậy 4 chân Lucass', 'Gậy 3 chân OSADA', 'Nạng nhôm C12C02', 'Nạng khuỷu C-37']
  },
  {
    id: 'DEM_HOI_CHONG_LOET',
    name: 'Đệm Hơi Chống Loét & Chăm Sóc Nằm Lâu',
    shortName: 'Đệm Hơi Chống Loét',
    slug: 'dem-chong-loet',
    icon: 'BedDouble',
    count: 9,
    description: 'Đệm hơi múi/ống khí chống loét điểm tỳ, đệm khoét lỗ bô, nâng lưng 45° & bộ thông tiểu CLINY',
    popularKeywords: ['Đệm GBM-095B', 'Đệm khoét bô GBM-096B', 'Đệm nâng lưng GBM-073B', 'OSADA SD-AM05', 'CLINY']
  },
  {
    id: 'GHE_BO_TAM',
    name: 'Ghế Bô Vệ Sinh & Ghế Tắm Vệ Sinh',
    shortName: 'Ghế Bô & Ghế Tắm',
    slug: 'ghe-bo-ve-sinh',
    icon: 'Bath',
    count: 9,
    description: 'Ghế bô vệ sinh có bánh xe, chui vừa bệt toilet, ghế tắm chống trượt gập gọn thông minh',
    popularKeywords: ['GBM-016', 'GBM-016A', 'GBM-017', 'GBM-018', 'Lucass G-96', 'GBM-026B']
  },
  {
    id: 'SAN_PHAM_HO_TRO',
    name: 'Dụng Cụ Chăm Sóc & Sinh Hoạt Gia Đình',
    shortName: 'Dụng Cụ Sinh Hoạt',
    slug: 'dung-cu-sinh-hoat',
    icon: 'HeartHandshake',
    count: 13,
    description: 'Bóng gai tập tay, ghế bệt tựa lưng, bồn cầu di động, đệm nâng hạ, bô tiểu, con lăn tập chân',
    popularKeywords: ['Bóng gai tập tay', 'Ghế bệt tựa lưng', 'Bồn cầu di động', 'Đệm nâng hạ', 'Chậu gội đầu']
  },
  {
    id: 'TAY_VIN_CAI_TAO',
    name: 'Khung Tay Vịn & An Toàn Nhà Ở',
    shortName: 'Tay Vịn Nhà Tắm',
    slug: 'khung-tay-vin',
    icon: 'Home',
    count: 3,
    description: 'Thanh tay vịn nhà tắm, tay vịn NKT chữ T, khung tay vịn bồn cầu chống té ngã',
    popularKeywords: ['Tay vịn ATMOR 8007', 'Tay vịn chữ T BNH-918', 'Khung tay vịn bồn cầu Toàn Tâm']
  }
];

export const HERO_BANNERS: BannerSlide[] = [
  {
    id: 1,
    title: 'TECNIC MEDTECH - GIẢI PHÁP Y TẾ & PHỤC HỒI CHỨC NĂNG',
    subtitle: 'Giải pháp toàn diện, tái sinh cuộc sống - Hệ sinh thái thiết bị y tế & hỗ trợ sức khỏe chính hãng 100%',
    badge: 'Chính Hãng TECNIC',
    tabLabel: 'Biển Hiệu TECNIC',
    image: '/Banner Tecnic Medtech.png',
    linkText: 'Liên hệ tư vấn ngay',
    targetCategory: 'ALL',
    bgGradient: 'from-[#0e387a] via-[#143472] to-[#0071ba]'
  },
  {
    id: 2,
    title: 'KHUYẾN MÃI THIẾT BỊ PHỤC HỒI CHỨC NĂNG & XE LĂN ĐIỆN TỰ ĐỘNG',
    subtitle: 'Nâng hạ điều khiển điện & tay quay trợ lực - Giúp người bệnh tự chủ vận động sinh hoạt',
    badge: 'Ưu Đãi Đặc Biệt',
    tabLabel: 'Xe Lăn & Thiết Bị PHCN',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1600&auto=format&fit=crop&q=85',
    linkText: 'Xem xe lăn & thiết bị PHCN',
    targetCategory: 'ROBOT_NANG_HA',
    bgGradient: 'from-[#143472] via-[#0e387a] to-blue-800'
  },
  {
    id: 3,
    title: 'CHÍNH HÃNG BONBONE NHẬT BẢN - ĐAI NẸP CỘT SỐNG & XƯƠNG KHỚP',
    subtitle: 'Cố định chuẩn xác, hỗ trợ phục hồi tổn thương chuyên sâu cột sống, vai, gối, cổ tay',
    badge: 'Nhập Khẩu Nhật Bản',
    tabLabel: 'Đai Nẹp Bonbone',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=1600&auto=format&fit=crop&q=85',
    linkText: 'Xem đai nẹp Bonbone',
    targetCategory: 'DAI_NEP_KHOP',
    bgGradient: 'from-[#0e387a] via-blue-900 to-indigo-900'
  },
  {
    id: 4,
    title: 'GIƯỜNG Y TẾ BỆNH NHÂN OSADA & TAY QUAY ĐA NĂNG',
    subtitle: 'Giường y tế tay quay, giường điều khiển điện nâng hạ đầu chân, ôm lưng nghiêng trái phải',
    badge: 'Hàng Chính Hãng',
    tabLabel: 'Giường Y Tế Bệnh Nhân',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1600&auto=format&fit=crop&q=85',
    linkText: 'Xem giường bệnh nhân',
    targetCategory: 'GIUONG_Y_TE',
    bgGradient: 'from-[#143472] via-[#0071ba] to-[#0e387a]'
  },
  {
    id: 5,
    title: 'GĂNG TAY ROBOT PHỤC HỒI CHỨC NĂNG & ĐỆM HƠI CHỐNG LOÉT',
    subtitle: 'Thiết bị tập phục hồi ngón tay Oromi 962 & đệm hơi bóp khí tự động đảo múi cho người nằm lâu',
    badge: 'Công Nghệ Y Khoa',
    tabLabel: 'Robot & Chăm Sóc Y Tế',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&auto=format&fit=crop&q=85',
    linkText: 'Xem găng tay Robot & Đệm hơi',
    targetCategory: 'DEM_HOI_CHONG_LOET',
    bgGradient: 'from-[#0e387a] via-slate-900 to-[#143472]'
  }
];
