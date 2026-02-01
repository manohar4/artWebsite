# Images Folder Structure

This folder contains all the artwork images organized by category.

## Folder Structure

```
images/
├── paintings/           # Oil, acrylic, watercolor paintings
├── digital-art/         # Digital paintings and illustrations
├── photography/         # Photography works
├── sketches/            # Pencil, charcoal drawings
├── sculptures/          # 3D artwork and sculptures
├── mixed-media/         # Mixed media pieces
└── icons/              # Icons and small graphics
```

## Image Guidelines

- **Format**: Use JPG for photos, PNG for graphics with transparency
- **Resolution**: Minimum 1200x800px for artwork display
- **File Size**: Optimize images to be under 2MB for web performance
- **Naming**: Use descriptive names with hyphens (e.g., `sunset-serenity.jpg`)

## Recommended Image Sizes

- **Thumbnail**: 300x200px
- **Gallery**: 600x400px
- **Full View**: 1200x800px
- **Hero Images**: 1920x1080px

## Image Optimization

Consider using Next.js Image component for automatic optimization:
- WebP format support
- Responsive images
- Lazy loading
- Automatic sizing

## Adding New Images

1. Place images in appropriate category folder
2. Update the artworks data file
3. Ensure proper naming convention
4. Optimize for web use
