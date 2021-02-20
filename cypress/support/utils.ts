const DEFAULT_HOST = 'localhost:3000';

export const getHost = (): string => {
    return Cypress.env('host') || DEFAULT_HOST;
};
