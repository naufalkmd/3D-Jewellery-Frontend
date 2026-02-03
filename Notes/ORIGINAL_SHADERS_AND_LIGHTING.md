# Original Shaders and Lighting Setup

This document explains the original shader configurations and lighting setup used in the 3D Jewellery Showroom before performance optimizations were applied.

---

## 🎨 Lighting Design Philosophy

The original lighting setup employed a **cinematic split-lighting technique** with complementary color contrast to create a dramatic, studio-quality look.

### Lighting Architecture: 5-Light Setup

#### 1. **Key Light 1 (Red/Magenta) - LEFT**

```typescript
const keyLight = new DirectionalLight(
  "keyLight",
  new Vector3(1.5, -10, 0), // Direction
  scene,
);
keyLight.position = new Vector3(-10, -3, -1.0);
keyLight.intensity = 8.0;
keyLight.diffuse = new Color3(1.0, 0.1, 0.3); // Red/Magenta color
```

**Purpose**: Primary light source creating warm, dramatic illumination from the left side

- **Color**: Red/Magenta (RGB: 1.0, 0.1, 0.3) - Creates warm highlights
- **Intensity**: 8.0 - Very strong to dominate the scene
- **Position**: Left side, slightly low (-10, -3, -1.0)
- **Shadow Map**: Originally 4096×4096 (later optimized to 1024×1024)
- **Shadow Quality**: QUALITY_HIGH with PCF (Percentage Closer Filtering)
- **Shadow Darkness**: 0.9 (very dark shadows)
- **Bias**: 0.00001 (prevents shadow acne)

#### 2. **Key Light 2 (Cyan/Blue) - RIGHT**

```typescript
const keyLight2 = new DirectionalLight(
  "keyLight2",
  new Vector3(-1.5, 10, 0), // Direction
  scene,
);
keyLight2.position = new Vector3(10, 3, 1.0);
keyLight2.intensity = 8.0;
keyLight2.diffuse = new Color3(0.0, 0.6, 1.0); // Cyan/Blue color
```

**Purpose**: Counter light creating cool contrast from the right side

- **Color**: Cyan/Blue (RGB: 0.0, 0.6, 1.0) - Creates cool highlights
- **Intensity**: 8.0 - Equal strength to Key Light 1
- **Position**: Right side, elevated (10, 3, 1.0)
- **Shadow Map**: Originally 2048×2048 (later optimized to 512×512)
- **Result**: Creates complementary color split across the model

**Split Lighting Effect**: The dual-colored key lights create a visually striking **red/cyan color separation** across the 3D model, reminiscent of anaglyph 3D or cyberpunk aesthetics.

#### 3. **Fill Light (Hemispheric)**

```typescript
const fillLight = new HemisphericLight(
  "fillLight",
  new Vector3(0, 1, 0),
  scene,
);
fillLight.intensity = 0.1; // Very low for dramatic look
fillLight.diffuse = new Color3(0.3, 0.3, 0.4);
fillLight.groundColor = new Color3(0.1, 0.1, 0.15);
```

**Purpose**: Minimal ambient illumination to prevent pure black shadows

- **Intensity**: 0.1 - Extremely subtle
- **Sky Color**: Slightly blue tint (0.3, 0.3, 0.4)
- **Ground Color**: Very dark blue (0.1, 0.1, 0.15)
- **Effect**: Maintains dramatic contrast while preventing crushed blacks

#### 4. **Rim Light (Point Light) - DISABLED**

```typescript
const rimLight = new PointLight("rimLight", new Vector3(-4, 3, -2), scene);
rimLight.intensity = 0.0; // Disabled in production
rimLight.diffuse = new Color3(0.98, 0.95, 0.92);
```

**Purpose**: Edge highlighting (currently disabled to maintain clean split lighting)

- **Status**: Disabled (intensity = 0.0)
- **Color**: Warm white if enabled
- **Use Case**: Can be enabled for product photography-style edge glow

#### 5. **Accent Light (Spot Light)**

```typescript
const accentLight = new SpotLight(
  "accentLight",
  new Vector3(2, 3, 2),
  new Vector3(-0.5, -1, -0.5),
  Math.PI / 3,
  2,
  scene,
);
accentLight.intensity = 0.5; // Reduced for subtlety
accentLight.diffuse = new Color3(1, 1, 1);
```

**Purpose**: Focused highlight for jewellery sparkle

- **Position**: Upper right (2, 3, 2)
- **Direction**: Pointing down-left
- **Cone Angle**: 60° (Math.PI / 3)
- **Exponent**: 2 (soft falloff)
- **Intensity**: 0.5 - Subtle accent

---

## 🎭 Post-Processing & Image Effects

### Vignette Effect

