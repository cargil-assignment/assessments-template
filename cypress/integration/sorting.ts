describe('sorting', () => {
    it('can sort the population of a country in an ascending order when clicking on the header', () => {
        cy.startApp();

        cy.getByDataCy('population-column').click();

        cy.getByDataCy('country-list-item').first().should('contain.text', 'Bouvet Island');
    });

    it('can sort the population of a country in an descending order when clicking on the header twice', () => {
        cy.startApp();

        cy.getByDataCy('population-column').click();
        cy.getByDataCy('population-column').click();

        cy.getByDataCy('country-list-item').first().should('contain.text', 'China');
    });
});
