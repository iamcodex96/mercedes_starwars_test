import { test, expect } from '@playwright/test';
import { StarWarsApp } from './pages/StarWarsApp.js';
import { testData } from './fixtures/test-data.js';

test.describe('Star Wars App - Smoke Test', () => {
    let app;

    test.beforeEach(async ({ page }) => {
        app = new StarWarsApp(page);
        await app.goto();
    });

    test('Happy Path: Load → Search → Sort → Paginate', async () => {
        // 🚀 STEP 1: Verify app loads correctly
        await test.step('App loads with initial data', async () => {
            await app.verifyAppLoaded();

            const initialItems = await app.getItemCount();
            expect(initialItems).toBeGreaterThan(0);

            console.log(`✅ App loaded with ${initialItems} items`);
        });

        // 🔍 STEP 2: Test search functionality
        await test.step('Search functionality works', async () => {
            await app.searchFor(testData.people.searchTerm);
            await app.verifySearchResults(testData.people.searchTerm);

            const searchResults = await app.getItemCount();
            expect(searchResults).toBeGreaterThan(0);
            expect(searchResults).toBeLessThanOrEqual(10);

            console.log(`✅ Search for "${testData.people.searchTerm}" returned ${searchResults} results`);

            await app.clearSearch();
            const allItemsAfterClear = await app.getItemCount();
            expect(allItemsAfterClear).toBeGreaterThanOrEqual(searchResults);

            console.log(`✅ Search cleared, showing ${allItemsAfterClear} items`);
        });

        // 🔄 STEP 3: Test sorting functionality
        await test.step('Sort functionality works', async () => {
            const initialItems = await app.getVisibleItems();
            const initialSortIcon = await app.getSortButtonIcon();

            console.log(`📊 Initial sort order: ${initialSortIcon}`);
            console.log(`📋 First few items: ${initialItems.slice(0, 3).join(', ')}`);

            await app.toggleSort();
            const newSortIcon = await app.getSortButtonIcon();
            const sortedItems = await app.getVisibleItems();

            expect(newSortIcon).not.toBe(initialSortIcon);
            expect(sortedItems).not.toEqual(initialItems);

            console.log(`📊 New sort order: ${newSortIcon}`);
            console.log(`📋 First few items after sort: ${sortedItems.slice(0, 3).join(', ')}`);

            await app.verifySortOrder(newSortIcon);

            console.log(`✅ Sort functionality working correctly`);
        });

        // 📄 STEP 4: Test pagination functionality
        await test.step('Pagination functionality works', async () => {
            await app.clearSearch();

            const totalItems = await app.getItemCount();
            const isPaginationVisible = await app.isPaginationVisible();

            if (isPaginationVisible && totalItems >= 10) {
                console.log(`📄 Testing pagination with ${totalItems} items visible`);

                await app.verifyPaginationWorks();

                console.log(`✅ Pagination functionality working correctly`);
            } else {
                console.log(`ℹ️ Pagination not needed - only ${totalItems} items total`);

                expect(totalItems).toBeGreaterThan(0);
            }
        });

        // 🌍 STEP 5: Test data type switching (Planets)
        await test.step('Data type switching works', async () => {
            await app.switchToDataType('planets');

            const planetsCount = await app.getItemCount();
            expect(planetsCount).toBeGreaterThan(0);

            console.log(`🌍 Switched to Planets, showing ${planetsCount} items`);

            await app.searchFor(testData.planets.searchTerm);
            await app.verifySearchResults(testData.planets.searchTerm);

            const planetSearchResults = await app.getItemCount();
            console.log(`🔍 Planet search for "${testData.planets.searchTerm}" returned ${planetSearchResults} results`);

            await app.switchToDataType('people');
            await app.clearSearch();

            const backToPeopleCount = await app.getItemCount();
            expect(backToPeopleCount).toBeGreaterThan(0);

            console.log(`👥 Switched back to People, showing ${backToPeopleCount} items`);
        });

        // 🎯 STEP 6: Complete integration test
        await test.step('Complete user journey integration', async () => {
            await app.searchFor('a');
            const searchCount = await app.getItemCount();

            if (searchCount > 0) {
                await app.toggleSort();

                const isPaginationVisible = await app.isPaginationVisible();
                if (isPaginationVisible) {
                    await app.goToNextPage();
                    await app.goToPreviousPage();
                }

                console.log(`🎯 Complete user journey completed successfully`);
            }
        });
    });

    test('Error handling and edge cases', async () => {
        await test.step('Handle empty search results', async () => {
            await app.searchFor('nonexistentcharacter');

            const noResultsCount = await app.getItemCount();
            expect(noResultsCount).toBe(0);

            console.log(`✅ Empty search handled correctly`);
        });

        await test.step('Handle rapid interactions', async () => {
            await app.searchFor('luke');
            await app.clearSearch();
            await app.toggleSort();
            await app.toggleSort();
            await app.switchToDataType('planets');
            await app.switchToDataType('people');

            const finalCount = await app.getItemCount();
            expect(finalCount).toBeGreaterThan(0);

            console.log(`✅ Rapid interactions handled correctly`);
        });
    });
});