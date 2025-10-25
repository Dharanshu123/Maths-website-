# Website Next.js Project

This is a modern Next.js website converted from static HTML files, featuring TypeScript, responsive design, and video backgrounds.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager

To check if you have Node.js installed:
```bash
node --version
npm --version
```

## 🚀 Quick Start Guide

### Step 1: Install Dependencies

Navigate to the project directory and install all required dependencies:

```bash
# Using npm (recommended)
npm install

# OR using yarn
yarn install

# OR using pnpm
pnpm install
```

### Step 2: Run Development Server

Start the development server:

```bash
# Using npm
npm run dev

# OR using yarn
yarn dev

# OR using pnpm
pnpm dev
```

### Step 3: Open in Browser

Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

The page will automatically reload when you make changes to the code.

## 🏗️ Build Commands

### Development Mode
```bash
npm run dev          # Start development server with hot reload
```

### Production Build
```bash
npm run build        # Create optimized production build
npm run start        # Start production server
```

### Linting
```bash
npm run lint         # Check code quality and formatting
```

## 📁 Project Structure

```
Website/
├── pages/                 # Next.js pages (file-based routing)
│   ├── _app.tsx          # App wrapper with global styles
│   ├── index.tsx         # Home page (/)
│   ├── about.tsx         # About page (/about)
│   ├── services.tsx      # Services page (/services)
│   ├── pricing.tsx       # Pricing page (/pricing)
│   └── contact.tsx       # Contact page (/contact)
├── components/           # Reusable React components
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Footer component
│   ├── Layout.tsx        # Main layout wrapper
│   └── BackgroundVideo.tsx # Video background component
├── styles/               # Styling files
│   ├── globals.css       # Global styles
│   └── reset.css         # CSS reset
├── public/               # Static assets (served directly)
│   ├── images/           # Image files
│   ├── videos/           # Video files
│   ├── img/contact/      # Contact page icons
│   └── favicon.png       # Site favicon
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── next.config.js        # Next.js configuration
└── README.md             # This file
```

## ✨ Features

- ✅ **TypeScript** - Full type safety and better developer experience
- ✅ **Responsive Design** - Mobile-first approach with breakpoints
- ✅ **Next.js Image Optimization** - Automatic image optimization and lazy loading
- ✅ **Video Backgrounds** - Custom video background component for About page
- ✅ **Mobile Navigation** - Interactive hamburger menu
- ✅ **SEO Optimized** - Meta tags, structured data, and semantic HTML
- ✅ **Performance Optimized** - Code splitting and optimized bundles

## 📱 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Landing page with hero, services preview, and testimonials |
| **About** | `/about` | About page with video backgrounds and white text overlay |
| **Services** | `/services` | Detailed services showcase |
| **Pricing** | `/pricing` | Three-tier pricing plans |
| **Contact** | `/contact` | Contact information with embedded map |

## 🎨 Customization

### Updating Content
- Edit page content in `/pages/*.tsx` files
- Modify global styles in `/styles/globals.css`
- Update component styles using CSS classes

### Adding New Pages
1. Create a new file in `/pages/` directory (e.g., `blog.tsx`)
2. Export a React component as default
3. The file name becomes the route automatically

### Modifying Styles
- Global styles: `/styles/globals.css`
- Component-specific styles: Add CSS classes or styled-components
- Responsive breakpoints are already configured

## 🚀 Deployment Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### 2. Netlify
```bash
# Build the project
npm run build

# Deploy the .next folder
```

### 3. Static Export
```bash
# Add to next.config.js:
# output: 'export'

npm run build
```

## 🛠️ Development Tips

### Hot Reload
The development server supports hot reload - changes appear instantly in the browser.

### TypeScript
- All components use TypeScript for type safety
- Add types for props in component interfaces
- VS Code provides excellent TypeScript support

### Performance
- Images are automatically optimized by Next.js
- Code is split automatically for better loading times
- Videos are optimized for web playback

## 📞 Support

If you encounter any issues:

1. **Check Node.js version** - Ensure you're using Node.js 18+
2. **Clear cache** - Delete `.next` folder and run `npm install` again
3. **Check console** - Browser and terminal console for error messages
4. **Restart server** - Stop (Ctrl+C) and restart the dev server

## 🔧 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

**Build errors:**
```bash
# Clear Next.js cache
rm -rf .next
npm install
npm run dev
```

**TypeScript errors:**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

---

## 📝 Next Steps

1. **Customize content** - Update text, images, and branding
2. **Add functionality** - Contact forms, blog, e-commerce
3. **Optimize SEO** - Add meta descriptions, structured data
4. **Deploy** - Choose a hosting platform and go live!

Happy coding! 🎉
