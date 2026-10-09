import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '15mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Analyze product description & URL to produce high-converting ad copy and specs
app.post('/api/analyze-product', async (req, res) => {
  try {
    const { productDescription, productUrl } = req.body;

    if (!productDescription && !productUrl) {
      return res.status(400).json({ error: 'Please provide a product description or URL.' });
    }

    const systemPrompt = `You are a world-class advertising creative director and conversion rate optimization (CRO) expert.
Analyze the provided product description and/or URL. Generate high-converting ad copy variations, value propositions, marketing angles, color schemes, and an optimized image generation prompt for digital banner ads.

Return a valid JSON object matching the requested schema.`;

    const userPrompt = `Product Description: "${productDescription || 'N/A'}"
Product URL: "${productUrl || 'N/A'}"

Create a compelling banner ad campaign package.
Requirements:
1. Short, punchy headline (max 5-7 words) that commands attention.
2. Clear value proposition subhead (10-15 words max).
3. Action-oriented CTA (e.g. "Shop Now", "Get 25% Off", "Start Free Trial").
4. Trust badge or social proof (e.g. "Over 50,000 Sold", "Free 2-Day Shipping", "Rated 4.9/5").
5. Pricing or promotional offer (e.g. "Save $50 Today", "From $29/mo", "Limited Edition").
6. Beautiful matching color palette (HEX codes for primary, accent, dark background, light text).
7. A descriptive visual prompt for generating studio-quality commercial product images with lighting, reflections, pedestal, and clean background.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productName: { type: Type.STRING },
            category: { type: Type.STRING },
            targetAudience: { type: Type.STRING },
            keySellingPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            headlines: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 headline variations: Punchy, Benefit-driven, Urgency',
            },
            subheads: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 subhead variations',
            },
            ctaTexts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 call-to-action button variations',
            },
            badges: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 trust badges or value tags',
            },
            pricingOffer: { type: Type.STRING },
            recommendedTheme: {
              type: Type.STRING,
              description: 'one of: minimal-dark, vibrant-tech, editorial-luxury, clean-modern, sunset-warm',
            },
            colors: {
              type: Type.OBJECT,
              properties: {
                primary: { type: Type.STRING },
                accent: { type: Type.STRING },
                background: { type: Type.STRING },
                text: { type: Type.STRING },
              },
              required: ['primary', 'accent', 'background', 'text'],
            },
            visualPrompt: {
              type: Type.STRING,
              description: 'Studio product photography prompt for Gemini image models',
            },
          },
          required: [
            'productName',
            'category',
            'headlines',
            'subheads',
            'ctaTexts',
            'badges',
            'pricingOffer',
            'recommendedTheme',
            'colors',
            'visualPrompt',
          ],
        },
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error analyzing product:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to analyze product. Please try again.',
    });
  }
});

// Generate studio product image using gemini-3-pro-image-preview or gemini-nano-banana-2.1
app.post('/api/generate-image', async (req, res) => {
  try {
    const {
      prompt,
      model = 'gemini-3-pro-image-preview',
      aspectRatio = '1:1',
      imageSize = '1K',
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required for image generation.' });
    }

    // Supported models per requirements:
    // gemini-3-pro-image-preview (studio quality) or gemini-nano-banana-2.1 (standard)
    const validModel =
      model === 'gemini-nano-banana-2.1'
        ? 'gemini-nano-banana-2.1'
        : 'gemini-3-pro-image-preview';

    // Supported aspect ratios per requirements:
    // 1:1, 2:3, 3:2, 3:4, 4:3, 9:16, 16:9, 21:9
    const validRatios = ['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'];
    const chosenAspectRatio = validRatios.includes(aspectRatio) ? aspectRatio : '1:1';

    // Supported sizes: 1K, 2K, 4K
    const validSizes = ['1K', '2K', '4K'];
    const chosenSize = validSizes.includes(imageSize) ? imageSize : '1K';

    const enhancedPrompt = `Studio commercial product photography, advertisement quality. ${prompt}. Professional studio rim lighting, pristine reflections, ultra-sharp focus, isolated commercial backdrop, 8K hyper-detailed.`;

    const config: any = {
      imageConfig: {
        aspectRatio: chosenAspectRatio,
      },
    };

    // Both gemini-3-pro-image-preview and gemini-nano-banana-2.1 support imageSize (1K, 2K, 4K)
    config.imageConfig.imageSize = chosenSize;

    console.log(`Calling ${validModel} with aspect ratio ${chosenAspectRatio} and size ${chosenSize}...`);

    const response = await ai.models.generateContent({
      model: validModel,
      contents: {
        parts: [
          {
            text: enhancedPrompt,
          },
        ],
      },
      config,
    });

    let imageUrl: string | null = null;
    let descriptionText: string | null = null;

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType || 'image/png';
          imageUrl = `data:${mime};base64,${part.inlineData.data}`;
        } else if (part.text) {
          descriptionText = part.text;
        }
      }
    }

    if (!imageUrl) {
      return res.status(502).json({
        error: 'No image data returned from model.',
        textOutput: descriptionText,
      });
    }

    return res.json({
      success: true,
      imageUrl,
      model: validModel,
      aspectRatio: chosenAspectRatio,
      imageSize: chosenSize,
    });
  } catch (error: any) {
    console.error('Error generating image:', error);
    const msg = error?.message || '';
    const isQuotaError =
      msg.includes('RESOURCE_EXHAUSTED') ||
      msg.includes('quota') ||
      msg.includes('429') ||
      error?.status === 429;

    return res.status(isQuotaError ? 429 : 500).json({
      error: msg || 'Image generation failed.',
      isQuotaError,
      details: 'A paid Gemini API key is required for raw image model inference. High-fidelity generative canvas product styling is active.',
    });
  }
});

const PORT = 3000;

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
