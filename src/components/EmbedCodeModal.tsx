import React, { useState } from 'react';
import { BannerSize, BannerContent, BannerTheme } from '../types/banner';
import { X, Copy, Check, Code } from 'lucide-react';

interface EmbedCodeModalProps {
  size: BannerSize | null;
  onClose: () => void;
  content: BannerContent;
  theme: BannerTheme;
}

export const EmbedCodeModal: React.FC<EmbedCodeModalProps> = ({
  size,
  onClose,
  content,
  theme,
}) => {
  if (!size) return null;

  const [copied, setCopied] = useState(false);

  const htmlSnippet = `<!-- Banner Ad: ${size.name} (${size.width}x${size.height}) -->
<div class="adcraft-banner-ad-${size.id}" style="
  width: ${size.width}px;
  height: ${size.height}px;
  background: ${theme.bgGradient || theme.bgColor};
  color: ${theme.textColor};
  font-family: ${theme.fontFamily};
  display: flex;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 8px;
  border: ${theme.borderStyle};
">
  <!-- Content Container -->
  <div style="padding: 16px; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      <span style="font-size: 10px; font-weight: 700; color: ${theme.accentColor}; text-transform: uppercase;">
        ${content.productName}
      </span>
      <h3 style="font-size: 16px; font-weight: 800; margin: 4px 0; color: ${theme.textColor};">
        ${content.headline}
      </h3>
      <p style="font-size: 12px; color: ${theme.subtextColor}; margin: 0;">
        ${content.subhead}
      </p>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px;">
      <span style="font-size: 12px; font-weight: 700; color: ${theme.accentColor};">
        ${content.pricingOffer}
      </span>
      <a href="${content.productUrl || '#'}" target="_blank" rel="noopener noreferrer" style="
        background: ${theme.ctaBg};
        color: ${theme.ctaText};
        padding: 6px 14px;
        font-size: 12px;
        font-weight: 700;
        border-radius: 6px;
        text-decoration: none;
        display: inline-block;
      ">
        ${content.ctaText} &rarr;
      </a>
    </div>
  </div>
</div>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">
              HTML / CSS Embed Code ({size.width}×{size.height} {size.name})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-400">
            Paste this self-contained HTML/CSS block directly into your ad server, Google Ad Manager tag, or website layout:
          </p>

          <pre className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-[11px] font-mono text-slate-300 overflow-x-auto max-h-72">
            <code>{htmlSnippet}</code>
          </pre>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow transition-all flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Embed Snippet
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
