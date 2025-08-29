# OpenGraph Image Creation Guide

## Image Requirements
- **Size**: 1200x630 pixels (recommended for OpenGraph)
- **Format**: JPG or PNG
- **File name**: `og-image.jpg` or `og-image.png`
- **Location**: Place in `/public/` folder

## Quick Ways to Create an OpenGraph Image:

### Option 1: Using the HTML Template
1. Open `og-image-template.html` in your browser
2. Take a screenshot (1200x630 pixels)
3. Save as `public/og-image.jpg`

### Option 2: Using Design Tools
- **Canva**: Use "Facebook Post" template (1200x630)
- **Figma**: Create frame with 1200x630 dimensions
- **Photoshop**: Create new document 1200x630 pixels

### Option 3: Using AI Tools
- **DALL-E**: "Create a 1200x630 OpenGraph image for a form submission website"
- **Midjourney**: Similar prompt
- **Stable Diffusion**: Generate with proper dimensions

## Design Tips:
- Keep text large and readable (minimum 24px)
- Use high contrast colors
- Include your app name/logo
- Keep important elements away from edges
- Test how it looks in different social platforms

## Current Settings in layout.tsx:
```tsx
images: [
  {
    url: '/og-image.jpg', // Change extension if using PNG
    width: 1200,
    height: 630,
    alt: 'Form Collection App - Secure Data Submission',
  },
],
```

## Update Instructions:
1. Add your image to `public/og-image.jpg`
2. Update the domain URL in `layout.tsx` (replace 'https://yourapp.com')
3. Customize the title, description, and Twitter handle
4. Test using Facebook's Sharing Debugger or Twitter's Card Validator
