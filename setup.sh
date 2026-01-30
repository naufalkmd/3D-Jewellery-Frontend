#!/bin/bash

echo "🎨 Setting up 3D Jewellery Website..."
echo ""

# Check Node.js version
echo "Checking Node.js version..."
NODE_VERSION=$(node -v 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ Node.js $NODE_VERSION found"
else
    echo "❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check npm
NPM_VERSION=$(npm -v 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ npm $NPM_VERSION found"
else
    echo "❌ npm not found"
    exit 1
fi

echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start the development server:"
echo "   npm run dev"
echo ""
echo "📖 Then open http://localhost:3000 in your browser"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Project overview"
echo "   - JEWELLERY_GUIDE.md - Implementation guide"
echo "   - BLENDER_EXPORT_GUIDE.md - 3D modeling guide"
echo ""
echo "Happy building! 💍✨"
