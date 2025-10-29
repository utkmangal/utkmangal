# GitHub Pages Research Portfolio - Setup Instructions

## OBJECTIVE
Create and deploy a professional academic research portfolio website using GitHub Pages to showcase publications, research areas, and professional profile.

## PREREQUISITES
- GitHub account
- Git installed locally
- Access to research data: `citations.csv` (50+ publications, 2017-2024)
- CV/Resume files
- Professional headshot photo
- Text editor or IDE

## INPUT DATA
```
Working Directory: d:\Dropbox\CV\
Available Files:
  - citations.csv (62 publications)
  - Utkarsh Mangal_CV.docx
  - Utkarsh Mangal_CV2025.pdf
```

## OUTPUT DELIVERABLE
Fully functional GitHub Pages website at `https://[username].github.io/` with:
- Home/About page
- Publications database (searchable/filterable)
- Research areas showcase
- Interactive CV page
- Contact information
- Downloadable assets

---

## IMPLEMENTATION PROTOCOL

### PHASE 1: REPOSITORY INITIALIZATION

**TASK 1.1: Create GitHub Repository**
```
ACTION: Create new repository
NAME: [your-username].github.io
VISIBILITY: Public
INITIALIZATION: Include README.md
SETTINGS: Enable GitHub Pages (Source: main branch)
```

**TASK 1.2: Clone Repository Locally**
```bash
git clone https://github.com/[username]/[username].github.io.git
cd [username].github.io
```

**TASK 1.3: Initialize Jekyll Structure**
```bash
# Option A: Use existing theme
git clone [theme-url] .

# Option B: Create from scratch
mkdir -p assets/{css,js,images/research,files} data _layouts _includes
```

---

### PHASE 2: CONFIGURATION FILES

**TASK 2.1: Create _config.yml**
```yaml
# Site Settings
title: "Dr. Utkarsh Mangal - Research Portfolio"
description: "Applied Interface Microbiology & Orthodontic Technology Research"
url: "https://utkmangal.github.io"
baseurl: ""

# Author Information
author:
  name: "Dr. Utkarsh Mangal"
  email: "mangal@yonsei.ac.kr"
  bio: "Researcher in Applied Interface Microbiology and Orthodontic Technology"
  location: "[Location]"
  orcid: "[ORCID-ID]"
  google_scholar: "[Scholar-ID]"

# Build Settings
markdown: kramdown
theme: minima
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap

# Collections
collections:
  publications:
    output: true
    permalink: /publications/:title/

# Defaults
defaults:
  - scope:
      path: ""
    values:
      layout: "default"
```

**TASK 2.2: Create .gitignore**
```
_site/
.sass-cache/
.jekyll-cache/
.jekyll-metadata
.DS_Store
Gemfile.lock
*.swp
*.swo
node_modules/
```

**TASK 2.3: Create Gemfile**
```ruby
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
gem "jekyll-feed"
gem "jekyll-seo-tag"
gem "jekyll-sitemap"
```

---

### PHASE 3: DATA PROCESSING

**TASK 3.1: Convert citations.csv to JSON**
```python
# Script: process_citations.py
import csv
import json
from collections import defaultdict

def process_citations(csv_file):
    publications = []
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            pub = {
                "authors": row['Authors'].strip(),
                "title": row['Title'].strip(),
                "journal": row['Publication'].strip(),
                "volume": row['Volume'].strip(),
                "number": row['Number'].strip(),
                "pages": row['Pages'].strip(),
                "year": int(row['Year']) if row['Year'] else None,
                "publisher": row['Publisher'].strip()
            }
            publications.append(pub)
    
    # Sort by year (descending)
    publications.sort(key=lambda x: x['year'], reverse=True)
    
    # Save as JSON
    with open('data/publications.json', 'w', encoding='utf-8') as f:
        json.dump(publications, f, indent=2, ensure_ascii=False)
    
    return publications

# Execute
publications = process_citations('citations.csv')
print(f"Processed {len(publications)} publications")
```

