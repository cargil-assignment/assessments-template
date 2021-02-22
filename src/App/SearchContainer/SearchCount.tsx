import type { FC } from 'react';
import React from 'react';

import { Country } from '../../api';

interface Props {
    countries: Country[];
}

export const SearchCount: FC<Props> = ({ countries }) => {
    const countryPluralized = countries.length === 1 ? 'country' : 'countries';

    return (
        <span className="ml-auto mr-2">
            <span className="font-bold text-gray-900">{countries.length}</span> {countryPluralized}{' '}
            found.
        </span>
    );
};
