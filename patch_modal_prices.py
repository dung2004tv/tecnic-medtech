import re

with open('src/components/CartModal.tsx', 'r') as f:
    content = f.read()
    
content = content.replace(
    '<span className="font-black text-xs text-red-600">',
    '<span className="font-black text-xs text-red-600 whitespace-nowrap">'
)
content = content.replace(
    '<span className="text-[10px] text-slate-400 line-through">',
    '<span className="text-[10px] text-slate-400 line-through whitespace-nowrap">'
)
content = content.replace(
    '<span className="text-lg text-red-600">',
    '<span className="text-lg text-red-600 whitespace-nowrap">'
)

with open('src/components/CartModal.tsx', 'w') as f:
    f.write(content)


with open('src/components/CheckoutModal.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '<b className="text-red-600 text-sm">',
    '<b className="text-red-600 text-sm whitespace-nowrap">'
)
content = content.replace(
    '<span className="text-red-600 text-base">',
    '<span className="text-red-600 text-base whitespace-nowrap">'
)
content = content.replace(
    '<p className="text-xl font-black text-red-600">',
    '<p className="text-xl font-black text-red-600 whitespace-nowrap">'
)

with open('src/components/CheckoutModal.tsx', 'w') as f:
    f.write(content)
