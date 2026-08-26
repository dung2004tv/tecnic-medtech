import json

products = [
    # Gậy Chống
    ("GẬY 4 CHÂN THẤP LUCASS VC - 24", 250000, "GAY_NANG", "Gậy & Nạng Tập Đi", "Lucass", "Mỹ", "VC - 24", "65 cm/10 nấc điều chỉnh", "80kg", "Sắt si inox 1.2 li", "Thiết bị hỗ trợ di chuyển cho người yếu chân, tập đi", "https://yte24h.vn/wp-content/uploads/2021/04/gay-4-chan-lucass-vc-24.jpg"),
    ("GẬY 3 CHÂN LUCASS B-926", 240000, "GAY_NANG", "Gậy & Nạng Tập Đi", "Lucass", "Mỹ", "B-26", "74 - 97 cm", "100 kg", "Thép mạ Crom", "Thiết bị hỗ trợ di chuyển cho người yếu chân, tập đi", "https://yte24h.vn/wp-content/uploads/2021/04/gay-3-chan-lucass-b-26.jpg"),
    ("GẬY 3 CHÂN OSADA RMS01-4", 199000, "GAY_NANG", "Gậy & Nạng Tập Đi", "OSADA", "Trung Quốc", "RMS01-4", "74 - 97 cm", "100 kg", "Thép mạ Crom", "Thiết bị hỗ trợ di chuyển cho người yếu chân, tập đi", "https://osada.com.vn/wp-content/uploads/2023/11/Gay-3-chan-Osada-RMS01-4.jpg"),

    # Nạng tập đi
    ("NẠNG NHÔM C12/C02 (MỘT ĐÔI)", 265000, "GAY_NANG", "Gậy & Nạng Tập Đi", "Oromi", "Trung Quốc", "C12/C02", "65 cm/10 nấc điều chỉnh", "80kg", "Sắt si inox 1.2 li", "Thiết bị hỗ trợ di chuyển cho người yếu chân, tập đi", ""),
    ("NẠNG LUCASS VCL500 (MỘT ĐÔI)", 290000, "GAY_NANG", "Gậy & Nạng Tập Đi", "Lucass", "Mỹ", "VCL500", "115~135 cm có nấc điều chỉnh", "750g", "Nhôm cao cấp", "Thiết bị hỗ trợ di chuyển cho người yếu chân, tập đi", ""),
    ("NẠNG GBM-067B (MỘT ĐÔI)", 200000, "GAY_NANG", "Gậy & Nạng Tập Đi", "GBM", "Trung Quốc", "067B", "Cao 115 - 135 cm", "900 g", "Inox, tỳ nách và tay cầm bọc đệm xốp êm", "Thiết bị hỗ trợ di chuyển cho người yếu chân, tập đi", ""),
    ("NẠNG KHUỶU C-37", 265000, "GAY_NANG", "Gậy & Nạng Tập Đi", "Lucass", "Mỹ", "C37", "85 cm có điều chỉnh", "500 g", "Nhôm và nhựa ABS", "Thiết bị hỗ trợ di chuyển cho người yếu chân, tập đi", ""),

    # Khung tập đi
    ("KHUNG W-47", 500000, "KHUNG_TAP_DI", "Khung Tập Đi", "Lucass", "Mỹ", "W-47", "Cao 78-96, rộng 57, dài 50cm", "2.4 kg", "Khung hợp kim nhôm", "Thiết bị hỗ trợ di chuyển cho người yếu chân, tập đi", ""),
    ("KHUNG TẬP ĐI BÁNH XE VK157", 555000, "KHUNG_TAP_DI", "Khung Tập Đi", "Lucass", "Mỹ", "VK157", "Cao 79-97, rộng 62, dài 50cm", "2.78 kg", "Khung hợp kim nhôm", "Thiết bị hỗ trợ di chuyển cho người yếu chân, tập đi", ""),
    ("KHUNG TẬP ĐI GBM-033A", 550000, "KHUNG_TAP_DI", "Khung Tập Đi", "GBM", "Trung Quốc", "GBM-033A", "Cao 78 - 96 cm x Rộng 53 cm x Dài 48 cm", "2.4 kg", "Nhôm và nhựa ABS", "Thiết bị hỗ trợ di chuyển cho người yếu chân, tập đi", ""),
    ("KHUNG TẬP ĐI GBM-037", 620000, "KHUNG_TAP_DI", "Khung Tập Đi", "GBM", "Trung Quốc", "GBM-037", "Cao 78 - 90 cm x Rộng 52 - 53 cm", "3,8 kg", "Khung hợp kim nhôm", "Thiết bị hỗ trợ di chuyển cho người yếu chân, tập đi", ""),
    ("KHUNG TẬP ĐI GBM-037B", 550000, "KHUNG_TAP_DI", "Khung Tập Đi", "GBM", "Trung Quốc", "GBM-037B", "Cao 78 - 90 cm x Rộng 52 - 53 cm", "2.4 kg", "Inox, nhựa cao cấp và cao su", "Thiết bị hỗ trợ di chuyển cho người yếu chân, tập đi", ""),
    ("KHUNG TẬP ĐI GBM-034", 2050000, "KHUNG_TAP_DI", "Khung Tập Đi", "GBM", "Trung Quốc", "GBM-034", "Dài 75 cm x Rộng 65 cm x Cao 115 - 145 cm", "13 kg", "Thép mạ crom, đệm da PU bọc mút và cao su", "Thiết bị hỗ trợ di chuyển cho người yếu chân, tập đi", ""),
    ("KHUNG TẬP ĐI GBM-021", 2290000, "KHUNG_TAP_DI", "Khung Tập Đi", "GBM", "Trung Quốc", "021", "Khung 65 cm, chiều sâu 75 cm, cao 115 - 145 cm", "18.5 kg", "Khung thép mạ Crom, đệm bọc da simili kết hợp mút", "Hỗ trợ tập đứng và tập đi 03 chế độ cho người tai biến", ""),
    ("KHUNG TẬP ĐI OSADA SD-K05", 3110000, "KHUNG_TAP_DI", "Khung Tập Đi", "OSADA", "Trung Quốc", "SD-K05", "87cm x 73cm x 24cm", "20 kg", "Hợp kim thép mạ Crom", "Hỗ trợ tập đứng và tập đi cho người tai biến, phục hồi chức năng", ""),

    # Xe lăn
    ("XE LĂN GBM-065B", 1810000, "XE_LAN", "Xe Lăn Tay", "GBM", "Trung Quốc", "065B", "Dài 85 cm x Rộng 53 cm x Cao 88 cm", "6.8 kg", "Khung hợp kim nhôm, vải lưới đệm thoáng khí, bánh xe nhựa đúc PU", "Xe lăn du lịch siêu nhẹ gấp gọn, hỗ trợ di chuyển", ""),
    ("XE LĂN ĐA NĂNG X-7A", 2700000, "XE_LAN", "Xe Lăn Tay", "Lucass", "Mỹ", "X-7A", "Cao 76-96, rộng 53, dài 46cm", "28 kg", "Thép mạ Crom", "Di chuyển, nâng chân, ngã lưng ra sau 90-180 độ, có bô vệ sinh", ""),
    ("XE LĂN X-72", 3850000, "XE_LAN", "Xe Lăn Tay", "Lucass", "Mỹ", "X-72", "Độ rộng ghế ngồi: 45cm, rộng cả xe 65cm", "28 kg", "Khung hợp kim nhôm không gỉ", "Di chuyển, nâng chân, ngã lưng ra sau 90-180 độ, có bô vệ sinh", ""),
    ("XE LĂN GBM-061C", 1310000, "XE_LAN", "Xe Lăn Tay", "GBM", "Trung Quốc", "061C", "Dài 88 cm x Rộng 63 cm x Cao 87 cm", "16 kg", "Khung thép mạ chrome chống gỉ, vành nhôm, gác chân nhựa đúc", "Xe lăn tay truyền thống gấp gọn", ""),
    ("XE LĂN GBM-061D", 1320000, "XE_LAN", "Xe Lăn Tay", "GBM", "Trung Quốc", "061D", "Dài 88 cm x Rộng 63 cm x Cao 87 cm", "16 kg", "Khung thép mạ chrome, vành nhôm, gác chân nhựa đúc, mặt bạt caro", "Xe lăn tay gấp gọn có thắng tay", ""),
    ("XE LĂN SẮT X-9", 1600000, "XE_LAN", "Xe Lăn Tay", "Lucass", "Mỹ", "X-9", "Bánh sau: 24, bánh trước: 8", "17.3 kg", "Khung xe: thép, tấm đặt chân: nhôm đúc hợp kim", "Di chuyển cho bệnh nhân", ""),
    ("XE LĂN GHẾ BÔ X-8", 1899000, "XE_LAN", "Xe Lăn Tay", "Lucass", "Mỹ", "X-8", "Bánh sau đặc: 24', bánh trước: 8'", "18.3 kg", "Khung xe: thép, tấm đặt chân: nhôm đúc hợp kim, bô", "Di chuyển cho bệnh nhân", ""),
    ("XE LĂN GBM-061E", 1899000, "XE_LAN", "Xe Lăn Tay", "GBM", "Trung Quốc", "061E", "Dài 88 cm x Rộng 65 cm x Cao 88 cm", "17.5 kg", "Khung thép mạ chrome, vành đúc bánh béo", "Xe lăn tay gấp gọn có 02 tay phanh", ""),
    ("XE LĂN GBM-064A", 1710000, "XE_LAN", "Xe Lăn Tay", "GBM", "Trung Quốc", "064A", "Dài 90 cm x Rộng 65 cm x Cao 88 cm", "18.5 kg", "Khung thép mạ chrome, vành đúc bánh béo, gác chân lật", "Khung xe: thép, tấm đặt chân: nhôm đúc hợp kim", ""),
    ("XE LĂN GBM-064B", 1590000, "XE_LAN", "Xe Lăn Tay", "GBM", "Trung Quốc", "064B", "Dài 90 cm x Rộng 65 cm x Cao 88 cm", "18.5 kg", "Khung thép sơn tĩnh điện, vành đúc bánh béo", "Xe lăn tay có bô vệ sinh gấp gọn, gác chân lật", ""),

    # Ghế bô / tắm
    ("GHẾ BÔ GBM-016", 2290000, "GHE_BO_TAM", "Ghế Bô & Tắm", "GBM", "Trung Quốc", "016", "Dài 85 cm x Rộng 52 cm x Cao 88 cm", "18.5 kg", "Khung thép sơn tĩnh điện, vành đúc bánh béo", "Xe tắm, xe lăn, ghế bô vệ sinh đa năng gấp gọn", ""),
    ("GHẾ BÔ GBM-016A", 2180000, "GHE_BO_TAM", "Ghế Bô & Tắm", "GBM", "Trung Quốc", "016A", "Dài 85 cm x Rộng 58 cm x Cao 88 cm", "9 kg", "Khung hợp kim nhôm chống gỉ, đệm bọc da chống nước", "Xe tắm, xe lăn, ghế bô vệ sinh đa năng gấp gọn", ""),
    ("GHẾ BÔ GBM-017", 1470000, "GHE_BO_TAM", "Ghế Bô & Tắm", "GBM", "Trung Quốc", "017", "Chiều rộng ghế lớn: 57cm, Chiều cao: 90cm", "9 kg", "Khung hợp kim nhôm chống gỉ; Đệm ngồi êm", "Xe tắm, xe lăn trong nhà, ghế bô, ghế ngồi", ""),
    ("GHẾ BÔ GBM-018", 2650000, "GHE_BO_TAM", "Ghế Bô & Tắm", "GBM", "Trung Quốc", "018", "Chiều ngang rộng: 60cm, Bánh sau cao su đặc D=30cm", "9 kg", "Khung hợp kim nhôm; Đệm ngồi êm, chống nước", "Xe lăn đường phố, xe tắm, xe bô, xe ngồi", ""),
    ("GHẾ BÔ GBM-019", 2870000, "GHE_BO_TAM", "Ghế Bô & Tắm", "GBM", "Trung Quốc", "019", "Chiều ngang rộng 60cm, bánh sau cao su đặc D=30cm", "9 kg", "Khung hợp kim nhôm; đệm ngồi êm, chống nước", "Xe lăn đường phố, xe tắm, xe bô, xe ngồi", ""),
    ("GHẾ BÔ GBM-203", 1670000, "GHE_BO_TAM", "Ghế Bô & Tắm", "GBMi", "Trung Quốc", "203", "Chiều ngang rộng 54cm", "9 kg", "Khung hợp kim nhôm, đệm ngồi êm chống nước", "Xe tắm, ghế bô, ghế ngồi", ""),
    ("GHẾ BÔ GBM-022", 620000, "GHE_BO_TAM", "Ghế Bô & Tắm", "GBMi", "Trung Quốc", "022", "Chưa xác định", "5 kg", "Khung thép sơn tĩnh điện, mặt ghế ngồi êm mềm", "Ghế bô, ghế ngồi hàng ngày", ""),
    ("GHẾ BÔ LUCASS G-96", 840000, "GHE_BO_TAM", "Ghế Bô & Tắm", "Lucass", "Mỹ", "G-96", "Chưa xác định", "", "Khung thép", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("GHẾ BÔ GBM-026B", 620000, "GHE_BO_TAM", "Ghế Bô & Tắm", "GBMi", "Trung Quốc", "026B", "Chiều rộng ghế 51 cm", "4 kg", "Khung nhôm siêu nhẹ, mặt ngồi và tựa lưng nhựa ABS", "Dùng làm ghế tắm, ghế bô vệ sinh", ""),

    # Đai
    ("ĐAI VAI CAO CẤP PAMEDI", 400000, "DAI_NEP_KHOP", "Đai Nẹp & Khớp", "Pamedi", "Đài Loan", "Pamedi", "", "", "Vải thoáng khí cao cấp", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("ĐAI VAI THƯỜNG", 330000, "DAI_NEP_KHOP", "Đai Nẹp & Khớp", "Famedi", "Đài Loan", "Thường", "", "", "Vải tổng hợp", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("ĐAI HỖ TRỢ DI CHUYỂN", 230000, "DAI_NEP_KHOP", "Đai Nẹp & Khớp", "Famedi", "Đài Loan", "Hỗ trợ", "", "", "Vải dù, đai nẹp", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("ĐAI HỖ TRỢ DI CHUYỂN CÓ DÂY ORBE", 260000, "DAI_NEP_KHOP", "Đai Nẹp & Khớp", "Orbe", "Việt Nam", "Có dây", "", "", "Vải dù, đai nẹp chắc chắn", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("ĐAI HỖ TRỢ DI CHUYỂN KHÔNG DÂY ORBE", 230000, "DAI_NEP_KHOP", "Đai Nẹp & Khớp", "Orbe", "Việt Nam", "Không dây", "", "", "Vải dù, đai nẹp", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("ĐAI LƯNG CAO CẤP (NHIỆT)", 400000, "DAI_NEP_KHOP", "Đai Nẹp & Khớp", "Famedi", "Đài Loan", "Nhiệt nóng", "", "", "Vải chun, túi chườm nhiệt", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("ĐAI NẸP CỔ THOÁNG KHÍ", 600000, "DAI_NEP_KHOP", "Đai Nẹp & Khớp", "Bonbone", "Nhật bản", "Đai cổ", "", "", "Vải lưới thoáng khí", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("ĐAI NÂNG VAI", 1100000, "DAI_NEP_KHOP", "Đai Nẹp & Khớp", "Bonbone", "Nhật bản", "Đai vai", "", "", "Vải chun 4 chiều", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("ĐAI NẸP MẮT CÁ CHÂN", 1561000, "DAI_NEP_KHOP", "Đai Nẹp & Khớp", "Bonbone", "Nhật bản", "Đai chân", "", "", "Vải định hình cao cấp", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("ĐAI HỖ TRỢ VÙNG CÁNH TAY", 300000, "DAI_NEP_KHOP", "Đai Nẹp & Khớp", "Bonbone", "Nhật bản", "Đai cánh tay", "", "", "Vải tổng hợp", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("ĐAI NẸP KHUỶU TAY", 550000, "DAI_NEP_KHOP", "Đai Nẹp & Khớp", "Bonbone", "Nhật bản", "Đai tay", "", "", "Vải cao cấp Bonbone", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("ĐAI CỐ ĐỊNH ĐẦU GỐI", 750000, "DAI_NEP_KHOP", "Đai Nẹp & Khớp", "Bonbone", "Nhật bản", "Đai chân", "", "", "Vải thoáng khí, nẹp trợ lực", "Đai lưng hỗ trợ trợ chăm sóc, phục hồi", ""),
    ("ĐAI HỖ TRỢ CỐ ĐỊNH ĐẦU GỐI", 650000, "DAI_NEP_KHOP", "Đai Nẹp & Khớp", "Bonbone", "Nhật bản", "Đai đầu gối", "", "", "Vải chun cao cấp", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("ĐAI CỐ ĐỊNH KHỚP DƯỚI GỐI", 600000, "DAI_NEP_KHOP", "Đai Nẹp & Khớp", "Bonbone", "Nhật bản", "Đai chân", "", "", "Vải êm ái, chống trượt", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("ĐAI HỖ TRỢ VÙNG CHÂN", 780000, "DAI_NEP_KHOP", "Đai Nẹp & Khớp", "Bonbone", "Nhật bản", "Đai chân", "", "", "Vải Bonbone đặc biệt", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("ĐAI HỖ TRỢ VÙNG BẮP VÀ GÓT CHÂN", 2100000, "DAI_NEP_KHOP", "Đai Nẹp & Khớp", "Bonbone", "Nhật bản", "Bắp và gót chân", "", "", "Vải cao su tổng hợp", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("ĐAI CỐ ĐỊNH CỔ CHÂN", 280000, "DAI_NEP_KHOP", "Đai Nẹp & Khớp", "Bonbone", "Nhật bản", "Đai chân", "", "", "Vải chun định hình", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    
    # Khung, tay vịn
    ("THANH TAY VỊN NHÀ TẮM", 1650000, "TAY_VIN_CAI_TAO", "Khung Tay Vịn", "ATMOR", "Trung Quốc", "8007", "", "", "Inox bọc nhựa ABS", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("THANH TAY VỊN NKT CHỮ T", 3960000, "TAY_VIN_CAI_TAO", "Khung Tay Vịn", "ATMOR", "Trung Quốc", "BNH-918", "", "", "Inox cao cấp", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("KHUNG TAY VỊN BỒN CẦU", 585000, "TAY_VIN_CAI_TAO", "Khung Tay Vịn", "Toàn Tâm", "Trung Quốc", "KTVBC016", "", "", "Khung thép sơn tĩnh điện", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),

    # Sản phẩm hỗ trợ
    ("BÓNG GAI TRÒN", 40000, "SAN_PHAM_HO_TRO", "Dụng Cụ Sinh Hoạt", "OEM", "Trung Quốc", "Bóng gai", "", "", "Nhựa dẻo y tế", "Bóng tập", ""),
    ("BÓNG BỐN NGÓN", 86000, "SAN_PHAM_HO_TRO", "Dụng Cụ Sinh Hoạt", "OEM", "Trung Quốc", "Bóng 4 ngón", "", "", "Nhựa dẻo y tế", "Bóng tập", ""),
    ("BÓNG NĂM NGÓN", 95000, "SAN_PHAM_HO_TRO", "Dụng Cụ Sinh Hoạt", "OEM", "Trung Quốc", "Bóng 5 ngón", "", "", "Nhựa dẻo y tế", "Bóng tập", ""),
    ("GHẾ BỆT TỰA LƯNG", 520000, "SAN_PHAM_HO_TRO", "Dụng Cụ Sinh Hoạt", "OEM", "Trung Quốc", "Ghế bệt", "", "", "Khung thép, đệm lưới", "Ghế bệt tựa lưng", ""),
    ("KHUNG TRỢ LỰC KHỚP GỐI", 110000, "SAN_PHAM_HO_TRO", "Dụng Cụ Sinh Hoạt", "OEM", "Trung Quốc", "Khung trợ lực", "", "", "Lò xo kép, vải đệm", "Khung trợ lực khớp gối", ""),
    ("NẸP BÀN CHÂN RŨ", 161000, "SAN_PHAM_HO_TRO", "Dụng Cụ Sinh Hoạt", "OEM", "Trung Quốc", "Nẹp rũ", "", "", "Nhựa định hình, đai dán", "Nẹp bàn chân rũ", ""),
    ("BỒN CẦU DI ĐỘNG", 476000, "SAN_PHAM_HO_TRO", "Dụng Cụ Sinh Hoạt", "OEM", "Trung Quốc", "Bồn cầu", "", "", "Nhựa ABS siêu bền", "Bồn cầu di động", ""),
    ("ĐỆM NÂNG HẠ", 2150000, "SAN_PHAM_HO_TRO", "Dụng Cụ Sinh Hoạt", "OEM", "Trung Quốc", "Đệm nâng", "", "", "Mút xốp bọc da/vải", "Đệm nâng hạ hỗ trợ", ""),
    ("BÔ TIỂU 2000ML", 125000, "SAN_PHAM_HO_TRO", "Dụng Cụ Sinh Hoạt", "OEM", "Trung Quốc", "Bô tiểu", "", "", "Nhựa y tế", "Bô tiểu", ""),
    ("CON LĂN TẬP CHÂN", 74000, "SAN_PHAM_HO_TRO", "Dụng Cụ Sinh Hoạt", "OEM", "Trung Quốc", "Con lăn", "", "", "Nhựa đúc bọc cao su", "Con lăn tập chân", ""),
    ("NẸP CHÂN RŨ CÓ BƠM", 220000, "SAN_PHAM_HO_TRO", "Dụng Cụ Sinh Hoạt", "OEM", "Trung Quốc", "Nẹp bơm", "", "", "Nhựa định hình kèm bơm hơi", "Thiết bị hỗ trợ chăm sóc", ""),
    ("CHẬU GỘI ĐẦU CÓ CHÂN", 420000, "SAN_PHAM_HO_TRO", "Dụng Cụ Sinh Hoạt", "OEM", "Trung Quốc", "Chậu gội", "", "", "Nhựa ABS, chân inox", "Chậu gội đầu có chân", ""),
    ("KẸP BÓP TAY KHÁNG LỰC", 45000, "SAN_PHAM_HO_TRO", "Dụng Cụ Sinh Hoạt", "OEM", "Trung Quốc", "Kẹp bóp", "", "", "Thép không gỉ, bọc nhựa", "Kẹp bóp tập cơ tay", ""),

    # Đệm hơi chống loét
    ("ĐỆM GBM-095B", 1340000, "DEM_HOI_CHONG_LOET", "Đệm Chống Loét", "GBM", "Trung Quốc", "095B", "200 cm x 90 cm x 10 cm", "", "PVC y tế kết hợp Nylon", "Dùng cho bệnh nhân nằm nhiều", ""),
    ("ĐỆM GBM-096B", 1420000, "DEM_HOI_CHONG_LOET", "Đệm Chống Loét", "GBM", "Trung Quốc", "096B", "200 cm x 90 cm x 10 cm", "", "PVC y tế kết hợp Nylon", "Dùng cho bệnh nhân nằm nhiều, có bô", ""),
    ("ĐỆM GBM-073B", 2450000, "DEM_HOI_CHONG_LOET", "Đệm Chống Loét", "GBM", "Trung Quốc", "073B", "200 cm x 90 cm x 10 cm", "", "PVC y tế kết hợp Nylon", "Dùng cho bệnh nhân nằm nhiều, nâng lưng 0-45°", ""),
    ("ĐỆM GBM-095", 1299000, "DEM_HOI_CHONG_LOET", "Đệm Chống Loét", "GBM", "Trung Quốc", "095", "200 cm x 90 cm x 10 cm", "", "PVC y tế kết hợp Nylon", "Dùng cho bệnh nhân nằm nhiều", ""),
    ("ĐỆM GBM-096", 1330000, "DEM_HOI_CHONG_LOET", "Đệm Chống Loét", "GBM", "Trung Quốc", "096", "200 cm x 90 cm x 10 cm", "", "PVC y tế kết hợp Nylon", "Dùng cho bệnh nhân nằm nhiều, có khoét lỗ bô", ""),
    ("ĐỆM OSADA SD-AM05", 1299000, "DEM_HOI_CHONG_LOET", "Đệm Chống Loét", "OSADA", "Trung Quốc", "SD-AM05", "200 x 90 x 10cm", "", "Vải Polyurethane PVC y tế", "Dùng cho bệnh nhân nằm nhiều, hỗ trợ đi vệ sinh", ""),
    ("ĐỆM OSADA JIAHE SD-AM01", 1880000, "DEM_HOI_CHONG_LOET", "Đệm Chống Loét", "OSADA", "Trung Quốc", "JIAHE SD-AM01", "Dài 2m x Rộng 0,9m", "", "PVC y tế kết hợp Nylon có ga trải", "Dùng cho bệnh nhân nằm nhiều", ""),

    # Bộ thông tiểu ngắt quãng
    ("BỘ THÔNG TIỂU NGẮT QUÃNG DÀNH CHO NAM", 850000, "DEM_HOI_CHONG_LOET", "Thông Tiểu", "Create Medic", "Việt Nam", "CLINY", "", "", "Silicon y tế", "Thiết bị hỗ trợ chăm sóc", ""),
    ("BỘ THÔNG TIỂU NGẮT QUÃNG DÀNH CHO NỮ", 850000, "DEM_HOI_CHONG_LOET", "Thông Tiểu", "Create Medic", "Việt Nam", "CLINY", "", "", "Silicon y tế", "Thiết bị hỗ trợ chăm sóc", ""),

    # Găng tay Robot PHCN
    ("GĂNG TẬP TAY PHCN 962", 1950000, "ROBOT_NANG_HA", "Robot & Nâng Hạ", "Oromi", "Trung Quốc", "962", "", "", "Vải tổng hợp, máy khí nén", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),
    ("GĂNG TAY PHCN PHỤC HỒI TAY", 1750000, "ROBOT_NANG_HA", "Robot & Nâng Hạ", "Hueloi", "Trung Quốc", "Găng robot", "", "", "Vải tổng hợp, mô tơ kéo", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),

    # Ghế nâng hạ
    ("GHẾ NÂNG CHUYỂN 053", 5840000, "ROBOT_NANG_HA", "Robot & Nâng Hạ", "GBM", "Trung Quốc", "053", "", "", "Khung thép chịu lực", "Ghế Nâng Chuyển Bệnh Nhân, Có Tay Đòn", ""),
    ("GHẾ NÂNG CHUYỂN XDC-01", 6200000, "ROBOT_NANG_HA", "Robot & Nâng Hạ", "OSADA", "Trung Quốc", "XDC-01", "", "", "Khung thép bọc sơn tĩnh điện", "Ghế Nâng Chuyển Bệnh Nhân", ""),
    ("GHẾ NÂNG CHUYỂN OSADA", 6200000, "ROBOT_NANG_HA", "Robot & Nâng Hạ", "OSADA", "Trung Quốc", "OSADA", "", "", "Khung thép", "Ghế Nâng Chuyển Bệnh Nhân", ""),
    ("GHẾ NÂNG HẠ OSADA XDC-02", 6900000, "ROBOT_NANG_HA", "Robot & Nâng Hạ", "OSADA", "Trung Quốc", "XDC-02", "", "", "Hợp kim cao cấp", "Ghế Nâng Chuyển Bệnh Nhân", ""),

    # Đèn hồng ngoại trị liệu
    ("ĐÈN HỒNG NGOẠI TRỊ LIỆU", 5800000, "TRI_LIEU_XUNG_DIEN", "Trị Liệu", "GOODPL", "Hàn Quốc", "IR-VITA", "", "", "Chân kim loại, bóng tia hồng ngoại", "Thiết bị hỗ trợ chăm sóc, phục hồi", ""),

    # Máy massage
    ("SÚNG MASSAGE PERCUSSIVE", 680000, "TRI_LIEU_XUNG_DIEN", "Trị Liệu", "Oromi", "Trung Quốc", "OMR-677", "", "", "Nhựa ABS, đầu bọc mút", "Súng massage", ""),
    ("SÚNG MASSAGE", 990000, "TRI_LIEU_XUNG_DIEN", "Trị Liệu", "Philips", "Trung Quốc", "PPM7323", "", "", "Kim loại, nhựa ABS", "Súng massage", ""),

    # Máy đạp chân
    ("MÁY ĐẠP CHÂN OEM", 2080000, "TRI_LIEU_XUNG_DIEN", "Trị Liệu", "OEM", "Trung Quốc", "Máy đạp", "", "", "Khung sắt, pedal nhựa", "Máy đạp chân", ""),
    ("MÁY ĐẠP CHÂN Hueloi", 3200000, "TRI_LIEU_XUNG_DIEN", "Trị Liệu", "Hueloi", "Trung Quốc", "Máy đạp", "", "", "Khung kim loại bọc nhựa", "Máy đạp chân", ""),
    ("MÁY TẬP CHÂN GBM-082", 2340000, "TRI_LIEU_XUNG_DIEN", "Trị Liệu", "GBM", "Trung Quốc", "082", "", "", "Nhựa đúc, động cơ điện", "Máy đạp chân", ""),

    # Giường y tế
    ("GIƯỜNG Y TẾ OSADA SD-11TC", 7650000, "GIUONG_Y_TE", "Giường Y Tế", "OSADA", "Nhật Bản", "SD-11TC", "Dài 2,05m x Rộng 0.97m x Cao 0,55m", "55kg", "Khung thép sơn tĩnh điện", "Hỗ trợ điều trị và theo dõi", ""),
    ("GIƯỜNG Y TẾ JYC01", 12799000, "GIUONG_Y_TE", "Giường Y Tế", "Hueloi", "Trung Quốc", "JYC01", "", "", "Khung thép", "Giường y tế 4 tay quay có bô", ""),
    ("GIƯỜNG Y TẾ A01-I", 7499000, "GIUONG_Y_TE", "Giường Y Tế", "Hueloi", "Trung Quốc", "A01-I", "", "", "Khung thép", "Giường y tế 4 tay quay có bô", ""),
    ("GIƯỜNG Y TẾ A01-III", 7999000, "GIUONG_Y_TE", "Giường Y Tế", "Hueloi", "Trung Quốc", "A01-III", "", "", "Khung thép", "Giường y tế 4 tay quay có bô", ""),
    ("GƯỜNG 2 TAY QUAY GBM-093A", 4999000, "GIUONG_Y_TE", "Giường Y Tế", "GBM", "Trung Quốc", "093A", "Dài 200 cm x Rộng 90 cm x Cao 55 cm", "65kg", "Khung thép sơn tĩnh điện, đầu/đôi giường nhựa ABS, đệm mút xốp", "Dùng cho bệnh nhân nằm điều trị, hỗ trợ chăm sóc", ""),
    ("GƯỜNG 4 TAY QUAY GBM-092A", 7899000, "GIUONG_Y_TE", "Giường Y Tế", "GBM", "Trung Quốc", "092A", "Dài 200 cm x Rộng 90 cm x Cao 55 cm", "65kg", "Khung thép sơn tĩnh điện, đầu/đuôi giường nhựa ABS, đệm mút xốp", "Dùng cho bệnh nhân nằm điều trị, hỗ trợ chăm sóc", ""),
    ("GIƯỜNG Y TẾ OSADA SD-22C", 5500000, "GIUONG_Y_TE", "Giường Y Tế", "OSADA", "Trung Quốc", "SD-22C", "Dài 205 cm x Rộng 97 cm x Cao 55 cm", "60kg", "Khung thép sơn tĩnh điện, đầu/đuôi giường nhựa ABS, lan can nhôm", "Dùng cho bệnh nhân nằm điều trị", ""),
    ("GIƯỜNG Y Tế ĐIỀU KHIỂN ĐIỆN 3 CHỨC NĂNG OSADA SD-33E", 12500000, "GIUONG_Y_TE", "Giường Y Tế", "OSADA", "Trung Quốc", "SD-33E", "Dài 206 cm x Rộng 96 cm x Cao 43 - 70 cm", "98kg", "Khung thép sơn tĩnh điện, đầu/đuôi giường nhựa ABS sang trọng", "Dùng cho bệnh nhân, điều khiển điện 3 chức năng", ""),
    ("GIƯỜNG Y TẾ OSADA SD-57C", 11000000, "GIUONG_Y_TE", "Giường Y Tế", "OSADA", "Trung Quốc", "SD-57C", "Dài 205 cm x Rộng 100 cm x Cao 55 cm", "103kg", "Khung thép sơn tĩnh điện, đầu/đuôi giường nhựa ABS cao cấp", "Dùng cho bệnh nhân, giường 5 tay quay đa chức năng", ""),
    ("GIƯỜNG Y TẾ ROYALMED GIN1", 2800000, "GIUONG_Y_TE", "Giường Y Tế", "ROYALMED", "Trung Quốc", "GIN1", "1970 x 900 x 500 mm", "60kg", "Inox 201, 4 bánh 100 mm xoay 360º", "Dùng cho bệnh nhân nằm điều trị", ""),
    ("GIƯỜNG Y TẾ ROYALMED GIN2", 3400000, "GIUONG_Y_TE", "Giường Y Tế", "HOÀNG GIA", "Việt Nam", "GIN2", "1970 x 900 x 500 mm", "30 kg", "Inox 201, 4 bánh 100 mm, xoay 360º", "Dùng cho bệnh nhân nằm điều trị tại nhà hoặc bệnh viện", ""),
    ("GIƯỜNG Y TẾ 4 TAY QUAY OSADA SD-58C", 8500000, "GIUONG_Y_TE", "Giường Y Tế", "OSADA", "Trung Quốc", "SD-58C", "Dài 205 cm x Rộng 97 cm x Cao 53 cm", "85kg", "Khung thép sơn tĩnh điện, đầu/đuôi giường nhựa ABS", "Dùng cho bệnh nhân, đa chức năng với 3 tay quay & 1 tay gạt bô", ""),
    ("GƯỜNG Y TẾ 3 TAY QUAY OSADA SD-33C", 6700000, "GIUONG_Y_TE", "Giường Y Tế", "OSADA", "Trung Quốc", "SD-33C", "Dài 205 cm x Rộng 97 cm x Cao 55 cm", "60kg", "Khung thép sơn tĩnh điện, đầu/đuôi giường nhựa ABS", "Dùng cho bệnh nhân, giường 3 tay quay", ""),
    ("GƯỜNG KÉO GIÃN CỘT SỐNG LƯNG, CỔ BẰNG ĐIỆN OSADA SD-41GK", 10150000, "GIUONG_Y_TE", "Giường Y Tế", "OSADA", "Trung Quốc", "SD-41GK", "200cm x 53cm x 55cm", "48 kg", "Khung thép sơn tĩnh điện, bàn nằm kéo bằng gỗ bọc đệm da", "Thiết bị kéo dãn đa năng, kéo dãn được đồng thời", ""),
    ("GƯỜNG KÉO GIÃN CỘT SỐNG LƯNG, CỔ BẰNG ĐIỆN OSADA OSADA SD-31GK", 5700000, "GIUONG_Y_TE", "Giường Y Tế", "OSADA", "Trung Quốc", "SD-31GK", "200cm x 53cm x 55cm", "48kg", "Khung thép sơn tĩnh điện, bàn nằm kéo bằng gỗ bọc đệm da", "Thiết bị kéo dãn đa năng", ""),
    ("GIƯỜNG KHÁM BỆNH/SIÊU ÂM ROYALMED GK", 5700000, "GIUONG_Y_TE", "Giường Y Tế", "ROYALMED", "Trung Quốc", "GK", "1900 x 600 x 550 mm", "48kg", "Inox cao cấp, chống gỉ", "Phần đầu giường có thể nâng hạ", ""),

    # Máy xung điện trị liệu
    ("MÁY XUNG ĐIỆN TRỊ LIỆU OMRON HV - F013", 1200000, "TRI_LIEU_XUNG_DIEN", "Xung Điện Trị Liệu", "OMRON", "Nhật Bản", "HV - F013", "Thiết kế nhỏ gọn", "", "Nhựa ABS an toàn", "Sử dụng công nghệ TENS, chặn cơn đau", ""),
    ("MÁY XUNG ĐIỆN TRỊ LIỆU OMRON HV - F027", 1500000, "TRI_LIEU_XUNG_DIEN", "Xung Điện Trị Liệu", "OMRON", "Nhật Bản", "HV - F027", "Thiết kế nhỏ gọn", "", "Nhựa ABS an toàn", "Sử dụng công nghệ TENS, chặn cơn đau", ""),
    ("MÁY XUNG ĐIỆN TRỊ LIỆU OMRON HV - F028", 1750000, "TRI_LIEU_XUNG_DIEN", "Xung Điện Trị Liệu", "OMRON", "Nhật Bản", "HV - F028", "Thiết kế nhỏ gọn", "", "Nhựa ABS an toàn", "Sử dụng công nghệ TENS, chặn cơn đau", ""),
    ("MÁY XUNG ĐIỆN TRỊ LIỆU OMRON HV - F230", 2200000, "TRI_LIEU_XUNG_DIEN", "Xung Điện Trị Liệu", "OMRON", "Nhật Bản", "HV - F230", "Thiết kế nhỏ gọn", "", "Nhựa ABS an toàn", "Sử dụng công nghệ TENS, chặn cơn đau", ""),
    ("MÁY XUNG ĐIỆN TRỊ LIỆU OMRON HV - F030", 1760000, "TRI_LIEU_XUNG_DIEN", "Xung Điện Trị Liệu", "OMRON", "Nhật Bản", "HV - F030", "Thiết kế nhỏ gọn", "", "Nhựa ABS an toàn", "Sử dụng công nghệ TENS, chặn cơn đau", ""),
    ("MÁY TRỊ LIỆU SUY GIÃN TĨNH MẠCH GBM-034", 2040000, "TRI_LIEU_XUNG_DIEN", "Xung Điện Trị Liệu", "GBM", "Trung Quốc", "034", "Có đai nén", "", "Vải bọc TPU, máy nén khí", "Máy hỗ trợ điều trị suy giãn tĩnh mạch", "")
]

ts_content = "import { Product } from '../types';\n\nexport const PDF_PRODUCTS: Product[] = [\n"
for i, p in enumerate(products):
    id_str = f"1000{i+1}"
    name = p[0]
    price = p[1]
    cat = p[2]
    cat_name = p[3]
    brand = p[4]
    origin = p[5]
    model = p[6]
    dim = p[7].replace('"', '\\"')
    weight = p[8].replace('"', '\\"')
    material = p[9].replace('"', '\\"')
    application = p[10].replace('"', '\\"')
    
    # Custom URLs
    custom_url = p[11] if len(p) > 11 else ""
    
    # REPLACE SLASHES AND FORBIDDEN WINDOWS CHARS
    # Windows doesn't allow: \ / : * ? " < > |
    safe_name = name.replace("/", "-").replace("\\", "-").replace(":", "-").replace("*", "").replace("?", "").replace('"', "").replace("<", "").replace(">", "").replace("|", "")
    image_url = custom_url if custom_url != "" else f"/products/{safe_name}.jpg"
    
    ts_content += f"""  {{
    id: {id_str},
    code: "TEC-{id_str}",
    name: "{name}",
    category: "{cat}",
    categoryName: "{cat_name}",
    marketPrice: {int(price * 1.2)},
    tecnicPrice: {price},
    discountPercent: 17,
    stock: 50,
    soldCount: {100 + i * 2},
    rating: 4.8,
    reviewCount: {20 + i},
    isFeatured: {str(i % 5 == 0).lower()},
    image: "{image_url}",
    shortDescription: "{name} chính hãng {brand}, xuất xứ {origin}.",
    fullDescription: "Sản phẩm {name} được phân phối chính hãng bởi TECNIC MEDICAL. Đảm bảo chất lượng và uy tín.",
    specifications: {{
      brand: "{brand}",
      origin: "{origin}",
      warrantyMonths: 12,
      model: "{model}",
      dimensions: "{dim}",
      weight: "{weight}",
      material: "{material}",
      application: "{application}"
    }}
  }}"""
    if i < len(products) - 1:
        ts_content += ",\n"
    else:
        ts_content += "\n"

ts_content += "];\n"

with open('src/data/pdfProducts.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Generated src/data/pdfProducts.ts successfully with Windows-safe filenames.")
