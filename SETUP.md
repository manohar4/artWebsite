# 🎨 Sai Vindhya Art Portfolio - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Start Development Server
```bash
npm run dev
# or
yarn dev
```

### 3. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
artWebsite/
├── src/
│   ├── app/                 # Next.js 13+ app directory
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/          # Reusable components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Hero.tsx        # Hero section
│   │   ├── ArtCategories.tsx # Art categories grid
│   │   ├── FeaturedWorks.tsx # Featured artworks
│   │   ├── About.tsx       # About section
│   │   ├── Contact.tsx     # Contact form
│   │   └── Footer.tsx      # Footer
│   ├── styles/             # CSS and styling
│   │   └── globals.css     # Global styles + Tailwind
│   ├── types/              # TypeScript definitions
│   │   └── index.ts        # Type interfaces
│   ├── data/               # Sample data
│   │   └── artworks.ts     # Artwork data
│   └── utils/              # Utility functions
│       └── index.ts        # Helper functions
├── public/                 # Static assets
├── docs/                   # Documentation
└── scripts/                # Build scripts
```

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel ready

## 🎯 Key Features

### ✅ Implemented
- Responsive design with mobile-first approach
- Smooth animations and transitions
- Art categories and featured works
- Contact form with validation
- About section with artist story
- Footer with social links
- TypeScript support
- Tailwind CSS styling

### 🚧 Ready for Implementation
- Image gallery with lightbox
- Artwork search and filtering
- Individual artwork pages
- Blog/News section
- E-commerce integration
- Admin dashboard
- Image optimization
- SEO optimization

## 🖼️ Adding Your Artwork

### 1. Prepare Images
- Organize images by category in `src/assets/images/`
- Use recommended sizes (see images/README.md)
- Optimize for web (under 2MB)

### 2. Update Data
Edit `src/data/artworks.ts` to add your artwork:
```typescript
{
  id: 9,
  title: 'Your Artwork Title',
  category: 'Paintings',
  medium: 'Oil on Canvas',
  year: '2024',
  description: 'Description of your artwork...',
  image: '/images/paintings/your-artwork.jpg',
  likes: 0,
  views: 0,
  dimensions: '24" x 36"',
  price: 1500,
  available: true,
  tags: ['landscape', 'nature']
}
```

### 3. Update Content
- Modify text content in components
- Update contact information
- Customize colors in `tailwind.config.js`
- Add your social media links

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: {
    500: '#your-color-here',
    // ... other shades
  }
}
```

### Fonts
Update fonts in `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Your Font', 'system-ui', 'sans-serif'],
  serif: ['Your Serif Font', 'Georgia', 'serif']
}
```

### Animations
Customize animations in `tailwind.config.js`:
```javascript
animation: {
  'your-animation': 'yourKeyframes 1s ease-in-out'
}
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Build: `npm run build`
2. Export: `npm run export`
3. Deploy `out/` folder

### Manual
1. Build: `npm run build`
2. Start: `npm start`

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run export       # Export static files

# Package management
npm install          # Install dependencies
npm update           # Update dependencies
npm audit            # Security audit
```

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this template for your own projects!

## 🆘 Support

If you encounter any issues:
1. Check the console for errors
2. Verify all dependencies are installed
3. Ensure Node.js version is 18+
4. Check file paths and imports

## 🎉 Next Steps

After setup, consider adding:
- Real artwork images
- Custom domain
- Analytics (Google Analytics, Vercel Analytics)
- SEO optimization
- Performance monitoring
- Content management system
- E-commerce features

---

**Happy creating! 🎨✨**