```typescript
scene.imageProcessingConfiguration.vignetteEnabled = true;
scene.imageProcessingConfiguration.vignetteWeight = 4.0; // Stronger vignette
scene.imageProcessingConfiguration.vignetteStretch = 0.3; // Tighter gradient
scene.imageProcessingConfiguration.vignetteColor = new Color4(0, 0, 0, 1); // Pure black
scene.imageProcessingConfiguration.vignetteCameraFov = 0.5; // Dramatic falloff
```

**Effect**: Creates a studio-style gradient from center to edges

- Dark edges fade to pure black
- Focuses attention on the center subject
- Simulates photographic lens vignetting

### Tone Mapping

```typescript
scene.imageProcessingConfiguration.toneMappingEnabled = true;
scene.imageProcessingConfiguration.toneMappingType =
  ImageProcessingConfiguration.TONEMAPPING_ACES;
scene.imageProcessingConfiguration.exposure = 1.2;
scene.imageProcessingConfiguration.contrast = 1.3;
```

**ACES Tone Mapping**: Academy Color Encoding System

- Industry-standard HDR to LDR conversion
- Preserves color accuracy in highlights
- Creates filmic, cinematic look
- **Exposure**: 1.2 (slightly brightened)
- **Contrast**: 1.3 (enhanced depth)

### Color Grading

```typescript
scene.imageProcessingConfiguration.colorGradingEnabled = true;
scene.imageProcessingConfiguration.colorCurvesEnabled = true;
```

**Purpose**: Fine-tune color response and artistic look

---

## 🖼️ Shader System: PBR Materials

### Physically Based Rendering (PBR)

The scene uses **PBR (Physically Based Rendering)** for realistic material appearance based on real-world physics.

### Skin Shader Configuration

#### Subsurface Scattering (SSS)

```typescript
if (material.subSurface) {
  material.subSurface.isTranslucencyEnabled = true;
  material.subSurface.translucencyIntensity = 0.5;
  material.subSurface.tintColor = new Color3(1.0, 0.95, 0.93); // Cool undertone
  material.subSurface.minimumThickness = 1.0;
  material.subSurface.maximumThickness = 10.0;
}
```

**What is SSS?**: Simulates light penetrating and scattering beneath the surface

- **Critical for**: Skin, wax, marble, jade
- **Translucency Intensity**: 0.5 (moderate light penetration)
- **Tint Color**: Cool peachy tone (1.0, 0.95, 0.93)
- **Thickness Range**: 1.0 to 10.0 units
- **Effect**: Makes skin appear lifelike instead of plastic

#### Emissive (Self-Illumination)

```typescript
material.emissiveColor = new Color3(0.75, 0.73, 0.71); // Lighter and cooler
material.emissiveIntensity = 0.2;
```

**Purpose**: Adds subtle self-glow to simulate fair skin tone

- Not true emission, but brightens the base color
- Cooler tone prevents overly warm appearance

#### Albedo/Base Color

```typescript
if (material.albedoColor) {
  material.albedoColor = material.albedoColor.scale(1.6);
}
if (material.baseColor) {
  material.baseColor = material.baseColor.scale(1.6);
}
```

**Purpose**: Lightens skin tone by 60% for fair complexion

- Scales RGB values uniformly
- Maintains original color ratios

#### Surface Properties

```typescript
material.microSurface = 0.75; // Less smooth, more matte
material.roughness = 0.85; // Higher roughness = less gloss
material.specularIntensity = 0.3; // Reduced shine
material.metallicF0Factor = 0.5; // Reduced reflectivity at grazing angles
```

**Breakdown**:

- **microSurface**: 0.75 - Subtle surface irregularities (matte skin)
- **roughness**: 0.85 - High roughness prevents mirror-like reflections
- **specularIntensity**: 0.3 - Subtle specular highlights (not shiny)
- **metallicF0Factor**: 0.5 - Controls Fresnel effect strength at edges

#### Environment Reflection

```typescript
material._environmentIntensity = 1.0;
material.useRadianceOverAlpha = true;
material.useSpecularOverAlpha = true;
```

**Purpose**: Controls how environment reflections interact with the material

- Moderate environment influence
- Better color response in PBR workflow

---

## 📦 Original Texture Configuration

### Before Optimization

#### Base Color (Albedo) Texture

- **File**: `Hands_Low_defaultMat1_baseColor.jpeg`
- **Original Size**: 2.13 MB (2,234,368 bytes)
- **Format**: JPEG
- **Purpose**: Defines the surface color/diffuse

#### Metallic/Roughness Texture

- **File**: `Hands_Low_defaultMat1_metallicRoughness.png`
- **Original Size**: 9.10 MB (9,542,656 bytes)
- **Format**: PNG
- **Purpose**:
  - Red channel: (unused for skin)
  - Green channel: Roughness map
  - Blue channel: Metallic map

#### Normal Map

