import type { FC } from 'react';
import React from 'react';

import { Country } from '../../api';

interface Props {
    countries: Country[];
}

export const SearchCount: FC<Props> = ({ countries }) => {
    if (countries.length === 0) {
        return null;
    }

    const countryPluralized = countries.length > 1 ? 'countries' : 'country';

    return (
        <span className="ml-auto">
            <span className="font-bold text-gray-900">{countries.length}</span> {countryPluralized}{' '}
            found.
        </span>
    );
};
