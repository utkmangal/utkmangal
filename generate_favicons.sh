#!/bin/bash
# Favicon Generation Script for GitHub Pages Portfolio
# This script converts the logo-square.svg to various favicon sizes

echo "=== Favicon Generator ==="
echo "Converting logo-detailed.svg to PNG favicons..."

# Check if ImageMagick or Inkscape is installed
if command -v convert &> /dev/null; then
    TOOL="convert"
    echo "Using ImageMagick..."
elif command -v inkscape &> /dev/null; then
    TOOL="inkscape"
    echo "Using Inkscape..."
else
    echo "ERROR: Neither ImageMagick nor Inkscape is installed."
    echo ""
    echo "Please install one of them:"
    echo "  Ubuntu/Debian: sudo apt install imagemagick"
    echo "  or: sudo apt install inkscape"
    echo ""
    echo "Alternative: Use online converter at:"
    echo "  https://realfavicongenerator.net/"
    echo "  https://favicon.io/favicon-converter/"
    exit 1
fi

# Source and destination
SRC="assets/images/logo/logo-detailed.svg"
DEST="assets/images/logo"

if [ ! -f "$SRC" ]; then
    echo "ERROR: Source file not found: $SRC"
    exit 1
fi

# Generate favicons based on available tool
if [ "$TOOL" = "convert" ]; then
    # ImageMagick method
    echo "Generating 16x16..."
    convert -background none "$SRC" -resize 16x16 "$DEST/favicon-16x16.png"
    
    echo "Generating 32x32..."
    convert -background none "$SRC" -resize 32x32 "$DEST/favicon-32x32.png"
    
    echo "Generating 180x180 (Apple Touch Icon)..."
    convert -background none "$SRC" -resize 180x180 "$DEST/apple-touch-icon.png"
    
    echo "Generating 192x192 (Android)..."
    convert -background none "$SRC" -resize 192x192 "$DEST/android-chrome-192x192.png"
    
    echo "Generating 512x512 (Android)..."
    convert -background none "$SRC" -resize 512x512 "$DEST/android-chrome-512x512.png"
    
elif [ "$TOOL" = "inkscape" ]; then
    # Inkscape method
    echo "Generating 16x16..."
    inkscape "$SRC" --export-filename="$DEST/favicon-16x16.png" --export-width=16 --export-height=16
    
    echo "Generating 32x32..."
    inkscape "$SRC" --export-filename="$DEST/favicon-32x32.png" --export-width=32 --export-height=32
    
    echo "Generating 180x180 (Apple Touch Icon)..."
    inkscape "$SRC" --export-filename="$DEST/apple-touch-icon.png" --export-width=180 --export-height=180
    
    echo "Generating 192x192 (Android)..."
    inkscape "$SRC" --export-filename="$DEST/android-chrome-192x192.png" --export-width=192 --export-height=192
    
    echo "Generating 512x512 (Android)..."
    inkscape "$SRC" --export-filename="$DEST/android-chrome-512x512.png" --export-width=512 --export-height=512
fi

echo ""
echo "✅ Favicon generation complete!"
echo ""
echo "Generated files:"
ls -lh "$DEST"/*.png 2>/dev/null || echo "Check $DEST directory for PNG files"
echo ""
echo "These favicons are now ready for your GitHub Pages site!"
