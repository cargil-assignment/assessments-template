import React, { FC } from 'react';

import { Country } from '../../api';

import { CountriesListItem } from './CountryListItem';
import { CountriesListEmpty } from './CountryListEmpty';

interface Props {
    countries: Country[];
    isPending: boolean;
    error: unknown;
}

export const CountryList: FC<Props> = ({ countries, isPending, error }) => {
    if (isPending) {
        return <div>Loading, please wait.</div>;
    }

    if (error) {
        const errorMessage =
            typeof error === 'string'
                ? error
                : 'An error has occurred when loading the countries. Sorry!';

        return <div data-cy="countries-fetch-error">{errorMessage}</div>;
    }

    if (countries.length === 0) {
        return <CountriesListEmpty />;
    }

    return (
        <>
            {countries.map((country) => (
                <CountriesListItem key={country.alpha3Code} country={country} />
            ))}
        </>
    );
};
