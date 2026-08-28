import os

filepath = 'src/components/ProductDetailPage.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("import { ProductImage } from './ProductImage';", "import { ProductImage } from './ProductImage';\nimport Markdown from 'react-markdown';")

replacement = """              <div className="space-y-4">
                <div className="text-[15px] text-slate-800 font-medium leading-[1.8] markdown-body">
                  <Markdown>{product.fullDescription || product.shortDescription}</Markdown>
                </div>"""
content = content.replace("""              <div className="space-y-4">
                <p className="text-base text-slate-800 font-medium leading-relaxed">
                  {product.fullDescription}
                </p>""", replacement)

with open(filepath, 'w') as f:
    f.write(content)

