#!/usr/bin/env python3
"""
Fetch Google Scholar metrics and publications dynamically.
Run this script to update scholar_data.json with latest metrics.
"""

from scholarly import scholarly, ProxyGenerator
import json
from datetime import datetime
import sys
import os

def get_scholar_data(author_id):
    """Fetch data from Google Scholar profile"""
    print(f"Fetching data for author ID: {author_id}")
    
    try:
        # Optional: Set up proxy to avoid rate limiting
        # pg = ProxyGenerator()
        # pg.FreeProxies()
        # scholarly.use_proxy(pg)
        
        # Search for author
        author = scholarly.search_author_id(author_id)
        author = scholarly.fill(author)
        
        print(f"Found author: {author.get('name', 'Unknown')}")
        
        # Extract metrics
        metrics = {
            'name': author.get('name', ''),
            'citations': author.get('citedby', 0),
            'hIndex': author.get('hindex', 0),
            'i10Index': author.get('i10index', 0),
            'lastUpdated': datetime.now().strftime('%B %d, %Y'),
            'lastUpdatedISO': datetime.now().isoformat()
        }
        
        print(f"Citations: {metrics['citations']}, h-index: {metrics['hIndex']}, i10-index: {metrics['i10Index']}")
        
        # Extract publications
        publications = []
        print("Fetching publications...")
        
        for idx, pub in enumerate(author.get('publications', [])[:20], 1):  # Top 20
            try:
                print(f"  Processing publication {idx}...")
                pub_filled = scholarly.fill(pub)
                
                pub_data = {
                    'title': pub_filled['bib'].get('title', 'Untitled'),
                    'authors': pub_filled['bib'].get('author', ''),
                    'year': pub_filled['bib'].get('pub_year', 'N/A'),
                    'venue': pub_filled['bib'].get('venue', ''),
                    'citations': pub_filled.get('num_citations', 0),
                    'url': pub_filled.get('pub_url', ''),
                    'abstract': pub_filled['bib'].get('abstract', '')[:200] + '...' if pub_filled['bib'].get('abstract') else ''
                }
                
                publications.append(pub_data)
                
            except Exception as e:
                print(f"  Warning: Could not process publication {idx}: {e}")
                continue
        
        # Sort by citations
        publications.sort(key=lambda x: x['citations'], reverse=True)
        print(f"Successfully fetched {len(publications)} publications")
        
        return metrics, publications
        
    except Exception as e:
        print(f"Error fetching Scholar data: {e}")
        return None, None

def main():
    # Your Google Scholar author ID
    AUTHOR_ID = 'Fi5CddUAAAAJ'
    
    print("=" * 60)
    print("Google Scholar Data Fetcher")
    print("=" * 60)
    
    metrics, publications = get_scholar_data(AUTHOR_ID)
    
    if metrics and publications:
        # Prepare data structure
        data = {
            'metrics': metrics,
            'publications': publications,
            'fetchedAt': datetime.now().isoformat()
        }
        
        # Determine output path (works both locally and in GitHub Actions)
        output_dir = os.path.join(os.path.dirname(__file__), '..', 'public')
        os.makedirs(output_dir, exist_ok=True)
        output_file = os.path.join(output_dir, 'scholar_data.json')
        
        # Save to JSON
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print("=" * 60)
        print(f"✅ Success! Data saved to {output_file}")
        print(f"   - {len(publications)} publications")
        print(f"   - {metrics['citations']} total citations")
        print("=" * 60)
        
        return 0
    else:
        print("❌ Failed to fetch Scholar data")
        return 1

if __name__ == '__main__':
    sys.exit(main())
