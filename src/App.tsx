import React, { useState } from 'react';
import {
  BannerSize,
  BannerContent,
  BannerTheme,
  BannerCategory,
  ImageGenSettings,
  PresetProduct,
} from './types/banner';
import { STANDARD_BANNER_SIZES } from './data/bannerSizes';
import { BANNER_THEMES } from './data/bannerThemes';
import { PRESET_PRODUCTS } from './data/presetProducts';
import { ProductInputSection } from './components/ProductInputSection';
import { ImageControlsBar } from './components/ImageControlsBar';
import { BannerCard } from './components/BannerCard';
import { BannerEditorModal } from './components/BannerEditorModal';
import { EmbedCodeModal } from './components/EmbedCodeModal';
import { BannerRenderer } from './components/BannerRenderer';
import {
  Download,
  LayoutGrid,
  Maximize2,
  Sparkles,
  Layers,
  CheckCircle2,
  PackageCheck,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import JSZip from 'jszip';
import * as htmlToImage from 'html-to-image';

export default function App() {
  // Initial default state with AuraSound headphones preset
  const defaultPreset = PRESET_PRODUCTS[0];

  const [productDescription, setProductDescription] = useState(defaultPreset.description);
  const [productUrl, setProductUrl] = useState(defaultPreset.url);

  const [content, setContent] = useState<BannerContent>({
    productName: defaultPreset.name,
    category: defaultPreset.category,
    headline: defaultPreset.defaultHeadline,
    subhead: defaultPreset.defaultSubhead,
    ctaText: defaultPreset.defaultCta,
    badgeText: defaultPreset.defaultBadge,
    pricingOffer: defaultPreset.defaultOffer,
    productArtworkType: defaultPreset.productArtworkType,
    productUrl: defaultPreset.url,
  });

  const [activeThemeId, setActiveThemeId] = useState<string>(defaultPreset.themeId);
  const activeTheme: BannerTheme = BANNER_THEMES[activeThemeId] || BANNER_THEMES['minimal-dark'];

  // Image Generation settings
  const [imageSettings, setImageSettings] = useState<ImageGenSettings>({
    model: 'gemini-3-pro-image-preview',
    imageSize: '1K',
    aspectRatio: '1:1',
    customPrompt: defaultPreset.visualPrompt,
    isGenerating: false,
  });

  const [generationError, setGenerationError] = useState<string | null>(null);

  // Filter & Layout view mode
  const [selectedCategory, setSelectedCategory] = useState<BannerCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'actual'>('grid');

  // Modals state
  const [editingBanner, setEditingBanner] = useState<BannerSize | null>(null);
  const [embedBanner, setEmbedBanner] = useState<BannerSize | null>(null);

  // Loading states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExportingAll, setIsExportingAll] = useState(false);
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);

  // Apply a preset
  const handleApplyPreset = (preset: PresetProduct) => {
    setProductDescription(preset.description);
    setProductUrl(preset.url);
    setContent({
      productName: preset.name,
      category: preset.category,
      headline: preset.defaultHeadline,
      subhead: preset.defaultSubhead,
      ctaText: preset.defaultCta,
      badgeText: preset.defaultBadge,
      pricingOffer: preset.defaultOffer,
      productArtworkType: preset.productArtworkType,
      productUrl: preset.url,
      imageUrl: undefined,
    });
    setActiveThemeId(preset.themeId);
    setImageSettings((prev) => ({
      ...prev,
      customPrompt: preset.visualPrompt,
    }));
    setGenerationError(null);
  };

  // Analyze product description & URL using server-side Gemini 3.8 Flash
  const handleAnalyzeProduct = async () => {
    try {
      setIsAnalyzing(true);
      const res = await fetch('/api/analyze-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productDescription, productUrl }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        const d = data.data;
        setContent((prev) => ({
          ...prev,
          productName: d.productName || prev.productName,
          category: d.category || prev.category,
          headline: d.headlines?.[0] || prev.headline,
          subhead: d.subheads?.[0] || prev.subhead,
          ctaText: d.ctaTexts?.[0] || prev.ctaText,
          badgeText: d.badges?.[0] || prev.badgeText,
          pricingOffer: d.pricingOffer || prev.pricingOffer,
          productUrl: productUrl || prev.productUrl,
        }));

        if (d.visualPrompt) {
          setImageSettings((prev) => ({
            ...prev,
            customPrompt: d.visualPrompt,
          }));
        }

        if (d.recommendedTheme && BANNER_THEMES[d.recommendedTheme]) {
          setActiveThemeId(d.recommendedTheme);
        }
      }
    } catch (err: any) {
      console.error('Error analyzing product:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Generate image using server-side Gemini 3 Pro / Nano Banana
  const handleGenerateImage = async () => {
    try {
      setImageSettings((prev) => ({ ...prev, isGenerating: true }));
      setGenerationError(null);

      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: imageSettings.customPrompt,
          model: imageSettings.model,
          aspectRatio: imageSettings.aspectRatio,
          imageSize: imageSettings.imageSize,
        }),
      });

      const data = await res.json();

      if (data.success && data.imageUrl) {
        setContent((prev) => ({
          ...prev,
          imageUrl: data.imageUrl,
        }));
      } else {
        setGenerationError(data.error || 'Image generation quota reached. Using studio vector artwork fallback.');
      }
    } catch (err: any) {
      console.error('Failed to generate image:', err);
      setGenerationError(err.message || 'Image generation error');
    } finally {
      setImageSettings((prev) => ({ ...prev, isGenerating: false }));
    }
  };

  // Batch download all standard banner sizes as a ZIP archive
  const handleExportAllZip = async () => {
    try {
      setIsExportingAll(true);
      const zip = new JSZip();
      const folder = zip.folder('adcraft_standard_banner_ads');

      for (const size of STANDARD_BANNER_SIZES) {
        const el = document.getElementById(`banner-export-${size.id}`);
        if (el) {
          try {
            const dataUrl = await htmlToImage.toPng(el, {
              pixelRatio: 2,
              cacheBust: true,
            });
            const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
            folder?.file(
              `banner_${size.width}x${size.height}_${size.id}.png`,
              base64Data,
              { base64: true }
            );
          } catch (e) {
            console.error(`Error exporting banner ${size.id}:`, e);
          }
        }
      }

      // Add a manifest text file
      folder?.file(
        'campaign_manifest.txt',
        `AdCraft Studio Campaign Export
Product: ${content.productName}
Headline: ${content.headline}
CTA: ${content.ctaText}
Offer: ${content.pricingOffer}
Formats generated: ${STANDARD_BANNER_SIZES.length} standard sizes
Export Date: ${new Date().toISOString()}
`
      );

      const contentBlob = await zip.generateAsync({ type: 'blob' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(contentBlob);
      downloadLink.download = `${content.productName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_banners_all_sizes.zip`;
      downloadLink.click();

      setExportSuccessMessage(`Downloaded all ${STANDARD_BANNER_SIZES.length} standard banner ad sizes!`);
      setTimeout(() => setExportSuccessMessage(null), 4000);
    } catch (err) {
      console.error('Failed to export zip:', err);
    } finally {
      setIsExportingAll(false);
    }
  };

  // Filter banner sizes
  const filteredSizes =
    selectedCategory === 'all'
      ? STANDARD_BANNER_SIZES
      : STANDARD_BANNER_SIZES.filter((s) => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold tracking-tight text-white">
                AdCraft Studio
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                All Standard Sizes
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              AI Banner Ads Generator · IAB Standards & Social Media Specifications
            </p>
          </div>
        </div>

        {/* Global Batch Action */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportAllZip}
            disabled={isExportingAll}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-900/30 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isExportingAll ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Bundling {STANDARD_BANNER_SIZES.length} Banners...
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                Export Full Ad Pack (ZIP)
              </>
            )}
          </button>
        </div>
      </header>

      {/* Success Notification Toast */}
      {exportSuccessMessage && (
        <div className="fixed top-18 right-8 z-50 p-4 bg-emerald-950/90 border border-emerald-500/40 text-emerald-200 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in backdrop-blur-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{exportSuccessMessage}</span>
        </div>
      )}

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 space-y-6">
        {/* Value Proposition Highlights Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="px-4 py-3 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">13 Standard Ad Formats</div>
              <div className="text-[11px] text-slate-400">IAB medium rect, leaderboards, skyscrapers & reels</div>
            </div>
          </div>

          <div className="px-4 py-3 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Gemini 3 Pro & Nano Banana Controls</div>
              <div className="text-[11px] text-slate-400">1K/2K/4K resolutions & 8 aspect ratio choices</div>
            </div>
          </div>

          <div className="px-4 py-3 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <PackageCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Production Ready Output</div>
              <div className="text-[11px] text-slate-400">2x Retina PNG download & clean HTML/CSS embed</div>
            </div>
          </div>
        </div>

        {/* Product & Copy Input Controls */}
        <ProductInputSection
          productDescription={productDescription}
          onChangeDescription={setProductDescription}
          productUrl={productUrl}
          onChangeUrl={setProductUrl}
          content={content}
          onUpdateContent={(updated) => setContent((prev) => ({ ...prev, ...updated }))}
          activeThemeId={activeThemeId}
          onChangeTheme={setActiveThemeId}
          onApplyPreset={handleApplyPreset}
          onAnalyzeProduct={handleAnalyzeProduct}
          isAnalyzing={isAnalyzing}
        />

        {/* Gemini Visual & Image Generation Controls Bar */}
        <ImageControlsBar
          settings={imageSettings}
          onUpdateSettings={(newSettings) =>
            setImageSettings((prev) => ({ ...prev, ...newSettings }))
          }
          onGenerateImage={handleGenerateImage}
          onCustomImageUploaded={(url) =>
            setContent((prev) => ({ ...prev, imageUrl: url }))
          }
          currentImageUrl={content.imageUrl}
          onResetArtwork={() => setContent((prev) => ({ ...prev, imageUrl: undefined }))}
          generationError={generationError}
        />

        {/* Banner Gallery Controls Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 pb-2 border-b border-slate-800">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Standard Sizes ({STANDARD_BANNER_SIZES.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('iab')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === 'iab'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              IAB Display ({STANDARD_BANNER_SIZES.filter((s) => s.category === 'iab').length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('social')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === 'social'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Social Media ({STANDARD_BANNER_SIZES.filter((s) => s.category === 'social').length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('high-impact')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === 'high-impact'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              High-Impact Mastheads ({STANDARD_BANNER_SIZES.filter((s) => s.category === 'high-impact').length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('mobile')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === 'mobile'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Mobile ({STANDARD_BANNER_SIZES.filter((s) => s.category === 'mobile').length})
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Responsive Cards
            </button>
            <button
              type="button"
              onClick={() => setViewMode('actual')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'actual'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              100% Real Size
            </button>
          </div>
        </div>

        {/* View Mode 1: Responsive Grid Cards */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSizes.map((size) => (
              <BannerCard
                key={size.id}
                size={size}
                content={content}
                theme={activeTheme}
                onOpenEditModal={(s) => setEditingBanner(s)}
                onOpenEmbedModal={(s) => setEmbedBanner(s)}
              />
            ))}
          </div>
        )}

        {/* View Mode 2: 100% Actual Scale Showcase */}
        {viewMode === 'actual' && (
          <div className="space-y-8">
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl text-xs text-slate-400">
              Viewing banners at exact 1:1 pixel dimensions as specified by IAB standards and social networks.
            </div>

            {filteredSizes.map((size) => (
              <div
                key={size.id}
                className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{size.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      {size.width} × {size.height} px
                    </span>
                    <span className="text-xs text-slate-500">({size.placement})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingBanner(size)}
                      className="px-3 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
                    >
                      Fine-Tune Format
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmbedBanner(size)}
                      className="px-3 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
                    >
                      Embed Snippet
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto p-4 bg-slate-950/80 rounded-xl flex items-center justify-center">
                  <BannerRenderer
                    id={`banner-export-${size.id}`}
                    size={size}
                    content={content}
                    theme={activeTheme}
                    scale={1}
                    className="shadow-2xl"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Fine-Tune Format Inspector Modal */}
      <BannerEditorModal
        size={editingBanner}
        onClose={() => setEditingBanner(null)}
        content={content}
        theme={activeTheme}
        onUpdateContent={(updated) => setContent((prev) => ({ ...prev, ...updated }))}
      />

      {/* Embed Code Modal */}
      <EmbedCodeModal
        size={embedBanner}
        onClose={() => setEmbedBanner(null)}
        content={content}
        theme={activeTheme}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/80 px-4 sm:px-8 py-5 text-center text-xs text-slate-500">
        AdCraft Studio · Generates high-converting commercial banners across all standard sizes with Gemini 3 Pro and Nano Banana image controls.
      </footer>
    </div>
  );
}
