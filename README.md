# 🎨 AdCraft Studio — AI Standard Banner Ads Generator

<div align="center">

![AdCraft Studio Banner](https://img.shields.io/badge/AdCraft%20Studio-Digital%20Advertising%20Engine-6366f1?style=for-the-badge&logo=google&logoColor=white)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini 3 Pro](https://img.shields.io/badge/Gemini%203%20Pro-Image%20%26%20Flash-4285F4?style=flat-square&logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![IAB Standard](https://img.shields.io/badge/IAB-Display%20Compliant-10b981?style=flat-square)](https://www.iab.com/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square)](LICENSE)

**Instant multi-format banner campaign generation from any product description and URL.**  
Powered by Google Gemini 3 Pro, Nano Banana 2.1, and Gemini 3.8 Flash.

[Explore Standard Sizes](#-supported-standard-ad-sizes) • [Features](#-key-features) • [Quick Start](#-quick-start) • [API Reference](#-api-endpoints) • [Tech Stack](#-architecture)

</div>

---

## ⚡ What is AdCraft Studio?

**AdCraft Studio** transforms a raw product URL or description into an entire suite of **13 production-ready banner ads** compliant with IAB (Interactive Advertising Bureau) and modern social media specifications.

Rather than designing banners individually for each platform, AdCraft Studio generates:
1. **High-converting ad copy** (punchy headlines, benefit-focused subheads, urgent CTAs, trust badges, promotional tags).
2. **Synchronized visual themes** across 5 curated aesthetic systems.
3. **Studio-quality commercial imagery** with precise aspect ratio and resolution controls.
4. **Instant exports** in 2x Retina PNG format, complete campaign ZIP bundles, and clean HTML/CSS embed snippets.

---

## 📐 Supported Standard Ad Sizes

AdCraft Studio simultaneously generates and previews all standard industry formats:

| Format Name | Dimensions | Aspect Ratio | Category | Primary Placement |
| :--- | :---: | :---: | :---: | :--- |
| **Medium Rectangle** | `300 × 250 px` | `6:5` | IAB Display | In-content & top sidebar (highest global inventory) |
| **Leaderboard** | `728 × 90 px` | `8:1` | IAB Display | Desktop header banner & top of page |
| **Wide Skyscraper** | `160 × 600 px` | `1:4` | IAB Display | Webpage right/left sidebar columns |
| **Half Page / Large Skyscraper** | `300 × 600 px` | `1:2` | High Impact | Premium editorial sidebar & rich media slots |
| **Large Rectangle** | `336 × 280 px` | `6:5` | IAB Display | Embedded within editorial paragraphs |
| **Desktop Billboard** | `970 × 250 px` | `4:1` | High Impact | Premium desktop pushdown masthead |
| **Mobile Leaderboard** | `320 × 50 px` | `32:5` | Mobile | Sticky mobile phone header or footer |
| **Large Mobile Banner** | `320 × 100 px` | `16:5` | Mobile | High-CTR mobile feed breaker |
| **Square Banner** | `250 × 250 px` | `1:1` | IAB Display | Compact desktop columns & widget bars |
| **Social Feed Post** | `1080 × 1080 px` | `1:1` | Social Media | Instagram, Facebook & LinkedIn feed |
| **Story, Reel & TikTok** | `1080 × 1920 px` | `9:16` | Social Media | TikTok, Instagram Stories & YouTube Shorts |
| **Social Landscape / Link Card** | `1200 × 628 px` | `1.91:1` | Social Media | Twitter / X, Facebook Link Post & LinkedIn Ads |
| **Ultrawide Masthead** | `1260 × 540 px` | `21:9` | High Impact | Cinematic homepage hero takeover |

---

## 🎯 Key Features

### 1. Studio Generative Image Controls
- **Dual Model Engine**:
  - `gemini-3-pro-image-preview`: Studio Pro commercial photography with 8K rim lighting and pristine reflections.
  - `gemini-nano-banana-2.1`: High-speed agile generation for general advertising concepts.
- **Image Size Affordance**: Choose between **`1K`** (1024px), **`2K`** (2048px), and **`4K`** (4096px).
- **Aspect Ratio Controls**: Native support for **`1:1`**, **`2:3`**, **`3:2`**, **`3:4`**, **`4:3`**, **`9:16`**, **`16:9`**, and **`21:9`**.
- **Multi-Source Visual Pipeline**: Use AI generation, upload custom product photography, supply direct image URLs, or utilize built-in 3D vector product artwork.

### 2. Intelligent Copywriting & URL Analysis
- Powered by `gemini-3.8-flash` on the server backend.
- Extracts key selling points, target demographics, and value propositions.
- Synthesizes 3 variations of headlines, subheads, calls to action, and promotional tags.

### 3. Campaign Themes
Switch between 5 curated design identities in one click:
- 🌑 **Obsidian Minimal**: Sleek dark aesthetic with cyan highlights.
- ⚡ **Cyber Electric**: Neon purple and ultraviolet tech vibe.
- 🥂 **Champagne Editorial**: Refined luxury serif with amber warmth.
- 🌿 **Nordic Clean**: Minimalist Scandinavian slate and emerald.
- 🌅 **Sunset Coral**: Energetic athletic sports styling with coral accents.

### 4. Production & Export Tools
- **Export All as ZIP**: Bundles all 13 standard formats into a timestamped `.zip` with 2x Retina PNGs and a campaign manifest.
- **Individual 2x PNG Downloads**: One-click download with `@2x` high-DPI rasterization.
- **HTML/CSS Embed Generator**: Copy ready-to-use, self-contained CSS code for ad servers and Google Ad Manager.
- **100% Real Size Inspector**: Toggle between scaled responsive cards and true 1:1 pixel dimensions.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/MKSanalytIQ/AdCraftStudio.git
cd AdCraftStudio

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
```

Add your Gemini API key in `.env`:
```env
GEMINI_API_KEY="your_gemini_api_key_here"
```

### Running Locally

```bash
# Start full-stack server (Express + Vite)
npm run dev
```

Visit **`http://localhost:3000`** in your browser.

---

## 🛠 Architecture

```
AdCraftStudio/
├── server.ts                   # Full-stack Express server + Gemini SDK endpoints
├── index.html                  # HTML entry point with Google Fonts typography
├── src/
│   ├── main.tsx                # Client application bootstrap
│   ├── App.tsx                 # Main workspace layout & state controller
│   ├── index.css               # Tailwind CSS 4 styling & scrollbars
│   ├── types/
│   │   └── banner.ts           # Type definitions (BannerSize, BannerTheme, etc.)
│   ├── data/
│   │   ├── bannerSizes.ts      # 13 standard IAB & social media formats
│   │   ├── bannerThemes.ts     # Visual design themes & palettes
│   │   └── presetProducts.ts   # 5 real-world e-commerce test presets
│   └── components/
│       ├── BannerRenderer.tsx      # Adaptive multi-layout standard banner renderer
│       ├── BannerCard.tsx          # Card container with preview & export actions
│       ├── BannerEditorModal.tsx   # Format fine-tuner & zoom inspector
│       ├── EmbedCodeModal.tsx      # Copy-paste HTML/CSS embed snippet dialog
│       ├── ImageControlsBar.tsx    # Model selector (Gemini 3 Pro / Nano Banana), 1K/2K/4K, aspect ratios
│       ├── ProductArtwork.tsx      # Scalable 3D vector illustration & fallback renderer
│       └── ProductInputSection.tsx # Copywriting synthesis & presets tuner
```

---

## 🔌 API Endpoints

<details>
<summary><b>POST /api/analyze-product</b> — Synthesize copy from description & URL</summary>

**Request Body:**
```json
{
  "productDescription": "Wireless noise-cancelling headphones with 45h battery life",
  "productUrl": "https://aurasound.audio/products/pro-anc"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "productName": "AuraSound Pro ANC",
    "category": "Premium Audio",
    "headlines": ["Immerse in Pure Silence", "Unrivaled Audio Clarity"],
    "subheads": ["Studio acoustic precision with 48dB active noise cancellation."],
    "ctaTexts": ["Shop AuraSound Pro", "Claim 20% Off"],
    "badges": ["Rated 4.9/5 by SoundLab"],
    "pricingOffer": "Save $70 · Free Express Delivery",
    "recommendedTheme": "minimal-dark",
    "visualPrompt": "Matte obsidian over-ear headphones on acrylic pedestal..."
  }
}
```
</details>

<details>
<summary><b>POST /api/generate-image</b> — Studio image generation</summary>

**Request Body:**
```json
{
  "prompt": "Matte obsidian over-ear headphones with champagne metallic ring",
  "model": "gemini-3-pro-image-preview",
  "aspectRatio": "1:1",
  "imageSize": "2K"
}
```

**Response:**
```json
{
  "success": true,
  "imageUrl": "data:image/png;base64,...",
  "model": "gemini-3-pro-image-preview",
  "aspectRatio": "1:1",
  "imageSize": "2K"
}
```
</details>

---

## 📦 Export Capabilities

<details>
<summary><b>Interactive Embed Code Example</b></summary>

Every generated banner size can be exported directly as self-contained HTML/CSS:

```html
<div class="adcraft-banner-ad-medium-rectangle" style="
  width: 300px;
  height: 250px;
  background: linear-gradient(135deg, #090d16 0%, #111827 50%, #1e1b4b 100%);
  color: #ffffff;
  display: flex;
  overflow: hidden;
  border-radius: 8px;
">
  <!-- Content Container -->
  <div style="padding: 16px; width: 100%; display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      <span style="font-size: 10px; font-weight: 700; color: #38bdf8; text-transform: uppercase;">AuraSound Pro</span>
      <h3 style="font-size: 16px; font-weight: 800; margin: 4px 0; color: #ffffff;">Immerse in Pure Silence</h3>
      <p style="font-size: 12px; color: #94a3b8; margin: 0;">Studio acoustic precision with 48dB active noise cancellation.</p>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <span style="font-size: 12px; font-weight: 700; color: #38bdf8;">Save $70 Today</span>
      <a href="https://aurasound.audio" target="_blank" style="background: #38bdf8; color: #0f172a; padding: 6px 14px; font-size: 12px; font-weight: 700; border-radius: 6px; text-decoration: none;">Shop Now &rarr;</a>
    </div>
  </div>
</div>
```
</details>

---

## 📄 License

This project is licensed under the Apache 2.0 License — see the [LICENSE](LICENSE) file for details.
