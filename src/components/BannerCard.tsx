import React, { useRef, useState } from 'react';
import { BannerSize, BannerContent, BannerTheme } from '../types/banner';
import { BannerRenderer } from './BannerRenderer';
import { Download, Code2, Edit3, Maximize2, Check } from 'lucide-react';
import * as htmlToImage from 'html-to-image';

interface BannerCardProps {
  size: BannerSize;
  content: BannerContent;
  theme: BannerTheme;
  onOpenEmbedModal: (size: BannerSize) => void;
  onOpenEditModal: (size: BannerSize) => void;
}

export const BannerCard: React.FC<BannerCardProps> = ({
  size,
  content,
  theme,
  onOpenEmbedModal,
  onOpenEditModal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Compute scale so the banner fits cleanly in the preview card
  // Maximum card container preview width is ~380px and max preview height is ~320px
  const maxPreviewWidth = 380;
  const maxPreviewHeight = 320;

  const scaleX = maxPreviewWidth / size.width;
  const scaleY = maxPreviewHeight / size.height;
  const autoScale = Math.min(1, scaleX, scaleY);

  const handleDownloadPng = async () => {
    const el = document.getElementById(`banner-export-${size.id}`);
    if (!el) return;

    try {
      setIsDownloading(true);
      const dataUrl = await htmlToImage.toPng(el, {
        pixelRatio: 2, // High DPI export
        cacheBust: true,
      });

      const link = document.createElement('a');
      link.download = `banner_${size.width}x${size.height}_${size.id}.png`;
      link.href = dataUrl;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (err) {
      console.error('Failed to export banner image:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between group">
      {/* Card Header */}
      <div className="px-4 py-3 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-slate-200 truncate">{size.name}</h4>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
              {size.width}×{size.height}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 block truncate">{size.placement}</span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
            {size.aspectRatio}
          </span>
        </div>
      </div>

      {/* Card Preview Body */}
      <div
        ref={containerRef}
        className="p-5 flex items-center justify-center bg-slate-950/30 min-h-[220px] overflow-auto relative"
      >
        <BannerRenderer
          id={`banner-export-${size.id}`}
          size={size}
          content={content}
          theme={theme}
          scale={autoScale}
          className="shadow-2xl transition-transform duration-200"
        />
      </div>

      {/* Card Footer Actions */}
      <div className="px-3.5 py-2.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onOpenEditModal(size)}
          className="px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
          title="Customize text and colors for this format"
        >
          <Edit3 className="w-3 h-3 text-slate-400" />
          Edit
        </button>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onOpenEmbedModal(size)}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
            title="Copy HTML/CSS embed snippet"
          >
            <Code2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleDownloadPng}
            disabled={isDownloading}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              downloadSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3 h-3" />
                Saved!
              </>
            ) : isDownloading ? (
              <span className="text-[10px]">Exporting...</span>
            ) : (
              <>
                <Download className="w-3 h-3" />
                PNG
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
