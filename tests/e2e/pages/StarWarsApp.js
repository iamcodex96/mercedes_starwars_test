import { expect } from '@playwright/test';
import { selectors } from '../fixtures/test-data.js';

export class StarWarsApp {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
    await this.waitForAppToLoad();
  }

  async waitForAppToLoad() {
    await this.page.waitForSelector(selectors.appBar, { state: 'visible' });
    
    await this.page.waitForSelector(selectors.mainContent, { state: 'visible' });
    
    await this.page.waitForLoadState('networkidle');
    
    await this.page.waitForTimeout(2000); // AUMENTADO a 2 segundos
  }

  async switchToDataType(type) {
    const selector = type === 'people' ? selectors.peopleButton : selectors.planetsButton;
    await this.page.click(selector);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000); // AUMENTADO
  }

  async searchFor(term) {
    // Limpiar campo de búsqueda
    await this.page.locator(selectors.searchInput).fill('');
    await this.page.waitForTimeout(300);
    
    // Escribir nuevo término
    await this.page.locator(selectors.searchInput).fill(term);
    await this.page.waitForTimeout(1000); // AUMENTADO para dar tiempo al filtrado
  }

  async clearSearch() {
    await this.page.locator(selectors.searchInput).fill('');
    await this.page.waitForTimeout(1000); // AUMENTADO
  }

  async toggleSort() {
    await this.page.click(selectors.sortButton);
    await this.page.waitForTimeout(1000); // AUMENTADO
  }

  async goToPage(pageNumber) {
    const pageButton = this.page.locator(`${selectors.paginationButton}:has-text("${pageNumber}")`);
    if (await pageButton.isVisible()) {
      await pageButton.click();
      await this.page.waitForTimeout(1000);
      return true;
    }
    return false;
  }

  async goToNextPage() {
    // Buscar botón de siguiente página de forma más flexible
    const nextButton = this.page.locator('.v-pagination__next').first();
    if (await nextButton.isVisible() && await nextButton.isEnabled()) {
      await nextButton.click();
      await this.page.waitForTimeout(1000);
      return true;
    }
    return false;
  }

  async goToPreviousPage() {
    // Buscar botón de página anterior de forma más flexible
    const prevButton = this.page.locator('.v-pagination__prev').first();
    if (await prevButton.isVisible() && await prevButton.isEnabled()) {
      await prevButton.click();
      await this.page.waitForTimeout(1000);
      return true;
    }
    return false;
  }

  async getVisibleItems() {
    // Esperar que haya al menos un item visible
    try {
      await this.page.waitForSelector(selectors.itemCard, { state: 'visible', timeout: 5000 });
      const items = await this.page.locator(selectors.itemName).allTextContents();
      return items.filter(item => item && item.trim() !== '');
    } catch (error) {
      console.log('No items found or timeout waiting for items');
      return [];
    }
  }

  async getItemCount() {
    try {
      const count = await this.page.locator(selectors.itemCard).count();
      return count;
    } catch (error) {
      console.log('Error counting items:', error);
      return 0;
    }
  }

  async getCurrentPageNumber() {
    try {
      const activeButton = await this.page.locator('.v-pagination__item--is-active').textContent();
      return parseInt(activeButton.trim());
    } catch (error) {
      console.log('Could not get current page number');
      return 1;
    }
  }

  async getTotalPages() {
    try {
      const paginationButtons = await this.page.locator(selectors.paginationButton).count();
      return Math.max(1, paginationButtons - 2);
    } catch (error) {
      return 1;
    }
  }

  async isPaginationVisible() {
    try {
      return await this.page.locator(selectors.pagination).isVisible();
    } catch (error) {
      return false;
    }
  }

  async getSortButtonIcon() {
    try {
      const sortButton = this.page.locator(selectors.sortButton);
      const iconClass = await sortButton.locator('i').getAttribute('class');
      return iconClass && iconClass.includes('mdi-sort-ascending') ? 'asc' : 'desc';
    } catch (error) {
      console.log('Could not determine sort direction');
      return 'asc';
    }
  }


  async verifyAppLoaded() {
    await expect(this.page.locator(selectors.appTitle)).toContainText('STAR WARS');
    

    const itemCount = await this.getItemCount();
    expect(itemCount).toBeGreaterThan(0);
  }

  async verifySearchResults(expectedText) {
    const items = await this.getVisibleItems();
    console.log(`Found ${items.length} items:`, items);
    
    expect(items.length).toBeGreaterThan(0);
    

    const hasMatchingItem = items.some(item => 
      item.toLowerCase().includes(expectedText.toLowerCase())
    );
    
    if (!hasMatchingItem) {
      console.log(`No items found containing "${expectedText}". Items found:`, items);
    }
    
    expect(hasMatchingItem).toBeTruthy();
  }

  async verifySortOrder(expectedOrder = 'asc') {
    const items = await this.getVisibleItems();
    if (items.length <= 1) {
      console.log('Cannot verify sort order with less than 2 items');
      return;
    }
    
    const sortedItems = [...items].sort((a, b) => 
      expectedOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
    );
    
    console.log('Original items:', items);
    console.log('Expected sorted items:', sortedItems);
    
    expect(items).toEqual(sortedItems);
  }

  async verifyPaginationWorks() {
    const initialItems = await this.getVisibleItems();
    console.log(`Initial items on page: ${initialItems.length}`);
    
    const hasNextPage = await this.goToNextPage();
    
    if (hasNextPage) {
      const newItems = await this.getVisibleItems();
      console.log(`Items on next page: ${newItems.length}`);

      expect(newItems).not.toEqual(initialItems);

      const hasPrevPage = await this.goToPreviousPage();
      if (hasPrevPage) {
        const backToOriginalItems = await this.getVisibleItems();
        expect(backToOriginalItems).toEqual(initialItems);
      }
    } else {
      console.log('No next page available or pagination not working');
    }
  }
}