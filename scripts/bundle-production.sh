#!/bin/bash

# SciCMP Production Bundle Script
# Creates a clean, production-ready bundle for publishing
# Usage: ./scripts/bundle-production.sh [version]

set -e

VERSION=${1:-"$(date +%Y.%m.%d-%H%M%S)"}
BUNDLE_NAME="scicmp-bundle-${VERSION}"
OUTPUT_DIR="./dist/${BUNDLE_NAME}"

echo "🚀 Creating SciCMP Production Bundle v${VERSION}"
echo "================================================"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf ./dist ./out

# Install production dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Run type checking (optional)
echo "🔍 Running type check..."
npx tsc --noEmit || echo "⚠️  Type errors found (continuing anyway)"

# Build for production
echo "🏗️ Building for production..."
NODE_ENV=production npm run build

# Create bundle directory structure
echo "📁 Creating bundle structure..."
mkdir -p "${OUTPUT_DIR}"
mkdir -p "${OUTPUT_DIR}/docs"
mkdir -p "${OUTPUT_DIR}/scripts"

# Copy build output
echo "📋 Copying build artifacts..."
cp -r ./out/* "${OUTPUT_DIR}/"

# Copy documentation
echo "📄 Copying documentation..."
cp ./docs/GITHUB_OAUTH_SETUP.md "${OUTPUT_DIR}/docs/" 2>/dev/null || true
cp ./README.md "${OUTPUT_DIR}/" 2>/dev/null || true

# Create version manifest
cat > "${OUTPUT_DIR}/manifest.json" << EOF
{
  "name": "SciCMP",
  "version": "${VERSION}",
  "buildDate": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "commit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
  "branch": "$(git branch --show-current 2>/dev/null || echo 'unknown')",
  "node": "$(node --version)",
  "features": [
    "github-oauth",
    "auto-theme",
    "static-export",
    "responsive-design"
  ],
  "deployment": {
    "type": "static",
    "platform": "github-pages",
    "basePath": "/DemoSciCMP"
  }
}
EOF

# Create deployment script
cat > "${OUTPUT_DIR}/deploy.sh" << 'DEPLOYEOF'
#!/bin/bash
# Quick deploy script for GitHub Pages
set -e

echo "Deploying to GitHub Pages..."

if [ ! -d ".git" ]; then
    echo "❌ Not a git repository"
    exit 1
fi

# Add all files
git add -A
git commit -m "🚀 Deploy: $(date)" || echo "No changes to commit"
git push origin main

echo "✅ Pushed to remote. CI/CD will handle deployment."
DEPLOYEOF
chmod +x "${OUTPUT_DIR}/deploy.sh"

# Create archive
echo "📦 Creating archive..."
cd ./dist
tar -czvf "${BUNDLE_NAME}.tar.gz" "${BUNDLE_NAME}/"
cd ..

# Calculate sizes
BUILD_SIZE=$(du -sh "${OUTPUT_DIR}" | cut -f1)
ARCHIVE_SIZE=$(du -sh "./dist/${BUNDLE_NAME}.tar.gz" | cut -f1)

echo ""
echo "================================================"
echo "✅ Bundle Created Successfully!"
echo "================================================"
echo ""
echo "📁 Bundle Location: ${OUTPUT_DIR}"
echo "📦 Archive: ./dist/${BUNDLE_NAME}.tar.gz"
echo ""
echo "📊 Size Information:"
echo "   • Build Output: ${BUILD_SIZE}"
echo "   • Compressed Archive: ${ARCHIVE_SIZE}"
echo ""
echo "🚀 To deploy:"
echo "   cd ${OUTPUT_DIR} && ./deploy.sh"
echo ""
echo "Or manually:"
echo "   cp -r ${OUTPUT_DIR}/* /your/web/server/"
