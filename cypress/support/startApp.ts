import { getHost } from './utils';

export const startApp = (): void => {
    cy.visit(`http://${getHost()}`);
};
