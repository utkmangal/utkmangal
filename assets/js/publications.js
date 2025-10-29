// Publications Management Script
let publicationsData = [];

// Helper to safely format journal metadata
function formatJournalDetails(pub) {
  const parts = [];

  if (pub.journal) {
    parts.push(`<em>${pub.journal}</em>`);
  }

  const volumeIssue = `${pub.volume || ''}${pub.number ? `(${pub.number})` : ''}`.trim();
  if (volumeIssue) {
    parts.push(volumeIssue);
  }

  if (pub.pages) {
    parts.push(pub.pages);
  }

  if (pub.publisher) {
    parts.push(pub.publisher);
  }

  return parts.join(', ');
}

function formatIdentifiers(pub) {
  const parts = [];

  if (pub.doi) {
    parts.push(`DOI: <a href="https://doi.org/${pub.doi}" target="_blank" rel="noopener">${pub.doi}</a>`);
  }

  if (pub.pmid) {
    parts.push(`PMID: <a href="https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/" target="_blank" rel="noopener">${pub.pmid}</a>`);
  }

  return parts.join(' • ');
}

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
  if (!container) {
    return;
  }

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

      const journalLine = formatJournalDetails(pub);
      const identifiersLine = formatIdentifiers(pub);

      const authorsLine = pub.authors ? `<p class="authors">${pub.authors}</p>` : '';
      const journalMarkup = journalLine ? `<p class="journal">${journalLine}</p>` : '';
      const identifiersMarkup = identifiersLine ? `<p class="identifiers">${identifiersLine}</p>` : '';

      pubDiv.innerHTML = `
        <h3>${pub.title}</h3>
        ${authorsLine}
        ${journalMarkup}
        ${identifiersMarkup}
      `;

      yearSection.appendChild(pubDiv);
    });

    container.appendChild(yearSection);
  });
}

// Search functionality
function searchPublications(query) {
  const normalizedQuery = query.toLowerCase();
  const filtered = publicationsData.filter(pub => {
    const title = (pub.title || '').toLowerCase();
    const authors = (pub.authors || '').toLowerCase();
    const journal = (pub.journal || '').toLowerCase();
    return title.includes(normalizedQuery) || authors.includes(normalizedQuery) || journal.includes(normalizedQuery);
  });
  displayPublications(filtered);
}

// Filter by year
function filterByYear(year) {
  if (year === 'all') {
    displayPublications(publicationsData);
  } else {
    const filtered = publicationsData.filter(pub => pub.year === year);
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
