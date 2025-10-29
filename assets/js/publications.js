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
    const filtered = publicationsData.filter(pub => pub.year === parseInt(year, 10));
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
