# ELT Next.js 15 Boilerplate

A modern, feature-rich boilerplate for Next.js 15 applications with enterprise-level tooling and configurations.

## Features

- ⚡ **Next.js 15** - Built on the latest version of Next.js
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📝 **TypeScript** - Static type checking
- 🧪 **Vitest** - Unit testing setup
- 📚 **Storybook** - Component documentation and testing
- 🔍 **ESLint** - Code linting and formatting
- 🐶 **Husky** - Git hooks for code quality
- 📋 **Commitlint** - Standardized commit messages
- 🔄 **Environment Variables** - Configuration via `.env` files
- 🔒 **Sentry** - Error tracking and monitoring
- 🎯 **PostCSS** - CSS processing and optimization
- 📋 **Google Forms Integration** - Submit form data to Google Forms

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```
3. Copy the environment variables:
```bash
cp .env.example .env.local
```
4. Setup Google Form integration:
   - Create a Google Form with three fields: Name, Place, and Hobi
   - Get the form action URL and field entry IDs (see Google Forms Setup section below)
   - Update your `.env.local` file with the correct values

5. Start the development server:
```bash
pnpm dev
```

### Google Forms Setup

To set up Google Forms integration:

1. **Create a Google Form:**
   - Go to [Google Forms](https://forms.google.com)
   - Create a new form with three text fields: "Name", "Place", and "Hobi"

2. **Get the Form Action URL:**
   - In your form, click "Send" → "Link" tab
   - Copy the form URL (it should look like: `https://docs.google.com/forms/d/e/FORM_ID/viewform`)
   - Replace `viewform` with `formResponse` to get the action URL
   - Example: `https://docs.google.com/forms/u/0/d/e/FORM_ID/formResponse`

2. **Set up Google Sheets Integration:**
   - Follow the detailed instructions in `GOOGLE_SHEETS_SETUP.md`
   - Create a Google Sheet with headers: Name, Place, Hobi, Timestamp
   - Set up Google Apps Script and deploy it as a web app
   - Copy the web app URL for your environment variables

3. **Update `.env.local`:**
```env
GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```

## Available Scripts
- `pnpm dev` - Start development server
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm test` - Run Vitest tests
- `pnpm storybook` - Start Storybook development server
- `pnpm lint` - Run ESLint

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── submit/          # Google Forms submission API
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx            # Main form page
├── components/
│   ├── forms/
│   │   └── google-form.tsx # Main form component
│   └── ui/                 # shadcn/ui components
└── lib/
    └── validations/
        └── google-form.ts  # Form validation schema
```

## Features

### Form Validation
- Frontend validation with react-hook-form + zod
- Backend validation for security
- Real-time field validation with error messages

### Security
- Google Form entry IDs are never exposed to the frontend
- Server-side validation of all inputs
- Environment variables for sensitive data

### User Experience
- Loading states during form submission
- Success/error toast notifications using Sonner
- Responsive design with Tailwind CSS
- Clean, centered form layout

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Use conventional commits for version control
- Document components using Storybook
- Follow the project's ESLint rules

## Deployment

### Vercel (Recommended)

1. Push your code to a Git repository
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `GOOGLE_APPS_SCRIPT_URL`
4. Deploy!

### Other Platforms

Make sure to set the environment variables in your deployment platform before deploying.

## Troubleshooting

### Form Submission Issues

1. **Check Console Logs:** The API route logs all submission attempts
2. **Verify Environment Variables:** Make sure `GOOGLE_APPS_SCRIPT_URL` is set correctly  
3. **Test Google Apps Script Directly:** Use the test endpoint with Postman or curl
4. **Check Google Sheet:** Verify data is appearing in your Google Sheet

### Common Issues

- **"Server configuration error":** Missing environment variables
- **"Validation failed":** Check that all required fields are filled
- **"Failed to submit form":** Verify Google Form URL and entry IDs are correct
