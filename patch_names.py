import os

files_to_patch = [
    'src/components/Footer.tsx',
    'src/components/admin/AdminSeoConfig.tsx',
    'src/components/ChatBot.tsx',
    'src/components/CheckoutModal.tsx'
]

old_name_1 = "CÔNG TY CỔ PHẦN CÔNG NGHỆ VÀ DỊCH VỤ Y TẾ TECNIC"
old_name_2 = "CÔNG TY CP CÔNG NGHỆ VÀ DỊCH VỤ Y TẾ TECNIC"
new_name = "CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ HỖ TRỢ Y TẾ TECNIC (TECNIC Medtech)"

for filepath in files_to_patch:
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        content = content.replace(old_name_1, new_name)
        content = content.replace(old_name_2, new_name)
        
        with open(filepath, 'w') as f:
            f.write(content)

