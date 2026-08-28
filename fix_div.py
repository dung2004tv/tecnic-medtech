filepath = 'src/components/ProductDetailPage.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find line 283
if "</div>" in lines[282]:
    lines.insert(283, "      </div>\n")
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Fixed!")
