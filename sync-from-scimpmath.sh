#!/bin/bash

# SciCMPMATH → DemoSciCMP Sync Script
# This script copies UI components from the main repository to the preview repository

set -e

# Configuration
SCICMPMATH_REPO="/home/z/my-project"
DEMOSCICMP_REPO="/home/z/my-project/demoscicmp-repo"

echo "🔄 Syncing UI changes from SciCMPMATH → DemoSciCMP..."
echo ""

# Files/Directories to sync (UI components only)
SYNC_PATHS=(
    "src/components/SciCMP/"
    "src/app/page.tsx"
    "src/app/layout.tsx"
    "src/app/globals.css"
)

# Sync each path
for path in "${SYNC_PATHS[@]}"; do
    if [ -e "$SCICMPMATH_REPO/$path" ]; then
        echo "  ✅ Syncing: $path"
        cp -r "$SCICMPMATH_REPO/$path" "$DEMOSCICMP_REPO/$path"
    else
        echo "  ⚠️  Not found: $path (skipping)"
    fi
done

echo ""
echo "📋 Sync complete! Files copied to DemoSciCMP."
echo ""
echo "Next steps:"
echo "  1. cd $DEMOSCICMP_REPO"
echo "  2. git add ."
echo '  3. git commit -m "🔄 Sync UI changes from SciCMPMATH"'
echo "  4. git push origin main"
echo ""
echo "DemoSciCMP will automatically deploy to GitHub Pages on push."
