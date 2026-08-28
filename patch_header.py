import os

filepath = 'src/components/Header.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Remove Trụ sở
content = content.replace("""            <button 
              onClick={onOpenAbout}
              className="hidden md:flex items-center gap-1 text-slate-200 hover:text-white transition text-[11px]"
            >
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>Trụ sở: Hà Đông, Hà Nội</span>
            </button>
            <span className="hidden md:inline text-blue-400">|</span>
            """, "")

# Remove Liên Hệ
content = content.replace("""            <button 
              onClick={onOpenContact}
              className="flex items-center gap-1 bg-amber-400 hover:bg-amber-300 text-blue-950 px-2 sm:px-3 py-0.5 rounded-full font-bold transition shadow-xs hover:shadow text-[11px] sm:text-xs"
              title="Liên hệ hotline & tư vấn viên TECNIC"
            >
              <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Liên Hệ</span>
            </button>""", "")

with open(filepath, 'w') as f:
    f.write(content)
