import type { FC } from 'react';
import React from 'react';

import { Country } from '../../api';

import { CountriesListItem } from './CountryListItem';

interface Props {
    countries: Country[];
    isPending: boolean;
    error: unknown;
}

export const CountryListContent: FC<Props> = ({ countries, isPending, error }) => {
    if (isPending) {
        return (
            <tr>
                <td>
                    <div className="mt-3">Loading, please wait.</div>
                </td>
            </tr>
        );
    }

    if (error) {
        const errorMessage =
            typeof error === 'string'
                ? error
                : 'An error has occurred when loading the countries. Sorry!';

        return (
            <tr>
                <td>
                    <div className="mt-3" data-cy="countries-fetch-error">
                        {errorMessage}
                    </div>
                </td>
            </tr>
        );
    }

    return (
        <>
            {countries.map((country) => (
                <CountriesListItem key={country.alpha3Code} country={country} />
            ))}
        </>
    );
};
