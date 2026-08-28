import re

with open('src/components/ProductImage.tsx', 'r') as f:
    content = f.read()

tens_graphic = """        case 'TRI_LIEU_XUNG_DIEN':
          return (
            <g transform="translate(30, 25) scale(0.7)">
              {/* Omron TENS Electrotherapy Device */}"""

massage_gun_graphic = """        case 'TRI_LIEU_XUNG_DIEN':
          if (product.name.toUpperCase().includes('SÚNG MASSAGE') || product.name.toUpperCase().includes('SUNG MASSAGE')) {
            return (
              <g transform="translate(40, 25) scale(0.8)">
                {/* Massage Gun Handle */}
                <rect x="55" y="60" width="25" height="70" rx="10" fill="#334155" />
                {/* Massage Gun Body (Motor) */}
                <rect x="40" y="30" width="60" height="35" rx="12" fill="#1e293b" />
                {/* Back Panel */}
                <path d="M 95 30 L 105 35 L 105 60 L 95 65 Z" fill="#94a3b8" />
                {/* Front Piston */}
                <rect x="25" y="42" width="20" height="10" fill="#64748b" />
                {/* Massage Head (Round) */}
                <circle cx="15" cy="47" r="14" fill="#0f172a" />
                {/* Brand text */}
                <text x="70" y="52" textAnchor="middle" fill="#94a3b8" fontSize="6" fontWeight="bold">PHILIPS</text>
              </g>
            );
          }
          return (
            <g transform="translate(30, 25) scale(0.7)">
              {/* Omron TENS Electrotherapy Device */}"""

content = content.replace(tens_graphic, massage_gun_graphic)

with open('src/components/ProductImage.tsx', 'w') as f:
    f.write(content)
