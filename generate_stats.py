import json
from collections import defaultdict
from pathlib import Path
from typing import Any, Dict, List

from process_citations import process_citations


def generate_statistics(publications: List[Dict[str, Any]]) -> Dict[str, Any]:
    stats: Dict[str, Any] = {
        "total_publications": len(publications),
        "years_active": "",
        "publications_by_year": defaultdict(int),
        "journals": set(),
        "co_authors": set(),
    }

    active_years = [pub["year"] for pub in publications if pub.get("year")]
    if active_years:
        stats["years_active"] = f"{min(active_years)}-{max(active_years)}"

    for publication in publications:
        year = publication.get("year")
        if year:
            stats["publications_by_year"][year] += 1
        journal = publication.get("journal")
        if journal:
            stats["journals"].add(journal)

        authors_field = publication.get("authors", "")
        authors = [author.strip() for author in authors_field.split(";") if author.strip()]
        stats["co_authors"].update(authors)

    stats["unique_journals"] = len(stats["journals"])
    stats["unique_coauthors"] = len(stats["co_authors"])

    # Convert to JSON-serializable structures
    stats["publications_by_year"] = dict(sorted(stats["publications_by_year"].items(), reverse=True))
    stats["journals"] = sorted(stats["journals"])
    stats["co_authors"] = sorted(stats["co_authors"])

    return stats


def save_statistics(stats: Dict[str, Any], output_path: str = "data/statistics.json") -> Path:
    output = Path(output_path)
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open("w", encoding="utf-8") as handle:
        json.dump(stats, handle, indent=2, ensure_ascii=False)
    return output


def main() -> None:
    data_path = Path("data/publications.json")
    if data_path.exists():
        publications = json.loads(data_path.read_text(encoding="utf-8"))
    else:
        publications = process_citations("citations.csv")

    stats = generate_statistics(publications)
    save_statistics(stats)
    print("Generated statistics for {} publications".format(stats["total_publications"]))


if __name__ == "__main__":
    main()
