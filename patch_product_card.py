import re

with open('src/components/ProductCard.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '<span className="text-base sm:text-lg font-black text-red-600">',
    '<span className="text-base sm:text-lg font-black text-red-600 whitespace-nowrap flex items-center">'
)

with open('src/components/ProductCard.tsx', 'w') as f:
    f.write(content)
