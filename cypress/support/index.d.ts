// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command, navigates to default home screen. No need to have
         * an extra step for login.
         *
         * @example
         * cy.startApp();
         */

        startApp(): Chainable<void>;

        /**
         * Custom command, shortcut for cy.get(`[data-cy=dataCyAttr]`)
         * * @param {string} dataCyAttr - the data cy attribute to select
         * * @example
         * cy.getByDataCy('account-create-btn');
         */

        getByDataCy(dataCyAttr: string): Cypress.Chainable<JQuery>;
    }
}
