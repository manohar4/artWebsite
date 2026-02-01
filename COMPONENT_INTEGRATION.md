# Ethereal Shadow Component Integration

## ✅ Integration Complete

The Ethereal Shadow component has been successfully integrated into your codebase.

## Project Status

Your project already supports:
- ✅ **TypeScript** - Configured in `tsconfig.json`
- ✅ **Tailwind CSS** - Configured in `tailwind.config.js`
- ✅ **framer-motion** - Already installed (v10.16.0)
- ✅ **Path aliases** - `@/*` points to `./src/*`

## Component Structure

### Created Files

1. **`/src/components/ui/etheral-shadow.tsx`**
   - Main component file
   - Uses Unsplash images for mask and noise textures
   - Fully typed with TypeScript

2. **`/src/components/ui/demo.tsx`**
   - Demo component showing usage example

3. **`/src/components/ui/README.md`**
   - Component documentation

## Why `/components/ui` Folder?

The `/components/ui` folder follows the shadcn/ui convention:
- **Separation of concerns**: UI components vs. feature components
- **Reusability**: Easy to find and reuse across the app
- **Consistency**: Standard structure for component libraries
- **Scalability**: Easy to add more UI components later

## Usage Examples

### Basic Usage

```tsx
import { Component } from "@/components/ui/etheral-shadow";

<Component
  color="rgba(128, 128, 128, 1)"
  animation={{ scale: 100, speed: 90 }}
  noise={{ opacity: 1, scale: 1.2 }}
  sizing="fill"
/>
```

### With Custom Content

```tsx
<Component
  color="rgba(139, 69, 19, 0.8)"
  animation={{ scale: 50, speed: 50 }}
  showDefaultText={false}
>
  <h2 className="text-4xl font-bold">Your Custom Text</h2>
</Component>
```

### Minimal Usage

```tsx
<Component
  color="rgba(0, 0, 0, 0.5)"
  sizing="stretch"
/>
```

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | string | `'rgba(128, 128, 128, 1)'` | Shadow color in rgba format |
| `animation` | object | undefined | Animation configuration |
| `animation.scale` | number | - | 1-100, controls displacement scale |
| `animation.speed` | number | - | 1-100, controls animation speed |
| `noise` | object | undefined | Noise texture configuration |
| `noise.opacity` | number | - | 0-1, noise opacity |
| `noise.scale` | number | - | Noise scale multiplier |
| `sizing` | 'fill' \| 'stretch' | `'fill'` | Mask sizing behavior |
| `className` | string | undefined | Additional CSS classes |
| `style` | CSSProperties | undefined | Inline styles |
| `children` | ReactNode | undefined | Custom content to display |
| `showDefaultText` | boolean | `true` | Show/hide default "Ethereal Shadows" text |

## Assets

The component currently uses Unsplash images:
- **Mask image**: Abstract cloud/smoke pattern for shadow effect
- **Noise texture**: Subtle texture pattern for overlay

You can replace these URLs in the component file with your own assets:
- Line ~90: `maskImageUrl`
- Line ~92: `noiseImageUrl`

## Integration Points

### Suggested Usage Locations

1. **Hero Section** - Add dramatic shadow effects to hero images
2. **Background Overlays** - Use as decorative background elements
3. **Section Dividers** - Create visual separation between sections
4. **Modal Overlays** - Add depth to modal backgrounds
5. **Artwork Showcases** - Enhance artwork displays with shadow effects

### Example Integration

Add to your `Logo.tsx` or hero section:

```tsx
import { Component } from "@/components/ui/etheral-shadow";

// In your component
<div className="relative w-full h-screen">
  <Component
    color="rgba(139, 69, 19, 0.3)"
    animation={{ scale: 30, speed: 40 }}
    sizing="fill"
    showDefaultText={false}
  />
  {/* Your content here */}
</div>
```

## Dependencies

All required dependencies are already installed:
- ✅ `framer-motion` (v10.16.0)
- ✅ `react` (v18.2.0)
- ✅ `react-dom` (v18.2.0)

## Next Steps

1. **Test the component**: Import and use it in a page
2. **Customize assets**: Replace Unsplash URLs with your own images
3. **Adjust styling**: Modify colors and animation values to match your design
4. **Integrate**: Add to your hero section or other areas as needed

## Troubleshooting

### Component not showing
- Check that `text-foreground` CSS variable is defined (already added to globals.css)
- Verify framer-motion is installed: `npm list framer-motion`

### Animation not working
- Ensure `animation` prop is provided with `scale > 0`
- Check browser console for errors

### Images not loading
- Verify Unsplash URLs are accessible
- Replace with local assets if needed

## Notes

- The component uses SVG filters for advanced visual effects
- Animation performance is optimized with proper cleanup
- All TypeScript types are properly defined
- Component is fully responsive