**TASK 3.2: Generate Publication Statistics**
```python
# Script: generate_stats.py
def generate_statistics(publications):
    stats = {
        "total_publications": len(publications),
        "years_active": f"{min(p['year'] for p in publications)}-{max(p['year'] for p in publications)}",
        "publications_by_year": defaultdict(int),
        "journals": set(),
        "co_authors": set()
    }
    
    for pub in publications:
        stats["publications_by_year"][pub['year']] += 1
        stats["journals"].add(pub['journal'])
        # Parse authors
        authors = [a.strip() for a in pub['authors'].split(';') if a.strip()]
        stats["co_authors"].update(authors)
    
    stats["unique_journals"] = len(stats["journals"])
    stats["unique_coauthors"] = len(stats["co_authors"])
    
    return stats
```

**TASK 3.3: Create BibTeX Export**
```python
# Script: export_bibtex.py
def generate_bibtex(publications):
    bibtex = []
    for i, pub in enumerate(publications, 1):
        first_author = pub['authors'].split(',')[0].replace(' ', '')
        entry = f"""@article{{{first_author}{pub['year']}_{i},
  author = {{{pub['authors']}}},
  title = {{{pub['title']}}},
  journal = {{{pub['journal']}}},
  volume = {{{pub['volume']}}},
  number = {{{pub['number']}}},
  pages = {{{pub['pages']}}},
  year = {{{pub['year']}}},
  publisher = {{{pub['publisher']}}}
}}"""
        bibtex.append(entry)
    
    with open('assets/files/publications.bib', 'w') as f:
        f.write('\n\n'.join(bibtex))
```

---

### PHASE 4: PAGE CREATION

**TASK 4.1: Create index.html (Home Page)**
```html
---
layout: default
title: Home
---

<div class="hero-section">
  <div class="profile-image">
    <img src="assets/images/profile.jpg" alt="Dr. Utkarsh Mangal">
  </div>
  <h1>Dr. Utkarsh Mangal</h1>
  <h2>Dental Biomaterials & Orthodontic Technology Researcher</h2>
</div>

<section class="about">
  <h3>About Me</h3>
  <p>
    Researcher specializing in advanced dental biomaterials, 3D-printed orthodontic appliances,
    and biofilm-resistant materials. Published 50+ peer-reviewed articles across leading journals
    in dental materials science.
  </p>
</section>

<section class="research-highlights">
  <h3>Research Areas</h3>
  <div class="research-cards">
    <div class="card">
      <h4>Dental Biomaterials</h4>
      <p>Nanodiamonds, zwitterionic materials, cerium oxide nanozymes</p>
    </div>
    <div class="card">
      <h4>3D-Printed Appliances</h4>
      <p>Resin-based biomedical devices, clear aligners, dental prostheses</p>
    </div>
    <div class="card">
      <h4>Orthodontic Technology</h4>
      <p>Miniscrew implants, CBCT analysis, digital orthodontics</p>
    </div>
    <div class="card">
      <h4>Biofilm Resistance</h4>
      <p>Antibacterial materials, fungal resistance, oral microbiome studies</p>
    </div>
  </div>
</section>

<section class="statistics">
  <h3>Research Impact</h3>
  <div class="stats-grid">
    <div class="stat">
      <span class="number">50+</span>
      <span class="label">Publications</span>
    </div>
    <div class="stat">
      <span class="number">2017-2024</span>
      <span class="label">Years Active</span>
    </div>
    <div class="stat">
      <span class="number">30+</span>
      <span class="label">Journals</span>
    </div>
    <div class="stat">
      <span class="number">100+</span>
      <span class="label">Co-authors</span>
    </div>
  </div>
</section>
```

