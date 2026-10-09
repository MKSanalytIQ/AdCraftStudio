export type BannerCategory = 'iab' | 'social' | 'mobile' | 'high-impact';

export interface BannerSize {
  id: string;
  name: string;
  width: number;
  height: number;
  category: BannerCategory;
  aspectRatio: string;
  recommendedImageRatio: '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '9:16' | '16:9' | '21:9';
  placement: string;
  layoutType: 'horizontal-strip' | 'vertical-skyscraper' | 'compact-box' | 'hero-square' | 'story-full' | 'wide-card';
}

export interface BannerTheme {
  id: string;
  name: string;
  bgColor: string;
  bgGradient?: string;
  textColor: string;
  subtextColor: string;
  accentColor: string;
  ctaBg: string;
  ctaText: string;
  badgeBg: string;
  badgeText: string;
  fontFamily: string; // 'sans' | 'display' | 'serif' | 'mono'
  borderStyle: string;
}

export interface BannerContent {
  productName: string;
  category: string;
  headline: string;
  subhead: string;
  ctaText: string;
  badgeText: string;
  pricingOffer: string;
  imageUrl?: string;
  productArtworkType?: 'headphones' | 'smartwatch' | 'skincare' | 'sneakers' | 'chair' | 'custom';
  productUrl?: string;
}

export type ImageModelChoice = 'gemini-3-pro-image-preview' | 'gemini-nano-banana-2.1';
export type ImageSizeChoice = '1K' | '2K' | '4K';
export type AspectRatioChoice = '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '9:16' | '16:9' | '21:9';

export interface ImageGenSettings {
  model: ImageModelChoice;
  imageSize: ImageSizeChoice;
  aspectRatio: AspectRatioChoice;
  customPrompt: string;
  isGenerating: boolean;
}

export interface PresetProduct {
  id: string;
  name: string;
  category: string;
  url: string;
  description: string;
  defaultHeadline: string;
  defaultSubhead: string;
  defaultCta: string;
  defaultBadge: string;
  defaultOffer: string;
  productArtworkType: 'headphones' | 'smartwatch' | 'skincare' | 'sneakers' | 'chair';
  themeId: string;
  visualPrompt: string;
  colors: {
    primary: string;
    accent: string;
    background: string;
    text: string;
  };
}
