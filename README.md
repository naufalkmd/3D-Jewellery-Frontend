# 3D Jewellery Virtual Try-On Website

A complete interactive 3D jewellery showroom built with Next.js and Babylon.js, allowing users to virtually try on rings, necklaces, and bracelets in real-time.

## ✨ Features

- 🎨 **Interactive 3D Viewer** - Powered by Babylon.js with realistic PBR materials
- 👋 **Virtual Try-On** - Try rings on a 3D hand model and necklaces on a neck/bust model
- 💍 **Multiple Products** - Rings, necklaces, and bracelets with various materials
- 🎯 **Anchor System** - Precise attachment points for accurate positioning
- 📱 **Responsive Design** - Works beautifully on desktop and mobile
- ⚡ **High Performance** - Optimized for smooth 60 FPS rendering
- 🛒 **E-commerce Ready** - Easy integration with Shopify, WooCommerce, and more

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- 3GB free disk space

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd 3D-Jewellery-Website

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Visit the Showroom

1. Open your browser to `http://localhost:3000`
2. Click "Enter Showroom"
3. Select a product from the sidebar
4. Click "Try On" to see it in 3D!

## 📁 Project Structure

```
3D-Jewellery-Website/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── jewellery/
│   │   │   └── page.tsx          # 3D Showroom
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   └── JewelleryAssetLoader.tsx  # Asset utilities
│   └── data/
│       └── productExamples.ts    # Product catalog
├── public/
│   └── models/                   # 3D model assets
│       ├── ring/
│       ├── hand/
│       └── jewellery/
├── JEWELLERY_GUIDE.md           # Complete implementation guide
├── BLENDER_EXPORT_GUIDE.md      # 3D modeling tutorial
└── package.json
```

## 🎮 How to Use

### Controls

- **Rotate**: Click and drag
- **Zoom**: Scroll wheel
- **Pan**: Right-click and drag (or Shift + drag)

### Trying On Jewellery

1. **Select a product** from the sidebar
2. **Choose view mode**: Hand or Neck
3. **Click "Try On"** to see the jewellery on the 3D model
4. **Rotate and zoom** to view from different angles

### Switching Views

- **Hand View** - For rings and bracelets
- **Neck View** - For necklaces and pendants

The view automatically switches based on the product type!

## 🎨 Customization

### Adding New Products

Edit `src/data/productExamples.ts`:

```typescript
const newProduct = {
  id: "ring-003",
  name: "Sapphire Ring",
  type: "ring",
  price: 799,
  material: "silver",
  // ... more properties
};
```

### Changing Materials

Edit material colors in `src/app/jewellery/page.tsx`:

```typescript
const getMaterialColor = (material: MaterialType): Color3 => {
  switch (material) {
    case "gold":
      return new Color3(1, 0.84, 0);
    case "silver":
      return new Color3(0.75, 0.75, 0.75);
    // Add more materials...
  }
};
```

### Using Real 3D Models

1. Create your model in Blender (see [BLENDER_EXPORT_GUIDE.md](BLENDER_EXPORT_GUIDE.md))
2. Export as `.glb` file
3. Place in `public/models/jewellery/`
4. Update product `assetPath` property
5. Use `loadJewelleryAsset()` from `JewelleryAssetLoader.tsx`

See [JEWELLERY_GUIDE.md](JEWELLERY_GUIDE.md) for detailed instructions.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) - React framework
- **3D Engine**: [Babylon.js 8.41](https://www.babylonjs.com/) - WebGL 3D engine
- **Language**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **3D Models**: glTF 2.0 / GLB format

## 📚 Documentation

- **[JEWELLERY_GUIDE.md](JEWELLERY_GUIDE.md)** - Complete implementation guide
  - Architecture overview
  - Customization guide
  - AR integration
  - E-commerce integration
  - Performance optimization
  - Deployment instructions

- **[BLENDER_EXPORT_GUIDE.md](BLENDER_EXPORT_GUIDE.md)** - 3D modeling tutorial
  - Creating jewellery in Blender
  - Modeling hands and body parts
  - PBR materials setup
  - Export settings
  - Optimization tips

## 🎯 Roadmap

### Current Features

- ✅ 3D viewer with orbit controls
- ✅ Procedural hand and neck models
- ✅ Ring, necklace, and bracelet support
- ✅ Multiple material variants
- ✅ Product catalog UI
- ✅ Anchor-based attachment system

### Future Enhancements

- [ ] Load real glTF/GLB assets
- [ ] Material/color picker
- [ ] Size selector
- [ ] Multiple items at once
- [ ] Save/share try-on sessions
- [ ] AR mode (WebXR/MediaPipe)
- [ ] Shopping cart integration
- [ ] User accounts
- [ ] Social sharing

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

See [JEWELLERY_GUIDE.md](JEWELLERY_GUIDE.md#deployment) for detailed deployment instructions.

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

Requires WebGL 2.0 support.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Babylon.js](https://www.babylonjs.com/) - Amazing 3D engine
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- 3D models in `models/hand/` - See [models/hand/ATTRIBUTION.md](models/hand/ATTRIBUTION.md)

## 💬 Support

- 📖 Documentation: See [JEWELLERY_GUIDE.md](JEWELLERY_GUIDE.md)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/3D-Jewellery-Website/issues)
- 💡 Discussions: [GitHub Discussions](https://github.com/yourusername/3D-Jewellery-Website/discussions)

## 📞 Contact

For questions or feedback, please open an issue or reach out to the maintainers.

---

**Happy building!** 💍✨