**TASK 4.2: Create publications.html**
```html
---
layout: default
title: Publications
---

<h1>Publications</h1>

<div class="publications-controls">
  <input type="text" id="search-box" placeholder="Search publications...">
  
  <select id="year-filter">
    <option value="all">All Years</option>
    <option value="2024">2024</option>
    <option value="2023">2023</option>
    <option value="2022">2022</option>
    <option value="2021">2021</option>
    <option value="2020">2020</option>
    <option value="2019">2019</option>
    <option value="2018">2018</option>
    <option value="2017">2017</option>
  </select>
  
  <button id="export-bibtex">Export BibTeX</button>
</div>

<div id="publications-container">
  <!-- Populated by JavaScript -->
</div>

<script src="assets/js/publications.js"></script>
```

**TASK 4.3: Create research.html**
```html
---
layout: default
title: Research
---

<h1>Research Areas</h1>

<section class="research-area">
  <h2>1. Advanced Dental Biomaterials</h2>
  <p><strong>Focus:</strong> Development of novel biomaterials incorporating nanodiamonds, 
  zwitterionic compounds, and metal oxide nanoparticles for enhanced mechanical and 
  biological properties.</p>
  
  <h3>Key Publications:</h3>
  <ul>
    <li>Nanodiamonds in PMMA-based dental appliances (2019, 2020)</li>
    <li>Zwitterionic materials for biofilm resistance (2020-2023)</li>
    <li>Cerium oxide nanozymes for cytoprotective surfaces (2023)</li>
  </ul>
</section>

<section class="research-area">
  <h2>2. 3D-Printed Orthodontic Devices</h2>
  <p><strong>Focus:</strong> Optimization of 3D-printed dental appliances including 
  clear aligners, intraoral appliances, and prosthetic devices.</p>
  
  <h3>Key Publications:</h3>
  <ul>
    <li>Mechanical properties of 3D-printed resin appliances (2020)</li>
    <li>Post-processing of 3D-printed aligners (2024)</li>
    <li>Surface treatment for biofilm resistance (2024)</li>
  </ul>
</section>

<section class="research-area">
  <h2>3. Orthodontic Technology & Clinical Applications</h2>
  <p><strong>Focus:</strong> Clinical studies on orthodontic devices, CBCT analysis, 
  and digital treatment planning methods.</p>
  
  <h3>Key Publications:</h3>
  <ul>
    <li>Miniscrew primary stability studies (2020)</li>
    <li>CBCT-based asymmetry analysis (2021, 2023)</li>
    <li>AI-based digital model analysis (2023)</li>
  </ul>
</section>

<section class="research-area">
  <h2>4. Oral Microbiome & Biofilm Studies</h2>
  <p><strong>Focus:</strong> Understanding oral microbial communities and developing 
  materials with enhanced bacterial resistance.</p>
  
  <h3>Key Publications:</h3>
  <ul>
    <li>16S rRNA sequencing of oral microbiome (2022)</li>
    <li>Multistability in oral microbiota (2023)</li>
    <li>Antibacterial dental materials (2020-2024)</li>
  </ul>
</section>
```

**TASK 4.4: Create cv.html**
```html
---
layout: default
title: Curriculum Vitae
---

<h1>Curriculum Vitae</h1>

<div class="cv-download">
  <a href="assets/files/CV.pdf" class="btn" download>Download PDF</a>
</div>

<section class="cv-section">
  <h2>Education</h2>
  <!-- Add education details -->
</section>

<section class="cv-section">
  <h2>Research Experience</h2>
  <!-- Add research positions -->
</section>

<section class="cv-section">
  <h2>Publications Summary</h2>
  <ul>
    <li>Peer-reviewed Articles: 50+</li>
    <li>Years Active: 2017-2024</li>
    <li>H-index: [to be calculated]</li>
    <li>Total Citations: [to be added]</li>
  </ul>
</section>

<section class="cv-section">
  <h2>Research Interests</h2>
  <ul>
    <li>Dental Biomaterials Development</li>
    <li>3D-Printed Orthodontic Appliances</li>
    <li>Biofilm-Resistant Materials</li>
    <li>Digital Orthodontics & AI Applications</li>
    <li>Craniofacial Imaging Analysis</li>
  </ul>
</section>
```

