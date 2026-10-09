import React from 'react';
import { BannerSize, BannerContent, BannerTheme } from '../types/banner';
import { ProductArtwork } from './ProductArtwork';

interface BannerRendererProps {
  size: BannerSize;
  content: BannerContent;
  theme: BannerTheme;
  scale?: number;
  className?: string;
  id?: string;
}

export const BannerRenderer: React.FC<BannerRendererProps> = ({
  size,
  content,
  theme,
  scale = 1,
  className = '',
  id,
}) => {
  const { width, height, layoutType } = size;

  // Determine typography scale based on banner dimensions
  const isTiny = height <= 60 || width <= 180;
  const isSmall = height <= 120 && height > 60;
  const isHighRes = width >= 1000 || height >= 1000;

  // Render layouts tailored to standard advertising dimensions
  const renderLayout = () => {
    // 1. Mobile Leaderboard / Mini Strip (320x50, 320x100)
    if (layoutType === 'horizontal-strip' && isTiny) {
      return (
        <div className="w-full h-full flex items-center justify-between px-3 gap-2 overflow-hidden relative">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-9 h-9 shrink-0 flex items-center justify-center">
              <ProductArtwork
                type={content.productArtworkType}
                imageUrl={content.imageUrl}
                primaryColor={theme.accentColor}
                accentColor={theme.ctaBg}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <div
                className="font-bold text-xs leading-tight truncate"
                style={{ color: theme.textColor, fontFamily: theme.fontFamily }}
              >
                {content.headline}
              </div>
              <div
                className="text-[9px] font-medium leading-none truncate opacity-80"
                style={{ color: theme.subtextColor }}
              >
                {content.pricingOffer || content.badgeText}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="shrink-0 px-2.5 py-1 text-[10px] font-bold rounded shadow-sm whitespace-nowrap transition-transform"
            style={{
              backgroundColor: theme.ctaBg,
              color: theme.ctaText,
            }}
          >
            {content.ctaText}
          </button>
        </div>
      );
    }

    // 2. Standard Leaderboard (728x90) & Large Mobile Banner (320x100)
    if (layoutType === 'horizontal-strip' && isSmall) {
      return (
        <div className="w-full h-full flex items-center justify-between px-6 gap-4 overflow-hidden relative">
          {/* Left Brand & Headline */}
          <div className="flex flex-col justify-center min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] font-semibold tracking-wider uppercase"
                style={{ color: theme.accentColor }}
              >
                {content.productName}
              </span>
              <span
                className="text-[9px] px-1.5 py-0.5 rounded font-medium"
                style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
              >
                {content.badgeText}
              </span>
            </div>
            <h3
              className="font-extrabold text-base leading-tight truncate"
              style={{ color: theme.textColor, fontFamily: theme.fontFamily }}
            >
              {content.headline}
            </h3>
            <p
              className="text-xs truncate opacity-80 mt-0.5"
              style={{ color: theme.subtextColor }}
            >
              {content.subhead}
            </p>
          </div>

          {/* Center Product Visual */}
          <div className="w-20 h-20 shrink-0 flex items-center justify-center p-1">
            <ProductArtwork
              type={content.productArtworkType}
              imageUrl={content.imageUrl}
              primaryColor={theme.accentColor}
              accentColor={theme.ctaBg}
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </div>

          {/* Right CTA & Offer */}
          <div className="shrink-0 flex flex-col items-end justify-center pl-2">
            {content.pricingOffer && (
              <span
                className="text-[11px] font-bold mb-1"
                style={{ color: theme.accentColor }}
              >
                {content.pricingOffer}
              </span>
            )}
            <button
              type="button"
              className="px-4 py-2 text-xs font-bold rounded shadow-md whitespace-nowrap transition-transform"
              style={{
                backgroundColor: theme.ctaBg,
                color: theme.ctaText,
              }}
            >
              {content.ctaText} →
            </button>
          </div>
        </div>
      );
    }

    // 3. Desktop Billboard (970x250) & Ultrawide Masthead (1260x540)
    if (layoutType === 'horizontal-strip') {
      const isUltra = width >= 1200;
      return (
        <div className="w-full h-full flex items-center justify-between p-8 md:p-12 gap-8 overflow-hidden relative">
          {/* Ambient Lighting Orb */}
          <div
            className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: theme.accentColor }}
          />

          {/* Left Hero Content */}
          <div className="flex flex-col justify-center max-w-xl z-10 flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: theme.accentColor }}
              >
                {content.productName}
              </span>
              <span
                className="text-xs px-2.5 py-1 rounded-md font-semibold"
                style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
              >
                {content.badgeText}
              </span>
            </div>

            <h2
              className={`font-black leading-tight mb-3 ${isUltra ? 'text-4xl' : 'text-3xl'}`}
              style={{ color: theme.textColor, fontFamily: theme.fontFamily }}
            >
              {content.headline}
            </h2>

            <p
              className={`leading-relaxed mb-6 opacity-90 ${isUltra ? 'text-lg max-w-lg' : 'text-sm max-w-md'}`}
              style={{ color: theme.subtextColor }}
            >
              {content.subhead}
            </p>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className={`font-extrabold rounded-lg shadow-xl tracking-wide transition-all ${
                  isUltra ? 'px-8 py-3.5 text-base' : 'px-6 py-2.5 text-sm'
                }`}
                style={{
                  backgroundColor: theme.ctaBg,
                  color: theme.ctaText,
                }}
              >
                {content.ctaText}
              </button>
              {content.pricingOffer && (
                <span
                  className="font-bold text-sm tracking-wide"
                  style={{ color: theme.accentColor }}
                >
                  {content.pricingOffer}
                </span>
              )}
            </div>
          </div>

          {/* Right Product Showcase */}
          <div className="h-full flex-1 max-w-md flex items-center justify-center p-4 z-10">
            <ProductArtwork
              type={content.productArtworkType}
              imageUrl={content.imageUrl}
              primaryColor={theme.accentColor}
              accentColor={theme.ctaBg}
              className="w-full h-full max-h-72 object-contain filter drop-shadow-2xl"
            />
          </div>
        </div>
      );
    }

    // 4. Vertical Skyscrapers (160x600 & 300x600)
    if (layoutType === 'vertical-skyscraper') {
      const isNarrow = width <= 180;
      return (
        <div className="w-full h-full flex flex-col justify-between p-4 overflow-hidden relative text-center">
          {/* Top Brand & Badge */}
          <div className="flex flex-col items-center">
            <span
              className="text-[10px] font-bold tracking-wider uppercase mb-1.5"
              style={{ color: theme.accentColor }}
            >
              {content.productName}
            </span>
            <span
              className="text-[9px] px-2 py-0.5 rounded font-semibold mb-2"
              style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
            >
              {content.badgeText}
            </span>
            <h3
              className={`font-black leading-tight ${isNarrow ? 'text-sm mt-1' : 'text-xl mt-2'}`}
              style={{ color: theme.textColor, fontFamily: theme.fontFamily }}
            >
              {content.headline}
            </h3>
          </div>

          {/* Center Product Showcase */}
          <div className="my-auto flex items-center justify-center px-1 py-3">
            <ProductArtwork
              type={content.productArtworkType}
              imageUrl={content.imageUrl}
              primaryColor={theme.accentColor}
              accentColor={theme.ctaBg}
              className={`object-contain filter drop-shadow-xl ${isNarrow ? 'w-32 h-36' : 'w-56 h-60'}`}
            />
          </div>

          {/* Bottom Subhead & CTA */}
          <div className="flex flex-col items-center">
            {!isNarrow && (
              <p
                className="text-xs leading-normal opacity-85 mb-3 px-1"
                style={{ color: theme.subtextColor }}
              >
                {content.subhead}
              </p>
            )}

            {content.pricingOffer && (
              <span
                className="text-xs font-extrabold mb-2"
                style={{ color: theme.accentColor }}
              >
                {content.pricingOffer}
              </span>
            )}

            <button
              type="button"
              className={`w-full font-bold rounded shadow-md transition-transform ${
                isNarrow ? 'py-2 text-[11px]' : 'py-3 text-xs'
              }`}
              style={{
                backgroundColor: theme.ctaBg,
                color: theme.ctaText,
              }}
            >
              {content.ctaText}
            </button>
          </div>
        </div>
      );
    }

    // 5. Compact Box Ads (300x250, 336x280, 250x250)
    if (layoutType === 'compact-box') {
      return (
        <div className="w-full h-full flex flex-col justify-between p-4 overflow-hidden relative">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-[10px] font-bold tracking-wider uppercase truncate max-w-[150px]"
              style={{ color: theme.accentColor }}
            >
              {content.productName}
            </span>
            <span
              className="text-[9px] px-2 py-0.5 rounded font-semibold shrink-0"
              style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
            >
              {content.badgeText}
            </span>
          </div>

          {/* Middle: Headline + Product */}
          <div className="grid grid-cols-12 gap-2 items-center flex-1 my-1">
            <div className="col-span-7 flex flex-col justify-center pr-1">
              <h3
                className="font-extrabold text-sm sm:text-base leading-snug line-clamp-2"
                style={{ color: theme.textColor, fontFamily: theme.fontFamily }}
              >
                {content.headline}
              </h3>
              <p
                className="text-[11px] leading-tight opacity-80 mt-1 line-clamp-2"
                style={{ color: theme.subtextColor }}
              >
                {content.subhead}
              </p>
            </div>
            <div className="col-span-5 h-full flex items-center justify-center">
              <ProductArtwork
                type={content.productArtworkType}
                imageUrl={content.imageUrl}
                primaryColor={theme.accentColor}
                accentColor={theme.ctaBg}
                className="w-full h-28 object-contain filter drop-shadow-lg"
              />
            </div>
          </div>

          {/* Footer: Price Offer & CTA */}
          <div className="flex items-center justify-between pt-1 border-t border-white/10 mt-1">
            <div className="min-w-0 pr-2">
              <span
                className="text-xs font-bold truncate block"
                style={{ color: theme.accentColor }}
              >
                {content.pricingOffer || 'Official Store'}
              </span>
            </div>
            <button
              type="button"
              className="px-3.5 py-1.5 text-xs font-bold rounded shadow transition-transform shrink-0"
              style={{
                backgroundColor: theme.ctaBg,
                color: theme.ctaText,
              }}
            >
              {content.ctaText}
            </button>
          </div>
        </div>
      );
    }

    // 6. Social Feed Square (1080x1080)
    if (layoutType === 'hero-square') {
      return (
        <div className="w-full h-full flex flex-col justify-between p-16 overflow-hidden relative">
          {/* Ambient Lighting */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[120px] opacity-25 pointer-events-none"
            style={{ backgroundColor: theme.accentColor }}
          />

          {/* Top Brand Bar */}
          <div className="flex items-center justify-between z-10">
            <span
              className="text-2xl font-extrabold tracking-widest uppercase"
              style={{ color: theme.accentColor }}
            >
              {content.productName}
            </span>
            <span
              className="text-xl px-6 py-2.5 rounded-full font-bold shadow-lg"
              style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
            >
              {content.badgeText}
            </span>
          </div>

          {/* Center Product Hero */}
          <div className="my-auto flex flex-col items-center justify-center z-10 py-6">
            <h1
              className="text-6xl font-black text-center leading-tight mb-4 max-w-3xl"
              style={{ color: theme.textColor, fontFamily: theme.fontFamily }}
            >
              {content.headline}
            </h1>
            <p
              className="text-2xl text-center font-normal opacity-90 max-w-2xl mb-8 leading-relaxed"
              style={{ color: theme.subtextColor }}
            >
              {content.subhead}
            </p>

            <div className="w-[520px] h-[440px] flex items-center justify-center p-4">
              <ProductArtwork
                type={content.productArtworkType}
                imageUrl={content.imageUrl}
                primaryColor={theme.accentColor}
                accentColor={theme.ctaBg}
                className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>

          {/* Bottom Conversion Row */}
          <div className="flex items-center justify-between pt-6 border-t border-white/15 z-10">
            <div>
              <span
                className="text-3xl font-extrabold tracking-wide"
                style={{ color: theme.accentColor }}
              >
                {content.pricingOffer}
              </span>
            </div>
            <button
              type="button"
              className="px-12 py-5 text-2xl font-black rounded-2xl shadow-2xl tracking-wide transition-transform"
              style={{
                backgroundColor: theme.ctaBg,
                color: theme.ctaText,
              }}
            >
              {content.ctaText} →
            </button>
          </div>
        </div>
      );
    }

    // 7. Social Story & Vertical Reels (1080x1920 / 9:16)
    if (layoutType === 'story-full') {
      return (
        <div className="w-full h-full flex flex-col justify-between p-16 pb-24 overflow-hidden relative text-center">
          {/* Subtle Background Glow */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[750px] rounded-full blur-[140px] opacity-30 pointer-events-none"
            style={{ backgroundColor: theme.accentColor }}
          />

          {/* Top Brand and Tag */}
          <div className="flex flex-col items-center z-10 pt-8">
            <span
              className="text-2xl font-black tracking-widest uppercase mb-4"
              style={{ color: theme.accentColor }}
            >
              {content.productName}
            </span>
            <span
              className="text-xl px-6 py-2 rounded-full font-bold shadow-md mb-6"
              style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
            >
              {content.badgeText}
            </span>
            <h1
              className="text-6xl font-black leading-tight max-w-3xl mt-2"
              style={{ color: theme.textColor, fontFamily: theme.fontFamily }}
            >
              {content.headline}
            </h1>
          </div>

          {/* Center Giant Product Showcase */}
          <div className="my-auto flex items-center justify-center p-6 z-10">
            <div className="w-[680px] h-[680px] flex items-center justify-center">
              <ProductArtwork
                type={content.productArtworkType}
                imageUrl={content.imageUrl}
                primaryColor={theme.accentColor}
                accentColor={theme.ctaBg}
                className="w-full h-full object-contain filter drop-shadow-[0_35px_50px_rgba(0,0,0,0.7)]"
              />
            </div>
          </div>

          {/* Bottom Conversion Stack */}
          <div className="flex flex-col items-center z-10 px-8">
            <p
              className="text-3xl leading-relaxed opacity-90 max-w-2xl mb-6 font-medium"
              style={{ color: theme.subtextColor }}
            >
              {content.subhead}
            </p>

            {content.pricingOffer && (
              <span
                className="text-3xl font-extrabold mb-8 tracking-wide"
                style={{ color: theme.accentColor }}
              >
                {content.pricingOffer}
              </span>
            )}

            <button
              type="button"
              className="w-full py-6 text-3xl font-black rounded-3xl shadow-2xl tracking-wider transition-transform"
              style={{
                backgroundColor: theme.ctaBg,
                color: theme.ctaText,
              }}
            >
              {content.ctaText}
            </button>

            <span className="text-sm font-semibold opacity-60 mt-4 uppercase tracking-widest text-slate-400">
              Tap to shop now
            </span>
          </div>
        </div>
      );
    }

    // 8. Social Landscape / Card (1200x628 / 1.91:1)
    if (layoutType === 'wide-card') {
      return (
        <div className="w-full h-full flex items-center justify-between p-16 gap-12 overflow-hidden relative">
          {/* Left Text Block */}
          <div className="flex flex-col justify-center max-w-xl z-10 flex-1">
            <div className="flex items-center gap-4 mb-4">
              <span
                className="text-xl font-black tracking-widest uppercase"
                style={{ color: theme.accentColor }}
              >
                {content.productName}
              </span>
              <span
                className="text-base px-4 py-1.5 rounded-full font-bold"
                style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
              >
                {content.badgeText}
              </span>
            </div>

            <h1
              className="text-5xl font-black leading-tight mb-4"
              style={{ color: theme.textColor, fontFamily: theme.fontFamily }}
            >
              {content.headline}
            </h1>

            <p
              className="text-xl leading-relaxed opacity-90 mb-8 max-w-lg"
              style={{ color: theme.subtextColor }}
            >
              {content.subhead}
            </p>

            <div className="flex items-center gap-6">
              <button
                type="button"
                className="px-10 py-4 text-xl font-black rounded-xl shadow-2xl transition-transform"
                style={{
                  backgroundColor: theme.ctaBg,
                  color: theme.ctaText,
                }}
              >
                {content.ctaText}
              </button>
              {content.pricingOffer && (
                <span
                  className="text-2xl font-extrabold"
                  style={{ color: theme.accentColor }}
                >
                  {content.pricingOffer}
                </span>
              )}
            </div>
          </div>

          {/* Right Product Showcase */}
          <div className="flex-1 h-full max-w-lg flex items-center justify-center p-4 z-10">
            <ProductArtwork
              type={content.productArtworkType}
              imageUrl={content.imageUrl}
              primaryColor={theme.accentColor}
              accentColor={theme.ctaBg}
              className="w-full h-full object-contain filter drop-shadow-2xl"
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`relative overflow-hidden select-none shrink-0 ${className}`}
      style={{
        width: `${width * scale}px`,
        height: `${height * scale}px`,
      }}
    >
      <div
        id={id}
        className="relative overflow-hidden box-border"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          backgroundColor: theme.bgColor,
          backgroundImage: theme.bgGradient,
          border: theme.borderStyle,
        }}
      >
        {renderLayout()}
      </div>
    </div>
  );
};
