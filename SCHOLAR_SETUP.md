# Google Scholar Dynamic Updates

This project includes automatic Google Scholar metrics updates.

## 🚀 How It Works

1. **Python Script** ([scripts/fetch_scholar.py](scripts/fetch_scholar.py))
   - Fetches your latest Google Scholar metrics and publications
   - Saves data to `public/scholar_data.json`
   - Runs automatically via GitHub Actions

2. **GitHub Actions** ([.github/workflows/update-scholar.yml](.github/workflows/update-scholar.yml))
   - Runs every Sunday at 00:00 UTC
   - Can be triggered manually
   - Automatically commits updated data

3. **React Component**
   - Fetches `scholar_data.json` on page load
   - Displays loading state while fetching
   - Falls back to default values if fetch fails

## 📦 Setup Instructions

### Local Development

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the fetch script manually:**
   ```bash
   python scripts/fetch_scholar.py
   ```

3. **Start your React app:**
   ```bash
   npm start
   ```

### GitHub Actions Setup

The workflow is already configured! Just:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add dynamic Scholar metrics"
   git push origin main
   ```

2. **Enable GitHub Actions** in your repository settings (if not already enabled)

3. **Manual trigger** (optional):
   - Go to Actions tab in your GitHub repository
   - Select "Update Google Scholar Metrics"
   - Click "Run workflow"

## 🔄 Update Frequency

- **Automatic:** Every Sunday at midnight UTC
- **Manual:** Trigger anytime from GitHub Actions tab
- **On Push:** Runs when the fetch script or workflow file is modified

## 📊 Data Structure

The `scholar_data.json` file contains:

```json
{
  "metrics": {
    "name": "Your Name",
    "citations": 582,
    "hIndex": 14,
    "i10Index": 18,
    "lastUpdated": "January 31, 2026",
    "lastUpdatedISO": "2026-01-31T00:00:00"
  },
  "publications": [
    {
      "title": "Paper Title",
      "authors": "Authors",
      "year": "2024",
      "venue": "Journal Name",
      "citations": 45,
      "url": "https://...",
      "abstract": "Abstract..."
    }
  ],
  "fetchedAt": "2026-01-31T00:00:00"
}
```

## 🔧 Customization

### Change Update Frequency

Edit [.github/workflows/update-scholar.yml](.github/workflows/update-scholar.yml):

```yaml
schedule:
  - cron: '0 0 * * 0'  # Every Sunday
  # - cron: '0 0 * * *'  # Daily
  # - cron: '0 0 1 * *'  # Monthly
```

### Change Author ID

Your Scholar ID is already set in the script: `Fi5CddUAAAAJ`

To change it, edit `scripts/fetch_scholar.py`:

```python
AUTHOR_ID = 'YOUR_NEW_ID'
```

### Fetch More Publications

Edit `scripts/fetch_scholar.py`:

```python
for idx, pub in enumerate(author.get('publications', [])[:20], 1):  # Change 20 to desired number
```

## 🛠️ Troubleshooting

### Rate Limiting Issues

If Google Scholar blocks requests, uncomment the proxy code in `fetch_scholar.py`:

```python
pg = ProxyGenerator()
pg.FreeProxies()
scholarly.use_proxy(pg)
```

### GitHub Actions Not Running

- Check repository permissions: Settings → Actions → General → Workflow permissions
- Ensure "Read and write permissions" is enabled

### Data Not Updating in React

- Clear browser cache
- Check browser console for errors
- Verify `public/scholar_data.json` exists and is valid JSON

## 📝 Notes

- First run may take 2-3 minutes to fetch all publications
- GitHub Actions has a job timeout of 6 hours (more than enough)
- The fallback values ensure your site works even if the fetch fails

## 🎯 Deployment

This setup works with:
- **GitHub Pages**
- **Vercel**
- **Netlify**
- **Any static hosting**

Just ensure `public/scholar_data.json` is included in your deployment.
