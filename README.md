# DemoSciCMP - Public Preview & Demonstration

<div align="center">

![DemoSciCMP](https://img.shields.io/badge/DemoSciCMP-Preview-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

**Interactive Preview of the SciCMPMATH Platform**

🌐 **View Live Preview:** [GitHub Pages](#setup-instructions)  
📖 **Main Repo:** [SciCMPMATH (Private)](https://github.com/testdemoqwenai2025-creator/SciCMPMATH)  
🐛 **Issues:** [Report Here](../../issues)

</div>

---

## 🎯 What is DemoSciCMP?

**DemoSciCMP** is the **public demonstration and preview showcase** for the **SciCMPMATH** platform - the "GitHub for Scientific Computing." 

### ⚠️ Important: Preview-Only Repository

This repository contains **ONLY the code needed for visual preview**. It does **NOT** include:
- ❌ Real authentication or user management
- ❌ Actual compute job execution
- ❌ Database connections or data persistence
- ❌ Production API endpoints
- ❌ Backend business logic

### ✅ What This Contains

- ✅ **Fully interactive UI components** (React/Next.js)
- ✅ **Dark/Light theme toggle** with smooth transitions
- ✅ **Landing page** with compelling CTAs
- ✅ **Dashboard preview** with sample/mock data
- ✅ **Features, Pricing, and About pages**
- ✅ **Responsive design** for all devices
- ✅ **Static export ready** for GitHub Pages

---

## 🚀 Quick Start (GitHub Preview)

### Option 1: View on GitHub Pages (Recommended)

After setup (see below), access:
```
https://testdemoqwenai2025-creator.github.io/DemoSciCMP/
```

### Option 2: Run Locally

```bash
# Clone this repository
git clone https://github.com/testdemoqwenai2025-creator/DemoSciCMP.git
cd DemoSciCMP

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Option 3: Build Static Export

```bash
npm run build
# Output in 'out/' directory - can be hosted anywhere
```

---

## 📱 Available Pages

| Page | Route | Description |
|------|-------|-------------|
| **Landing** | `/` | Hero section, features, testimonials, CTA |
| **Dashboard** | `/dashboard` | Interactive dashboard mockup with sample data |
| **Features** | `/features` | Comprehensive platform capabilities |
| **Pricing** | `/pricing` | Three-tier pricing model |
| **About** | `/about` | Mission, team, and roadmap |

---

## 🎨 Design Features

### Dark/Light Theme Toggle
- ☀️/🌙 Smooth transition animations
- 💾 Persistent preference (localStorage)
- 🖥️ System preference detection
- ⌨️ Keyboard shortcut: `Cmd/Ctrl + D`

### Responsive Design
- 📱 Mobile-first approach
- 📐 Breakpoints: sm, md, lg, xl
- 👆 Touch-friendly interactions (44px minimum targets)
- 📋 Collapsible mobile navigation

### Accessibility
- ♿ Semantic HTML structure
- 🏷️ ARIA labels and roles
- ⌨️ Full keyboard navigation
- 🔍 Screen reader compatible

---

## 🛠️ Technology Stack (Preview Only)

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework (App Router) |
| TypeScript 5 | Type safety |
| Tailwind CSS 4 | Utility-first styling |
| shadcn/ui | Component library |
| Lucide React | Icons |

---

## 🔗 Repository Ecosystem

```
┌─────────────────────────────────────────────────────────────┐
│                    SCICMPMATH ECOSYSTEM                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────────────┐     ┌─────────────────────┐       │
│   │    SciCMPMATH       │     │     DemoSciCMP      │       │
│   │   (Private Repo)    │────▶│   (Public Repo)     │       │
│   │                     │     │                     │       │
│   │ • Full source code  │     │ • UI preview ONLY   │       │
│   │ • Backend services  │     │ • Mock/sample data  │       │
│   │ • Database schemas  │     │ • No real logic     │       │
│   │ • API endpoints     │     │ • GitHub Pages host │       │
│   └─────────────────────┘     └─────────────────────┘       │
│            ▲                           │                     │
│            │           Sync UI changes  │                     │
│            └───────────────────────────┘                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Setup Instructions for GitHub Pages

### Automatic Deployment (Recommended)

1. Go to **Settings** → **Pages** in this repository
2. Under **Source**, select **GitHub Actions**
3. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build static site
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with: path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

4. Your site will be live at: `https://testdemoqwenai2025-creator.github.io/DemoSciCMP/`

### Manual Deployment

```bash
# Build locally
npm run build

# Deploy 'out/' folder to GitHub Pages branch
# Or use any static hosting service
```

---

## 🔄 Sync from SciCMPMATH → DemoSciCMP

To sync UI changes from the main repository:

```bash
# From SciCMPMATH repo
cp -r src/components/SciCMP/ ../DemoSciCMP/src/components/SciCMP/
cp src/app/page.tsx ../DemoSciCMP/src/app/page.tsx
cp src/app/layout.tsx ../DemoSciCMP/src/app/layout.tsx

# Commit and push DemoSciCMP
cd ../DemoSciCMP
git add .
git commit "🔄 Sync UI changes from SciCMPMATH"
git push origin main
```

---

## 🤝 Contributing

For platform contributions:
→ Visit [SciCMPMATH repository](https://github.com/testdemoqwenai2025-creator/SciCMPMATH)

For demo-specific issues:
→ Open an issue here with label `demo-preview`

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

---

## 📞 Contact

| Purpose | Contact |
|---------|---------|
| General Inquiries | hello@scicmpmath.com |
| Sales | sales@scicmpmath.com |
| Support | support@scicmpmath.com |

---

<div align="center">

**Built with ❤️ for the global scientific community**

*DemoSciCMP © 2026 Endeavor Science (AETH-1)*

**Preview demonstrates the future of scientific computing**

</div>
