import React, { useState } from 'react';
import { BannerSize, BannerContent, BannerTheme } from '../types/banner';
import { BannerRenderer } from './BannerRenderer';
import { X, Download, Check, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import * as htmlToImage from 'html-to-image';

interface BannerEditorModalProps {
  size: BannerSize | null;
  onClose: () => void;
  content: BannerContent;
  theme: BannerTheme;
  onUpdateContent: (updated: Partial<BannerContent>) => void;
}

export const BannerEditorModal: React.FC<BannerEditorModalProps> = ({
  size,
  onClose,
  content,
  theme,
  onUpdateContent,
}) => {
  if (!size) return null;

  const [zoomScale, setZoomScale] = useState(
    Math.min(1, 600 / Math.max(size.width, size.height))
  );
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    const el = document.getElementById(`modal-banner-export-${size.id}`);
    if (!el) return;

    try {
      setIsExporting(true);
      const dataUrl = await htmlToImage.toPng(el, {
        pixelRatio: 2,
        cacheBust: true,
      });

      const a = document.createElement('a');
      a.download = `banner_${size.width}x${size.height}_${size.id}.png`;
      a.href = dataUrl;
      a.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-white">{size.name}</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
              {size.width} × {size.height} px
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-medium">
              Ratio {size.aspectRatio}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isExporting}
              className="px-4 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Exported!
                </>
              ) : isExporting ? (
                'Rendering...'
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" /> Download 2x PNG
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Canvas Preview Area */}
          <div className="lg:col-span-8 p-6 bg-slate-950 flex flex-col items-center justify-center relative overflow-auto border-r border-slate-800">
            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl shadow-lg">
              <button
                type="button"
                onClick={() => setZoomScale((s) => Math.max(0.15, s - 0.1))}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-300 font-mono px-1">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomScale((s) => Math.min(2, s + 0.1))}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomScale(1)}
                className="px-2 py-1 text-[10px] text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors font-semibold"
                title="Actual 100% Size"
              >
                100%
              </button>
            </div>

            {/* Banner Canvas */}
            <div className="p-4 flex items-center justify-center overflow-auto max-w-full max-h-full">
              <BannerRenderer
                id={`modal-banner-export-${size.id}`}
                size={size}
                content={content}
                theme={theme}
                scale={zoomScale}
                className="shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>

          {/* Side Inspector Controls */}
          <div className="lg:col-span-4 p-5 bg-slate-900/60 overflow-y-auto space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-800">
              Format Specific Overrides
            </h4>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Headline</label>
              <textarea
                rows={2}
                value={content.headline}
                onChange={(e) => onUpdateContent({ headline: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 font-bold resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Subhead / Value Proposition
              </label>
              <textarea
                rows={3}
                value={content.subhead}
                onChange={(e) => onUpdateContent({ subhead: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">CTA Button</label>
                <input
                  type="text"
                  value={content.ctaText}
                  onChange={(e) => onUpdateContent({ ctaText: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Offer Tag</label>
                <input
                  type="text"
                  value={content.pricingOffer}
                  onChange={(e) => onUpdateContent({ pricingOffer: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Trust Badge</label>
              <input
                type="text"
                value={content.badgeText}
                onChange={(e) => onUpdateContent({ badgeText: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div>
                <strong>Placement:</strong> {size.placement}
              </div>
              <div>
                <strong>Recommended Image Ratio:</strong> {size.recommendedImageRatio}
              </div>
              <div>
                <strong>Category:</strong> {size.category.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
