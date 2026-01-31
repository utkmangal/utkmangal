# Quick Start Guide - Portfolio Enhancements

## 🚀 Getting Started

### Step 1: Install Dependencies
```bash
npm install
```

This will install the new packages:
- `react-helmet-async` - For SEO meta tags
- `framer-motion` - For smooth animations
- `react-intersection-observer` - For scroll-based animations

### Step 2: Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see your enhanced portfolio.

### Step 3: Test Features

#### Language Toggle
- Click the language button in the header (shows "한국어" when in English, "English" when in Korean)
- Navigate through all sections to verify translations
- Check that preference persists on page reload

#### Dark Mode
- Click the sun/moon icon in the header
- Verify all sections look good in dark mode
- Check that preference persists on page reload

#### New Sections
Navigate through:
1. **About** - Your complete professional profile
2. **Research** - Enhanced with better layout
3. **Projects** - All research projects
4. **Awards** - Your achievements timeline
5. **Teaching** - Courses and mentoring
6. **Contact** - Full contact form

### Step 4: Customize Content

#### Update Your Information

1. **Profile Picture**: Replace `/utkmangal/profile.jpg` with your photo

2. **About Section** (`src/sections/About.jsx`):
   - Edit `profile` object for basic info
   - Update `education` array with your degrees
   - Modify `experience` array with your positions
   - Customize `interests` and `skills`

3. **Projects** (`src/sections/Projects.jsx`):
   - Edit the `projects` array
   - Add/remove projects as needed
   - Update status, funding, team info

4. **Awards** (`src/sections/Awards.jsx`):
   - Modify the `awards` array
   - Add your recognitions

5. **Teaching** (`src/sections/Teaching.jsx`):
   - Update `courses` array
   - Modify `students` counts
   - Add `workshops`

6. **Contact** (`src/sections/Contact.jsx`):
   - Update `contactInfo` with your actual details
   - Modify `socialLinks` with your URLs
   - Configure email form backend (if needed)

### Step 5: Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Step 6: Preview Production Build

```bash
npm run preview
```

This lets you test the production build locally before deploying.

### Step 7: Deploy

```bash
npm run deploy
```

This deploys to GitHub Pages (configured in package.json).

## 🎯 Quick Tips

### Language Files
All translations are in `src/i18n/translations.js`. To add/modify text:
1. Find the key in the `en` object
2. Add/modify the corresponding `ko` translation
3. Use in components: `t.section.key`

### Colors & Styling
- Light mode: Standard TailwindCSS classes
- Dark mode: Add `dark:` prefix (e.g., `dark:bg-slate-900`)
- Blue theme: Default is blue-600, modify in Tailwind classes

### Adding a New Section
1. Create component in `src/sections/YourSection.jsx`
2. Import in `App.jsx`
3. Add to navigation object with translations
4. Add conditional render: `{activeTab === 'yoursection' && <YourSection />}`

## 🐛 Troubleshooting

### Dependencies Won't Install
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Fails
Check console for errors. Common issues:
- Missing imports
- Syntax errors
- Image paths incorrect

### Dark Mode Not Working
Verify `tailwind.config.js` has `darkMode: 'class'`

### Language Toggle Not Working
Check that `LanguageProvider` wraps the app in `main.jsx`

### Animations Not Smooth
Reduce animation duration in `AnimatedSection.jsx`:
```jsx
transition={{ duration: 0.3, delay }}  // Instead of 0.6
```

## 📱 Testing on Mobile

### Use Dev Tools
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test different screen sizes:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1440px

### Check:
- [ ] Mobile navigation appears and works
- [ ] All sections are readable
- [ ] Forms are usable
- [ ] Images scale properly
- [ ] Buttons are tappable (min 44px)

## 🎨 Customization Examples

### Change Primary Color from Blue to Purple
Replace `blue` with `purple` in class names:
```jsx
// Before
className="bg-blue-600 text-white"

// After
className="bg-purple-600 text-white"
```

### Adjust Animation Speed
In `AnimatedSection.jsx`:
```jsx
transition={{ duration: 0.4, delay }} // Faster
```

### Add New Language (e.g., Spanish)
In `src/i18n/translations.js`:
```javascript
export const translations = {
  en: { ... },
  ko: { ... },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Acerca',
      // ... add all keys
    }
  }
};
```

## ✅ Pre-Deployment Checklist

- [ ] All links work and open correctly
- [ ] Contact form shows success/error messages
- [ ] Images load properly
- [ ] Both languages display correctly
- [ ] Dark mode works in all sections
- [ ] Mobile navigation functions
- [ ] Build completes without errors
- [ ] Preview looks good
- [ ] Scholar data updates automatically
- [ ] No console errors
- [ ] Meta tags are correct (check with Facebook Debugger)

## 🎉 You're Ready!

Your portfolio is now a comprehensive, bilingual, feature-rich platform ready to showcase your work to a global audience!

Need help? Check:
- `IMPLEMENTATION_SUMMARY.md` - Detailed feature documentation
- Component files - Inline comments explain functionality
- React docs - https://react.dev
- TailwindCSS docs - https://tailwindcss.com
