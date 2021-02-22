describe('sorting', () => {
    describe('population', () => {
        it('can sort by the population of a country in an ascending order when clicking on the header', () => {
            cy.startApp();

            cy.getByDataCy('population-column').click();

            cy.getByDataCy('country-list-item').first().should('contain.text', 'Bouvet Island');
        });

        it('can sort by the population of a country in an descending order when clicking on the header twice', () => {
            cy.startApp();

            cy.getByDataCy('population-column').click();
            cy.getByDataCy('population-column').click();

            cy.getByDataCy('country-list-item').first().should('contain.text', 'China');
        });
    });

    describe('name', () => {
        it('can sort by country name in an ascending order when clicking on the header', () => {
            cy.startApp();

            cy.getByDataCy('name-column').click();

            cy.getByDataCy('country-list-item').first().should('contain.text', 'Zimbabwe');
        });

        it('can sort by country name in an descending order when clicking on the header twice', () => {
            cy.startApp();

            cy.getByDataCy('name-column').click();
            cy.getByDataCy('name-column').click();

            cy.getByDataCy('country-list-item').first().should('contain.text', 'Afghanistan');
        });
    });

    describe('country code ', () => {
        it('can sort by country code in an ascending order when clicking on the header', () => {
            cy.startApp();

            cy.getByDataCy('alpha3Code-column').click();

            cy.getByDataCy('country-list-item').first().should('contain.text', 'ZWE');
        });

        it('can sort by country code in an descending order when clicking on the header twice', () => {
            cy.startApp();

            cy.getByDataCy('alpha3Code-column').click();
            cy.getByDataCy('alpha3Code-column').click();

            cy.getByDataCy('country-list-item').first().should('contain.text', 'ABW');
        });
    });

    describe('sorting icon', () => {
        it('shows an asc icon when the column is sorted in an ascending order', () => {
            cy.startApp();

            cy.getByDataCy('population-column').click();

            cy.getByDataCy('asc-sort-icon').should('have.length', 1);
        });

        it('shows a desc icon when the column is sorted in an descending order', () => {
            cy.startApp();

            cy.getByDataCy('population-column').click();
            cy.getByDataCy('population-column').click();

            cy.getByDataCy('desc-sort-icon').should('have.length', 1);
        });
    });
});
