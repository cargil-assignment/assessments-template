describe('countries list', () => {
    it('shows 250 countries in a list', () => {
        cy.startApp();
        const countryCount = 250;

        cy.getByDataCy('country-list-item').should('have.length', countryCount);
    });

    it('shows the name, country code and population for each country', () => {
        cy.startApp();
        const countryCount = 250;

        cy.getByDataCy('country-name').should('have.length', countryCount);
        cy.getByDataCy('country-code').should('have.length', countryCount);
        cy.getByDataCy('country-population').should('have.length', countryCount);
    });

    it('shows a generic error message when the countries fetch fails', () => {
        cy.intercept('GET', '**/rest/v2/all**', {
            statusCode: 404,
        });
        cy.startApp();

        cy.getByDataCy('countries-fetch-error').should('be.visible');
    });

    it('shows the server error message when the server returns one', () => {
        cy.intercept('GET', '**/rest/v2/all**', {
            statusCode: 404,
            fixture: 'server404.json',
        });
        cy.startApp();

        cy.getByDataCy('countries-fetch-error').should('contain', 'Not Found');
    });

    describe('detailed country information', () => {
        it('shows the country capital, language and currency inside of a modal when clicking on an item', () => {
            cy.startApp();

            cy.getByDataCy('country-list-item').first().click();

            cy.getByDataCy('country-capital').should('exist');
            cy.getByDataCy('country-language').should('exist');
            cy.getByDataCy('country-currency').should('exist');
        });

        it('hides the detailed country information when clicking on the modal', () => {
            cy.startApp();

            cy.getByDataCy('country-list-item').first().click();
            cy.getByDataCy('country-capital').first().click();

            cy.getByDataCy('country-capital').should('not.exist');
            cy.getByDataCy('country-language').should('not.exist');
            cy.getByDataCy('country-currency').should('not.exist');
        });
    });
});
