import React, { useState, useRef } from 'react';
import { 
  Code, Bold, Italic, Strikethrough, Underline, 
  Heading1, Heading2, Heading3, Quote, List, 
  ListOrdered, Link as LinkIcon, Image as ImageIcon, 
  Table, Sparkles, Eye, Undo, Redo, HelpCircle, Check, ChevronDown
} from 'lucide-react';
import Markdown from 'react-markdown';

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  minHeight?: string;
  showAiButton?: boolean;
  onAiGenerate?: () => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Nhập nội dung bài viết / mô tả chi tiết tại đây...',
  minHeight = '320px',
  showAiButton = true,
  onAiGenerate
}) => {
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to insert or wrap markdown at cursor position
  const insertText = (prefix: string, suffix: string = '', defaultPlaceholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(value + prefix + defaultPlaceholder + suffix);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultPlaceholder;

    const before = value.substring(0, start);
    const after = value.substring(end);

    const newText = before + prefix + selectedText + suffix + after;
    onChange(newText);

    // Reposition cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 10);
  };

  // Format Heading / Block
  const applyFormat = (formatType: 'p' | 'h1' | 'h2' | 'h3' | 'quote' | 'code') => {
    setShowFormatDropdown(false);
    switch (formatType) {
      case 'h1':
        insertText('\n# ', '\n', 'Tiêu đề chính H1');
        break;
      case 'h2':
        insertText('\n## ', '\n', 'Tiêu đề mục H2');
        break;
      case 'h3':
        insertText('\n### ', '\n', 'Tiêu đề nhỏ H3');
        break;
      case 'quote':
        insertText('\n> ', '\n', 'Đoạn trích dẫn y khoa');
        break;
      case 'code':
        insertText('\n```\n', '\n```\n', 'Nội dung mã / kỹ thuật');
        break;
      case 'p':
      default:
        insertText('\n\n', '', 'Đoạn văn bản mới');
        break;
    }
  };

  // Font Size
  const applySize = (sizeName: string, cssStyle: string) => {
    setShowSizeDropdown(false);
    insertText(`<span style="${cssStyle}">`, '</span>', 'Văn bản định dạng kích thước');
  };

  // Insert Link
  const handleInsertLink = () => {
    const url = prompt('Nhập đường dẫn URL (ví dụ: https://tecnic.vn hoặc https://moh.gov.vn):', 'https://');
    if (url) {
      const title = prompt('Nhập tên hiển thị của đường link:', 'Xem chi tiết');
      insertText(`[${title || 'Liên kết'}](${url})`);
    }
  };

  // Insert Image
  const handleInsertImage = () => {
    const imgUrl = prompt('Nhập đường dẫn ảnh (URL hoặc /products/ten-anh.png):', '/products/');
    if (imgUrl) {
      const altText = prompt('Nhập chú thích ảnh:', 'Ảnh minh họa thiết bị y tế TECNIC');
      insertText(`\n![${altText || 'Hình ảnh'}](${imgUrl})\n*${altText || ''}*\n`);
    }
  };

  // Insert Table
  const handleInsertTable = () => {
    const tableTemplate = `\n| Thông số kỹ thuật | Chi tiết tiêu chuẩn | Ghi chú |\n| :--- | :--- | :--- |\n| **Model thiết bị** | TECNIC-PRO | Chính hãng |\n| **Bảo hành** | 24 - 36 Tháng | 1 Đổi 1 trong 30 ngày |\n| **Xuất xứ** | Nhật Bản / Đạt ISO 13485 | Đầy đủ CO/CQ |\n\n`;
    insertText(tableTemplate);
  };

  return (
    <div className="border border-slate-300 rounded overflow-hidden bg-white shadow-2xs font-sans">
      
      {/* TOOLBAR */}
      <div className="bg-slate-50 border-b border-slate-200 p-1.5 flex flex-wrap items-center gap-1 text-slate-700 text-xs select-none">
        
        {/* Source Mode Toggle */}
        <button
          type="button"
          onClick={() => {
            setIsSourceMode(!isSourceMode);
            setIsPreviewMode(false);
          }}
          className={`px-2.5 py-1 rounded font-medium flex items-center gap-1 transition ${
            isSourceMode ? 'bg-[#143472] text-white' : 'hover:bg-slate-200 text-slate-700'
          }`}
          title="Chế độ mã nguồn HTML/Markdown"
        >
          <Code className="w-3.5 h-3.5" />
          <span>Source</span>
        </button>

        {/* Live Preview Toggle */}
        <button
          type="button"
          onClick={() => {
            setIsPreviewMode(!isPreviewMode);
            setIsSourceMode(false);
          }}
          className={`px-2.5 py-1 rounded font-medium flex items-center gap-1 transition ${
            isPreviewMode ? 'bg-[#0071ba] text-white' : 'hover:bg-slate-200 text-slate-700'
          }`}
          title="Xem trước kết quả hiển thị"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Xem trước</span>
        </button>

        <div className="w-px h-4 bg-slate-300 mx-0.5" />

        {/* Text Styles: B, I, S, U */}
        <button
          type="button"
          onClick={() => insertText('**', '**', 'Văn bản in đậm')}
          className="p-1 px-2 hover:bg-slate-200 rounded font-serif font-bold text-slate-800"
          title="In đậm (Bold - Ctrl+B)"
        >
          B
        </button>

        <button
          type="button"
          onClick={() => insertText('*', '*', 'Văn bản in nghiêng')}
          className="p-1 px-2 hover:bg-slate-200 rounded font-serif italic text-slate-800"
          title="In nghiêng (Italic - Ctrl+I)"
        >
          I
        </button>

        <button
          type="button"
          onClick={() => insertText('~~', '~~', 'Văn bản gạch ngang')}
          className="p-1 px-2 hover:bg-slate-200 rounded font-serif line-through text-slate-800"
          title="Gạch ngang (Strikethrough)"
        >
          S
        </button>

        <button
          type="button"
          onClick={() => insertText('<u>', '</u>', 'Văn bản gạch chân')}
          className="p-1 px-2 hover:bg-slate-200 rounded font-serif underline text-slate-800"
          title="Gạch chân (Underline)"
        >
          U
        </button>

        <div className="w-px h-4 bg-slate-300 mx-0.5" />

        {/* Format Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowFormatDropdown(!showFormatDropdown);
              setShowSizeDropdown(false);
            }}
            className="p-1 px-2 hover:bg-slate-200 rounded flex items-center gap-1 text-slate-700 bg-white border border-slate-200"
          >
            <span>Định dạng</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {showFormatDropdown && (
            <div className="absolute left-0 top-full mt-1 bg-white border border-slate-200 rounded shadow-lg z-50 py-1 w-44">
              <button type="button" onClick={() => applyFormat('p')} className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-xs">
                Đoạn văn (Paragraph)
              </button>
              <button type="button" onClick={() => applyFormat('h1')} className="w-full text-left px-3 py-1.5 hover:bg-slate-100 font-bold text-sm text-[#143472]">
                Tiêu đề 1 (H1)
              </button>
              <button type="button" onClick={() => applyFormat('h2')} className="w-full text-left px-3 py-1.5 hover:bg-slate-100 font-bold text-xs text-[#0071ba]">
                Tiêu đề 2 (H2)
              </button>
              <button type="button" onClick={() => applyFormat('h3')} className="w-full text-left px-3 py-1.5 hover:bg-slate-100 font-semibold text-xs text-slate-800">
                Tiêu đề 3 (H3)
              </button>
              <div className="border-t border-slate-100 my-1" />
              <button type="button" onClick={() => applyFormat('quote')} className="w-full text-left px-3 py-1.5 hover:bg-slate-100 italic text-xs text-slate-600">
                Khối trích dẫn (Quote)
              </button>
              <button type="button" onClick={() => applyFormat('code')} className="w-full text-left px-3 py-1.5 hover:bg-slate-100 font-mono text-[11px] text-slate-700">
                Khối Code / Kỹ thuật
              </button>
            </div>
          )}
        </div>

        {/* Size Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowSizeDropdown(!showSizeDropdown);
              setShowFormatDropdown(false);
            }}
            className="p-1 px-2 hover:bg-slate-200 rounded flex items-center gap-1 text-slate-700 bg-white border border-slate-200"
          >
            <span>Cỡ chữ</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {showSizeDropdown && (
            <div className="absolute left-0 top-full mt-1 bg-white border border-slate-200 rounded shadow-lg z-50 py-1 w-40">
              <button type="button" onClick={() => applySize('Nhỏ', 'font-size: 12px;')} className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-[11px]">
                Nhỏ (12px)
              </button>
              <button type="button" onClick={() => applySize('Chuẩn', 'font-size: 14px;')} className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-xs">
                Chuẩn (14px)
              </button>
              <button type="button" onClick={() => applySize('Lớn', 'font-size: 16px;')} className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-sm">
                Lớn (16px)
              </button>
              <button type="button" onClick={() => applySize('Rất lớn', 'font-size: 18px; font-weight: bold;')} className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-base font-bold">
                Rất lớn (18px)
              </button>
            </div>
          )}
        </div>

        <div className="w-px h-4 bg-slate-300 mx-0.5" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => insertText('\n- ', '', 'Mục danh sách gạch đầu dòng')}
          className="p-1 px-2 hover:bg-slate-200 rounded text-slate-700"
          title="Danh sách gạch đầu dòng"
        >
          <List className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => insertText('\n1. ', '', 'Mục danh sách số')}
          className="p-1 px-2 hover:bg-slate-200 rounded text-slate-700"
          title="Danh sách số thứ tự"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        {/* Link, Image, Table */}
        <button
          type="button"
          onClick={handleInsertLink}
          className="p-1 px-2 hover:bg-slate-200 rounded text-slate-700"
          title="Chèn đường dẫn (Link)"
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={handleInsertImage}
          className="p-1 px-2 hover:bg-slate-200 rounded text-slate-700"
          title="Chèn ảnh minh họa (Image)"
        >
          <ImageIcon className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={handleInsertTable}
          className="p-1 px-2 hover:bg-slate-200 rounded text-slate-700"
          title="Chèn bảng biểu so sánh / thông số"
        >
          <Table className="w-3.5 h-3.5" />
        </button>

        {/* AI Generator Helper Button */}
        {showAiButton && onAiGenerate && (
          <div className="ml-auto">
            <button
              type="button"
              onClick={onAiGenerate}
              className="bg-gradient-to-r from-[#143472] to-[#0071ba] hover:from-blue-900 hover:to-blue-700 text-white px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1 shadow-2xs transition"
            >
              <Sparkles className="w-3 h-3 text-sky-300" />
              <span>Tạo nội dung AI</span>
            </button>
          </div>
        )}

      </div>

      {/* EDITOR BODY / PREVIEW */}
      {isPreviewMode ? (
        <div 
          className="p-4 overflow-y-auto bg-slate-50 text-slate-800 text-sm leading-relaxed prose max-w-none"
          style={{ minHeight }}
        >
          {value ? (
            <div className="markdown-body">
              <Markdown>{value}</Markdown>
            </div>
          ) : (
            <p className="text-slate-400 italic">Chưa có nội dung để xem trước...</p>
          )}
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-3 text-sm text-slate-800 outline-none focus:bg-blue-50/10 font-sans leading-relaxed resize-y border-none"
          style={{ minHeight }}
        />
      )}

      {/* FOOTER BAR */}
      <div className="bg-slate-50 border-t border-slate-200 px-3 py-1 text-[11px] text-slate-500 flex items-center justify-between">
        <div>
          <span>Số ký tự: <strong>{value.length}</strong></span>
          <span className="mx-2">•</span>
          <span>Số từ: <strong>{value.trim() ? value.trim().split(/\s+/).length : 0}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span>Hỗ trợ Markdown & HTML đầy đủ</span>
        </div>
      </div>

    </div>
  );
};
