#!/usr/bin/env python3
"""
Fetch Google Scholar metrics dynamically.
Run this script to update scholar_data.json with the latest metrics.
"""

from pathlib import Path
from scholarly import scholarly
import json
from datetime import datetime
import sys


BASE_DIR = Path(__file__).resolve().parent.parent
CACHE_FILE = BASE_DIR / 'public' / 'scholar_data.json'


def load_cached_data():
    """Load the most recent saved Scholar metrics if they exist."""
    if not CACHE_FILE.exists():
        return None

    try:
        with CACHE_FILE.open('r', encoding='utf-8') as handle:
            return json.load(handle)
    except Exception as exc:
        print(f"Warning: Could not read cached Scholar data: {exc}")
        return None

def get_scholar_metrics(author_id):
    """Fetch the latest metrics from Google Scholar."""
    print(f"Fetching data for author ID: {author_id}")
    
    try:
        author = scholarly.search_author_id(author_id)
        author = scholarly.fill(author)
        
        print(f"Found author: {author.get('name', 'Unknown')}")

        return {
            'name': author.get('name', ''),
            'citations': author.get('citedby', 0),
            'hIndex': author.get('hindex', 0),
            'i10Index': author.get('i10index', 0),
            'lastUpdated': datetime.now().strftime('%B %d, %Y'),
            'lastUpdatedISO': datetime.now().isoformat()
        }
        
    except Exception as e:
        print(f"Error fetching Scholar data: {e}")
        return None

def main():
    # Your Google Scholar author ID
    AUTHOR_ID = 'Fi5CddUAAAAJ'
    
    print("=" * 60)
    print("Google Scholar Data Fetcher")
    print("=" * 60)
    
    cached_data = load_cached_data()
    metrics = get_scholar_metrics(AUTHOR_ID)

    if metrics is None:
        if cached_data and cached_data.get('metrics'):
            print("Using cached Scholar data because live fetch failed.")
            cached_data['fetchedAt'] = datetime.now().isoformat()
            output_data = cached_data
        else:
            print("❌ Failed to fetch Scholar data and no cached data is available")
            return 1
    else:
        output_data = {
            'metrics': metrics,
            'fetchedAt': datetime.now().isoformat()
        }

    output_file = CACHE_FILE
    output_file.parent.mkdir(parents=True, exist_ok=True)

    with open(output_file, 'w', encoding='utf-8') as handle:
        json.dump(output_data, handle, indent=2, ensure_ascii=False)

    print("=" * 60)
    print(f"✅ Success! Data saved to {output_file}")
    print(f"   - {output_data['metrics'].get('citations', 0)} total citations")
    print("=" * 60)

    return 0

if __name__ == '__main__':
    sys.exit(main())
