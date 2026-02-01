# UI Components

This directory contains reusable UI components following shadcn/ui structure.

## Components

### Ethereal Shadow (`etheral-shadow.tsx`)

An animated shadow overlay component with customizable effects.

**Features:**
- Animated shadow effects using SVG filters
- Customizable color, animation speed, and scale
- Noise texture overlay option
- Responsive sizing options

**Usage:**

```tsx
import { Component } from "@/components/ui/etheral-shadow";

<Component
  color="rgba(128, 128, 128, 1)"
  animation={{ scale: 100, speed: 90 }}
  noise={{ opacity: 1, scale: 1.2 }}
  sizing="fill"
/>
```

**Props:**
- `color` (string): Shadow color in rgba format
- `animation` (object): Animation configuration
  - `scale` (number): 1-100, controls displacement scale
  - `speed` (number): 1-100, controls animation speed
- `noise` (object): Noise texture configuration
  - `opacity` (number): 0-1, noise opacity
  - `scale` (number): Noise scale multiplier
- `sizing` ('fill' | 'stretch'): Mask sizing behavior
- `className` (string): Additional CSS classes
- `style` (CSSProperties): Inline styles

**Note:** The component uses Unsplash images for mask and noise textures. You can replace these URLs in the component file with your own assets.

