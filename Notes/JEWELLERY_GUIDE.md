# 🎨 3D Jewellery Virtual Try-On - Complete Implementation Guide

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Asset Preparation](#asset-preparation)
3. [Customization Guide](#customization-guide)
4. [AR Integration](#ar-integration)
5. [E-commerce Integration](#e-commerce-integration)
6. [Performance Optimization](#performance-optimization)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## 🏗️ Architecture Overview

### System Components

```
3D-Jewellery-Website/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── jewellery/
│   │   │   └── page.tsx          # Main 3D showroom
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   └── JewelleryAssetLoader.tsx  # Asset loading utilities
│   └── data/
│       └── productExamples.ts    # Product catalog
├── public/
│   └── models/                   # 3D assets
│       ├── ring/                 # Ring models
│       ├── hand/                 # Hand models
│       └── jewellery/            # Jewellery assets
└── package.json
```

### Technology Stack

- **Framework**: Next.js 14 (React 18)
- **3D Engine**: Babylon.js 8.41
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 3.4
- **3D Models**: glTF 2.0 / GLB

### Key Concepts

#### 1. Anchor System

Anchors are invisible transform nodes that define attachment points for jewellery:

```typescript
// Create an anchor
const anchor = new TransformNode("anchor_ring_middle", scene);
anchor.position = new Vector3(0, 0.25, 0.1);

// Attach jewellery to anchor
ring.parent = anchor;
ring.position = Vector3.Zero(); // Relative to anchor
```

**Benefits:**

- Precise positioning
- Automatic parent-child transforms
- Easy to manage multiple items
- Supports complex hierarchies

#### 2. PBR Materials

Physically Based Rendering for realistic metals:

```typescript
const material = new PBRMetallicRoughnessMaterial("gold", scene);
material.baseColor = new Color3(1, 0.84, 0);
material.metallic = 1.0;
material.roughness = 0.2;
material.environmentIntensity = 1.5;
```

**Parameters:**

- `metallic`: 0 (non-metal) to 1 (full metal)
- `roughness`: 0 (mirror) to 1 (matte)
- `environmentIntensity`: Reflection strength

#### 3. View Modes

Switch between different body parts:

```typescript
type ViewMode = "hand" | "neck" | "ear";

// Change view and model
const switchView = (mode: ViewMode) => {
  // Clear current model
  // Create new model (hand/neck/ear)
  // Reposition camera
};
```

---

## 🎨 Asset Preparation

### Creating 3D Models in Blender

See [BLENDER_EXPORT_GUIDE.md](BLENDER_EXPORT_GUIDE.md) for detailed instructions.

**Quick steps:**

1. **Model the jewellery**
   - Use appropriate scale (1 unit = 1 meter)
   - Ring: ~18-20mm diameter
   - Necklace: ~40-60cm length
   - Keep polygon count reasonable (< 10k triangles)

2. **Apply PBR materials**
   - Base Color map
   - Metallic map
   - Roughness map
   - Normal map (optional)

3. **Export as glTF 2.0**
   - Format: GLB (binary)
   - Include: Materials, Textures
   - Compression: DRACO (optional)

4. **Optimize**
   - Resize textures (1024x1024 or 2048x2048)
   - Compress with DRACO
   - Remove unnecessary data

### File Organization

```
public/models/jewellery/
├── rings/
│   ├── gold-band.glb
│   ├── diamond-solitaire.glb
│   └── engagement-ring.glb
├── necklaces/
│   ├── chain-necklace.glb
│   └── pendant-necklace.glb
└── bracelets/
    └── tennis-bracelet.glb
```

### Asset Specifications

| Type     | Poly Count | Texture Size | File Size |
| -------- | ---------- | ------------ | --------- |
| Ring     | 2k-5k      | 1024x1024    | < 500KB   |
| Necklace | 5k-15k     | 2048x2048    | < 1MB     |
| Bracelet | 3k-8k      | 1024x1024    | < 700KB   |

---

## 🎛️ Customization Guide

### Adding New Products

1. **Add to product catalog** (`src/data/productExamples.ts`):

```typescript
const newProduct: Product = {
  id: "ring-002",
  name: "Sapphire Ring",
  type: "ring",
  price: 799,
  material: "white-gold",
  assetPath: "/models/jewellery/rings/sapphire.glb",
  anchorPoint: "anchor_ring_middle",
  thumbnail: "/images/products/sapphire-thumb.jpg",
  // ...
};
```

2. **Add the 3D model** to `public/models/jewellery/rings/`

3. **Update product list** in the component

### Adding New Anchors

```typescript
// In createHandModel or createNeckModel
const newAnchor = new TransformNode("anchor_bracelet_upper", scene);
newAnchor.position = new Vector3(0, 0.3, -0.4);
```

### Customizing Materials

```typescript
// Gold variants
const materials = {
  yellowGold: new Color3(1, 0.84, 0),
  whiteGold: new Color3(0.85, 0.85, 0.88),
  roseGold: new Color3(0.96, 0.76, 0.69),
  platinum: new Color3(0.75, 0.75, 0.78),
};

// Apply with different roughness for finish
material.roughness = 0.15; // High polish
material.roughness = 0.3; // Satin finish
material.roughness = 0.5; // Brushed finish
```

### Adding Gemstones

```typescript
// Create diamond material
const diamondMat = new PBRMetallicRoughnessMaterial("diamond", scene);
diamondMat.baseColor = new Color3(1, 1, 1);
diamondMat.metallic = 0;
diamondMat.roughness = 0;
diamondMat.indexOfRefraction = 2.42; // Diamond IOR
diamondMat.alpha = 0.95;
diamondMat.refractionTexture = scene.environmentTexture;
```

### Camera Presets

```typescript
// Close-up view
camera.setPosition(new Vector3(0, 0.2, 1.5));
camera.setTarget(Vector3.Zero());

// Wide view
camera.setPosition(new Vector3(0, 1, 5));
camera.setTarget(new Vector3(0, 0, 0));

// Ring focus
camera.setPosition(new Vector3(0.3, 0.3, 1));
camera.setTarget(new Vector3(0, 0.2, 0.8));
```

---

## 📱 AR Integration

### WebXR Hand Tracking

```typescript
import { WebXRDefaultExperience, WebXRFeatureName } from "@babylonjs/core";

async function enableAR(scene: Scene, canvas: HTMLCanvasElement) {
  const xr = await scene.createDefaultXRExperienceAsync({
    uiOptions: {
      sessionMode: "immersive-ar",
    },
  });

  const handTracking = xr.baseExperience.featuresManager.enableFeature(
    WebXRFeatureName.HAND_TRACKING,
    "latest",
  );

  handTracking.onHandAddedObservable.add((hand) => {
    // Track hand joints
    const fingerTip = hand.getJointMesh(WebXRHandJoint.INDEX_FINGER_TIP);

    // Attach ring to finger
    if (fingerTip) {
      ring.parent = fingerTip;
    }
  });
}
```

### Mobile AR with MediaPipe

```bash
npm install @mediapipe/hands
```

```typescript
import { Hands } from "@mediapipe/hands";

const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
});

hands.onResults((results) => {
  if (results.multiHandLandmarks) {
    results.multiHandLandmarks.forEach((landmarks) => {
      // Get ring finger position (landmark 16)
      const fingerPos = landmarks[16];

      // Update anchor position
      anchor.position.x = fingerPos.x;
      anchor.position.y = fingerPos.y;
      anchor.position.z = fingerPos.z;
    });
  }
});
```

---

## 🛒 E-commerce Integration

### Shopify Integration

```typescript
// Install Shopify SDK
npm install @shopify/hydrogen-react

// Fetch products
async function fetchShopifyProducts() {
  const response = await fetch(
    `https://${SHOP_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: `
          query {
            products(first: 50) {
              edges {
                node {
                  id
                  title
                  description
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  images(first: 5) {
                    edges {
                      node {
                        url
                      }
                    }
                  }
                  metafields(first: 10) {
                    edges {
                      node {
                        key
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    }
  );

  const data = await response.json();
  return data.data.products.edges.map(convertShopifyProduct);
}

// Add to cart
async function addToCart(variantId: string, quantity: number) {
  // Use Shopify Buy SDK
  const lineItems = [{ variantId, quantity }];
  const checkout = await client.checkout.addLineItems(checkoutId, lineItems);
  return checkout;
}
```

### WooCommerce Integration

```typescript
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: "https://yourstore.com",
  consumerKey: "ck_xxxxx",
  consumerSecret: "cs_xxxxx",
  version: "wc/v3",
});

// Fetch products
async function fetchProducts() {
  const response = await api.get("products", {
    per_page: 50,
    category: "15", // Jewellery category
  });
  return response.data.map(convertWooProduct);
}

// Add to cart (via REST API)
async function addToCart(productId: number, quantity: number) {
  await api.post("cart/items", {
    product_id: productId,
    quantity: quantity,
  });
}
```

### Custom Product Metadata

Store 3D model info in product metadata:

```json
{
  "metafields": [
    {
      "key": "model_path",
      "value": "/models/jewellery/rings/gold-band.glb",
      "namespace": "3d_viewer"
    },
    {
      "key": "anchor_point",
      "value": "anchor_ring_middle",
      "namespace": "3d_viewer"
    },
    {
      "key": "scale_factor",
      "value": "1.0",
      "namespace": "3d_viewer"
    }
  ]
}
```

---

## ⚡ Performance Optimization

### Level of Detail (LOD)

```typescript
import { SceneOptimizer, SceneOptimizerOptions } from "@babylonjs/core";

// Auto optimization
const options = SceneOptimizerOptions.ModerateDegradationAllowed();
const optimizer = new SceneOptimizer(scene, options);
optimizer.start();

// Manual LOD
const ringHigh = await loadModel("ring-high-poly.glb");
const ringMed = await loadModel("ring-med-poly.glb");
const ringLow = await loadModel("ring-low-poly.glb");

ringHigh.addLODLevel(10, ringMed);
ringHigh.addLODLevel(20, ringLow);
ringHigh.addLODLevel(50, null); // Hide at distance
```

### Texture Optimization

```typescript
// Use compressed formats
import { Texture, Engine } from "@babylonjs/core";

const texture = new Texture("texture.ktx2", scene);
texture.updateSamplingMode(Texture.TRILINEAR_SAMPLINGMODE);

// Generate mipmaps
texture.generateMipMaps = true;
```

### DRACO Compression

```bash
# Install DRACO encoder
npm install gltf-pipeline

# Compress model
gltf-pipeline -i ring.glb -o ring-compressed.glb --draco.compressionLevel 10
```

```typescript
// Load DRACO decoder
import { DracoCompression } from "@babylonjs/core";

DracoCompression.Configuration = {
  decoder: {
    wasmUrl: "/draco_decoder.wasm",
    wasmBinaryUrl: "/draco_decoder.wasm",
    fallbackUrl: "/draco_decoder.js",
  },
};
```

### Lazy Loading

```typescript
// Load models on demand
const loadedModels = new Map();

async function loadOnDemand(productId: string) {
  if (loadedModels.has(productId)) {
    return loadedModels.get(productId);
  }

  const model = await loadJewelleryAsset(scene, assetPath, anchorPoint);
  loadedModels.set(productId, model);
  return model;
}

// Unload unused models
function unloadModel(productId: string) {
  const model = loadedModels.get(productId);
  if (model) {
    model.meshes.forEach((m) => m.dispose());
    loadedModels.delete(productId);
  }
}
```

---

## 🚀 Deployment

### Build for Production

```bash
# Install dependencies
npm install

# Build
npm run build

# Test production build
npm start
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SHOPIFY_DOMAIN=yourstore.myshopify.com
NEXT_PUBLIC_SHOPIFY_TOKEN=xxxxx
NEXT_PUBLIC_API_URL=https://api.yourstore.com
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
netlify deploy --prod
```

### CDN Optimization

- Host 3D models on CDN (Cloudflare, AWS CloudFront)
- Enable compression (Brotli, GZIP)
- Set proper cache headers
- Use WebP for images

---

## 🐛 Troubleshooting

### Models Not Loading

**Problem**: glTF models don't appear

**Solutions**:

- Check file path is correct
- Ensure `@babylonjs/loaders` is installed
- Verify model format (glTF 2.0)
- Check browser console for errors
- Test model in https://gltf-viewer.donmccurdy.com/

### Performance Issues

**Problem**: Low FPS, laggy interactions

**Solutions**:

- Reduce polygon count (use Blender's Decimate modifier)
- Compress textures (use 1024x1024 instead of 4096x4096)
- Enable DRACO compression
- Implement LOD system
- Limit shadow generators

### Anchor Misalignment

**Problem**: Jewellery doesn't attach correctly

**Solutions**:

- Verify anchor position
- Check parent-child hierarchy
- Reset rotation/scale: `mesh.rotation.setAll(0)`
- Use scene inspector to debug positions

### Material Issues

**Problem**: Materials look wrong (too shiny, wrong color)

**Solutions**:

- Adjust `roughness` parameter
- Check `metallic` value (should be 1.0 for metals)
- Verify `baseColor` is correct
- Add environment map for reflections

### Browser Compatibility

**Problem**: Doesn't work in some browsers

**Solutions**:

- Check WebGL support
- Use feature detection
- Provide fallback UI
- Test on: Chrome, Firefox, Safari, Edge

### Mobile Issues

**Problem**: Poor performance on mobile

**Solutions**:

- Use lower poly models on mobile
- Reduce texture sizes
- Disable shadows on mobile
- Limit particle effects
- Use adaptive quality

---

## 📚 Additional Resources

- [Babylon.js Documentation](https://doc.babylonjs.com/)
- [glTF Specification](https://www.khronos.org/gltf/)
- [Blender Export Guide](./BLENDER_EXPORT_GUIDE.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 🎉 Summary

You now have:

✅ Complete 3D viewer with Babylon.js  
✅ Anchor-based attachment system  
✅ Multiple product types  
✅ PBR materials for realism  
✅ E-commerce integration templates  
✅ Performance optimization guide  
✅ AR integration examples  
✅ Production deployment instructions

**Happy building!** 🚀
