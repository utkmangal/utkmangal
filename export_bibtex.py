from pathlib import Path
from typing import Any, Dict, List

import json

from process_citations import process_citations


def generate_bibtex(publications: List[Dict[str, Any]]) -> str:
    entries = []
    for index, publication in enumerate(publications, start=1):
        year = publication.get("year") or "n.d."
        first_author = publication.get("authors", "unknown").split(";")[0].replace(" ", "")
        key = f"{first_author}{year}_{index}"
        entry = [
            f"@article{{{key},",
            f"  author = {{{publication.get('authors', '')}}},",
            f"  title = {{{publication.get('title', '')}}},",
            f"  journal = {{{publication.get('journal', '')}}},",
            f"  volume = {{{publication.get('volume', '')}}},",
            f"  number = {{{publication.get('number', '')}}},",
            f"  pages = {{{publication.get('pages', '')}}},",
            f"  year = {{{publication.get('year', '')}}},",
            f"  publisher = {{{publication.get('publisher', '')}}}",
            "}",
        ]
        entries.append("\n".join(entry))
    return "\n\n".join(entries)


def save_bibtex(content: str, output_path: str = "assets/files/publications.bib") -> Path:
    output = Path(output_path)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(content, encoding="utf-8")
    return output


def main() -> None:
    data_path = Path("data/publications.json")
    if data_path.exists():
        publications = json.loads(data_path.read_text(encoding="utf-8"))
    else:
        publications = process_citations("citations.csv")

    bibtex_content = generate_bibtex(publications)
    save_bibtex(bibtex_content)
    print(f"Exported {len(publications)} publications to BibTeX")


if __name__ == "__main__":
    main()
