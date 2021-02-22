import { getHost } from './utils';

export const startApp = (): void => {
    cy.visit(`http://${getHost()}`);

    cy.intercept('GET', '**/rest/v2/all**', {
        fixture: 'all.json',
    });
};
