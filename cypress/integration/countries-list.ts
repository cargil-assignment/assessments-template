describe('Countries list', () => {
    it('shows 250 countries in a list', () => {
        cy.startApp();
        const countryCount = 250;
        cy.intercept('GET', '**/rest/v2/all**', {
            fixture: 'all.json',
        });

        cy.getByDataCy('country-list-item').should('have.length', countryCount);
    });

    it('shows an error message when the countries fetch fails', () => {
        cy.startApp();
        cy.intercept('GET', '**/rest/v2/all**', {
            statusCode: 404,
        });

        cy.getByDataCy('countries-fetch-error').should('be.visible');
    });
});