**TASK 4.5: Create contact.html**
```html
---
layout: default
title: Contact
---

<h1>Contact Information</h1>

<section class="contact-info">
  <div class="contact-item">
    <h3>Email</h3>
    <p>[your-email@institution.edu]</p>
  </div>
  
  <div class="contact-item">
    <h3>ORCID</h3>
    <p><a href="https://orcid.org/[ORCID-ID]" target="_blank">[ORCID-ID]</a></p>
  </div>
  
  <div class="contact-item">
    <h3>Google Scholar</h3>
    <p><a href="https://scholar.google.com/citations?user=[ID]" target="_blank">View Profile</a></p>
  </div>
  
  <div class="contact-item">
    <h3>ResearchGate</h3>
    <p><a href="https://www.researchgate.net/profile/[Profile]" target="_blank">View Profile</a></p>
  </div>
  
  <div class="contact-item">
    <h3>LinkedIn</h3>
    <p><a href="https://www.linkedin.com/in/[profile]" target="_blank">Connect</a></p>
  </div>
</section>
```

---

### PHASE 5: STYLING & INTERACTIVITY

**TASK 5.1: Create assets/css/style.css**
```css
/* Main Stylesheet */
:root {
  --primary-color: #003366;
  --secondary-color: #0066cc;
  --accent-color: #00cccc;
  --text-color: #333333;
  --bg-color: #ffffff;
  --light-gray: #f5f5f5;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--bg-color);
}

/* Navigation */
nav {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

nav a:hover {
  color: var(--accent-color);
}

/* Hero Section */
.hero-section {
  text-align: center;
  padding: 8rem 2rem 4rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
}

.profile-image img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 5px solid white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

/* Research Cards */
.research-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

/* Publication List */
.publication-item {
  background: white;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-left: 4px solid var(--secondary-color);
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.publication-item:hover {
  background: var(--light-gray);
}

/* Statistics Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  padding: 2rem;
  text-align: center;
}

.stat .number {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--secondary-color);
}

/* Responsive */
@media (max-width: 768px) {
  nav ul {
    flex-direction: column;
    gap: 1rem;
  }
  
  .research-cards {
    grid-template-columns: 1fr;
  }
}
```

**TASK 5.2: Create assets/js/publications.js**
```javascript
// Publications Management Script
let publicationsData = [];

// Load publications on page load
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('data/publications.json');
    publicationsData = await response.json();
    displayPublications(publicationsData);
    setupEventListeners();
  } catch (error) {
    console.error('Error loading publications:', error);
  }
});

// Display publications
function displayPublications(publications) {
  const container = document.getElementById('publications-container');
  container.innerHTML = '';
  
  // Group by year
  const byYear = publications.reduce((acc, pub) => {
    if (!acc[pub.year]) acc[pub.year] = [];
    acc[pub.year].push(pub);
    return acc;
  }, {});
  
  // Display by year (descending)
  Object.keys(byYear).sort((a, b) => b - a).forEach(year => {
    const yearSection = document.createElement('div');
    yearSection.className = 'year-section';
    yearSection.innerHTML = `<h2>${year}</h2>`;
    
    byYear[year].forEach(pub => {
      const pubDiv = document.createElement('div');
      pubDiv.className = 'publication-item';
      pubDiv.innerHTML = `
        <h3>${pub.title}</h3>
        <p class="authors">${pub.authors}</p>
        <p class="journal">
          <em>${pub.journal}</em>${pub.volume ? `, ${pub.volume}` : ''}${pub.number ? `(${pub.number})` : ''}${pub.pages ? `, ${pub.pages}` : ''}. ${pub.publisher}
        </p>
      `;
      yearSection.appendChild(pubDiv);
    });
    
    container.appendChild(yearSection);
  });
}

// Search functionality
function searchPublications(query) {
  const filtered = publicationsData.filter(pub => 
    pub.title.toLowerCase().includes(query.toLowerCase()) ||
    pub.authors.toLowerCase().includes(query.toLowerCase()) ||
    pub.journal.toLowerCase().includes(query.toLowerCase())
  );
  displayPublications(filtered);
}

// Filter by year
function filterByYear(year) {
  if (year === 'all') {
    displayPublications(publicationsData);
  } else {
    const filtered = publicationsData.filter(pub => pub.year === parseInt(year));
    displayPublications(filtered);
  }
}

// Export to BibTeX
function exportBibTeX() {
  window.location.href = 'assets/files/publications.bib';
}

// Setup event listeners
function setupEventListeners() {
  const searchBox = document.getElementById('search-box');
  const yearFilter = document.getElementById('year-filter');
  const exportBtn = document.getElementById('export-bibtex');
  
  if (searchBox) {
    searchBox.addEventListener('input', (e) => searchPublications(e.target.value));
  }
  
  if (yearFilter) {
    yearFilter.addEventListener('change', (e) => filterByYear(e.target.value));
  }
  
  if (exportBtn) {
    exportBtn.addEventListener('click', exportBibTeX);
  }
}
```

