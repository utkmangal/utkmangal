# 🚀 GitHub Pages Deployment Guide

## ✅ Status: READY TO DEPLOY

All critical issues have been fixed. Your portfolio is production-ready!

---

## 📋 Quick Deployment Steps

### Step 1: Initialize Git Repository (if not already done)
```bash
cd /mnt/d/Dropbox/CV
git init
```

### Step 2: Add All Files
```bash
git add .
```

### Step 3: Commit Changes
```bash
git commit -m "Initial commit: Research portfolio with professional design

- Complete publication database (62 entries, 2017-2025)
- Professional logo design with scientific details
- Comprehensive CV page with research areas and expertise
- Contact information and social media integration
- Responsive design with enhanced navigation
- SEO-optimized with Schema.org markup
- Searchable/filterable publications with BibTeX export"
```

### Step 4: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: **`utkmangal.github.io`** (must be exactly this)
3. Description: "Personal research portfolio - Dental Biomaterials & Interface Microbiology"
4. Visibility: **Public** (required for free GitHub Pages)
5. DO NOT initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 5: Connect and Push
```bash
# Add remote
git remote add origin https://github.com/utkmangal/utkmangal.github.io.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 6: Enable GitHub Pages
1. Go to repository Settings: https://github.com/utkmangal/utkmangal.github.io/settings
2. Scroll to "Pages" section (left sidebar)
3. Under "Source":
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**

### Step 7: Wait for Deployment
- GitHub Actions will build your site (2-5 minutes)
- Check status: https://github.com/utkmangal/utkmangal.github.io/actions
- Green checkmark = successful deployment

### Step 8: Access Your Live Site
**Your portfolio will be live at:**
```
https://utkmangal.github.io
```

---

## 🔧 Optional: Generate Favicons

After deployment, you can generate PNG favicon files:

### Option A: Using the Script (Recommended)
```bash
cd /mnt/d/Dropbox/CV

# Install ImageMagick (if not installed)
sudo apt update
sudo apt install imagemagick

# Run the script
./generate_favicons.sh

# Commit and push the new PNG files
git add assets/images/logo/*.png
git commit -m "Add PNG favicons for broader browser support"
git push
```

### Option B: Online Tool
1. Go to https://realfavicongenerator.net/
2. Upload `assets/images/logo/logo-square.svg`
3. Download generated package
4. Extract to `assets/images/logo/`
5. Commit and push:
```bash
git add assets/images/logo/
git commit -m "Add generated favicons"
git push
```

---

## 📝 Post-Deployment Checklist

After your site is live, verify these items:

### Functionality Tests:
- [ ] Home page loads correctly
- [ ] All navigation links work (Home, Publications, Research, CV, Contact)
- [ ] Publications page displays all 62 publications
- [ ] Search functionality works on publications page
- [ ] Year filter works (including 2025)
- [ ] BibTeX export button works
- [ ] CV PDF downloads correctly
- [ ] All external links work (ORCID, Scholar, GitHub)
- [ ] Contact information displays correctly
- [ ] Logo appears in navigation
- [ ] Favicon shows in browser tab

### Mobile Responsiveness:
- [ ] Site looks good on mobile devices
- [ ] Navigation is usable on small screens
- [ ] Cards and grids reflow properly
- [ ] Text is readable without zooming

### SEO & Metadata:
- [ ] Page titles show correctly in browser tabs
- [ ] Meta descriptions present (check View Source)
- [ ] Schema.org markup present (check View Source)
- [ ] Site appears in Google Search (may take days/weeks)

---

## 🔄 Updating Your Portfolio

### Adding New Publications:
```bash
# 1. Update citations.csv with new entry
# 2. Process the data
cd /mnt/d/Dropbox/CV
python process_citations.py
python export_bibtex.py

# 3. Commit and push
git add citations.csv data/ assets/files/publications.bib
git commit -m "Add new publication: [Title]"
git push
```

### Updating CV:
```bash
# 1. Update CV file
cp "path/to/new/CV.pdf" assets/files/CV.pdf

# 2. Edit cv.html if needed
# 3. Commit and push
git add assets/files/CV.pdf cv.html
git commit -m "Update CV"
git push
```

### Making Content Changes:
```bash
# 1. Edit HTML files as needed
# 2. Test locally (optional)
bundle exec jekyll serve

# 3. Commit and push
git add .
git commit -m "Update [description of changes]"
git push
```

GitHub Pages will automatically rebuild your site (1-2 minutes).

---

## 🐛 Troubleshooting

### Site Not Building?
1. Check GitHub Actions: https://github.com/utkmangal/utkmangal.github.io/actions
2. Look for error messages (usually YAML syntax errors)
3. Common issues:
   - Typo in `_config.yml`
   - Invalid Liquid syntax in HTML
   - Missing closing tags

### 404 Errors?
1. Ensure repository name is **exactly** `utkmangal.github.io`
2. Check that GitHub Pages is enabled in Settings
3. Wait 5 minutes after enabling (initial build takes time)

### CSS/JavaScript Not Loading?
1. Check file paths use `{{ '/assets/...' | relative_url }}`
2. Verify files exist in correct directories
3. Clear browser cache (Ctrl+Shift+R)

### Publications Not Displaying?
1. Check browser console (F12) for JavaScript errors
2. Verify `data/publications.json` exists and is valid JSON
3. Check `assets/js/publications.js` is loading

---

## 📊 Analytics Setup (Optional)

### Google Analytics 4:
1. Create GA4 property: https://analytics.google.com
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `_layouts/default.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```
4. Commit and push

---

## 🎯 Custom Domain (Optional)

If you want to use a custom domain (e.g., `utkarsh-mangal.com`):

1. Buy domain from registrar (Namecheap, Google Domains, etc.)
2. Add DNS records:
   ```
   Type: A
   Host: @
   Value: 185.199.108.153
   
   Type: A
   Host: @
   Value: 185.199.109.153
   
   Type: A
   Host: @
   Value: 185.199.110.153
   
   Type: A
   Host: @
   Value: 185.199.111.153
   
   Type: CNAME
   Host: www
   Value: utkmangal.github.io
   ```
3. In GitHub repository:
   - Settings → Pages → Custom domain
   - Enter your domain
   - Save
4. Create `CNAME` file in root:
   ```bash
   echo "your-domain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

---

## 📈 Success Metrics

After deployment, monitor:
- **GitHub Traffic**: Insights tab in repository
- **Google Analytics**: Visitor statistics (if configured)
- **Google Scholar**: Citations and profile visits
- **ORCID**: Profile views

---

## 🎉 You're All Set!

Your professional research portfolio is ready to go live. Execute the deployment steps above and your site will be accessible to the world!

**Questions or issues?** Check the troubleshooting section or GitHub Pages documentation:
- https://docs.github.com/pages
- https://jekyllrb.com/docs/

**Good luck with your portfolio! 🚀**
