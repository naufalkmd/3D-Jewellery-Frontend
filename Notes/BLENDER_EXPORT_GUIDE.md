# 📦 Blender Export Guide for 3D Jewellery Models

## 📋 Table of Contents

1. [Setting Up Blender](#setting-up-blender)
2. [Creating Jewellery Models](#creating-jewellery-models)
3. [Creating Body Models](#creating-body-models)
4. [Materials and Textures](#materials-and-textures)
5. [Anchors and Positioning](#anchors-and-positioning)
6. [Exporting to glTF](#exporting-to-gltf)
7. [Optimization](#optimization)
8. [Quality Checklist](#quality-checklist)

---

## 🎨 Setting Up Blender

### Installation

1. Download Blender 4.0+ from https://www.blender.org/
2. Install and launch Blender
3. Go to Edit → Preferences → Add-ons
4. Enable "Import-Export: glTF 2.0 format"

### Scene Setup

```
File → New → General
```

**Important settings:**

1. **Units**: Metric, Scale 0.001 (millimeters)
   - Edit → Preferences → Scene Properties → Units
   - Set Length to "Millimeters"

2. **Clip Distance**:
   - Select Camera
   - Camera Properties → Lens
   - Clip Start: 0.1mm
   - Clip End: 10000mm

3. **Lighting**:
   - Delete default light
   - Add → Light → Sun (for primary)
   - Add → Light → Area (for fill)

---

## 💍 Creating Jewellery Models

### 1. Ring

#### Basic Ring

```
1. Add → Mesh → Torus
2. Properties:
   - Major Radius: 9mm (ring size 6)
   - Minor Radius: 1.5mm (band width)
   - Major Segments: 48
   - Minor Segments: 24

3. Scale to match actual size:
   - Select ring
   - Press 'S' for scale
   - Type your scale factor
```

#### Ring Sizing Chart

| Ring Size | Diameter (mm) | Major Radius |
| --------- | ------------- | ------------ |
| 5         | 15.7          | 7.85         |
| 6         | 16.5          | 8.25         |
| 7         | 17.3          | 8.65         |
| 8         | 18.2          | 9.10         |
| 9         | 19.0          | 9.50         |

#### Diamond Ring

```
1. Create base ring (as above)

2. Add diamond:
   a. Add → Mesh → Cube
   b. Edit Mode (Tab)
   c. Select top face
   d. Extrude (E) upward
   e. Scale (S) to create pyramid
   f. Add Subdivision Surface modifier

3. Position diamond on ring:
   - Move to top of ring
   - Rotate 45° (R Z 45)

4. Boolean union (optional):
   - Select ring
   - Add Modifier → Boolean
   - Operation: Union
   - Object: Diamond
```

#### Band with Pattern

```
1. Create base ring

2. Add pattern:
   a. Edit Mode (Tab)
   b. Select edge loop
   c. Bevel (Ctrl+B)
   d. Subdivide edges

3. Add texture displacement:
   - Shading workspace
   - Add Displacement node
   - Connect to Material Output
```

### 2. Necklace

#### Chain Necklace

```
1. Create single link:
   a. Add → Mesh → Torus
   b. Scale: S Z 2 (elongate)
   c. Minor Radius: 0.5mm
   d. Major Radius: 3mm

2. Duplicate links:
   a. Array Modifier
   b. Count: 50
   c. Relative Offset: X: 1.2

3. Curve the chain:
   a. Add → Curve → Bezier Curve
   b. Shape into necklace curve
   c. Add Modifier → Curve
   d. Object: BezierCurve
```

#### Pendant

```
1. Design pendant:
   - Start with basic shape (sphere, cube, etc.)
   - Edit Mode to refine
   - Add details with extrude/inset

2. Add bail (loop for chain):
   a. Add → Mesh → Torus
   b. Scale small (2mm diameter)
   c. Position at top of pendant
   d. Boolean union with pendant

3. Attach to chain:
   - Position at bottom of chain
   - Parent to chain (Ctrl+P)
```

### 3. Bracelet

```
1. Create base:
   - Similar to ring but larger
   - Diameter: 60-70mm
   - Can use chain method from necklace

2. Add clasp:
   a. Box clasp: Create small box with hinge
   b. Lobster clasp: Model from reference
   c. Position at chain ends
```

### 4. Earrings

```
1. Create earring design:
   - Start with sphere/shape
   - Add details
   - Keep lightweight (< 5 grams)

2. Add hook/post:
   - Curve → Path for hook
   - Convert to mesh
   - Position at top

3. Mirror for pair:
   - Add Mirror modifier
   - Axis: X
   - Duplicate for second earring
```

---

## 🖐️ Creating Body Models

### Hand Model

#### Basic Hand Structure

```
1. Palm:
   a. Add → Mesh → Cube
   b. Scale: S X 0.5, S Y 0.05, S Z 0.6
   c. Position at origin

2. Fingers (create one, then duplicate):

   Thumb:
   a. Add → Mesh → Cylinder
   b. Rotate: R Y 90
   c. Scale: S Z 0.5 (shorter)
   d. Position: X: -0.4, Y: 0.1, Z: 0.5

   Index finger:
   a. Add → Mesh → Cylinder
   b. Rotate: R X 90
   c. Position: X: -0.25, Y: 0.1, Z: 0.8

   Middle finger (longest):
   a. Same as index
   b. Position: X: 0, Y: 0.1, Z: 0.85

   Ring finger:
   a. Same as index
   b. Slightly shorter
   c. Position: X: 0.25, Y: 0.1, Z: 0.8

   Pinky:
   a. Same as index
   b. Shortest
   c. Position: X: 0.45, Y: 0.1, Z: 0.7

3. Add segments to fingers:
   - Edit Mode
   - Loop Cut (Ctrl+R)
   - Add 2-3 segments per finger
   - Slightly bend at joints
```

#### Detailed Hand (Advanced)

```
1. Use Skin Modifier method:
   a. Add → Mesh → Single Vert
   b. Edit Mode
   c. Extrude vertices to create skeleton
   d. Add Modifier → Skin
   e. Add Modifier → Subdivision Surface

2. Or import base model:
   - Use MakeHuman or Character Creator
   - Import into Blender
   - Extract hand mesh
   - Simplify (Decimate modifier)
```

### Neck/Bust Model

```
1. Neck:
   a. Add → Mesh → Cylinder
   b. Vertices: 32
   c. Scale: S X 0.25, S Y 0.25, S Z 0.75
   d. Position: Origin

2. Shoulders/Bust:
   a. Add → Mesh → UV Sphere
   b. Segments: 32
   c. Rings: 16
   d. Delete top half (Edit Mode → Select → Delete)
   e. Scale: S X 0.9, S Y 0.6, S Z 0.4
   f. Position: Y: -0.9

3. Blend neck to shoulders:
   - Edit Mode
   - Bridge Edge Loops
   - Smooth shading

4. Smooth the model:
   - Add Subdivision Surface modifier
   - Levels: 2
```

---

## 🎨 Materials and Textures

### PBR Material Setup

```
Shading Workspace

1. Add material:
   - Select object
   - Material Properties
   - Add → Principled BSDF (default)

2. Configure for metal:
   - Base Color: Gold (1.0, 0.84, 0.0, 1.0)
   - Metallic: 1.0
   - Roughness: 0.2 (polished) to 0.4 (satin)
   - Specular: 0.5
```

### Material Presets

#### Gold

```
Base Color: RGB(255, 215, 0) or HSV(51°, 100%, 100%)
Metallic: 1.0
Roughness: 0.2
IOR: 0.47 (advanced)
```

#### Silver

```
Base Color: RGB(192, 192, 192) or HSV(0°, 0%, 75%)
Metallic: 1.0
Roughness: 0.15
```

#### Rose Gold

```
Base Color: RGB(245, 194, 176) or HSV(16°, 28%, 96%)
Metallic: 1.0
Roughness: 0.2
```

#### Platinum

```
Base Color: RGB(191, 191, 199)
Metallic: 1.0
Roughness: 0.25
```

#### Diamond

```
Base Color: RGB(255, 255, 255)
Metallic: 0.0
Roughness: 0.0
IOR: 2.417 (diamond)
Transmission: 1.0 (if using Transmission)
Alpha: 0.95
```

### Adding Texture Maps

```
1. Create/Download textures:
   - Base Color (Albedo)
   - Metallic map
   - Roughness map
   - Normal map
   - AO (Ambient Occlusion)

2. Add Image Texture nodes:
   Shift+A → Texture → Image Texture

3. Connect to Principled BSDF:
   - Image Texture → Base Color
   - Image Texture (roughness) → Roughness
   - Image Texture (metallic) → Metallic
   - Image Texture (normal) → Normal Map → Normal

4. UV Unwrap:
   - Edit Mode
   - Select All (A)
   - U → Smart UV Project
   - Adjust Island Margin: 0.02
```

### Procedural Textures

#### Brushed Metal

```
1. Add → Texture → Noise Texture
2. Connect to Bump node
3. Bump → Normal
4. Adjust:
   - Scale: 100
   - Strength: 0.1
   - Distortion: 0.5
```

#### Engraved Pattern

```
1. Add → Texture → Voronoi Texture
2. Connect to ColorRamp
3. ColorRamp → Bump
4. Use for subtle patterns
```

---

## 📍 Anchors and Positioning

### Creating Empties as Anchors

```
1. Add → Empty → Sphere
2. Rename: "Anchor_Ring_Middle"
3. Scale: 0.1 (small)
4. Position exactly where ring should attach:
   - On middle finger
   - At second segment
   - Slightly forward of knuckle
```

### Anchor Naming Convention

```
anchor_[type]_[location]_[detail]

Examples:
- anchor_ring_middle
- anchor_ring_index
- anchor_necklace_collarbone
- anchor_bracelet_wrist
- anchor_earring_left
- anchor_earring_right
```

### Positioning Anchors

```
1. Ring anchors:
   - One per finger
   - At middle segment
   - Slightly rotated to match finger angle

2. Necklace anchor:
   - At collarbone/clavicle
   - Center of chest
   - Facing forward

3. Bracelet anchor:
   - At wrist
   - Around wrist bone
   - Perpendicular to arm

4. Earring anchors:
   - At earlobe
   - Two separate (left/right)
   - Facing outward slightly
```

### Parent-Child Hierarchy

```
HandRoot (Empty)
├── Palm (Mesh)
├── Finger_Middle
│   ├── Segment_1 (Mesh)
│   ├── Segment_2 (Mesh)
│   │   └── Anchor_Ring_Middle (Empty)
│   └── Segment_3 (Mesh)
```

**How to set up:**

```
1. Create hierarchy with empties
2. Parent meshes to empties (Ctrl+P → Object)
3. Add anchors as children of appropriate segments
4. Test: Moving parent should move all children
```

---

## 📤 Exporting to glTF

### Export Settings

```
File → Export → glTF 2.0 (.glb)

INCLUDE:
☑ Selected Objects (or all)
☑ Custom Properties
☑ Cameras (optional)
☑ Punctual Lights (optional)

TRANSFORM:
☑ +Y Up

GEOMETRY:
☑ Apply Modifiers
☑ UVs
☑ Normals
☑ Tangents
☑ Vertex Colors (if used)
□ Loose Edges
□ Loose Points

MATERIALS:
☑ Materials
☑ Images
Format: Auto (or JPEG for small files)

ANIMATION:
□ Animation (if no animation)
□ Shape Keys (if not used)
□ Skinning (if not used)

COMPRESSION:
☑ Draco mesh compression (for small files)
  - Compression level: 6
  - Position quantization: 14
  - Normal quantization: 10
  - Texcoord quantization: 12
```

### File Naming

```
[type]-[material]-[variant].glb

Examples:
- ring-gold-band.glb
- ring-silver-diamond.glb
- necklace-gold-chain.glb
- necklace-pendant-heart.glb
- bracelet-tennis.glb
- hand-basic.glb
- neck-bust.glb
```

### Batch Export

````
1. Organize objects in collections:
   - Collection "Rings"
   - Collection "Necklaces"
   - Collection "Bracelets"

2. Python script for batch export:
```python
import bpy
import os

output_dir = "/path/to/export/"
collections = ["Rings", "Necklaces", "Bracelets"]

for col_name in collections:
    col = bpy.data.collections[col_name]
    for obj in col.objects:
        # Select only this object
        bpy.ops.object.select_all(action='DESELECT')
        obj.select_set(True)

        # Export
        filepath = os.path.join(output_dir, f"{obj.name}.glb")
        bpy.ops.export_scene.gltf(
            filepath=filepath,
            use_selection=True,
            export_format='GLB'
        )
````

---

## ⚡ Optimization

### Polygon Count Reduction

```
1. Select object
2. Add Modifier → Decimate
3. Ratio: 0.5 (reduces by 50%)
4. Adjust until quality is acceptable
5. Apply modifier (Ctrl+A)

Target poly counts:
- Ring: 2,000-5,000 triangles
- Necklace: 5,000-15,000 triangles
- Hand: 3,000-8,000 triangles
- Neck: 2,000-5,000 triangles
```

### Texture Optimization

```
1. Resize textures:
   - Select Image Texture node
   - Image → Resize
   - 1024x1024 or 2048x2048

2. Compress textures:
   - Image → Pack
   - Save as → JPEG (quality 90%)
   - Or PNG for transparency

3. Atlas textures:
   - Combine multiple textures into one
   - UV islands for different parts
   - Saves draw calls
```

### Remove Unnecessary Data

```
1. Clean up:
   - Delete hidden objects
   - Remove unused materials
   - Remove unused textures
   - File → Clean Up → Unused Data

2. Merge vertices:
   - Edit Mode
   - Select All (A)
   - M → By Distance
   - Threshold: 0.0001

3. Remove doubles:
   - Edit Mode
   - Select All
   - Mesh → Clean Up → Merge by Distance
```

### Test File Size

```
Target sizes:
- Ring: < 500 KB
- Necklace: < 1 MB
- Bracelet: < 700 KB
- Hand: < 800 KB
- Neck: < 600 KB

If too large:
1. Reduce polygon count
2. Compress textures
3. Enable DRACO compression
4. Remove unused data
```

---

## ✅ Quality Checklist

### Before Export

- [ ] Scale is correct (use real-world dimensions)
- [ ] Units set to millimeters
- [ ] Origin is at correct position
- [ ] No overlapping geometry
- [ ] Normals facing outward (no flipped faces)
- [ ] All modifiers applied (except Armature if animating)
- [ ] UVs unwrapped correctly
- [ ] Materials applied and textured
- [ ] Anchors positioned correctly
- [ ] Hierarchy set up (if using)
- [ ] Poly count optimized
- [ ] File size under target

### After Export

- [ ] Test in online viewer: https://gltf-viewer.donmccurdy.com/
- [ ] Check materials render correctly
- [ ] Verify textures load
- [ ] Test in your application
- [ ] Check on mobile device
- [ ] Verify performance (FPS)
- [ ] Test different lighting conditions
- [ ] Check file size

### Common Issues

**Issue**: Model appears black
**Fix**: Recalculate normals (Edit Mode → Shift+N)

**Issue**: Textures missing
**Fix**: File → External Data → Pack Resources

**Issue**: Too shiny/dull
**Fix**: Adjust Roughness value in material

**Issue**: Wrong size
**Fix**: Check scale, re-export with correct units

**Issue**: Anchor misaligned
**Fix**: Reposition empty, re-export

---

## 🎓 Learning Resources

### Blender Tutorials

- [Blender Guru - Donut Tutorial](https://www.youtube.com/playlist?list=PLjEaoINr3zgEq0u2MzVgAaHEBt--xLB6U)
- [Grant Abbitt - Complete Beginner Guide](https://www.youtube.com/playlist?list=PLn3ukorJv4vuU3ILv3g3xnUyEGOQR-D8J)
- [CG Geek - Jewelry Modeling](https://www.youtube.com/watch?v=j-ijJKGdw1I)

### PBR Materials

- [Substance 3D](https://substance3d.adobe.com/)
- [Physically Based](https://physicallybased.info/) - Material values
- [CC0 Textures](https://cc0textures.com/)

### glTF Resources

- [glTF Tutorial](https://www.khronos.org/gltf/)
- [glTF Validator](https://github.khronos.org/glTF-Validator/)
- [glTF Sample Models](https://github.com/KhronosGroup/glTF-Sample-Models)

---

## 🎉 Summary

You now know how to:

✅ Set up Blender for jewellery modeling  
✅ Create rings, necklaces, bracelets, earrings  
✅ Model hands and neck/bust  
✅ Apply PBR materials  
✅ Set up anchors and hierarchy  
✅ Export optimized glTF files  
✅ Troubleshoot common issues

**Happy modeling!** 💍
