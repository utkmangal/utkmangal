import csv
import json
from pathlib import Path
from typing import Any, Dict, List, Optional


def _parse_year(value: str) -> Optional[int]:
    try:
        year = int(value)
    except (TypeError, ValueError):
        return None
    return year


def process_citations(csv_file: str, output_path: str = "data/publications.json") -> List[Dict[str, Any]]:
    publications: List[Dict[str, Any]] = []
    csv_path = Path(csv_file)
    with csv_path.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            year = _parse_year(row.get("Year", "").strip())
            publication = {
                "authors": row.get("Authors", "").strip(),
                "title": row.get("Title", "").strip(),
                "journal": row.get("Publication", "").strip(),
                "volume": row.get("Volume", "").strip(),
                "number": row.get("Number", "").strip(),
                "pages": row.get("Pages", "").strip(),
                "year": year,
                "publisher": row.get("Publisher", "").strip(),
            }
            publications.append(publication)

    publications.sort(key=lambda item: item["year"] or 0, reverse=True)

    output = Path(output_path)
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open("w", encoding="utf-8") as handle:
        json.dump(publications, handle, indent=2, ensure_ascii=False)

    return publications


if __name__ == "__main__":
    publications = process_citations("citations.csv")
    print(f"Processed {len(publications)} publications")
