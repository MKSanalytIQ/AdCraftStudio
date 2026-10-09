import React, { useState } from 'react';
import {
  ImageModelChoice,
  ImageSizeChoice,
  AspectRatioChoice,
  ImageGenSettings,
} from '../types/banner';
import {
  Sparkles,
  Layers,
  Maximize2,
  Upload,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  Camera,
  RefreshCw,
} from 'lucide-react';

interface ImageControlsBarProps {
  settings: ImageGenSettings;
  onUpdateSettings: (settings: Partial<ImageGenSettings>) => void;
  onGenerateImage: () => Promise<void>;
  onCustomImageUploaded: (url: string) => void;
  currentImageUrl?: string;
  onResetArtwork: () => void;
  generationError?: string | null;
  isFallbackMode?: boolean;
}

export const ImageControlsBar: React.FC<ImageControlsBarProps> = ({
  settings,
  onUpdateSettings,
  onGenerateImage,
  onCustomImageUploaded,
  currentImageUrl,
  onResetArtwork,
  generationError,
  isFallbackMode,
}) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'upload' | 'url'>('ai');
  const [urlInput, setUrlInput] = useState('');

  const aspectRatios: { value: AspectRatioChoice; label: string; desc: string }[] = [
    { value: '1:1', label: '1:1', desc: 'Square Feed / Box' },
    { value: '4:3', label: '4:3', desc: 'Standard Card' },
    { value: '3:4', label: '3:4', desc: 'Vertical Portrait' },
    { value: '16:9', label: '16:9', desc: 'Landscape / Video' },
    { value: '9:16', label: '9:16', desc: 'Story & Reels' },
    { value: '2:3', label: '2:3', desc: 'Tall Skyscraper' },
    { value: '3:2', label: '3:2', desc: 'Wide Banner' },
    { value: '21:9', label: '21:9', desc: 'Ultrawide Masthead' },
  ];

  const imageSizes: { value: ImageSizeChoice; label: string; badge: string }[] = [
    { value: '1K', label: '1K', badge: '1024px' },
    { value: '2K', label: '2K', badge: '2048px' },
    { value: '4K', label: '4K', badge: '4096px Ultra' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onCustomImageUploaded(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onCustomImageUploaded(urlInput.trim());
      setUrlInput('');
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md">
      {/* Header and Source Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Product Visual & Studio Asset Controls
              {currentImageUrl ? (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Custom Visual Active
                </span>
              ) : (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  Vector 3D Art Active
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400">
              Configure generative model, resolution, aspect ratio, or upload product photos
            </p>
          </div>
        </div>

        {/* Source Mode Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'ai'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Gemini Image Generator
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'url'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            Image URL
          </button>
        </div>
      </div>

      {/* Tab: Gemini AI Image Controls */}
      {activeTab === 'ai' && (
        <div className="pt-4 space-y-4">
          {/* Model & Size Affordances */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Model Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Image Model
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSettings({ model: 'gemini-3-pro-image-preview' })
                  }
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    settings.model === 'gemini-3-pro-image-preview'
                      ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200 ring-1 ring-indigo-500/50'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    gemini-3-pro-image-preview
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                      Studio Pro
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Studio advertising, 8K commercial lighting & reflections
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onUpdateSettings({ model: 'gemini-nano-banana-2.1' })
                  }
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    settings.model === 'gemini-nano-banana-2.1'
                      ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200 ring-1 ring-indigo-500/50'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    gemini-nano-banana-2.1
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                      Standard
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    General cases, versatile prompt composition & speed
                  </div>
                </button>
              </div>
            </div>

            {/* Image Size Affordance (1K, 2K, 4K) */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
                Image Resolution (Size Affordance)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {imageSizes.map((size) => (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() => onUpdateSettings({ imageSize: size.value })}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      settings.imageSize === size.value
                        ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold ring-1 ring-indigo-500/50'
                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-sm font-extrabold">{size.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{size.badge}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Aspect Ratio Control (1:1, 2:3, 3:2, 3:4, 4:3, 9:16, 16:9, 21:9) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Target Aspect Ratio Affordance
              </label>
              <span className="text-[11px] text-slate-400">
                Selected:{' '}
                <strong className="text-indigo-400 font-bold">{settings.aspectRatio}</strong>
              </span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {aspectRatios.map((ar) => (
                <button
                  key={ar.value}
                  type="button"
                  onClick={() => onUpdateSettings({ aspectRatio: ar.value })}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    settings.aspectRatio === ar.value
                      ? 'bg-indigo-600 text-white font-bold border-indigo-400 shadow-md'
                      : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                  title={ar.desc}
                >
                  <div className="text-xs font-bold">{ar.label}</div>
                  <div className="text-[9px] opacity-75 truncate">{ar.desc.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt input and generation trigger */}
          <div className="pt-2">
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              Studio Photography Prompt & Art Direction
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={settings.customPrompt}
                onChange={(e) => onUpdateSettings({ customPrompt: e.target.value })}
                placeholder="e.g. Sleek titanium sports smartwatch on glowing dark pedestal, dramatic rim lighting..."
                className="flex-1 px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={onGenerateImage}
                disabled={settings.isGenerating}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
              >
                {settings.isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Generating {settings.imageSize} Image...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Generate with {settings.model === 'gemini-3-pro-image-preview' ? 'Gemini 3 Pro' : 'Nano Banana'}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quota / Informative Notice */}
          {generationError && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-300">
                  {generationError.includes('quota') || generationError.includes('RESOURCE_EXHAUSTED')
                    ? 'Gemini Image Generation Quota Notice'
                    : 'Notice'}
                </p>
                <p className="text-[11px] text-amber-200/90 mt-0.5">
                  Raw inference with {settings.model} requires an active paid API key quota.
                  The app is using <strong>high-definition 3D studio artwork</strong> across all banner sizes.
                  You can also upload any custom product photo or provide an image URL.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: File Upload */}
      {activeTab === 'upload' && (
        <div className="pt-4">
          <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 text-center transition-all bg-slate-950/40">
            <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-200">
              Upload Your Product Photo or Brand Logo
            </p>
            <p className="text-[11px] text-slate-400 mt-1 mb-4">
              PNG, JPG, or WebP. Transparent backgrounds look stunning in all banner themes.
            </p>
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl cursor-pointer shadow-md transition-all">
              <Upload className="w-3.5 h-3.5" />
              Choose Image File
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}

      {/* Tab: Image URL */}
      {activeTab === 'url' && (
        <form onSubmit={handleUrlSubmit} className="pt-4 space-y-3">
          <label className="text-xs font-semibold text-slate-300 block">
            Direct Image URL (CDN, e-commerce CDN, or Unsplash)
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/images/product-transparent.png"
              className="flex-1 px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              Apply Visual
            </button>
          </div>
        </form>
      )}

      {/* Quick Reset Button if custom image is active */}
      {currentImageUrl && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex justify-end">
          <button
            type="button"
            onClick={onResetArtwork}
            className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Reset to Studio 3D Vector Visual
          </button>
        </div>
      )}
    </div>
  );
};
