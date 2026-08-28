import re

with open('src/components/FloatingContactWidgets.tsx', 'r') as f:
    content = f.read()

zalo_old = """        <a
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

zalo_new = """        <a
          href="https://zalo.me/0348402466"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-[52px] h-[52px] bg-[#0068ff] hover:bg-[#0055d4] rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
          title="Tư vấn nhanh qua Zalo: 034 84 02466"
        >
          <div className="absolute inset-0 rounded-full bg-[#0068ff] animate-ping opacity-40" style={{ animationDuration: '3s' }}></div>
          <div className="w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center z-10 shadow-sm">
            <span className="font-black text-sm text-[#0068ff] tracking-tight">Zalo</span>
          </div>
        </a>"""

content = content.replace(zalo_old, zalo_new)

with open('src/components/FloatingContactWidgets.tsx', 'w') as f:
    f.write(content)
