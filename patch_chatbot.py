import os

filepath = 'src/components/ChatBot.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("import { ProductImage } from './ProductImage';", "import { ProductImage } from './ProductImage';\nimport Markdown from 'react-markdown';")

replacement = """const ChatMessageRenderer: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="space-y-1 text-sm leading-relaxed markdown-body">
      <Markdown>{text}</Markdown>
    </div>
  );
};"""
content = content.replace("""const ChatMessageRenderer: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="space-y-1 text-xs leading-relaxed whitespace-pre-line">
      {text}
    </div>
  );
};""", replacement)

content = content.replace("sm:w-[440px]", "sm:w-[450px]")
content = content.replace("text-xs", "text-[13px]") # Make chat text slightly larger
content = content.replace("text-[9px]", "text-[11px]")

with open(filepath, 'w') as f:
    f.write(content)

