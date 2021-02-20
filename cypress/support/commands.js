import { startApp } from './startApp';

Cypress.Commands.add('startApp', startApp);
Cypress.Commands.add('getByDataCy', (dataCy) => cy.get(`[data-cy=${dataCy}]`));
