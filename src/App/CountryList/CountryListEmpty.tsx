import React, { FC } from 'react';

export const CountriesListEmpty: FC = () => (
    <div data-cy="empty-countries-list">
        No countries were found. Please adjust your search query.
    </div>
);
