// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
    interface Chainable {
        startApp(): Chainable<void>;
        getByDataCy(dataCyAttr: string): Cypress.Chainable<JQuery>;
    }
}
