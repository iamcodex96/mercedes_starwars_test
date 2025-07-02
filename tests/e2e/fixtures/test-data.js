export const testData = {
  people: {
    searchTerm: 'Luke',
    expectedResults: ['Luke Skywalker'],
    partialSearch: 'sky'
  },
  planets: {
    searchTerm: 'tatooine',
    expectedResults: ['Tatooine'],
    partialSearch: 'tat'
  }
};

export const selectors = {
  // Filter component
  peopleButton: '[data-testid="people-button"]',
  planetsButton: '[data-testid="planets-button"]',
  searchInput: '[data-testid="search-input"] input',
  sortButton: '[data-testid="sort-button"]',
  
  // List component
  itemsList: '.v-container',
  itemCard: '.item-card-display',
  itemName: '[data-testid="item-name"]',
  
  // Pagination
  pagination: '[data-testid="pagination"]',
  paginationButton: '.v-pagination__item',
  nextPageButton: '[aria-label="Go to next page"]',
  prevPageButton: '[aria-label="Go to previous page"]',
  
  // App structure
  appBar: '.v-app-bar',
  appTitle: '.v-toolbar-title__placeholder',
  mainContent: '.v-main'
};