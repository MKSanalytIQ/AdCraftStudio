import React from 'react';
import { BannerContent, PresetProduct } from '../types/banner';
import { PRESET_PRODUCTS } from '../data/presetProducts';
import { BANNER_THEMES } from '../data/bannerThemes';
import {
  Wand2,
  Sparkles,
  ExternalLink,
  Layers,
  Palette,
  RotateCcw,
  Tag,
  ArrowRight,
} from 'lucide-react';

interface ProductInputSectionProps {
  productDescription: string;
  onChangeDescription: (val: string) => void;
  productUrl: string;
  onChangeUrl: (val: string) => void;
  content: BannerContent;
  onUpdateContent: (content: Partial<BannerContent>) => void;
  activeThemeId: string;
  onChangeTheme: (themeId: string) => void;
  onApplyPreset: (preset: PresetProduct) => void;
  onAnalyzeProduct: () => Promise<void>;
  isAnalyzing: boolean;
}

export const ProductInputSection: React.FC<ProductInputSectionProps> = ({
  productDescription,
  onChangeDescription,
  productUrl,
  onChangeUrl,
  content,
  onUpdateContent,
  activeThemeId,
  onChangeTheme,
  onApplyPreset,
  onAnalyzeProduct,
  isAnalyzing,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-5">
      {/* 1. Quick Presets Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Quick E-Commerce Presets
          </span>
          <span className="text-[11px] text-slate-400">1-click test with real product data</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_PRODUCTS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/60 text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <span>{preset.name.split(' ')[0]}</span>
              <span className="text-[10px] text-slate-400 font-normal">({preset.category.split(' ')[0]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Product Description and URL Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* URL Input */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
              Product or Landing Page URL
            </label>
            <input
              type="url"
              value={productUrl}
              onChange={(e) => onChangeUrl(e.target.value)}
              placeholder="https://yourstore.com/products/example"
              className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Theme Selector */}
          <div className="mt-4">
            <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-indigo-400" />
              Banner Visual Theme
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {Object.values(BANNER_THEMES).map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => onChangeTheme(theme.id)}
                  className={`p-1.5 rounded-xl border text-center transition-all ${
                    activeThemeId === theme.id
                      ? 'border-indigo-400 ring-1 ring-indigo-400/50 bg-slate-800'
                      : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                  }`}
                >
                  <div
                    className="w-full h-3 rounded-md mb-1 shadow-inner"
                    style={{ background: theme.bgGradient || theme.bgColor }}
                  />
                  <div className="text-[10px] font-semibold text-slate-300 truncate">
                    {theme.name.split(' ')[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Description Textarea */}
        <div className="lg:col-span-7 flex flex-col">
          <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-indigo-400" />
            Product Description & Features
          </label>
          <textarea
            rows={4}
            value={productDescription}
            onChange={(e) => onChangeDescription(e.target.value)}
            placeholder="Describe your product, its standout features, target audience, technical specs, pricing, and key benefits..."
            className="w-full flex-1 px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          />

          {/* AI Synthesis Trigger */}
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={onAnalyzeProduct}
              disabled={isAnalyzing || (!productDescription && !productUrl)}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 hover:from-indigo-500 hover:to-purple-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-900/30 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Wand2 className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
              {isAnalyzing ? 'Synthesizing Ad Campaign...' : 'Synthesize Copy & Visuals with Gemini'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Live Copy Tweaker (Quick Edit Row) */}
      <div className="pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            Live Ad Copy Tuner (updates all banner sizes simultaneously)
          </span>
          <span className="text-[11px] text-slate-500">Edit fields directly to see instant changes</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {/* Brand/Product Name */}
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Brand / Product
            </label>
            <input
              type="text"
              value={content.productName}
              onChange={(e) => onUpdateContent({ productName: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Headline */}
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Headline
            </label>
            <input
              type="text"
              value={content.headline}
              onChange={(e) => onUpdateContent({ headline: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-bold focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Subhead */}
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Subhead / Value Prop
            </label>
            <input
              type="text"
              value={content.subhead}
              onChange={(e) => onUpdateContent({ subhead: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* CTA Text */}
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              CTA Button
            </label>
            <input
              type="text"
              value={content.ctaText}
              onChange={(e) => onUpdateContent({ ctaText: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-bold focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Badge & Offer */}
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Offer / Price
            </label>
            <input
              type="text"
              value={content.pricingOffer}
              onChange={(e) => onUpdateContent({ pricingOffer: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
