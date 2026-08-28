import re

with open('src/components/FloatingContactWidgets.tsx', 'r') as f:
    content = f.read()

# Modify Zalo button
zalo_btn_old = """        <a
          href="https://zalo.me/0348402466"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#0068ff] hover:bg-[#0055d4] text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all duration-200 border-[3px] border-white relative group"
          title="Tư vấn nhanh qua Zalo: 034 84 02466"
        >
          <span className="font-black text-sm tracking-tight">Zalo</span>
        </a>"""

zalo_btn_new = """        <a
          href="https://zalo.me/0348402466"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center bg-[#0068ff] hover:bg-[#0055d4] text-white pl-1 pr-4 py-1 rounded-full shadow-md transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/50"
          title="Tư vấn nhanh qua Zalo: 034 84 02466"
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-2">
            <span className="font-black text-xs text-[#0068ff]">Zalo</span>
          </div>
          <span className="font-black text-base tracking-wide text-white whitespace-nowrap">
            034 84 02466
          </span>
        </a>"""

content = content.replace(zalo_btn_old, zalo_btn_new)

with open('src/components/FloatingContactWidgets.tsx', 'w') as f:
    f.write(content)
