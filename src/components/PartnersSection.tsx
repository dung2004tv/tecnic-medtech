import React, { useState, useEffect } from 'react';
import { Partner } from '../types';

interface PartnersSectionProps {
  className?: string;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({
  className = "py-12 bg-white border-t border-slate-100"
}) => {
  const [partners, setPartners] = useState<Partner[]>(() => {
    try {
      const stored = localStorage.getItem('tecnic_partners');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load partners from storage', e);
    }
    return [];
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const stored = localStorage.getItem('tecnic_partners');
        if (stored) {
          setPartners(JSON.parse(stored));
        } else {
          setPartners([]);
        }
      } catch (e) {
        console.warn(e);
      }
    };

    window.addEventListener('tecnic_partners_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('tecnic_partners_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const activePartners = partners
    .filter(p => p.status !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // If no partners have been added in admin yet, hide this section completely
  if (activePartners.length === 0) {
    return null;
  }

  return (
    <section className={className}>
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-[#032f6a] uppercase tracking-tight">
            ĐỐI TÁC - KHÁCH HÀNG
          </h2>
          <div className="w-16 h-1 bg-[#0071ba] mx-auto mt-3"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 items-center">
          {activePartners.map(p => (
            <a
              key={p.id}
              href={p.website || '#'}
              target={p.website ? '_blank' : undefined}
              rel={p.website ? 'noopener noreferrer' : undefined}
              className="w-[160px] h-[80px] bg-white border border-slate-200 rounded-lg shadow-xs flex items-center justify-center p-3 hover:shadow-md transition cursor-pointer hover:border-[#0071ba] group"
              title={p.name}
            >
              {p.logo ? (
                <img 
                  src={p.logo} 
                  alt={p.name} 
                  className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="font-bold text-xs text-slate-700">${p.name}</span>`;
                    }
                  }}
                />
              ) : (
                <span className="font-bold text-xs text-slate-700 text-center px-1 truncate">
                  {p.name}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