- **File**: `Hands_Low_defaultMat1_normal.png`
- **Original Size**: 5.44 MB (5,701,632 bytes)
- **Format**: PNG (RGB)
- **Purpose**: Adds surface detail without extra geometry
- **Contains**: Pores, wrinkles, skin texture in tangent space

**Total Original Texture Weight**: 16.67 MB

---

## 🎯 Shadow System

### Original Configuration (Before Optimization)

#### Primary Shadows (Key Light 1)

```typescript
const shadowGenerator = new ShadowGenerator(4096, keyLight);
shadowGenerator.usePercentageCloserFiltering = true;
shadowGenerator.filteringQuality = ShadowGenerator.QUALITY_HIGH;
shadowGenerator.darkness = 0.9;
shadowGenerator.bias = 0.00001;
```

**Specifications**:

- **Shadow Map Resolution**: 4096 × 4096 pixels (16.7 million pixels)
- **Memory Usage**: ~67 MB for float32 depth buffer
- **Filter**: PCF (Percentage Closer Filtering) for soft shadows
- **Quality**: QUALITY_HIGH (multi-sample PCF)
- **Darkness**: 0.9 (nearly black shadows)

#### Secondary Shadows (Key Light 2)

```typescript
const shadowGenerator2 = new ShadowGenerator(2048, keyLight2);
```

**Specifications**:

- **Shadow Map Resolution**: 2048 × 2048 pixels (4.2 million pixels)
- **Memory Usage**: ~16 MB for float32 depth buffer
- **Filter**: PCF enabled

**Total Shadow Buffer Memory**: ~83 MB GPU VRAM

---

## 🎬 Scene Background

```typescript
scene.clearColor = new Color4(0, 0, 0, 1); // Pure black
```

**Design Choice**: Pure black background

- Creates infinite void effect
- Subject emerges from darkness
- Professional product photography aesthetic
- Vignette blends seamlessly into background

---

## 🔧 Camera Setup

```typescript
const camera = new ArcRotateCamera(
  "camera",
  2.6340167868659607, // Alpha (horizontal angle)
  1.994395102393196, // Beta (vertical angle)
  3, // Radius (distance)
  new Vector3(0, 1, 0), // Target
  scene,
);
camera.lowerRadiusLimit = 1.5; // Closest zoom
camera.upperRadiusLimit = 6; // Farthest zoom
camera.wheelPrecision = 50; // Scroll sensitivity
```

**Interaction**:

- Orbits around center point (0, 1, 0)
- Zoom limited to prevent clipping or extreme distance
- Smooth mouse/touch controls

---

## 📊 Performance Impact (Original)

### GPU Load

- **Shadow Maps**: 83 MB VRAM
- **Textures**: 16.67 MB VRAM
- **Total**: ~100 MB VRAM minimum
- **Render Cost**: 2× high-res shadow maps per frame

### CPU Load

- **Initial Load**: 16.67 MB texture download
- **Model Load**: 21 MB GLB file
- **Total Initial Download**: ~38 MB

### Frame Rate

- Desktop (high-end): 60 FPS
- Desktop (mid-range): 30-45 FPS
- Mobile: 15-30 FPS (struggled with shadow quality)

---

## ✨ Artistic Intent

The original setup was designed to create:

1. **Cyberpunk Aesthetic**: Red/cyan split lighting evokes sci-fi, neon-lit environments
2. **Studio Photography**: High-quality product visualization
3. **Material Realism**: PBR + SSS for lifelike skin rendering
4. **Dramatic Mood**: Dark background, strong contrast, vignette
5. **Interactive Experience**: Real-time ray-traced quality in browser

---

## 🔄 What Changed During Optimization

### Texture Compression

- Base Color: 2.13 MB → 222 KB (89.8% reduction)
- Metallic/Roughness: 9.10 MB → 1.1 MB (88.2% reduction)
- Normal: 5.44 MB → 956 KB (82.9% reduction)

### Shadow Quality

- Primary: 4096 → 1024 (75% memory reduction)
- Secondary: 2048 → 512 (75% memory reduction)
- Quality: HIGH → MEDIUM

### Render Optimizations

- Added texture sampling mode optimization
- Removed problematic autoClear settings
- Simplified render loop

**Result**: 86.6% total asset weight reduction while maintaining visual quality!

---

## 📚 References

- **PBR Theory**: [Substance by Adobe - PBR Guide](https://substance3d.adobe.com/tutorials/courses/the-pbr-guide-part-1)
- **ACES Tone Mapping**: Academy Color Encoding System
- **Split Lighting**: Traditional photography technique
- **Babylon.js PBR**: [Official Documentation](https://doc.babylonjs.com/features/featuresDeepDive/materials/using/masterPBR)
- **Subsurface Scattering**: [Babylon.js SSS Guide](https://doc.babylonjs.com/features/featuresDeepDive/materials/using/masterPBR#sub-surface)

---

_This documentation preserves the technical details of the original artistic vision before performance optimizations were applied._
