describe('country filtering', () => {
    it('filters the country by name', () => {
        cy.intercept('GET', '**/rest/v2/name/Italy**', {
            fixture: 'name.json',
        });
        cy.startApp();

        cy.getByDataCy('search-input').type('Italy');

        cy.getByDataCy('country-list-item').should('have.length', 1);
        cy.getByDataCy('country-name').should('have.text', 'Italy');
    });

    it('filters the country by country code', () => {
        cy.intercept('GET', '**/rest/v2/alpha/ITA**', {
            fixture: 'code.json',
        });
        cy.startApp();

        cy.getByDataCy('search-input').type('ITA');

        cy.getByDataCy('country-list-item').should('have.length', 1);
        cy.getByDataCy('country-name').should('have.text', 'Italy');
    });
});
