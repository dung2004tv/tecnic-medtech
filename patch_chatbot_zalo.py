import re

# Update ChatBot
with open('src/components/ChatBot.tsx', 'r') as f:
    chat_content = f.read()

chat_content = chat_content.replace('className="fixed bottom-[75px] sm:bottom-[80px] right-4 sm:right-6 z-50 flex flex-col items-end"', 'className="fixed bottom-4 sm:bottom-4 right-4 sm:right-6 z-50 flex flex-col items-end"')

# Also make the chatbot button smaller
old_chat_btn = """      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-[#0061b0] hover:bg-[#004f8f] text-white pl-1.5 pr-3 py-1.5 rounded-full shadow-md transition-all duration-300 hover:scale-105 border-[3px] border-white"
        title="Tư Vấn Thiết Bị Y Tế TECNIC"
      >
        <div className="w-8 h-8 rounded-full bg-[#fbbc05] text-[#0061b0] flex items-center justify-center shadow-sm relative">
          <Stethoscope className="w-4 h-4" strokeWidth={2.5} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-[1.5px] border-white rounded-full"></span>
        </div>

        <div className="text-left pr-1">
          <p className="text-[11px] font-black leading-none uppercase tracking-wider text-[#fbbc05] flex items-center gap-1">
            TƯ VẤN THIẾT BỊ
          </p>
        </div>
      </button>"""

new_chat_btn = """      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 bg-[#0061b0] hover:bg-[#004f8f] text-white pl-1 pr-2 py-1 rounded-full shadow-md transition-all duration-300 hover:scale-105 border-2 border-white"
        title="Tư Vấn Thiết Bị Y Tế TECNIC"
      >
        <div className="w-7 h-7 rounded-full bg-[#fbbc05] text-[#0061b0] flex items-center justify-center shadow-sm relative">
          <Stethoscope className="w-3.5 h-3.5" strokeWidth={2.5} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 border border-white rounded-full"></span>
        </div>

        <div className="text-left pr-1">
          <p className="text-[10px] font-black leading-none uppercase tracking-wider text-[#fbbc05] flex items-center gap-1">
            TƯ VẤN THIẾT BỊ
          </p>
        </div>
      </button>"""
chat_content = chat_content.replace(old_chat_btn, new_chat_btn)

with open('src/components/ChatBot.tsx', 'w') as f:
    f.write(chat_content)

# Update Zalo position
with open('src/components/FloatingContactWidgets.tsx', 'r') as f:
    zalo_content = f.read()

zalo_content = zalo_content.replace('className="fixed bottom-5 right-6 sm:right-8 z-40 flex flex-col items-center gap-2.5"', 'className="fixed bottom-[60px] right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5"')

with open('src/components/FloatingContactWidgets.tsx', 'w') as f:
    f.write(zalo_content)