---

### PHASE 6: LAYOUT TEMPLATES

**TASK 6.1: Create _layouts/default.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ page.title }} - {{ site.title }}</title>
  <meta name="description" content="{{ site.description }}">
  <link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">
  {% seo %}
</head>
<body>
  {% include header.html %}
  
  <main>
    {{ content }}
  </main>
  
  {% include footer.html %}
</body>
</html>
```

**TASK 6.2: Create _includes/header.html**
```html
<nav>
  <ul>
    <li><a href="{{ '/' | relative_url }}">Home</a></li>
    <li><a href="{{ '/publications.html' | relative_url }}">Publications</a></li>
    <li><a href="{{ '/research.html' | relative_url }}">Research</a></li>
    <li><a href="{{ '/cv.html' | relative_url }}">CV</a></li>
    <li><a href="{{ '/contact.html' | relative_url }}">Contact</a></li>
  </ul>
</nav>
```

**TASK 6.3: Create _includes/footer.html**
```html
<footer>
  <p>&copy; {{ 'now' | date: "%Y" }} {{ site.author.name }}. All rights reserved.</p>
  <p>
    <a href="https://orcid.org/{{ site.author.orcid }}" target="_blank">ORCID</a> |
    <a href="https://scholar.google.com/citations?user={{ site.author.google_scholar }}" target="_blank">Google Scholar</a> |
    <a href="https://github.com/{{ site.github_username }}" target="_blank">GitHub</a>
  </p>
</footer>
```

---

### PHASE 7: DEPLOYMENT

**TASK 7.1: Prepare Assets**
```bash
# Copy CV to assets folder
cp "Utkarsh Mangal_CV2025.pdf" assets/files/CV.pdf

# Add profile photo
# Place your photo at: assets/images/profile.jpg
```

**TASK 7.2: Run Data Processing Scripts**
```bash
# Process citations
python process_citations.py

# Generate statistics
python generate_stats.py

# Export BibTeX
python export_bibtex.py
```

**TASK 7.3: Test Locally**
```bash
# Install dependencies
bundle install

# Run local Jekyll server
bundle exec jekyll serve

# Open in browser: http://localhost:4000
```

**TASK 7.4: Deploy to GitHub**
```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Research portfolio setup"

# Push to GitHub
git push origin main
```

**TASK 7.5: Verify Deployment**
```
ACTION: Navigate to https://[username].github.io/
VERIFY: All pages load correctly
CHECK: Links, images, data display properly
TEST: Mobile responsiveness
VALIDATE: Search and filter functionality
```

---

### PHASE 8: SEO & OPTIMIZATION

**TASK 8.1: Add Schema.org Markup**
Add to head section:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dr. Utkarsh Mangal",
  "jobTitle": "Researcher",
  "affiliation": {
    "@type": "Organization",
    "name": "[Your Institution]"
  },
  "url": "https://[username].github.io",
  "sameAs": [
    "https://orcid.org/[ORCID-ID]",
    "https://scholar.google.com/citations?user=[ID]"
  ]
}
</script>
```

