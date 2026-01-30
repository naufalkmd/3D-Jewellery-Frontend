# Quick Start Guide

Welcome to your 3D Jewellery Virtual Try-On Website! 🎉

## ⚡ Get Started in 3 Steps

### 1. Install Dependencies

```bash
npm install
```

Or run the setup script:

```bash
./setup.sh
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Open in Browser

Visit: **http://localhost:3000**

---

## 🎮 Try the Demo

1. Click **"Enter Showroom"** on the home page
2. You'll see a 3D hand model
3. Select a product from the sidebar (e.g., "Gold Band Ring")
4. Click **"Try On"**
5. The ring appears on the hand!
6. Drag to rotate, scroll to zoom

---

## 🎨 What You Can Do Now

### Switch Between Views

- **Hand View** 👋 - For rings and bracelets
- **Neck View** 💎 - For necklaces

Toggle using the buttons at the top of the sidebar.

### Try Different Products

The demo includes:

- 3 rings (gold, silver, rose gold)
- 2 necklaces (gold, silver)
- 1 bracelet (gold)

Click any product and hit "Try On"!

---

## 📝 Next Steps

### Add Your Own Products

Edit `src/data/productExamples.ts` to add more products:

```typescript
const myProduct = {
  id: "ring-custom",
  name: "My Custom Ring",
  type: "ring",
  price: 599,
  material: "gold",
};
```

### Use Real 3D Models

1. **Create models in Blender** - Follow [BLENDER_EXPORT_GUIDE.md](BLENDER_EXPORT_GUIDE.md)
2. **Export as .glb files**
3. **Place in** `public/models/jewellery/`
4. **Update product `assetPath`** property
5. **Load with** `loadJewelleryAsset()` from `JewelleryAssetLoader.tsx`

### Customize Appearance

- **Colors**: Edit material colors in `src/app/jewellery/page.tsx`
- **Styles**: Modify Tailwind classes in the components
- **Layout**: Change the grid layout and sidebar

### Integrate E-Commerce

See [JEWELLERY_GUIDE.md](JEWELLERY_GUIDE.md#e-commerce-integration) for:

- Shopify integration
- WooCommerce integration
- Custom cart implementation

---

## 📖 Documentation

- **[README.md](README.md)** - Project overview and features
- **[JEWELLERY_GUIDE.md](JEWELLERY_GUIDE.md)** - Complete implementation guide (400+ lines)
  - Architecture
  - Customization
  - AR integration
  - Performance optimization
  - Deployment

- **[BLENDER_EXPORT_GUIDE.md](BLENDER_EXPORT_GUIDE.md)** - 3D modeling tutorial (500+ lines)
  - Creating jewellery
  - PBR materials
  - Export settings
  - Optimization

---

## 🐛 Troubleshooting

### Port 3000 Already in Use?

```bash
# Use a different port
npm run dev -- -p 3001
```

### Dependencies Not Installing?

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 3D Models Not Loading?

- Check browser console for errors
- Verify `@babylonjs/loaders` is installed
- Ensure file paths are correct
- Test models at https://gltf-viewer.donmccurdy.com/

---

## 🚀 Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

---

## 💡 Tips

- **Use Chrome DevTools** to inspect the 3D scene
- **Install Babylon.js Inspector** browser extension
- **Start simple** with procedural models, add real assets later
- **Check the guides** - they have lots of examples!

---

## 🎉 You're All Set!

Start exploring the code, try the demo, and build something amazing!

**Questions?** Check the documentation or open an issue.

**Happy coding!** 💍✨
