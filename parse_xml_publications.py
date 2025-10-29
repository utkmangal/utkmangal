#!/usr/bin/env python3
"""Parse EndNote XML and generate publications JSON"""
import xml.etree.ElementTree as ET
import json
import re

def clean_text(text):
    """Remove XML style tags and clean text"""
    if not text:
        return ""
    # Remove style tags
    text = re.sub(r'<style[^>]*>|</style>', '', text)
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def get_text_from_element(element):
    """Extract all text from element including nested style tags"""
    if element is None:
        return ""
    # Get all text content including from nested elements
    text = ''.join(element.itertext())
    return clean_text(text)

def parse_endnote_xml(xml_file):
    """Parse EndNote XML file and extract publication data"""
    tree = ET.parse(xml_file)
    root = tree.getroot()
    
    publications = []
    
    for record in root.findall('.//record'):
        pub = {}
        
        # Authors
        authors_list = []
        for author in record.findall('.//authors/author'):
            author_text = get_text_from_element(author)
            if author_text:
                authors_list.append(author_text)
        pub['authors'] = ', '.join(authors_list) if authors_list else ''
        
        # Title
        title_elem = record.find('.//title')
        pub['title'] = get_text_from_element(title_elem)
        
        # Journal
        journal_elem = record.find('.//secondary-title')
        pub['journal'] = get_text_from_element(journal_elem)
        
        # Year
        year_elem = record.find('.//year')
        pub['year'] = get_text_from_element(year_elem)
        
        # Volume
        volume_elem = record.find('.//volume')
        pub['volume'] = get_text_from_element(volume_elem)
        
        # Number/Issue
        number_elem = record.find('.//number')
        pub['number'] = get_text_from_element(number_elem)
        
        # Pages
        pages_elem = record.find('.//pages')
        pub['pages'] = get_text_from_element(pages_elem)
        
        # Publisher
        publisher_elem = record.find('.//publisher')
        pub['publisher'] = get_text_from_element(publisher_elem)

        # DOI
        doi_elem = record.find('.//electronic-resource-num')
        pub['doi'] = get_text_from_element(doi_elem)
        
        # PubMed ID
        pmid_elem = record.find('.//accession-num')
        pub['pmid'] = get_text_from_element(pmid_elem)
        
        # Abstract
        abstract_elem = record.find('.//abstract')
        pub['abstract'] = get_text_from_element(abstract_elem)
        
        # Keywords
        keywords_list = []
        for keyword in record.findall('.//keyword'):
            kw_text = get_text_from_element(keyword)
            if kw_text:
                keywords_list.append(kw_text)
        pub['keywords'] = ', '.join(keywords_list) if keywords_list else ''
        
        # Only add if we have title and year
        if pub['title'] and pub['year']:
            publications.append(pub)
    
    # Sort by year (descending) and title
    publications.sort(key=lambda x: (int(x['year']) if x['year'].isdigit() else 0, x['title']), reverse=True)
    
    return publications

if __name__ == '__main__':
    try:
        pubs = parse_endnote_xml('utkmangal_publications_Library.xml')
        
        # Save as JSON
        with open('data/publications.json', 'w', encoding='utf-8') as f:
            json.dump(pubs, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Successfully parsed {len(pubs)} publications")
        if pubs:
            print(f"📅 Year range: {pubs[-1]['year']} - {pubs[0]['year']}")
        print(f"📊 Saved to: data/publications.json")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