**TASK 8.2: Create robots.txt**
```
User-agent: *
Allow: /
Sitemap: https://[username].github.io/sitemap.xml
```

**TASK 8.3: Optimize Images**
```bash
# Compress profile photo
# Target: < 200KB
# Tools: TinyPNG, ImageOptim, or online compressors
```

---

## MAINTENANCE PROTOCOL

### Adding New Publications
```
1. Update citations.csv with new entry
2. Run: python process_citations.py
3. Run: python export_bibtex.py
4. Commit and push changes
5. GitHub Pages auto-rebuilds (3-5 minutes)
```

### Updating CV
```
1. Replace assets/files/CV.pdf with new version
2. Commit and push
```

### Adding Research Projects
```
1. Edit research.html
2. Add new section with description and publications
3. Update home page statistics if needed
4. Commit and push
```

---

## VERIFICATION CHECKLIST

- [ ] Repository created and GitHub Pages enabled
- [ ] All pages accessible (Home, Publications, Research, CV, Contact)
- [ ] Citations data converted and displaying correctly
- [ ] Search and filter functions working
- [ ] BibTeX export available
- [ ] CV PDF downloadable
- [ ] All links functional (internal and external)
- [ ] Mobile responsive design
- [ ] Profile photo displaying
- [ ] Statistics accurate
- [ ] Navigation menu working
- [ ] Footer links correct
- [ ] SEO meta tags present
- [ ] Site loads quickly (< 3 seconds)
- [ ] No console errors
- [ ] Cross-browser compatible (Chrome, Firefox, Safari, Edge)

---

## TROUBLESHOOTING

**Issue: GitHub Pages not building**
```
SOLUTION:
1. Check _config.yml syntax
2. Verify no liquid template errors
3. Check GitHub Actions tab for build errors
4. Ensure repository name matches [username].github.io
```

**Issue: Publications not displaying**
```
SOLUTION:
1. Verify data/publications.json exists and valid JSON
2. Check browser console for JavaScript errors
3. Confirm file path in publications.js is correct
4. Test JSON loading with: fetch('data/publications.json').then(r => r.json()).then(console.log)
```

**Issue: Styling not applying**
```
SOLUTION:
1. Clear browser cache
2. Verify CSS file path in default.html
3. Check for CSS syntax errors
4. Inspect element to see if styles loading
```

---

## NEXT STEPS

1. **Add Google Analytics** - Track visitor statistics
2. **Implement Blog** - Add research updates section
3. **Add Citation Metrics** - Integrate with Altmetric/Dimensions
4. **Create Interactive Visualizations** - D3.js charts for research impact
5. **Add Collaboration Network** - Visual co-author network
6. **Multi-language Support** - Add translations if needed
7. **Dark Mode** - Implement theme toggle
8. **RSS Feed** - Enable subscription to updates

---

## ESTIMATED TIMELINE

- **Phase 1-2 (Setup & Config):** 2-3 hours
- **Phase 3 (Data Processing):** 2-4 hours
- **Phase 4 (Page Creation):** 4-6 hours
- **Phase 5 (Styling & JS):** 3-5 hours
- **Phase 6 (Templates):** 1-2 hours
- **Phase 7 (Deployment):** 1-2 hours
- **Phase 8 (SEO):** 1-2 hours

**Total Estimated Time:** 14-24 hours (can be spread over multiple days)

---

## SUPPORT RESOURCES

- GitHub Pages Documentation: https://docs.github.com/pages
- Jekyll Documentation: https://jekyllrb.com/docs/
- Liquid Templates: https://shopify.github.io/liquid/
- Bootstrap Documentation: https://getbootstrap.com/docs/
- Chart.js: https://www.chartjs.org/

---

END OF INSTRUCTIONS
